console.log("Hi");
showNotes(); //called here so that on reloading page all notes are visible

//if user adds a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    if(addTxt.textLength==0){
        alert("Plese add text");
    }
    else{
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
}});

//function to read elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html +=
            `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" class="btn btn-danger" onclick="deleteNote(this.id)">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show! Use 'Add a Note' section above to add notes.`;
    }
}

//function to delete a note
function deleteNote(index) {
    console.log('I am deleting this note', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    
    let inputVal = search.value.toLocaleLowerCase();
    console.log("Input event fired!", inputVal);
    
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLocaleLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        //console.log(cardTxt);
    })
});