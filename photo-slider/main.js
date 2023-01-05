"use strict";
const slides = document.querySelectorAll(".slide");
const nextSlide = document.querySelector(".btn-next");
const prevSlide = document.querySelector(".btn-prev");
const slideNav = document.querySelector(".slide-nav");
nextSlide.addEventListener("click", moveRight);
prevSlide.addEventListener("click", moveLeft);

let counter = 0;
let slidesCount = slides.length - 1;
let moveInterval = window.setInterval(moveRight, 3000);
createSliderNav();
function moveRight(){
    resetInterval();
    if(counter === slidesCount){
        counter = 0;
    }
    else{
    counter++;
    }

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - counter)}%)`;
    });
}
function moveLeft(){
    resetInterval();
    if(counter === 0){
        counter = slidesCount;
    }
    else{
    counter--;
    }
    
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - counter)}%)`;
    });
}
function createSliderNav(){
    for(let i = 0; i < slides.length; i++){
        const navSlide = document.createElement("button");
        navSlide.classList.add("nav-slide");
        slideNav.appendChild(navSlide);
        navSlide.addEventListener("click", (function(){
            resetInterval();
            counter = i;
            slides.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - counter)}%)`;
            });
        }));
    }
}

function resetInterval(){
    window.clearInterval(moveInterval);
    moveInterval = window.setInterval(moveRight, 3000);
}