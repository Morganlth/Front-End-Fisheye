/*
    events management
*/


/*-- #|-CLASS-| --*/

class Events
{

// #\-PRIVATES-\

    // --THIS
    #events_EVENTS = ['click', 'keydown']

    #events_MANAGERS = new Map()


// #\-CONSTRUCTOR-\

    // --THIS
    constructor () { this.#events_set() }


//=======@LIFE|

    // --SET
    #events_set()
    {
        for (const EVENT of this.#events_EVENTS)
        {
            this.#events_setVars(EVENT)
            this.#events_setEvents(EVENT)
        }
    }

    #events_setVars(event) { this.#events_MANAGERS.set(event, new Set()) }

    #events_setEvents(event) { document.addEventListener(event, this.#events_call.bind(this.#events_MANAGERS.get(event))) }

    // --TESTS
    #events_testArgs(events) { return events instanceof Object }

    #events_testStringEvent(event = '') { return this.#events_EVENTS.includes(event) }

    #events_testCallback(callback) { return callback instanceof Function }


//=======@UTILS|

    // --*
    async #events_call() { for (const CALLBACK of this) CALLBACK(...arguments) } // this === Array

    events_add(events = {}, target)
    {
        if (!this.#events_testArgs(events)) return

        for (const EVENT in events)
        {
            if (!target && !this.#events_testStringEvent(EVENT)) continue
            
            const CALLBACK = events[EVENT]
            
            if (!this.#events_testCallback(CALLBACK)) continue

            if (target)
            {
                target.addEventListener(EVENT, CALLBACK)

                continue
            }

            if (this.#events_MANAGERS.has(EVENT))
            {
                const CALLBACKS = this.#events_MANAGERS.get(EVENT)
    
                CALLBACKS.add(CALLBACK)
            }
            else CALLBACK(SCREEN)
        }
    }

    events_remove(events = {}, target)
    {
        if (!this.#events_testArgs(events)) return

        for (const EVENT in events)
        {
            if (!target && !this.#events_testStringEvent(EVENT)) continue

            const CALLBACK = events[EVENT]
            
            if (!this.#events_testCallback(CALLBACK)) continue

            if   (target) target.removeEventListener(EVENT, CALLBACK)
            else          this.#events_MANAGERS.get(EVENT)?.delete(CALLBACK)
        }
    }

    events_dispatch(target, name = '', detail = {})
    {
        if (target instanceof HTMLElement)
        {
            const EVENT = new CustomEvent(name, { bubbles: true, detail })

            target.dispatchEvent(EVENT)
        }
    }


}


// #\-EXPORTS-\

    // --THIS
    export default new Events()