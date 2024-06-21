/*----------------------------------------------- #||--photographHeader--|| */


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
    export default function photographHeader_init() { photographHeader_set(...arguments) }


// #\-CONSTANTES-\

    // --THIS
    const PHOTOGRAPH_HEADER = document.querySelector('.photograph-header')


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET
    function photographHeader_set() { photographHeader_setHTML(...arguments) }

    function photographHeader_setHTML(profil = '', portrait = '')
    {
        PHOTOGRAPH_HEADER?.insertAdjacentHTML('afterbegin', profil  )
        PHOTOGRAPH_HEADER?.insertAdjacentHTML('beforeend' , portrait)
    }

    // --GET

    // --UPDATES

    // --TESTS


//=======@UTILS|

    // --*