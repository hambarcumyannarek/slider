"use strict";

const imagesCont = document.querySelectorAll('.images');

const leftRightBtn = document.querySelectorAll('.leftRightBtn');

imagesCont.forEach((imgCont) => {
    imgCont.querySelectorAll('img').forEach((img) => {
        img.addEventListener('mousedown', function(evn) {
            evn.preventDefault()
        })})
})


leftRightBtn.forEach((btn) => {
    btn.addEventListener('click', function(elm) {
        clcikBtn(elm.target);
        drowCircule(elm.target);
        ditablishLR(elm.target);
    })
})

function recursia(elm) {
    if(elm.className.search('sliderContainer') !== -1) {
        return elm;
    }
    return recursia(elm.parentElement)
}

function clcikBtn(elm) {
    const thisCont = recursia(elm);
    let thisIndex = +recursia(elm).getAttribute('data-value');
    
    if(elm.className.search('left') !== -1) {
        thisIndex--;
        thisCont.setAttribute('data-value', thisIndex);
    } else {
        thisIndex++;
        thisCont.setAttribute('data-value', thisIndex);
    }
    
    thisCont.querySelector('.images').style.transform = `translateX(${-thisIndex * 100}%)`
}


let sliderCont = document.querySelector('.sliderContainer');
let sliderContAll = document.querySelectorAll('.sliderContainer');

sliderContAll.forEach(cont => {
    const circule = cont.querySelector('.circle');
    const images = cont.querySelectorAll('.images img');
    let circuleArr = ['<i class="fa fa-circle bold" aria-hidden="true"></i>'];
    
    for(let i = 1; i < images.length; i++) {
        circuleArr.push(`<i class="fa fa-circle-thin" aria-hidden="true"></i>`)
    }

    circule.innerHTML = circuleArr.join('');   
})

const circule = document.querySelector('.circle');

function update() {
    sliderContAll.forEach(cont => {
        const circule = cont.querySelectorAll('.circle i');
    
        circule.forEach((val, i) => {
            const thisCont = recursia(val);
            val.addEventListener('click', function(evn) {
                thisCont.setAttribute('data-value', i);
                let imgIndex = +thisCont.getAttribute('data-value');
                thisCont.querySelector('.images').style.transform = `translateX(${-imgIndex * 100}%)`;
         
                drowCircule(thisCont);
                ditablishLR(thisCont);
            })
        })
    })
}

update();
function drowCircule(elm) {    
    const thisCont = recursia(elm);
    const thisCircule = thisCont.querySelector('.circle')
    let thisIndex = +recursia(elm).getAttribute('data-value');
    let thisCirculeLength = thisCircule.querySelectorAll('i');
    thisCircule.innerHTML = '';
    for(let i = 0; i < thisCirculeLength.length; i++) {
        thisIndex !== i ? thisCircule.innerHTML += '<i class="fa fa-circle-thin" aria-hidden="true"></i>' : thisCircule.innerHTML += '<i class="fa fa-circle bold" aria-hidden="true"></i>'
    }
    update();
}

function ditablishLR(getCont) {
    const cont = recursia(getCont);
    const thisContIndex = +cont.getAttribute('data-value');
    const leftRightBtn = cont.querySelectorAll('.leftRightBtn');

    if(cont.querySelector('.left').getAttribute('disabled', '') !== null || cont.querySelector('.right').getAttribute('disabled', '') !== null) {
        leftRightBtn.forEach((btnn) => {
            btnn.removeAttribute('disabled');
        });
    }    
    if(thisContIndex === 0) {
        cont.querySelector('.left').setAttribute('disabled', '');
    } else if(thisContIndex === cont.querySelectorAll('.images img').length-1) {
        cont.querySelector('.right').setAttribute('disabled', '');
    }
}



let trueScroll;
let myFunc = undefined;
sliderContAll.forEach(cont => {
    cont.addEventListener('mousedown', function(evn) {
        if(document.body.offsetWidth > 550) {
            cont.querySelector('.images').style.cursor = 'grabbing';
            let scrollNum = evn.clientX;
            let lastNum = scrollNum;
            let lastX = scrollNum;
            let fr = 1;

            const imagesCont = cont.querySelector('.images');
            myFunc = function(evn) {
                if((imgIndex !== 0 || fr > 1) && evn.clientX > lastNum) {
                    fr += lastX-evn.clientX;
                    imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${(-fr)}px))`;   
                } else if((imgIndex !== cont.querySelectorAll('.images img').length-1 || fr < 0) && evn.clientX < lastNum) {
                    fr += lastX-evn.clientX;

                    imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${-fr}px))`; 
                }
            
                lastX = evn.clientX;
            
                if(fr > imagesCont.offsetWidth/2+imagesCont.offsetWidth || fr < -(imagesCont.offsetWidth/2+imagesCont.offsetWidth)) {
                    cont.parentElement.removeEventListener('mousemove', () => {})
                }
            
                if(fr > imagesCont.offsetWidth/5) {
                    trueScroll = 'goRight';
                } else if(fr < -imagesCont.offsetWidth/5){
                    trueScroll = 'goLeft';
                } else {
                    trueScroll = 'stop';
                }
            };

            let imgIndex = +recursia(cont).getAttribute('data-value');
            cont.parentElement.addEventListener('mousemove', myFunc) // this is a .slider 
        }    
    })
})

document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('mouseup', function(evn) {
        if(document.body.offsetWidth > 550) {
            
            slider.querySelector('.images').style.cursor = 'grab';
            slider.removeEventListener('mousemove', myFunc);
            let cont = slider.querySelector('.sliderContainer');
            let thisIndex = cont.getAttribute('data-value');
    
            if(trueScroll === 'goRight') {
                trueScroll = "stop"
                thisIndex++;
                cont.setAttribute('data-value', thisIndex);
                drowCircule(cont);
                ditablishLR(cont);
            } else if(trueScroll === 'goLeft') {
                trueScroll = "stop"
                thisIndex--;
                cont.setAttribute('data-value', thisIndex);

                drowCircule(cont);
                ditablishLR(cont);
            } else {
                thisIndex = thisIndex;
            }
            
            cont.querySelector('.images').style.transform = `translateX(${-thisIndex * 100}%)`;
        }    
    })
    
})
