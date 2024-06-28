// #\-IMPORTS-\

    // --JS
    import EVENTS from '../../contexts/Events.js'


// #\-EXPORTS-\

    // --THIS
    export default function modal_init() { modal_set(...arguments) }


// #\-CONSTANTES-\

    // --OUTSIDE
    const OPEN = document.querySelector('.open_modal')

    // --THIS
    const
    MODAL = document.getElementById('contact-modal')
    ,
    MODAL_EVENTS = { keydown: modal_e$Keydown }
    
    // --INSIDE
    const TITLE = MODAL?.querySelector('#contact-title')

    const CLOSE = MODAL?.querySelector('.close')


// #\-VARIABLES-\

    // --THIS
    let
    modal_EVENTS_OK = false
    ,
    modal_FOCUSABLE = [CLOSE, ...MODAL.querySelectorAll('input, textarea, button:not(.close)')]
    ,
    modal_FOCUSABLE_INDEX = 0


// #\-FUNCTIONS-\

    // --SET
    function modal_set()
    {
        open_set()
        title_set(...arguments)
        close_set()
    }

    function modal_setEvents()
    {
        if (modal_EVENTS_OK) return

        EVENTS.events_add(MODAL_EVENTS)

        modal_EVENTS_OK = true
    }


    function open_set() { open_setEvents() }

    function open_setEvents() { OPEN?.addEventListener('click', open_eClick) }


    function title_set() { title_setElement(...arguments) }

    function title_setElement(name = '') { TITLE.textContent += ' ' + name } // set title TextContent


    function close_set() { close_setEvents() }

    function close_setEvents() { CLOSE?.addEventListener('click', close_eClick) }

    // --GET
    function modal_getFocusableTarget() // returns the following target
    {
        if (++modal_FOCUSABLE_INDEX >= modal_FOCUSABLE.length) modal_FOCUSABLE_INDEX = 0

        return modal_FOCUSABLE[modal_FOCUSABLE_INDEX]
    }

    // --UPDATES
    function modal_update(hidden = true) // open / close the modal
    {
        let
        action = '',
        modal_updateEvents

        ;[document.documentElement.style.overflowY, action, modal_updateEvents] = hidden ? ['auto', 'add', modal_destroyEvents] : ['hidden', 'remove', modal_setEvents]

        MODAL.classList[action]('hidden')

        modal_updateEvents()
    }

    // --DESTROY
    function modal_destroyEvents()
    {
        EVENTS.events_remove(MODAL_EVENTS)

        modal_EVENTS_OK = false
    }


//=======@EVENTS|

    // --*
    function modal_e$Keydown(e) // switches focus to next element
    {
        if (e.key === 'Tab')
        {
            e.preventDefault()

            modal_getFocusableTarget()?.focus()
        }
    }


    function open_eClick() { modal_update(false) }


    function close_eClick() { modal_update(true) }