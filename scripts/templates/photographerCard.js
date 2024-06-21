/*----------------------------------------------- #||--PhotographerCard--|| */


/*-- #|-CLASS-| --*/

class PhotographerCard extends Photographer
{

// #\-STATICS-\

    // --*


// #\-PRIVATES-\

    // --THIS


// #\-PUBLICS-\

    // --THIS


// #\-CONSTRUCTOR-\

    // --THIS
    constructor (photographer = {}) { super(photographer) }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*


//=======@LIFE|

    // --SET

    // --GET
    photographer_getUserCard()
    {
        const NAME = this.photographer_NAME

        return `
            <article
            class="photographer"
            >
                <a
                href="photographer.html?id=${this.photographer_ID}"
                aria-label="Page de ${NAME}"
                >
                    ${this.photographer_getPortrait()}

                    <h2>${NAME}</h2>
                </a>

                <p>
                    <strong
                    class="locality"
                    >
                        ${this.photographer_CITY}, ${this.photographer_COUNTRY}
                    </strong>

                    <span
                    class="tagline"
                    >
                        ${this.photographer_TAGLINE}
                    </span>

                    <span
                    class="price"
                    >
                        ${this.photographer_PRICE}€/jour
                    </span>
                </p>
            </article>
        `
    }

    // --UPDATES

    // --TESTS

    // --DESTROY


//=======@EVENTS|

    // --*


//=======@UTILS|

    // --*


}


// #\-IMPORTS-\

    // --ENV

    // --SVELTE

    // --LIB
    import Photographer from './photographer.js'

    // --JS


// #\-EXPORTS-\

    // --THIS
    export default PhotographerCard