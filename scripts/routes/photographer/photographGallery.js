/*----------------------------------------------- #||--photographGallery--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default function photographGallery_init() { photographGallery_set(...arguments) }

    export function photographGallery_update() { for (let i = 0; i < photographGallery_MEDIA.length; i++) photographGallery_MEDIA[i].element.style.order = i }


// #\-CONSTANTES-\

    // --THIS
    const PHOTOGRAPH_GALLERY = document.querySelector('.photograph-gallery')


// #\-VARIABLES-\

    // --THIS
    let photographGallery_MEDIA = []


// #\-FUNCTIONS-\

    // --SET
    function photographGallery_set(gallery, media)
    {
        photographGallery_setHTML(gallery)
        photographGallery_setVars(media)
        media_iter()
    }

    function photographGallery_setHTML(gallery = '') { PHOTOGRAPH_GALLERY?.insertAdjacentHTML('beforeend', gallery) }

    function photographGallery_setVars(media = []) { photographGallery_MEDIA = media }


    function media_set() { media_setEvents(...arguments) }

    function media_setEvents(target, id, text = '')
    {
        const
        BUTTON = target?.querySelector('.button'),
        LIKES  = target?.querySelector('.likes')
        
        BUTTON?.addEventListener('click', media_eClick.bind(BUTTON, id, text))
        LIKES ?.addEventListener('click', likes_eClick.bind(LIKES , id      ))
    }

    // --GET

    // --UPDATES

    // --TESTS


//=======@EVENTS|

    // --*
    function media_eClick(id, text = '', e)
    {
        e.preventDefault() // empêche les vidéos de se lancer

        const
        NODE  = this.firstElementChild.cloneNode(true),
        EVENT = new CustomEvent('photographGalleryClick', { bubbles: true, detail: { node: NODE, id, text } })

        PHOTOGRAPH_GALLERY.dispatchEvent(EVENT)
    }


    function likes_eClick(id)
    {
        let likes = parseInt(this.dataset.likes, 10)

        if (isNaN(likes)) return

        ;[this.dataset.liked, this.dataset.likes] = this.dataset.liked === 'true' ? [false, --likes] : [true, ++likes]

        const EVENT = new CustomEvent('photographGalleryLikesUpdate', { bubbles: true, detail: {id, likes} })

        PHOTOGRAPH_GALLERY.dispatchEvent(EVENT)
    }

//=======@UTILS|

    // --*
    function media_iter()
    {
        const ELEMENTS = [...PHOTOGRAPH_GALLERY?.querySelectorAll('.media')]

        for (let i = 0; i < ELEMENTS.length; i++)
        {
            const
            TARGET = ELEMENTS[i],
            ID     = parseInt(TARGET.dataset.mediaId),
            MEDIA  = photographGallery_MEDIA.find(({id}) => id === ID)

            if (!MEDIA) continue

            TARGET.style.order = i

            media_set(TARGET, ID, MEDIA.title)

            MEDIA.element = TARGET
        }
    }