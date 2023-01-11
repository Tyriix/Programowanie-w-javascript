import NoteAPI from "./NotesAPI.js";

document.addEventListener("DOMContentLoaded", function(){
    showNotes();
});

const submitBtn = document.querySelector('.btn-submit')
const colorPicker = document.querySelector('.note-color')
const pinBtn = document.querySelector('.btn-pin')
const notePin = document.querySelector('.note-pin');

submitBtn.addEventListener('click', CreateNote);
colorPicker.addEventListener('change', ChangeNoteColor);
pinBtn.addEventListener('click', PinNote);

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
}

function showNotes(){
    const notes = NoteAPI.getAllNotes();
    notes.forEach(note => {
        showNote(note);
    });
}