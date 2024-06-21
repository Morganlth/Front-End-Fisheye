/*----------------------------------------------- #||--modal--|| */


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
    export default function modal_init() { modal_set() }


// #\-CONSTANTES-\

    // --OUTSIDE
    const OPEN = document.querySelector('.open_modal')

    // --THIS
    const MODAL = document.getElementById('contact_modal')
    
    // --INSIDE
    const CLOSE = MODAL.querySelector('.close')


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET
    function modal_set()
    {
        open_set()
        close_set()
    }


    function open_set() { open_setEvents() }

    function open_setEvents() { OPEN?.addEventListener('click', open_eClick) }


    function close_set() { close_setEvents() }

    function close_setEvents() { CLOSE?.addEventListener('click', close_eClick) }

    // --GET

    // --UPDATES
    function modal_update(hidden = true)
    {
        let action = ''

        ;[document.documentElement.style.overflowY, action] = hidden ? ['auto', 'add'] : ['hidden', 'remove']

        MODAL.classList[action]('hidden')
    }

    // --TESTS


//=======@EVENTS|

    // --*
    function open_eClick() { modal_update(false) }


    function close_eClick() { modal_update(true) }


//=======@UTILS|

    // --*