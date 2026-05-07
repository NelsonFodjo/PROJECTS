const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");


function showNotes(){
    const savedData = localStorage.getItem("notes");
    if(savedData) {
        notesContainer.innerHTML = savedData;
    }
}
showNotes();

function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box"; 
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    
    updateStorage();
});

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
});


notesContainer.addEventListener("input", (e) => {
    if(e.target.classList.contains("input-box")) {
        updateStorage();
    }
});

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    } 
});