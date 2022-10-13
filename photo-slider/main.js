element = document.getElementById("one")
var btnLeft = document.getElementById("btn-left")
var btnRight = document.getElementById("btn-right")
function animate() {
if(element)
{
element.classList.add("slide-animation")
}
}


setTimeout(animate, 2000);

if(btnLeft && one && two && three && four && five && six)
{
    btnLeft.addEventListener("click", animate);
}
