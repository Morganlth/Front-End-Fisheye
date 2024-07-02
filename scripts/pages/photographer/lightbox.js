// #\-IMPORTS-\

    // --JS
    import EVENTS from '../../contexts/Events.js'


// #\-EXPORTS-\

    // --THIS
    export default function lightbox_init() { lightbox_set() }

    export function lightbox_update(node, id, text) // // open / close the lightbox
    {
        const SHOW = id != null && node instanceof HTMLElement

        if (SHOW !== lightbox_SHOW) lightbox_updateDisplay(SHOW)

        media_update(SHOW, node, id)
        text_update(text)
    }


// #\-CONSTANTES-\

    // --THIS
    const
    LIGHTBOX = document.getElementById('lightbox')
    ,
    LIGHTBOX_EVENTS = { keydown: lightbox_e$Keydow }

    // --INSIDE
    const MEDIA = LIGHTBOX?.querySelector('.media')

    const TEXT = LIGHTBOX?.querySelector('.text')

    const CLOSE = LIGHTBOX?.querySelector('.close')
    
    const ARROW_ARROWS = [...(LIGHTBOX?.querySelectorAll('.arrow') ?? [])]



// #\-VARIABLES-\

    // --THIS
    let
    lightbox_EVENTS_OK = false,
    lightbox_SHOW      = false
    ,
    lightbox_FOCUSABLE = [CLOSE, ...ARROW_ARROWS] // all focusable elements in the "lightbox"
    ,
    lightbox_FOCUSABLE_INDEX = 0
    ,
    lightbox_LAST_ELEMENT_FOCUS

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
    function lightbox_getFocusableTarget() // returns the following target
    {
        if (++lightbox_FOCUSABLE_INDEX >= lightbox_FOCUSABLE.length) lightbox_FOCUSABLE_INDEX = 0

        return lightbox_FOCUSABLE[lightbox_FOCUSABLE_INDEX]
    }

    // --UPDATES
    function lightbox_updateDisplay(show = false)
    {
        const INDEX = lightbox_FOCUSABLE.length - 1

        let
        action = '',
        lightbox_updateEvents,
        focus_TARGET

        ; [document.documentElement.style.overflowY, action  , lightbox_updateEvents , focus_TARGET               ] = show
        ? ['hidden'                                , 'remove', lightbox_setEvents    , lightbox_FOCUSABLE[INDEX]  ]
        : ['auto'                                  , 'add'   , lightbox_destroyEvents, lightbox_LAST_ELEMENT_FOCUS]

        LIGHTBOX.classList[action]('hidden')

        focus_TARGET?.focus()

        lightbox_SHOW = show

        if (show)
        {
            lightbox_FOCUSABLE_INDEX    = INDEX
            lightbox_LAST_ELEMENT_FOCUS = document.activeElement
        }

        lightbox_updateEvents()
    }

    function media_update(show = false, node, id) // change media
    {
        MEDIA.firstElementChild?.remove()

        if (show)
        {
            if (node instanceof HTMLVideoElement) node.controls = 'controls'

            MEDIA.appendChild(node)
        }

        media_CURRENT_ID = id
    }


    function text_update(text = '') { TEXT.textContent = text } // change text

    // --DESTROY
    function lightbox_destroyEvents()
    {
        EVENTS.events_remove(LIGHTBOX_EVENTS)

        lightbox_EVENTS_OK = false
    }


//=======@EVENTS|

    // --*
    function lightbox_e$Keydow(e) // updates focus and content (media and text) according to keyboard actions
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
    function lightbox_dispatch(right = true) { EVENTS.events_dispatch(LIGHTBOX, 'lightboxUpdateContent', { currentId: media_CURRENT_ID, right }) } // sends a custom event to the page to request the media change


    function arrows_iter() { for (const ARROW of ARROW_ARROWS) arrow_set(ARROW) }