/*----------------------------------------------- #||--page--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS
    import EVENTS                                                        from '../../contexts/Events.js'
    import                         { data_get                          } from '../../utils/data.js'
    import PhotographerPage                                              from '../../templates/photographerPage.js'
    import photographFilter_init , { photographFilter_subscribeToStore } from './photographFilter.js'
    import photographHeader_init                                         from './photographHeader.js'
    import photographGallery_init, { photographGallery_update          } from './photographGallery.js'
    import photographInfos_init  , { photographInfos_update            } from './photographInfos.js'
    import lightbox_init         , { lightbox_update                   } from './lightbox.js'
    import modal_init                                                    from './modal.js'

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export async function page_init()
    {
  await page_set()

        const
        PROFIL   = page_PHOTOGRAPHER.photographer_getProfile ().trim(),
        PORTRAIT = page_PHOTOGRAPHER.photographer_getPortrait().trim(),
        GALLERY  = page_PHOTOGRAPHER.photographer_getGallery ().trim(),
        INFOS    = page_PHOTOGRAPHER.photographer_getInfos   ().trim()

        photographHeader_init(PROFIL, PORTRAIT)
        photographFilter_init()
        photographGallery_init(GALLERY, page_PHOTOGRAPHER.photographer_MEDIA)
        photographInfos_init(INFOS)
        lightbox_init()
        modal_init(page_PHOTOGRAPHER.photographer_NAME)
    }


// #\-CONSTANTES-\

    // --THIS

    // --INSIDE
    const BODY_EVENTS =
    {
        photographGalleryClick      : body_e$PhotographGalleryClick,
        photographGalleryLikesUpdate: body_e$PhotographGalleryLikesUpdate,
        lightboxUpdateContent       : body_e$lightboxUpdateContent
    }


// #\-VARIABLES-\

    // --THIS
    let
    page_PHOTOGRAPHER_ID,
    page_PHOTOGRAPHER

    // --INSIDE


// #\-FUNCTIONS-\

    // --SET
     async function page_set()
    {
  await page_setVars()
        body_set()
        photographFilter_subscribeToStore(page_sortMedia)
    }

    async function page_setVars()
    {
        page_PHOTOGRAPHER_ID = parseInt(new URLSearchParams(location.search).get('id'), 10)

        if (isNaN(page_PHOTOGRAPHER_ID)) return location.href = '/'

        page_PHOTOGRAPHER = new PhotographerPage(page_PHOTOGRAPHER_ID, await data_get() ?? {})
    }


    function body_set() { body_setEvents() }

    function body_setEvents() { EVENTS.events_add(BODY_EVENTS, document.body) }

    // --GET

    // --UPDATES

    // --TESTS


//=======@EVENTS|

    // --*
    function body_e$PhotographGalleryClick({detail: {node, id, text}}) { lightbox_update(node, id, text) }

    function body_e$PhotographGalleryLikesUpdate({detail: {id, likes}})
    {
        page_PHOTOGRAPHER.photographer_updateMediaLikes(id, likes)

        photographInfos_update(page_PHOTOGRAPHER.photographer_getTotalLikes())
    }

    function body_e$lightboxUpdateContent({detail: {currentId, right}})
    {
        const MEDIA = page_PHOTOGRAPHER.photographer_MEDIA

        let index = MEDIA.indexOf(MEDIA.find(({id}) => id === currentId))

        if (~index)
        {
            const
            LENGTH  = MEDIA.length,
            ELEMENT = MEDIA[right ? (++index < LENGTH ? index : 0) : (--index < 0 ? LENGTH - 1 : index)]?.element
    
            ELEMENT?.querySelector('.button').click()
        }
    }


//=======@UTILS|

    // --*
    function page_sortMedia(filter)
    {
        switch (filter)
        {
            case    'likes': page_PHOTOGRAPHER.photographer_sortMedia((a, b) => b.likes - a.likes             ) ;break
            case    'date' : page_PHOTOGRAPHER.photographer_sortMedia((a, b) => b.date  - a.date              ) ;break
            case    'title': page_PHOTOGRAPHER.photographer_sortMedia((a, b) => a.title.localeCompare(b.title)) ;break
            default        : return
        }

        photographGallery_update()
    }