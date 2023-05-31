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

let windowNum;

setInterval(() => {
    windowNum = windowNum
}, 0)

let scrollNum;

sliderCont.addEventListener('mousedown', function(evn) {
    imagesCont.style.cursor = 'grabbing';
    scrollNum = evn.clientX;
})

sliderCont.addEventListener('mouseup', function(evn) {
    imagesCont.style.cursor = 'grab';
    if(imgIndex !== 0) {
        if(scrollNum+100 < evn.clientX) {
            imgIndex--;
            imagesCont.style.transform = `translateX(${-imgIndex * 100}%)`;
            drowCircule();
            ditablishLR();
        }
    }     
    if(imgIndex < images.length-1) {
        if(scrollNum-100 > evn.clientX){
            imgIndex++;
            imagesCont.style.transform = `translateX(${-imgIndex * 100}%)`;
            drowCircule();
            ditablishLR();
        }
    }   
    
})
