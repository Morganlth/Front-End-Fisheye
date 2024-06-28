// #\-IMPORTS-\

    // --JS
    import EVENTS from '../../contexts/Events.js'


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
    DROPDOWN = document.getElementById('dropdown')
    ,
    DROPDOWN_EVENTS = { click: dropdown_e$Click }

    const BUTTON = DROPDOWN?.querySelector('button')

    const OPTIONS = DROPDOWN?.querySelector('#options')

    const OPTION_OPTIONS = [...OPTIONS?.querySelectorAll('.option')]


// #\-VARIABLES-\

    // --INSIDE
    let
    dropdown_FOCUSABLE
    ,
    dropdown_FOCUSABLE_INDEX = 0

    let option_SELECTED


// #\-FUNCTIONS-\

    // --SET
    function photographFilter_set()
    {
        dropdown_set()
        button_set()
        option_iter()
    }


    function dropdown_set()
    {
        dropdown_setVars()
        dropdown_setEvents()
    }

    function dropdown_setVars() { dropdown_FOCUSABLE = [BUTTON, ...OPTION_OPTIONS] }

    function dropdown_setEvents()
    {
        EVENTS.events_add(DROPDOWN_EVENTS)

        DROPDOWN?.addEventListener('keydown', dropdown_eKeydown)
    }


    function button_set() { button_setEvents() }

    function button_setEvents() { BUTTON?.addEventListener('click', button_eClick) }


    function option_set(option)
    {
        option_setEvents(option)
        option_updateTabIndex(option)

        if (option.ariaSelected === 'true') option_updateSelected(option)
    }

    function option_setEvents(option)
    {
        option?.addEventListener('click'  , option_eClick  .bind(option))
        option?.addEventListener('keydown', option_eKeydown.bind(option))
    }

    // --GET
    function dropdown_getFocusableTarget(up = false, depth = 3) // retourne la cible suivante en fonction de la direction (haut ou bas)
    {
        if (depth < 0) return

        if   (up) { if (--dropdown_FOCUSABLE_INDEX <  0                        ) dropdown_FOCUSABLE_INDEX = dropdown_FOCUSABLE.length - 1 }
        else        if (++dropdown_FOCUSABLE_INDEX >= dropdown_FOCUSABLE.length) dropdown_FOCUSABLE_INDEX = 0

        const TARGET = dropdown_FOCUSABLE[dropdown_FOCUSABLE_INDEX]
    
        return (TARGET === option_SELECTED) ? dropdown_getFocusableTarget(up, --depth) : TARGET
    }


    function button_getState() { return BUTTON.ariaPressed === 'true' } // retourne l'état du button (true = ouvert / false = fermé)

    // --UPDATES
    function dropdown_update(pressed) // change l'état de l'input responsable de l'ouverture / fermeture
    {
        dropdown_FOCUSABLE_INDEX = 0

        button_update(pressed)
        option_updateAllTabIndex()
    }


    function button_update(pressed) { BUTTON.ariaPressed = BUTTON.ariaExpanded = pressed ?? !button_getState() }


    function options_updateActiveDescendant(id) { if (id) OPTIONS.setAttribute('aria-activedescendant', id) }


    function option_updateSelected(option)
    {
        if (option_SELECTED) option_SELECTED.ariaSelected = false

        option.ariaSelected = true

        option_SELECTED = option

        PHOTOGRAPH_FILTER_STORE.set(option.dataset.filter)
    }

    function option_updateTabIndex(option) { option.tabIndex = !button_getState() || option === option_SELECTED ? -1 : 0 } // modifie l'attribut tabindex sur l'option

    function option_updateAllTabIndex() { for (const OPTION of OPTION_OPTIONS) option_updateTabIndex(OPTION) } // modifie l'attribut tabindex sur chaque option


//=======@EVENTS|

    // --*
    async function dropdown_e$Click({target}) // ferme dropdown si un click se fait sur un élément extérieur
    {
        if (!button_getState()) return
    
        while (true)
        {
            if (target === document.body || target === document.documentElement || target === document) return dropdown_update(false)
            if (target === DROPDOWN                                                                   ) break

            target = target.parentNode
        }
    }

    function dropdown_eKeydown(e) // capte toutes les pressions du clavier, si dropdown est ouvert alors on vérouille le focus sur le controller et les options
    {
        const PRESSED = button_getState()

        let up = false

        switch (e.key)
        {
            case    'ArrowUp'  : up = true
            case    'ArrowDown':
            case    'Tab'      : return PRESSED ? (e.preventDefault(), dropdown_getFocusableTarget(up)?.focus()) : void 0
            default            : break
        }
    }


    function button_eClick() { dropdown_update() }


    function option_eClick(e) // capte le changement de filtre
    {
        e.preventDefault()
        e.stopPropagation()

        options_updateActiveDescendant(this.id)
        option_updateSelected(this)
    }

    function option_eKeydown(e) // change l'état d'une option (ceci entrainera l'appel à option_eClick)
    {
        if (e.key === 'Enter' || e.key === ' ')
        {
            e.preventDefault()
            e.stopPropagation()
    
            EVENTS.events_dispatch(this, 'click')

            option_updateAllTabIndex()

            dropdown_FOCUSABLE[dropdown_FOCUSABLE_INDEX = 0]?.focus()
        }
    }


//=======@UTILS|

    // --*
    function option_iter() { for (const OPTION of OPTION_OPTIONS) option_set(OPTION) }