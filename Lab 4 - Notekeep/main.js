import NoteAPI from "./NotesAPI.js";

document.addEventListener("DOMContentLoaded", function () {
  showNotes();
});

const submitBtn = document.querySelector(".btn-submit");
const colorPicker = document.querySelector(".note-color");
const pinBtn = document.querySelector(".btn-pin");
const notePin = document.querySelector(".note-pin");
const closeBtn = document.querySelector(".btn-close");
const deleteBtn = document.querySelector(".btn-delete");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".btn-search");

submitBtn.addEventListener("click", CreateNote);
colorPicker.addEventListener("change", ChangeNoteColor);
pinBtn.addEventListener("click", PinNote);
closeBtn.addEventListener("click", function () {
  const ex = document.querySelector("#hidden-details");
  const detailsEx = document.querySelector(".note__details");

  ex.style.display = "none";
  detailsEx.style.display = "none";
});
deleteBtn.addEventListener("click", deleteNote);
searchBtn.addEventListener("click", searchNote);

let status = false;

function CreateNote() {
  const note = new NoteAPI();
  let tags = "";
  const newTitle = document.querySelector(".note-title").value;
  const newBody = document.querySelector(".note-body").value;
  if (newTitle == "" || newBody == "") {
    console.log("empty");
    return;
  }
  note.title = document.querySelector(".note-title").value;
  note.body = document.querySelector(".note-body").value;
  note.color = document.querySelector(".note-color").value;
  note.pinned = document.querySelector(".note-pin").checked;
  tags = document.querySelector(".note-tags").value;
  note.tags = tags.split(" ");
  NoteAPI.saveNote(note);
  showNote(note);
  clearNote();
}
function ChangeNoteColor() {
  document.querySelector(".notes__create").style.backgroundColor =
    colorPicker.value;
}
function PinNote() {
  if (notePin.checked) {
    document.getElementById("pin-checkbox").click();
    document.getElementById("pin").setAttribute("style", "color: #808080");
    console.log("unchecked");
  } else {
    document.getElementById("pin-checkbox").click();
    document.getElementById("pin").setAttribute("style", "color: #009E60");
    console.log("checked");
  }
}
function clearNote() {
  document.querySelector(".note-title").value = "";
  document.querySelector(".note-body").value = "";
  document.querySelector(".note-color").value = "#ffffff";
  document.querySelector(".note-tags").value = "";
  document.querySelector(".notes__create").style.backgroundColor = "white";
  if (notePin.checked) {
    document.getElementById("pin-checkbox").click();
    document.getElementById("pin").setAttribute("style", "color: #808080");
  }
}

//SHOW NOTES
async function showNote(note, search) {
  const model = document.querySelector(".notes__list-item");
  const newNote = model.cloneNode(true);
  var date = note.updated;

  newNote.setAttribute("class", "notes__list-item-cloned");
  newNote.querySelector("#item-title").innerText = note.title;
  newNote.querySelector("#item-body").innerText = note.body;
  newNote.querySelector("#item-date").innerText = `${date.substring(
    0,
    10
  )}, ${date.substring(11, 19)}`;
  newNote.style.backgroundColor = note.color;
  if (search === true) {
    await clearNotes();
    document.querySelector("#notes__list-search").appendChild(newNote);
    search = false;
  } else {
    if (note.pinned) {
      document.querySelector("#notes__list-pinned").appendChild(newNote);
    } else {
      document.querySelector("#notes__list-normal").appendChild(newNote);
    }
  }
  newNote.addEventListener("click", function () {
    showDetails(note, newNote);
  });
}

function showNotes() {
  const notes = NoteAPI.getAllNotes();
  notes.forEach((note) => {
    showNote(note);
  });
}

function showDetails(note, newNote) {
  const ex = document.querySelector("#hidden-details");
  const detailsEx = document.querySelector(".note__details");

  ex.style.display = "flex";
  detailsEx.style.display = "flex";

  var date = note.updated;
  ex.querySelector("#details-title").value = note.title;
  ex.querySelector("#details-body").value = note.body;
  ex.querySelector("#details-tags").value = note.tags.join(" ");
  ex.querySelector("#details-date").innerText = `${date.substring(
    0,
    10
  )}, ${date.substring(11, 19)}`;
  ex.style.backgroundColor = note.color;
  const editBtn = ex.querySelector(".btn-edit");
  editBtn.addEventListener("click", function () {
    const updatedNote = note;
    updatedNote.id = note.id;
    updatedNote.title = ex.querySelector("#details-title").value;
    updatedNote.body = ex.querySelector("#details-body").value;
    updatedNote.tags = ex.querySelector("#details-tags").value.split(" ");
    updatedNote.date = Date.now();
    editNote(note);
  });
  const deleteBtn = ex.querySelector(".btn-delete");
  deleteBtn.addEventListener("click", function () {
    deleteNote(note.id, newNote);
  });
}

//DELETE NOTES
function deleteNote(id) {
  NoteAPI.deleteNoteById(id);
  location.reload();
}

//EDIT NOTES
function editNote(note) {
  NoteAPI.saveNote(note);
  location.reload();
}

//SEARCH NOTES
function searchNote(search) {
  const searchQueries = searchInput.value.split(" ");
  const notes = NoteAPI.getAllNotes();

  if (searchQueries != "") {
    searchQueries.forEach((query) => {
      notes.forEach((note) => {
        if (note.tags.some((val) => val === query)) {
          search = true;
          console.log(note);
          showNote(note, search);
        }
      });
    });
  } else {
  }
}
async function clearNotes()
{
    const notesList = document.querySelector("#notes__list-search")
    while(notesList.firstChild){
        notesList.removeChild(notesList.firstChild);
    }
}