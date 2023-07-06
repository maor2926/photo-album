
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

const currentGallery = document.querySelector(`.check-gallery-number`).textContent

const galleryInput = document.querySelector(`.gallery-input`);

const addGalleryDiv = document.querySelector(`.add-gallery-div`);

const addGalleryBtn = document.querySelector(`.add-gallery-button`);

const addGallery = document.querySelector(`.add-gallery`);

const gallery1Btn = document.querySelector(`.gallery1`);

const gallery2Btn = document.querySelector(`.gallery2`);

const gallery3Btn = document.querySelector(`.gallery3`);

const currentGalleryBtn = document.querySelector(`.current-gallery-btn`);

const renameAndDeleteContainer = document.querySelector(`.rename-and-delete-container`);

const reNameGallery1 = document.querySelector(`.rename-gallery1`);

const deletePar = document.querySelector(`.delete-p`);

const closeDeleteBtn = document.querySelector(`.close-rename-btn`);




let imgObjectsArray = []

//getting gallery image info

if (JSON.parse(localStorage.getItem(currentGallery))) {
    imgObjectsArray = JSON.parse(localStorage.getItem(currentGallery))
}

//////////////////////////////////////////////////////////
/////////////// getting gallery name info ////////////////
//////////////////////////////////////////////////////////

if (localStorage.getItem(currentGallery + `Name`)) {
    currentGalleryBtn.textContent = localStorage.getItem(currentGallery + `Name`)
}

if (gallery1Btn) {
    gallery1Btn.classList.remove(`display-off`)
    if (localStorage.getItem("gallery1Name")) {
        gallery1Btn.textContent = localStorage.getItem("gallery1Name")
    }
}

if (localStorage.getItem("gallery2Name") && gallery2Btn) {
    gallery2Btn.classList.remove(`display-off`)
    gallery2Btn.textContent = localStorage.getItem("gallery2Name")
}

if (localStorage.getItem(`gallery3Name`) && gallery3Btn) {
    addGallery.classList.add(`display-off`)
    gallery3Btn.classList.remove(`display-off`)
    gallery3Btn.textContent = localStorage.getItem(`gallery3Name`)
}

//////////////////////////////////////////////////////////
////////////////////// serch bar /////////////////////////
//////////////////////////////////////////////////////////

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





//////////////////////////////////////////////////////////
////////////////// The Image Class ///////////////////////
//////////////////////////////////////////////////////////



class Image {

    constructor(imgSrc, title, description) {
        this.src = imgSrc;
        this.title = title;
        this.description = description
        this.container = document.createElement('div')
            ;
    }

    //inserting the new div element into the dom

    appendImgDiv() {
        main.insertBefore(this.container, addContainer)
        this.container.classList.add(`img-div`)
        return this
    }

    //inserting HTML into the new element with the data from the user

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

    //waiting for the load/error event the image

    loadImages() {
        const img = this.container.querySelector(`img`)


        //incase of an error delete the new image div and update the local storage
        img.addEventListener(`error`, function (ev) {
            console.log(ev)
            this._deleteImage();
            imgObjectsArray = imgObjectsArray.filter((imgObject) => imgObject.src !== this.src)
            localStorage.removeItem()
            localStorage.setItem(currentGallery, JSON.stringify(imgObjectsArray))

        }.bind(this))

        //incase of a load event remove animation and display image
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

    //handling click event on buttons
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

    // as in sounds... create download link - asynchrounosly         and andling errors
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
            const parElement = document.createElement('p');
            parElement.textContent = `download`
            this.container.querySelector(`.download-btn`).appendChild(parElement);
            parElement.classList.add(`opacity`);
        }
    }

    //calling all the function nessecery, selecting again, to render the new data --- updating the local storage
    init() {
        this.appendImgDiv().renderImage().addListeners().loadImages().createDownloadLink()

        Image.select()
    }

    //if you cant understand this then maybe stop reading
    _deleteImage() {
        this.container.remove()
    }

    //getting image data from local storage and rendering it

    static getImageData() {
        if (!JSON.parse(localStorage.getItem(currentGallery))) return
        const imageData = JSON.parse(localStorage.getItem(currentGallery))
        console.log(imageData)
        imageData.forEach((imgObject) => {
            new Image(
                imgObject.src, imgObject.title, imgObject.description
            ).init()
        })

    }

    //re-selecting, to select the new elements children
    static select() {
        images = document.querySelector(`.search-bar`).querySelectorAll(`img`);
        imageContainers = document.querySelectorAll(`.img-div`);
        h3s = document.querySelectorAll(`h3`);
        pars = document.querySelectorAll(`p`);
    }

}

Image.getImageData()

//////////////////////////////////////////////////////////
///////////////////// add  image /////////////////////////
//////////////////////////////////////////////////////////

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
    localStorage.removeItem(`currentGallery`)
    localStorage.setItem(currentGallery, JSON.stringify(imgObjectsArray))
    newImage.init()
})

//////////////////////////////////////////////////////////
///////////////////// add  gallery ///////////////////////
//////////////////////////////////////////////////////////

addGallery.addEventListener(`click`, function () {
    addGalleryBtn.classList.remove(`display-off`)
    galleryInput.classList.remove(`display-off`)
    addGalleryDiv.classList.remove(`display-off`)
    galleryInput.focus()
    addGallery.classList.add(`display-off`)
})

addGalleryBtn.addEventListener(`click`, function () {
    addGallery.classList.remove(`display-off`)
    if (localStorage.getItem("gallery2Name")) {
        localStorage.setItem("gallery3Name", galleryInput.value);
        localStorage.setItem(`gallery3Name`, galleryInput.value)
        window.location.href = "./gallery3.html";
    } else {
        localStorage.setItem("gallery2Name", galleryInput.value);
        window.location.href = "./gallery2.html";
    }
})



//////////////////////////////////////////////////////////
///////// rename and delete gallery animation ////////////
//////////////////////////////////////////////////////////
let isReNameGallery1Open = false

let isCurretReNameBtnOpen = false

currentGalleryBtn.addEventListener(`click`, function () {
    if (reNameGallery1) {
        if (!isReNameGallery1Open) {
            reNameGallery1.style.animationName = `open-rename-gal1`
            isReNameGallery1Open = true
        } else {
            reNameGallery1.style.animationName = `close-rename-gal1`
            isReNameGallery1Open = false
        }
    } else {
        if (!isCurretReNameBtnOpen) {
            renameAndDeleteContainer.style.animationName = `open-rename`
            isCurretReNameBtnOpen = true
        } else {
            renameAndDeleteContainer.style.animationName = `close-rename`
            isCurretReNameBtnOpen = false
        }
    }
})

if (deletePar) {
    deletePar.addEventListener(`click`, function () {
        renameAndDeleteContainer.style.animationName = `open-delete`
    })
}

closeDeleteBtn.addEventListener(`click`, function () {
    renameAndDeleteContainer.style.animationName = `close-delete`
})