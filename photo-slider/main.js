"use strict";
const slides = document.querySelectorAll(".slide");

let counter = 0;
let slidesCount = slides.length - 1;

const nextSlide = document.querySelector(".btn-next");
const prevSlide = document.querySelector(".btn-prev");

nextSlide.addEventListener("click", function () {
    if(counter === slidesCount){
        counter = 0;
    }
    else{
    counter++;
    }

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - counter)}%)`;
    });
});

prevSlide.addEventListener("click", function () {
    if(counter === 0){
        counter = slidesCount;
    }
    else{
    counter--;
    }
    
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - counter)}%)`;
    });
});
