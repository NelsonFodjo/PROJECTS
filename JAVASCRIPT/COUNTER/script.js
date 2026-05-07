const addDisplay = document.querySelector(".numb p")

let count = 0;

function add(){
    count++;
    updateval();
}

function updateval(){
    document.getElementById("count").innerHTML = count;
}

function subtract(){
    count --;
    updateval()
}

function reset(){
    count = 0;
    updateval();
}

function save(){
    localStorage.setItem("count", count);
}

function load(){
    let saved = localStorage.getItem("count")
    if (saved != null){
        count = Number(saved)
    }
    updateval()
}