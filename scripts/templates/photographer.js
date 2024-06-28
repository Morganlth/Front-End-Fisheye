
/*-- #|-CLASS-| --*/

class Photographer
{

// #\-STATICS-\

    // --*
    static __photographer_PICTURE_SRC = 'assets/photographers/'


// #\-PUBLICS-\

    // --THIS
    photographer_ID      = 0
    photographer_NAME    = ''
    photographer_CITY    = ''
    photographer_COUNTRY = ''
    photographer_TAGLINE = ''
    photographer_PRICE   = 0
    photographer_PICTURE = ''


// #\-CONSTRUCTOR-\

    // --THIS
    constructor ({id = 0, name = '', city = '', country = '', tagline = '', price = 0, portrait = ''})
    {
        this.photographer_ID      = id
        this.photographer_NAME    = name
        this.photographer_CITY    = city
        this.photographer_COUNTRY = country
        this.photographer_TAGLINE = tagline
        this.photographer_PRICE   = price
        this.photographer_PICTURE = Photographer.__photographer_PICTURE_SRC + portrait
    }

//=======@LIFE|

    // --GET
    photographer_getPortrait()
    {
        return `
            <img
            class="portrait"
            src="${this.photographer_PICTURE}"
            alt="Portrait de ${this.photographer_NAME ?? ''}"
            >
        `
    }
}

// #\-EXPORTS-\

    // --THIS
    export default Photographer