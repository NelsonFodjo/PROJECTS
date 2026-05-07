const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const clearList = document.querySelector(".clear-list");


inputBox.addEventListener("keydown", (e) => {
        if(e.key == "Enter"){
            addTask();
        }
    });

clearList.addEventListener("click", ()=>{
    listContainer.innerHTML = "";
    localStorage.clear();
    clearList.style.display = "none";
    saveData();
})


function addTask(){

    if(inputBox.value === ''){
        alert("You must write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        clearList.style.display = "block";

    }
    inputBox.value = "";
    saveData();
}



listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        if(listContainer.children.length === 0){
            console.log("cleared buddy");
            clearList.style.display = "none";
    }
    saveData();
        
    }
}, false);

    

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("cleared", clearList.innerHTML);
}

function showTask(){

    listContainer.innerHTML = localStorage.getItem("data");
    clearList.innerHTML = localStorage.getItem("cleared");
    
}


showTask();