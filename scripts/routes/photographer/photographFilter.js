/*----------------------------------------------- #||--photographFilter--|| */


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
    export default function photographFilter_init() { photographFilter_set() }

    export function photographFilter_subscribeToStore(callback) { PHOTOGRAPH_FILTER_STORE.subscribe(callback) }


// #\-CONSTANTES-\

    // --THIS
    const PHOTOGRAPH_FILTER_STORE =
    {
        value    : void '',
        callbacks: new Set(),
        set      : function (filter)
        {
            this.value = filter

            for (const CALLBACK of this.callbacks) CALLBACK(filter)
        },
        subscribe: function (callback)
        {
            if (callback instanceof Function)
            {
                this.callbacks.add(callback)

                callback(this.value)
            }
        },
    }

    // --INDIDE
    const
    DROPDOWN = document.querySelector('.dropdown')
    ,
    DROPDOWN_EVENTS =
    {
        click  : dropdown_e$Click,
        keydown: dropdown_e$Keydown
    }

    const CONTROLLER = DROPDOWN?.querySelector('#controller')

    const STATE = DROPDOWN?.querySelector('#state')

    const INPUT_INPUTS = [...DROPDOWN?.querySelectorAll('input[type="radio"]')]

    const OPTION_OPTIONS = [...DROPDOWN?.querySelectorAll('#options .option')]


// #\-VARIABLES-\

    // --INSIDE
    let
    dropdown_FOCUSABLE
    ,
    dropdown_FOCUSABLE_INDEX = 0


// #\-FUNCTIONS-\

    // --SET
    function photographFilter_set()
    {
        dropdown_set()
        controller_set()
        input_iter()
        option_iter()
    }


    function dropdown_set()
    {
        dropdown_setVars()
        dropdown_setEvents()
    }

    function dropdown_setVars() { dropdown_FOCUSABLE = [CONTROLLER, ...OPTION_OPTIONS] }

    function dropdown_setEvents() { EVENTS.events_add(DROPDOWN_EVENTS) }


    function controller_set() { controller_setEvents() }

    function controller_setEvents() { CONTROLLER?.addEventListener('keydown', controller_eKeydown) }


    function input_set() { input_setEvents(...arguments) }

    function input_setEvents(input) { input?.addEventListener('change', input_eChange.bind(input.dataset.filter)) }


    function option_set(option)
    {
        const CONTROL = option.control

        option_setEvents(option)
        option_updateTabIndex(option)

        if (CONTROL?.checked) PHOTOGRAPH_FILTER_STORE.set(CONTROL.dataset.filter)
    }

    function option_setEvents(option) { option?.addEventListener('keydown', option_eKeydown.bind(option)) }

    // --GET
    function dropdown_getState() { return !STATE.checked } // retourne l'état de dropdown (true = ouvert / false = fermé)

    function dropdown_getFocusableTarget(up = false, depth = 3) // retourne la cible suivante en fonction de la direction (haut ou bas)
    {
        if (depth < 0) return

        if   (up) { if (--dropdown_FOCUSABLE_INDEX <  0                        ) dropdown_FOCUSABLE_INDEX = dropdown_FOCUSABLE.length - 1 }
        else        if (++dropdown_FOCUSABLE_INDEX >= dropdown_FOCUSABLE.length) dropdown_FOCUSABLE_INDEX = 0

        const TARGET = dropdown_FOCUSABLE[dropdown_FOCUSABLE_INDEX]
    
        return (TARGET?.control?.checked ?? true) ? dropdown_getFocusableTarget(up, --depth) : TARGET
    }

    // --UPDATES
    function state_update() { STATE.checked = !STATE.checked } // change l'état de l'input responsable de l'ouverture / fermeture


    function option_updateTabIndex(option) { option.tabIndex = !dropdown_getState() || option.control?.checked ? -1 : 0 } // modifie l'attribut tabindex sur l'option

    function option_updateAllTabIndex() { for (const OPTION of OPTION_OPTIONS) option_updateTabIndex(OPTION) } // modifie l'attribut tabindex sur chaque option

    // --TESTS


//=======@EVENTS|

    // --*
    async function dropdown_e$Click({target}) // ferme dropdown si un click se fait sur un élément extérieur
    {
        while (dropdown_getState())
        {
            if (target === document.body || target === document.documentElement || target === document) return state_update()
            if (target === CONTROLLER    || target === DROPDOWN                                       ) break

            target = target.parentNode
        }
    }

    function dropdown_e$Keydown(e) // capte toutes les pressions du clavier, si dropdown est ouvert alors on vérouille le focus sur le controller et les options
    {
        const KEY = e.key

        let up = false

        if (dropdown_getState() && (KEY === 'Tab' || (up = KEY === 'ArrowUp') || KEY === 'ArrowDown'))
        {
            e.preventDefault()

            dropdown_getFocusableTarget(up)?.focus()
        }
    }


    function controller_eKeydown({key}) // change l'état de dropdown lors d'une action 'Entrée' sur le controller
    {
        if (key === 'Enter' && STATE instanceof HTMLInputElement)
        {
            dropdown_FOCUSABLE_INDEX = 0

            state_update()
            option_updateAllTabIndex()
        }
    }


    function input_eChange() // capte le changement de filtre
    {
        switch (this)
        {
            case    'likes':
            case    'date' :
            case    'title': return PHOTOGRAPH_FILTER_STORE.set(this)
            default        : return
        }
    }

    
    function option_eKeydown(e) // change l'état d'une option (ceci entrainera l'appel à input_eChange)
    {
        const CONTROL = this.control

        if (e.key === 'Enter' && CONTROL instanceof HTMLInputElement)
        {
            CONTROL.checked = !CONTROL.checked

            EVENTS.events_dispatch(CONTROL, 'change')

            option_updateAllTabIndex()

            dropdown_FOCUSABLE[dropdown_FOCUSABLE_INDEX = 0]?.focus()
        }
    }


//=======@UTILS|

    // --*
    function input_iter() { for (const INPUT of INPUT_INPUTS) input_set(INPUT) }

    
    function option_iter() { for (const OPTION of OPTION_OPTIONS) option_set(OPTION) }