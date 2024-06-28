/*
    "PhotographerPage" adds media management to "Photographer"
    +
    various methods for generating the different elements of a photographer's page
*/


/*-- #|-CLASS-| --*/

class PhotographerPage extends Photographer
{

// #\-STATICS-\

    // --*
    #photographer_MEDIA = []


// #\-CONSTRUCTOR-\

    // --THIS
    constructor (photographerPageId = -1, {photographers = [], media = []})
    {
        super(photographers?.find(({id}) => id === photographerPageId) ?? {})

        this.#photographer_MEDIA = media?.reduce((media, {photographerId, date, ...rest}) =>
        {
            if (photographerId === photographerPageId) media.push({ date: +new Date(date), ...rest })

            return media
        },
        []) ?? []
    }


//=======@GETTER|

    // --*
    get photographer_MEDIA() { return this.#photographer_MEDIA }


//=======@LIFE|

    // --GET
    static __photographer_getHeart()
    {
        return `
            <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375
                0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z"
                fill="currentColor"
                />
            </svg>
        `
    }

    photographer_getProfile()
    {
        return `
            <section
            class="profile"
            >
                <h1>${this.photographer_NAME}</h1>

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
                </p>
            </section>
        `
    }

    photographer_getGallery()
    {
        return this.#photographer_MEDIA.reduce((HTML, {id, likes, title, image, video}) => HTML +=
        `
            <article
            class="media"
            data-media-id="${id}"
            >
                <div
                class="container"
                >
                    <button
                    class="button"
                    aria-label="View '${title}'"
                    >
                        ${
                            image ?
                            `
                                <img
                                src="assets/images/media/${image}"
                                alt="${title}"
                                >
                            `
                            : video ?
                            `
                                <video
                                preload="metadata"
                                loop="true"
                                muted="true"
                                >
                                    <source
                                    src="assets/images/media/${video}#t=0.1"
                                    type="video/mp4"
                                    >
                                </video>
                            `
                            : ''
                        }
                    </button>

                    <p>
                        <span
                        class="text"
                        >
                            ${title}
                        </span>

                        <button
                        class="likes"
                        aria-label="likes"
                        data-liked="false"
                        data-likes="${likes}"
                        >
                            ${PhotographerPage.__photographer_getHeart()}
                        </button>
                    </p>
                </div>
            </article>
        `,
        '')
    }

    photographer_getInfos()
    {
        return `
            <div
            class="infos"
            >
                <div
                class="likes"
                data-likes="${this.photographer_getTotalLikes()}"
                >
                    &nbsp;${PhotographerPage.__photographer_getHeart()}
                </div>

                <div
                class="prices"
                >
                    ${this.photographer_PRICE}€ / jour
                </div>
            </div>
        `
    }

    photographer_getTotalLikes() { return this.#photographer_MEDIA.reduce((accumulator, {likes}) => accumulator += likes, 0) }

    // --UPDATES
    photographer_updateMediaLikes(mediaId, likes)
    {
        if (isNaN(mediaId)) return

        const MEDIA = this.#photographer_MEDIA.find(({id}) => id === mediaId)

        if (MEDIA) MEDIA.likes = likes
    }


//=======@UTILS|

    // --*
    photographer_sortMedia(sortFunc = (a, b) => a - b) { this.#photographer_MEDIA = this.#photographer_MEDIA.sort(sortFunc) }


}


// #\-IMPORTS-\

    // --JS
    import Photographer from './photographer.js'


// #\-EXPORTS-\

    // --THIS
    export default PhotographerPage