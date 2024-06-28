// #\-EXPORTS-\

    // --THIS
    export async function data_get() { return data_DATA ??= await (await fetch('data/photographers.json')).json() }


// #\-VARIABLES-\

    // --THIS
    let data_DATA // CACHE