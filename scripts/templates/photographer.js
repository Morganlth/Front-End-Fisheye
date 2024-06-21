/*----------------------------------------------- #||--Photographer--|| */


/*-- #|-CLASS-| --*/

class Photographer
{

// #\-STATICS-\

    // --*
    static __photographer_PICTURE_SRC = 'assets/photographers/'


// #\-PRIVATES-\

    // --THIS


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


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*


//=======@LIFE|

    // --SET

    // --GET
    photographer_getPortrait()
    {
        return `
            <img
            class="portrait"
            src="${this.photographer_PICTURE}"
            alt="${this.photographer_NAME}"
            >
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

    // --JS


// #\-EXPORTS-\

    // --THIS
    export default Photographer