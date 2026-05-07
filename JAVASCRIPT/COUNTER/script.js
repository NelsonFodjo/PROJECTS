const add = document.querySelector(".numb p")

let count = 0;

function add(){
    count++;
    updateval();
}

function updateval(){
    document.getElementById("count").innerHTML = count;
}

function substract(){
    count --;
}

function save(){
    
}