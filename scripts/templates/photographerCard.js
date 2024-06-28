/*
    "PhotographerCard" adds a method for obtaining the HTML code of a photographer's card (see index.html)
*/


/*-- #|-CLASS-| --*/

class PhotographerCard extends Photographer
{

// #\-CONSTRUCTOR-\

    // --THIS
    constructor (photographer = {}) { super(photographer) }


//=======@LIFE|

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
}


// #\-IMPORTS-\

    // --JS
    import Photographer from './photographer.js'


// #\-EXPORTS-\

    // --THIS
    export default PhotographerCard