/*----------------------------------------------- #||--data--|| */


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
    export async function data_get() { return data_DATA ??= await (await fetch('data/photographers.json')).json() }


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS
    let data_DATA // CACHE


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES

    // --TESTS


//=======@UTILS|

    // --*