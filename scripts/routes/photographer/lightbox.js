// #\-IMPORTS-\

    // --JS
    import EVENTS from '../../contexts/Events.js'


// #\-EXPORTS-\

    // --THIS
    export default function lightbox_init() { lightbox_set() }

    export function lightbox_update(node, id, text)
    {
        let
        action = '',
        lightbox_updateEvents

        ;[document.documentElement.style.overflowY, action, lightbox_updateEvents] = id && node ? ['hidden', 'remove', lightbox_setEvents] : ['auto', 'add', lightbox_destroyEvents]

        LIGHTBOX.classList[action]('hidden')

        lightbox_updateEvents()
        media_update(node, id)
        text_update(text)
    }


// #\-CONSTANTES-\

    // --THIS
    const
    LIGHTBOX = document.getElementById('lightbox')
    ,
    LIGHTBOX_EVENTS = { keydown: lightbox_e$Keydow }

    // --INSIDE
    const MEDIA = LIGHTBOX.querySelector('.media')

    const TEXT = LIGHTBOX.querySelector('.text')

    const CLOSE = LIGHTBOX.querySelector('.close')
    
    const ARROW_ARROWS = [...LIGHTBOX.querySelectorAll('.arrow')]



// #\-VARIABLES-\

    // --THIS
    let
    lightbox_EVENTS_OK = false
    ,
    lightbox_FOCUSABLE = [CLOSE, ...ARROW_ARROWS]
    ,
    lightbox_FOCUSABLE_INDEX = 0

    // --INSIDE
    let media_CURRENT_ID


// #\-FUNCTIONS-\

    // --SET
    function lightbox_set()
    {
        close_set()
        arrows_iter()
    }

    function lightbox_setEvents()
    {
        if (lightbox_EVENTS_OK) return

        EVENTS.events_add(LIGHTBOX_EVENTS)

        lightbox_EVENTS_OK = true
    }


    function close_set() { close_setEvents() }

    function close_setEvents() { CLOSE?.addEventListener('click', close_eClick) }


    function arrow_set() { arrow_setEvents(...arguments) }

    function arrow_setEvents(arrow) { arrow?.addEventListener('click', arrow_eClick.bind(arrow, arrow.classList.contains('right'))) }

    // --GET
    function lightbox_getFocusableTarget() // retourne la cible suivante
    {
        if (++lightbox_FOCUSABLE_INDEX >= lightbox_FOCUSABLE.length) lightbox_FOCUSABLE_INDEX = 0

        return lightbox_FOCUSABLE[lightbox_FOCUSABLE_INDEX]
    }

    // --UPDATES
    function media_update(node, id)
    {
        MEDIA.firstElementChild?.remove()

        if (id != null && node instanceof HTMLElement)
        {
            if (node instanceof HTMLVideoElement) node.controls = 'controls'

            MEDIA.appendChild(node)
        }

        media_CURRENT_ID = id
    }


    function text_update(text = '') { TEXT.textContent = text }

    // --DESTROY
    function lightbox_destroyEvents()
    {
        EVENTS.events_remove(LIGHTBOX_EVENTS)

        lightbox_EVENTS_OK = false
    }


//=======@EVENTS|

    // --*
    function lightbox_e$Keydow(e)
    {
        switch (e.key)
        {
            case    'Tab'       : return lightbox_getFocusableTarget(e.preventDefault())?.focus()
            case    'ArrowRight': return lightbox_dispatch(true )
            case    'ArrowLeft' : return lightbox_dispatch(false)
            default             : break
        }
    }

    
    function close_eClick() { lightbox_update() }


    function arrow_eClick(right) { lightbox_dispatch(right) }


//=======@UTILS|

    // --*
    function lightbox_dispatch(right = true) { EVENTS.events_dispatch(LIGHTBOX, 'lightboxUpdateContent', { currentId: media_CURRENT_ID, right }) } 


    function arrows_iter() { for (const ARROW of ARROW_ARROWS) arrow_set(ARROW) }