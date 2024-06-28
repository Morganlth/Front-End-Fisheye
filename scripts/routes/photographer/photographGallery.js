// #\-EXPORTS-\

    // --THIS
    export default function photographGallery_init() { photographGallery_set(...arguments) }

    export function photographGallery_update()
    {
        for (let i = 0; i < photographGallery_MEDIA.length; i++)
        {
            const
            ELEMENT = photographGallery_MEDIA[i].element,
            INDEX   = i + 1

            ELEMENT.style.order = i

            if (ELEMENT.button) ELEMENT.button.tabIndex = INDEX
            if (ELEMENT.likes ) ELEMENT.likes .tabIndex = INDEX
        }
    }


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


    function media_set(target, order, id, text)
    {
        media_setElement(target, order)
        media_setEvents(target, id, text)
    }

    function media_setElement(target, order = 0)
    {
        const
        BUTTON = target.querySelector('.button'),
        LIKES  = target.querySelector('.likes')

        target.style.order = order
        target.button      = BUTTON
        target.likes       = LIKES
    }

    function media_setEvents(target, id, text = '')
    {
        target.button?.addEventListener('click', media_eClick.bind(target.button, id, text))
        target.likes ?.addEventListener('click', likes_eClick.bind(target.likes , id      ))
    }


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

            media_set(TARGET, i, ID, MEDIA.title)

            MEDIA.element = TARGET
        }
    }