import NoteAPI from "./NotesAPI.js";

document.addEventListener("DOMContentLoaded", function(){
    showNotes();
});

const submitBtn = document.querySelector('.btn-submit')
const colorPicker = document.querySelector('.note-color')
const pinBtn = document.querySelector('.btn-pin')
const notePin = document.querySelector('.note-pin');
const detailsBackground = document.querySelector('.note__details');
const deleteBtn = document.querySelector('.btn-delete');



submitBtn.addEventListener('click', CreateNote);
colorPicker.addEventListener('change', ChangeNoteColor);
pinBtn.addEventListener('click', PinNote);
detailsBackground.addEventListener('click', function(){
    const ex = document.querySelector("#hidden-details");
    const detailsEx = document.querySelector(".note__details");

    ex.style.display = "none";
    detailsEx.style.display = "none";
});
deleteBtn.addEventListener('click', deleteNote);


function CreateNote(){
    const note = new NoteAPI();
    const newTitle = document.querySelector(".note-title").value;
    const newBody = document.querySelector(".note-body").value;
    if(newTitle == "" || newBody == "" )
    {
        console.log("empty")       
        return;
    }
    note.title = document.querySelector(".note-title").value;
    note.body = document.querySelector(".note-body").value;
    note.color = document.querySelector(".note-color").value;
    note.pinned = document.querySelector(".note-pin").checked;
    NoteAPI.saveNote(note);
    showNote(note);
    clearNote();
}
function ChangeNoteColor(){
    document.querySelector(".notes__create").style.backgroundColor = colorPicker.value;
}
function PinNote(){
    if(notePin.checked){
        document.getElementById('pin-checkbox').click();
        document.getElementById("pin").setAttribute('style','color: #808080');
        console.log("unchecked");
    }
    else{
        document.getElementById('pin-checkbox').click();
        document.getElementById('pin').setAttribute('style','color: #009E60');
        console.log("checked");
    }
    
}
function clearNote(){
    document.querySelector(".note-title").value = "";
    document.querySelector(".note-body").value = "";
    document.querySelector(".note-color").value = "#ffffff";
    if(notePin.checked){
        document.getElementById('pin-checkbox').click();
        document.getElementById("pin").setAttribute('style','color: #808080');
    }
}
function showNote(note){
    const ex = document.getElementById("#hidden-note");
    const newNote = ex.cloneNode(true);
    var date = note.updated;
    
    newNote.querySelector("#item-title").innerText = note.title;
    newNote.querySelector("#item-body").innerText = note.body;
    newNote.querySelector("#item-date").innerText = date.substring(0, 10);
    newNote.style.backgroundColor = note.color;
    if(note.pinned){
        document.querySelector("#notes__list-pinned").appendChild(newNote);
    }
    else{
        document.querySelector("#notes__list-normal").appendChild(newNote);
    }
    newNote.addEventListener('click', function(){
        showDetails(note);
    });
}

function showNotes(){
    const notes = NoteAPI.getAllNotes();
    notes.forEach(note => {
        showNote(note);
    });
}

function showDetails(note){
    const ex = document.querySelector("#hidden-details");
    const detailsEx = document.querySelector(".note__details");

    ex.style.display = "flex";
    detailsEx.style.display = "flex";

    var date = note.updated;

    ex.querySelector("#details-title").innerText = note.title;
    ex.querySelector("#details-body").innerText = note.body;
    ex.querySelector("#details-date").innerText = date.substring(0, 10);
    ex.style.backgroundColor = note.color;
    const deleteBtn = ex.querySelector(".btn-delete");
    console.log(deleteBtn);
    deleteBtn.addEventListener('click', function(){
        deleteNote(note.id);
        showNotes();

    });
}

function deleteNote(id){
    console.log(id)
    NoteAPI.deleteNoteById(id);
}
