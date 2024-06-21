/*----------------------------------------------- #||--photographerSection--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS
    import { data_get }     from '../utils/data.js'
    import PhotographerCard from '../templates/photographerCard.js'

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default function photographerSection_init() { photographerSection_iter() }


// #\-CONSTANTES-\

    // --THIS
    const PHOTOGRAPHER_SECTION = document.querySelector('.photographer-section')


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET
    function photographerSection_set() { photographerSection_setHTML(...arguments) }

    function photographerSection_setHTML(photographer) { PHOTOGRAPHER_SECTION.insertAdjacentHTML('beforeend', new PhotographerCard(photographer).photographer_getUserCard()) }

    // --GET

    // --UPDATES

    // --TESTS


//=======@UTILS|

    // --*
    async function photographerSection_iter() { for (const PHOTOGRAPHER of (await data_get())?.photographers ?? []) photographerSection_set(PHOTOGRAPHER) }