
window.onresize = function () { location.reload(); }

/*------------header animation------------*/

/*------------------------------------------------
----------------phone header bar -----------------
------------------------------------------------*/


let mainBarStt = close;
function openPhoneMainBar() {
    const PhoneMainBarStyle = document.querySelector(`.mid-btn-con`).style
    if (mainBarStt === close) {
        mainBarStt = open;
        document.querySelector(`.main-dropdown-arrow`).style.transform = `rotate(90deg)`;
        PhoneMainBarStyle.display = "flex";
        let count = 0;
        for (let i = 0; i < 18; i++) {
            setTimeout(function () {
                PhoneMainBarStyle.height = ("0" + i * 14) + "px";
            }, i * 40)
        }
        for (i = 1; i < 5; i++) {
            document.querySelector(`.hb${i}`).style.opacity = "0";
            setTimeout(function () {
                count++
                revelbutton(count)
            }, i * 150)
        }
    } else if (mainBarStt === open) {
        mainBarStt = close;
        document.querySelector(`.main-dropdown-arrow`).style.transform = `rotate(-90deg)`;
        setTimeout(function () {
            for (let i = 17; i >= 0; i--) {
                setTimeout(function () {
                    PhoneMainBarStyle.height = ("0" + i * 14) + "px";
                    if (i === 0) { PhoneMainBarStyle.display = "none" }
                }, (18 - i) * 20)
            }
        }, 200)
        let closeCount = 4;
        for (let i = 4; i > 0; i--) {
            document.querySelector(`.hb${i}`).style.opacity = "0";
            setTimeout(function () {
                closeCount++
                unvelbutton(closeCount)
            }, i * 150)
        }
    }
}

/*--------------reveal one button--------------*/
function revelbutton(num) {
    document.querySelector(`.hb${num}`).style.opacity = "1";
}

/*--------------unveal one button--------------*/
function unvelbutton(num) {
    document.querySelector(`.hb${num}`).style.opacity = "0";
}


/*------------------------------------------------
----------------side bar animation----------------
------------------------------------------------*/


let esbStt = close;
function openExtraSideBar() {
    document.querySelector(".extra-side-bar").style.display = "flex";


    if (esbStt === close) {
        for (let i = 1; i < 5; i++) {
            document.querySelector(`.sbb3-${i}`).style.display = `none`;
            setTimeout(function () { openOneBar(i) }, (i - 1) * 200);
        }
    } else if (esbStt === open) {
        for (let i = 4; i > 0; i--) {
            setTimeout(function () { closeOneBar(i) }, 800 - i * 200)
        }
        setTimeout(function () {
            document.querySelector(".extra-side-bar").style.display = "none";
        }, 1400)
    }
}

/*---------------close one button---------------*/

function closeOneBar(num) {
    let delayTime = 80;
    let correntClose = document.querySelector(`.sbb3-${num}`).style;
    correntClose.display = `block`;
    correntClose.width = "0";
    correntClose.color = '#CFD7FF00';
    for (let i = 0; i < 11; i++) {
        setTimeout(function () {
            correntClose.width = (170 - i * 17) + "px";
            if (i < 10) { correntClose.color = '#CFD7FF' + (99 - i * 10) }
            else if (i === 10) {
                correntClose.color = '#CFD7FF00';
                correntClose.display = "none"
            }
        }, i * delayTime)
    }
    esbStt = close
}

/*---------------open one button---------------*/

function openOneBar(num) {
    let delayTime = 80;
    let correntOpen = document.querySelector(`.sbb3-${num}`).style;
    correntOpen.display = `block`;
    correntOpen.width = "0";
    correntOpen.color = '#CFD7FF00';
    for (let i = 0; i < 11; i++) {
        setTimeout(function () {
            correntOpen.width = ("0" + i * 17) + "px";
            if (i < 10 && i > 4) { correntOpen.color = '#CFD7FF' + i * 10; }
            else if (i <= 4) { correntOpen.color = `#CFD7FF00` }
            else if (i === 10) { correntOpen.color = '#CFD7FF'; }
        }, i * delayTime)
    }
    esbStt = open
}

/*------------------------------------------------
----------------phone side bar -------------------
------------------------------------------------*/
let phoneSideBarStt = close
function openSideBarPhone() {
    if (phoneSideBarStt === close) {
        phoneSideBarStt = open
        document.querySelector(".side-bar").style.display = "block"
        for (let u = 0; u < 19; u++) {
            setTimeout(function () {
                document.querySelector(".side-bar").style.height = ("0" + u * 15) + "px";
            }, u * 50)
        }
        for (let q = 1; q < 9; q++) {
            document.querySelector(`.sb-ani${q}`).style.opacity = "0";
        }

        for (let j = 1; j < 9; j++) {
            setTimeout(function () {
                setTimeout(function () {
                    document.querySelector(`.sb-ani${j}`).style.opacity = "1";
                }, j * 100)
            }, 100)
        }
    } else if (phoneSideBarStt === open && extraSideBarStt === open) {
        phoneSideBarStt = close
        document.querySelector(`.extra-side-bar`).style.opacity = "0";
        for (let w = 1; w < 9; w++) {
            document.querySelector(`.sb-ani${w}`).style.opacity = "0";
            unvealFullSideBar()
        }
    } else if (phoneSideBarStt === open) {
        phoneSideBarStt = close
        for (let w = 1; w < 9; w++) {
            document.querySelector(`.sb-ani${w}`).style.opacity = "0";
            unvealSideBar()
        }
    }
}

function unvealSideBar() {
    setTimeout(function () {
        for (let e = 27; e > 0; e--) {
            setTimeout(function () {
                if (e === 1) { document.querySelector(`.side-bar`).style.display = "none" }
                document.querySelector(`.side-bar`).style.height = ("0" + e * 10) + "px";
            }, (27 - e) * 10)
        }
    }, 200);
}

function unvealFullSideBar() {
    extraSideBarStt = close
    setTimeout(function () {
        for (let e = 39; e > 0; e--) {
            setTimeout(function () {
                if (e === 1) { document.querySelector(`.side-bar`).style.display = "none" }
                if (e === 20) { document.querySelector(".extra-side-bar").style.display = "none"; }
                document.querySelector(`.side-bar`).style.height = ("0" + e * 10) + "px";
            }, (39 - e) * 10)
        }
    }, 200);
}

/*-------------open extra side bar--------------*/

let extraSideBarStt = close

function openPhoneExtraSidebar() {
    if (extraSideBarStt === close) {
        document.querySelector(`.extra-side-bar`).style.opacity = "1";
        document.querySelector(".extra-side-bar").style.display = "flex";
        document.querySelector(".side-bar").style.height = "390px"
        extraSideBarStt = open;
    } else if (extraSideBarStt === open) {
        document.querySelector(".extra-side-bar").style.display = "none";
        document.querySelector(".side-bar").style.height = "270px"
        extraSideBarStt = close
    }
}
/*-----------------photo galery-----------------*/

function changeImg(newImgSrc) {
    let bigPicture = document.querySelector(`.big-img`)
    bigPicture.src = newImgSrc.src
}