// #\-EXPORTS-\

    // --THIS
    export default function photographInfos_init() { photographInfos_set(...arguments) }

    export function photographInfos_update() { likes_update(...arguments) }


// #\-CONSTANTES-\

    // --THIS
    const PHOTOGRAPH_INFOS = document.querySelector('.photograph-infos')


// #\-VARIABLES-\
    
    // --INSIDE
    let likes


// #\-FUNCTIONS-\

    // --SET
    function photographInfos_set()
    {
        photographInfos_setHTML(...arguments)
        likes_set()
    }

    function photographInfos_setHTML(infos = '') { PHOTOGRAPH_INFOS?.insertAdjacentHTML('beforeend', infos) }


    function likes_set() { likes_setVars() }

    function likes_setVars() { likes = PHOTOGRAPH_INFOS?.querySelector('.likes') }

    // --UPDATES
    function likes_update(total = 0) { if (likes instanceof HTMLElement) likes.dataset.likes = total }