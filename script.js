
const pars = document.querySelectorAll(`p`);

const h3s = document.querySelectorAll(`h3`);

const button = document.querySelector(`button`);

const input = document.querySelector(`input`);

const imageContainers = document.querySelectorAll(`.img-div`);

const images = document.querySelector(`.search-bar`).querySelectorAll(`img`);

const loading = document.querySelector(`.loading`);

const bigImgContainer = document.querySelector(`.big-img-container`);

const bigImg = document.querySelector(`.big-img`);

const h1 = document.querySelector(`.no-search`);

const downloadBtns = document.querySelectorAll(`.download-btn`);

const viewBtns = document.querySelectorAll(`.view-btn`);



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

//loading animation

images.forEach(img => {
    img.addEventListener(`load`, function () {
        this.style.opacity = `1`;
        this.parentElement.querySelector(`.lds-roller`).style.display = `none`
    })
})

images.forEach((img) => {
    if (img.complete) {
        img.style.opacity = `1`;
        img.parentElement.querySelector(`.lds-roller`).style.display = `none`;
    }
})


//click on image

images.forEach(img => {
    img.addEventListener(`click`, function () {
        bigImg.src = this.src;
        bigImgContainer.style.display = `flex`;
    })
})

bigImgContainer.addEventListener(`click`, function (ev) {
    if (ev.target === bigImg) return;
    bigImgContainer.style.display = `none`;
})
// view bottun click
viewBtns.forEach(btn => btn.addEventListener(`click`, function () {
    bigImg.src = this.closest(`.img-div`).querySelector(`img`).src;
    bigImgContainer.style.display = `flex`;
}))
// view bottun animation
viewBtns.forEach(btn => btn.addEventListener(`mouseover`, function () {
    this.querySelector(`.ani-con`).style.display = `inline`;
}))
viewBtns.forEach(btn => btn.addEventListener(`mouseout`, function () {
    this.querySelector(`.ani-con`).style.display = `none`;
}))
// download bottun animation
downloadBtns.forEach(btn => btn.addEventListener(`mouseover`, function () {
    this.querySelector(`.ani-con`).style.display = `inline`;
}))
downloadBtns.forEach(btn => btn.addEventListener(`mouseout`, function () {
    this.querySelector(`.ani-con`).style.display = `none`;
}))



