// Global Query Selectors 
const noteContainer = document.querySelector(".note__container");
const modalContainer = document.querySelector(".modal__container");
const form = document.querySelector("form");
const titleInput = document.querySelector('#title');


// class : to create a new note
class Note {
    constructor(title, body){
        this.title = title;
        this.body = body;
        this.id = Math.random();
    }
}


// ----- LOCAL STORAGE ------ //
 // function : retrive notes from local storage
 function getNotes() {
    let notes;
    if(localStorage.getItem('noteApp.notes') === null) {
        notes = [];
    }
    else {
        notes = JSON.parse(localStorage.getItem('noteApp.notes'));
    }

    return notes;
 }

 // function : Add a note to local storage
 function addNoteToLocalStorage(note){
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
 }

 // function : to remove a note from local storage
 function removeNote(id){
    const notes = getNotes();
    notes.forEach((note, index)=> {
        if(note.id == id){
            notes.splice(index,1);
        }
        localStorage.setItem('noteApp.notes', JSON.stringify(notes));
    }) 
 }

 
// ----- UI Updates ------ //
  // function : to create a new note in UI
  function addNoteToList(note__card){
    const newUINote = document.createElement('div');
    newUINote.classList.add('note__card');
    newUINote.innerHTML = `
    <span hidden>${note__card.id}</span>
    <h2 class="note__title">${note__card.title}</h2>
    <p class="note__body"> ${note__card.body}</p>
   
    <div class="note__buttons">
      <button class="note__button note__buttonView">view</button>
      <button class="note__button note__buttonDelete">delete</button>
    </div>
    `;
    noteContainer.appendChild(newUINote);
  }

  // function : to show note in UI
  function displayNotes(){
    const notes = getNotes();
    notes.forEach(note => {
        addNoteToList(note);
    })
  }

  // function : to show alert message
  function showAlertMessage(message, alertClass){
    const alertDiv = document.createElement('div');
    alertDiv.className = `message ${alertClass}`;
    alertDiv.appendChild(document.createTextNode(message));
    form.insertAdjacentElement('beforebegin', alertDiv);
    titleInput.focus();
    setTimeout(()=> alertDiv.remove(),2000)

  }

  // function : view note in modal
  function activateNoteModal(title, body){
    const modalTitle = document.querySelector(".modal__title"); 
    const modalBody = document.querySelector(".modal__body"); 
    modalTitle.textContent = title;
    modalBody.textContent = body;
    
    modalContainer.classList.add("active");
  }

  // function : close modal
  const modalBtn = document.querySelector(".modal__button").addEventListener("click", ()=>{
    modalContainer.classList.remove('active');
  })


  // function : Note buttons 
  noteContainer.addEventListener('click', (e)=>{
    if(e.target.classList.contains('note__buttonView')){
        const currentNote = e.target.closest(".note__card");
        const currentTitle = currentNote.querySelector(".note__title").textContent;
        const currentBody = currentNote.querySelector(".note__body").textContent;

        activateNoteModal(currentTitle, currentBody);
    }
    if(e.target.classList.contains("note__buttonDelete")){
        const currentNote = e.target.closest(".note__card");
        showAlertMessage('Your note permanently deleted', 'message__remove');
        currentNote.remove();
        const id = currentNote.querySelector('span').textContent;
        console.log(Number(id));
        removeNote(Number(id));
    }
  })

  // function : Display Notes 
  document.addEventListener('DOMContentLoaded', displayNotes)

// Event : note form submit
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    
    const noteInput = document.querySelector('#note');

    // validate input
    if(titleInput.value.length > 0 && noteInput.value.length > 0){
        const newNote = new Note(titleInput.value, noteInput.value);
        addNoteToList(newNote);
        addNoteToLocalStorage(newNote);
        titleInput.value='';
        noteInput.value='';
        showAlertMessage('Note successfully added', 'message__success');
        titleInput.focus();
    }
    else {
        showAlertMessage('Please add both a title and a note', 'message__alert');

    }
});













