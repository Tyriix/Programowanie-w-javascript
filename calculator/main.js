
var div = document.getElementById("input-section");

function createInput(){
var input = document.createElement("input");
var button = document.createElement("button");


button.textContent = "Dodaj pole";
input.style.marginTop = "15px";
input.setAttribute("id", "input" + (document.getElementsByTagName("input").length + 1));
input.setAttribute("class", "calcInput");
div.appendChild(input);
}


var resultDiv = document.getElementById("results");
$(document).on('keyup', ".calcInput", function(e){
    var noChildren = div.querySelectorAll('#input-section .calcInput').length;;
    var sum = 0;
    var avg = 0;
    var max = 0;
    var min = this.value;

    var sumResult = document.getElementById("sum");
    var avgResult = document.getElementById("avg");
    var maxResult = document.getElementById("max");
    var minResult = document.getElementById("min"); 

    $('.calcInput').each(function(){
        sum += parseFloat(this.value);

        avg += parseFloat(this.value) / noChildren;

        max = Math.max(max, parseFloat(this.value));
        min = Math.min(min, parseFloat(this.value));
        sumResult.innerText = sum;
        avgResult.innerText = avg;
        maxResult.innerText = max;
        minResult.innerText = min;
    })
});