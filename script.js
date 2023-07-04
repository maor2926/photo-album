



let images = document.querySelector(`.search-bar`).querySelectorAll(`img`);

let imageContainers = document.querySelectorAll(`.img-div`);

let pars = document.querySelectorAll(`.descripsion-par`);

let h3s = document.querySelectorAll(`.img-title`);

const button = document.querySelector(`.submit`);

const input = document.querySelector(`.search-input`);

const loading = document.querySelector(`.loading`);

const bigImgContainer = document.querySelector(`.big-img-container`);

const bigImg = document.querySelector(`.big-img`);

const h1 = document.querySelector(`.no-search`);

const downloadBtns = document.querySelectorAll(`.download-btn`);

const viewBtns = document.querySelectorAll(`.view-btn`);

const main = document.querySelector(`.search-bar`);

const addContainer = document.querySelector(`.plus-div`);

const plus = document.querySelector(`.plus`);

const insertForm = document.querySelector(`.insert-form`);

const cancelAddFormBtn = document.querySelector(`.cancel-btn`);

const addFormBtm = document.querySelector(`.add-btn`);

const urlInpud = document.querySelector(`.URL`);

const titleInpud = document.querySelector(`.title`);

const descriptionInput = document.querySelector(`.description`);

let imgObjectsArray = []

if (JSON.parse(localStorage.getItem(`galerry1`))) {
    imgObjectsArray = JSON.parse(localStorage.getItem(`galerry1`))
}


//serch bar

button.addEventListener(`click`, function (ev) {
    ev.preventDefault();
    if (input.value && input.value.trim()) {
        h1.classList.add(`display-off`)
        imageContainers.forEach(function (img) {
            img.classList.add(`display-off`)
            img.style.order = `15`
        })

        const inptWords = input.value.toLowerCase().split(` `)

        inptWords.forEach(function (inptWord) {
            pars.forEach(function (par) {
                const parWords = par.textContent.toLowerCase().replace(`,`, ``).split(` `)
                if (parWords.includes(inptWord)) {
                    par.parentElement.parentElement.classList.remove(`display-off`)
                    par.parentElement.parentElement.style.order = `10`
                }
            })
        })


        inptWords.forEach(function (inptWord) {
            h3s.forEach(function (h3) {
                const h3Words = h3.textContent.toLowerCase().split(` `)
                if (h3Words.includes(inptWord)) {
                    h3.parentElement.classList.remove(`display-off`);
                    h3.parentElement.style.order = `5`
                }
            })
        })


        h3s.forEach(function (h3) {
            if (h3.textContent.toLowerCase().includes(input.value.toLowerCase()))
                h3.parentElement.style.order = `1`
        })
        const imagesArray = [...document.querySelectorAll(`.img-div`)]
        let isimages = imagesArray.every(img => img.classList.contains(`display-off`))
        if (isimages) { h1.classList.remove(`display-off`) }
    }
})

plus.addEventListener(`click`, function () {
    insertForm.classList.remove(`display-off`)
})


class Image {

    constructor(imgSrc, title, description) {
        this.src = imgSrc;
        this.title = title;
        this.description = description
        this.container = document.createElement('div')
            ;
    }

    appendImgDiv() {
        main.insertBefore(this.container, addContainer)
        this.container.classList.add(`img-div`)
        return this
    }

    renderImage() {
        this.container.insertAdjacentHTML(`afterbegin`,
            `<h3 class="img-title">${this.title}</h3>
            <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <img src="${this.src}" alt="${this.title}">
            <div class="description">
                <p class="descripsion-par">${this.description}</p>
            </div>
            <div class="buttons">
                    <button class="button download-btn">
                        <div class="ani-con">
                            <div class="ani-div"></div>
                        </div>
                    </button>
                <button class="button view-btn">
                    <div class="ani-con">
                        <div class="ani-div"></div>
                    </div>
                    <p>view</p>
                </button>
            </div>`
        )
        return this
    }



    loadImages() {
        const img = this.container.querySelector(`img`)

        img.addEventListener(`error`, function (ev) {
            console.log(ev)
            this._deleteImage();
            imgObjectsArray = imgObjectsArray.filter((imgObject) => imgObject.src !== this.src)
            localStorage.clear()
            localStorage.setItem(`galerry1`, JSON.stringify(imgObjectsArray))

        }.bind(this))
        img.addEventListener(`load`, function () {
            this.style.opacity = `1`;
            this.parentElement.querySelector(`.lds-roller`).style.display = `none`
        })
        if (img.complete) {
            img.style.opacity = `1`;
            img.parentElement.querySelector(`.lds-roller`).style.display = `none`;

        }

        return this
    }

    addListeners() {
        this.container.querySelector(`img`).addEventListener(`click`, function () {
            bigImg.src = this.src;
            bigImgContainer.style.display = `flex`;
        })

        this.container.querySelector(`.view-btn`).addEventListener(`click`, function () {
            bigImg.src = this.closest(`.img-div`).querySelector(`img`).src;
            bigImgContainer.style.display = `flex`;
        })
        return this
    }

    createDownloadLink = async function () {
        try {
            const response = await fetch(this.src);


            const blobImage = await response.blob();

            const href = URL.createObjectURL(blobImage);

            const anchorElement = document.createElement('a');
            anchorElement.href = href;
            anchorElement.download = this.title;

            this.container.querySelector(`.download-btn`).appendChild(anchorElement);

            anchorElement.textContent = `download`
        } catch (err) {
            // console.error(err)
            const parElement = document.createElement('p');
            parElement.textContent = `download`
            this.container.querySelector(`.download-btn`).appendChild(parElement);
            parElement.classList.add(`opacity`);
        }
    }

    init() {
        this.appendImgDiv().renderImage().addListeners().loadImages().createDownloadLink()

        Image.select()

        return imgObjectsArray
    }

    _deleteImage() {
        this.container.remove()
    }

    static getImageData() {
        if (!JSON.parse(localStorage.getItem(`galerry1`))) return
        const imageData = JSON.parse(localStorage.getItem(`galerry1`))
        console.log(imageData)
        imageData.forEach((imgObject) => {
            new Image(
                imgObject.src, imgObject.title, imgObject.description
            ).init()
        })

    }

    static select() {
        images = document.querySelector(`.search-bar`).querySelectorAll(`img`);
        imageContainers = document.querySelectorAll(`.img-div`);
        h3s = document.querySelectorAll(`h3`);
        pars = document.querySelectorAll(`p`);
    }


}


Image.getImageData()


bigImgContainer.addEventListener(`click`, function (ev) {
    if (ev.target === bigImg) return;
    bigImgContainer.style.display = `none`;
})

cancelAddFormBtn.addEventListener(`click`, function (ev) {
    ev.preventDefault()
    this.closest(`.insert-form`).classList.add(`display-off`)
    urlInpud.value = ``;
    titleInpud.value = ``;
    descriptionInput.value = ``;
})

addFormBtm.addEventListener(`click`, function (ev) {
    ev.preventDefault()
    const newImage = new Image(
        urlInpud.value,
        titleInpud.value,
        descriptionInput.value
    )
    urlInpud.value = ``;
    titleInpud.value = ``;
    descriptionInput.value = ``;
    imgObjectsArray.push(newImage);
    this.closest(`.insert-form`).classList.add(`display-off`)
    localStorage.clear()
    localStorage.setItem(`galerry1`, JSON.stringify(imgObjectsArray))
    newImage.init()
})