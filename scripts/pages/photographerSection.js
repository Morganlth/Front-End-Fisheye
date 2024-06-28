// #\-IMPORTS-\

    // --JS
    import { data_get }     from '../utils/data.js'
    import PhotographerCard from '../templates/photographerCard.js'


// #\-EXPORTS-\

    // --THIS
    export default function photographerSection_init() { photographerSection_iter() }


// #\-CONSTANTES-\

    // --THIS
    const PHOTOGRAPHER_SECTION = document.querySelector('.photographer-section')


// #\-FUNCTIONS-\

    // --SET
    function photographerSection_set() { photographerSection_setHTML(...arguments) }

    function photographerSection_setHTML(photographer) { PHOTOGRAPHER_SECTION.insertAdjacentHTML('beforeend', new PhotographerCard(photographer).photographer_getUserCard()) } // create a new instance (for each photographer) of "PhotographerCard" and retrieve the HTML for each card to add them to the "PHOTOGRAPHER_SECTION" container


//=======@UTILS|

    // --*
    async function photographerSection_iter() { for (const PHOTOGRAPHER of (await data_get())?.photographers ?? []) photographerSection_set(PHOTOGRAPHER) } // retrieves all photographers from the .json file, and defines each photographer