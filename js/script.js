"use strict";

const imagesCont = document.querySelector('.images');
const images = imagesCont.querySelectorAll('img');

const leftRightBtn = document.querySelectorAll('.leftRightBtn');

images.forEach((img) => {
    img.addEventListener('mousedown', function(evn) {
        evn.preventDefault()
    })
})

let imgIndex = 0;

leftRightBtn.forEach((btn) => {
    btn.addEventListener('click', function(elm) {
        clcikBtn(elm.target);
        drowCircule();
        ditablishLR();
    })
})

function clcikBtn(elm) {
    if(elm.className.search('left') !== -1) {
        imgIndex--;
    } else {
        imgIndex++;
    }
    
    imagesCont.style.transform = `translateX(${-imgIndex * 100}%)`
}

const circule = document.querySelector('.circle');

let circuleArr = ['<i class="fa fa-circle bold" aria-hidden="true"></i>'];


for(let i = 1; i < images.length; i++) {
    circuleArr.push(`<i class="fa fa-circle-thin" aria-hidden="true"></i>`)
}

circule.innerHTML = circuleArr.join('');   

function drowCircule() {    
    circuleArr = circuleArr.map((icon, i) => {
        if(imgIndex !== i) {
            return '<i class="fa fa-circle-thin" aria-hidden="true"></i>';
        } else if(imgIndex === i) {
            return '<i class="fa fa-circle bold" aria-hidden="true"></i>';
        }
    })

    circule.innerHTML = circuleArr.join('');
    clickCircule(circule)
}

function ditablishLR() {
    if(document.querySelector('.left').getAttribute('disabled', '') !== null || document.querySelector('.right').getAttribute('disabled', '') !== null) {
        leftRightBtn.forEach((btnn) => {
            btnn.removeAttribute('disabled');
        });
    }    
    if(imgIndex === 0) {
        document.querySelector('.left').setAttribute('disabled', '');
    } else if(imgIndex === images.length-1) {
        document.querySelector('.right').setAttribute('disabled', '');
    }
}

ditablishLR();

function clickCircule(circule) {
    circule.querySelectorAll('i').forEach((val, i) => {
        val.addEventListener('click', function() {
            imgIndex = i;
            imagesCont.style.transform = `translateX(${-imgIndex * 100}%)`;
     
            drowCircule();
            ditablishLR();
        })
    })
}

clickCircule(circule)


let sliderCont = document.querySelector('.sliderContainer');


let scrollNum;
console.log(imagesCont)
let ids = 1;
let trueScroll;
let lastNum;
let lastX;
let fr = 1;
function myFunc(evn) {
    if((imgIndex !== 0 || fr > 1) && evn.clientX > lastNum) {
        fr += lastX-evn.clientX;
        imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${(-fr)}px))`;   
    } else if((imgIndex !== images.length-1 || fr < 0) && evn.clientX < lastNum) {
        fr += lastX-evn.clientX;
        imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${-fr}px))`; 
    }

    lastX = evn.clientX;

    if(fr > imagesCont.offsetWidth/2+imagesCont.offsetWidth || fr < -(imagesCont.offsetWidth/2+imagesCont.offsetWidth)) {
        document.querySelector('.slider').removeEventListener('mousemove', myFunc)
    }

    if(fr > imagesCont.offsetWidth/5) {
        trueScroll = 'goRight';
    } else if(fr < -imagesCont.offsetWidth/5){
        trueScroll = 'goLeft';
    } else {
        trueScroll = 'stop';
    }
}

sliderCont.addEventListener('mousedown', function(evn) {
    if(document.body.offsetWidth > 550) {
        imagesCont.style.cursor = 'grabbing';
        scrollNum = evn.clientX;
        lastNum = scrollNum;
        lastX = scrollNum;
        document.querySelector('.slider').addEventListener('mousemove', myFunc)
    }    
})

document.querySelector('.slider').addEventListener('mouseup', function(evn) {
    if(document.body.offsetWidth > 550) {
        fr = 1;
        imagesCont.style.cursor = 'grab';
        console.log(imgIndex)
        document.querySelector('.slider').removeEventListener('mousemove', myFunc); 

        if(trueScroll === 'goRight') {
            imgIndex++;
            drowCircule();
            ditablishLR();
        } else if(trueScroll === 'goLeft') {
            imgIndex--;
            drowCircule();
            ditablishLR();
        } else {
            imgIndex = imgIndex;
        }
        
        imagesCont.style.transform = `translateX(${-imgIndex * 100}%)`;
        console.log(fr)
    }    
})
