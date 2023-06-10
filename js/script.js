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
let trueScroll = false;
let lastNum;
let fixnum = 3;
function myFunc(evn) {
    if((imgIndex !== 0 || ids > 0) && evn.clientX > lastNum) {
        ids-=fixnum;
        lastNum = evn.clientX-fixnum;
        imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${(-ids)}px))`;   
    } else if((imgIndex !== images.length-1 || ids < 0) && evn.clientX < lastNum) {
        ids+= fixnum;
        lastNum = evn.clientX+fixnum;
        imagesCont.style.transform = `translateX(calc(${(-imgIndex * 100)}% + ${(-ids)}px))`; 
    }

    console.log(evn.clientX)
    console.log('aaaaaaaa')

    if(ids > imagesCont.offsetWidth/2+imagesCont.offsetWidth-fixnum || ids < -(imagesCont.offsetWidth/2+imagesCont.offsetWidth-fixnum)) {
        document.querySelector('.slider').removeEventListener('mousemove', myFunc)
    }

    if(ids > imagesCont.offsetWidth/5) {
        trueScroll = 'goRight';
    } else if(ids < -imagesCont.offsetWidth/5){
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
        document.querySelector('.slider').addEventListener('mousemove', myFunc)
    }    
})

document.querySelector('.slider').addEventListener('mouseup', function(evn) {
    if(document.body.offsetWidth > 550) {

        imagesCont.style.cursor = 'grab';
        console.log(imgIndex)
        document.querySelector('.slider').removeEventListener('mousemove', myFunc); 
        ids = 1;

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
    }    
})
