let number = document.getElementById("number");


function generate(){
    number.innerHTML = Math.floor(Math.random() * 1000) + 1;
}