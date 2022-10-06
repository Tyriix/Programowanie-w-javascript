
var id = 1
var div = document.getElementById("input-section");
function createInput(){
var input = document.createElement("input");
var button = document.createElement("button");


button.textContent = "Dodaj pole";
input.style.marginTop = "15px";
input.setAttribute("id", "input" + id);
input.setAttribute("class", "calcInput");
div.appendChild(input);
id++;
}


var resultDiv = document.getElementById("results");
var inputTable = [];
$(document).on('keyup', ".calcInput", function(e){
    var noChildren = div.querySelectorAll('#input-section .calcInput').length;;

    var sum = 0;
    var avg = 0;
    var max = 0;
    var min = 0;

    var sumResult = document.getElementById("sum");
    var avgResult = document.getElementById("avg");
    var maxResult = document.getElementById("max");
    var minResult = document.getElementById("min"); 
    $('.calcInput').each(function(){
        sum += parseFloat(this.value);

        avg += parseFloat(this.value) / noChildren;

        //console.log(sum);
        //console.log(avg);
        //console.log(noChildren);
        sumResult.innerText = sum;
        avgResult.innerHTML = avg;
    })
});