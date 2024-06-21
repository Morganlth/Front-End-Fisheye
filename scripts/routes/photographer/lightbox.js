/*----------------------------------------------- #||--lightbox--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS
    import EVENTS from '../../contexts/Events.js'

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default function lightbox_init() { lightbox_set() }

    export function lightbox_update(node, id, text)
    {
        let action = ''

        ;[document.documentElement.style.overflowY, action] = id ? ['hidden', 'remove'] : ['auto', 'add']

        LIGHTBOX.classList[action]('hidden')

        media_update(node, id)
        text_update(text)
    }


// #\-CONSTANTES-\

    // --THIS
    const LIGHTBOX = document.getElementById('lightbox')

    // --INSIDE
    const MEDIA = LIGHTBOX.querySelector('.media')

    const TEXT = LIGHTBOX.querySelector('.text')

    const CLOSE = LIGHTBOX.querySelector('.close')
    
    const ARROW_ARROWS = [...LIGHTBOX.querySelectorAll('.arrow')]



// #\-VARIABLES-\

    // --THIS
    let media_CURRENT_ID


// #\-FUNCTIONS-\

    // --SET
    function lightbox_set()
    {
        close_set()
        arrows_iter()
    }


    function close_set() { close_setEvents() }

    function close_setEvents() { CLOSE?.addEventListener('click', close_eClick) }


    function arrow_set() { arrow_setEvents(...arguments) }

    function arrow_setEvents(arrow) { arrow?.addEventListener('click', arrow_eClick.bind(arrow, arrow.classList.contains('right'))) }

    // --GET

    // --UPDATES
    function media_update(node, id)
    {
        MEDIA.firstElementChild?.remove()

        if (id != null && node instanceof HTMLElement) MEDIA.appendChild(node)

        media_CURRENT_ID = id
    }


    function text_update(text = '') { TEXT.textContent = text }

    // --TESTS


    
    function close_eClick() { lightbox_update() }


    function arrow_eClick(right = true) { EVENTS.events_dispatch(LIGHTBOX, 'lightboxArrowClick', { currentId: media_CURRENT_ID, right }) }


//=======@UTILS|

    // --*
    function arrows_iter() { for (const ARROW of ARROW_ARROWS) arrow_set(ARROW) }