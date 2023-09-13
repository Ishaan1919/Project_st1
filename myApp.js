// C R U D

let addNoteContainer = document.getElementById("addNoteContainer");

// let speechRecognition = new webkitSpeechRecognition();
// speechRecognition.continuous = true;
// speechRecognition.interimResults = true;

// speechRecognition.start();

// speechRecognition.onstart = function(event) {
//     var transcript = event.results[0][0].transcript;
//     var confidence = event.results[0][0].confidence;
//     console.log(transcript);
// };


function showAllNotes(){
    addNoteContainer.style.display = 'none';
    let allNotes;
    let notes = localStorage.getItem("notes")
    if(notes===null){
        allNotes=[];
    }
    else{
        allNotes = JSON.parse(notes);
    }
    let notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    allNotes.forEach((note,index) => {
        notesToBeShown = `<div class="card" style="width: 21rem;hight:21rem ">
                            <div class="card-body" >
                                <h5 class="card-title">${note.title}</h5>
                                <p class="card-text">${note.descp}</p>
                                <div style="display: flex; justify-content: space-between; margin-top: 20px">
                                <div>
                                <p id="categorytext" style="">Category: </p>
                                <p style="margin-top:-13px">${note.category}</p>
                                </div>
                                <div>
                                <p id="date" style="">Date: </p>
                                <p style="margin-top:-13px">${note.date}</p></div>
                                </div>
                                <button class="btn  card_btns" style="width: 80px; border-radius:6px;background-color: aqua; margin-right:12px" onclick="deleteNote(${index})">Delete</button>
                                <button class="btn  card_btns" style="width: 80px; border-radius:6px;background-color: aqua;" onclick="editNote(${index})">Edit</button>
                            </div>
                        </div>`
                        notesContainer.innerHTML += notesToBeShown;
    });
}

showAllNotes()





let addNoteBtn = document.getElementById('addNote')
addNoteBtn.addEventListener('click',function(){
    let allNotes;
    let notes = localStorage.getItem("notes")
    if(notes===null){
        allNotes=[];
    }
    else{
        allNotes = JSON.parse(notes);
    }
    let title = document.getElementById('title');
    let descp = document.getElementById('descp');
    let category = document.getElementById('note-category-select');
    let date = document.getElementById('taskDate');
    let newNoteObj = {
        title : title.value,
        descp : descp.value,
        category : category.value,
        date : date.value
    }

    if(addNoteBtn.innerText==='Update'){
        let editCard = document.querySelector('.card')
        let editIndex = editCard.getAttribute('editIndex')
        allNotes[editIndex] = newNoteObj
    }
    else{
        allNotes.push(newNoteObj);
    }
    localStorage.setItem("notes",JSON.stringify(allNotes));
    title.value = "";
    descp.value = "";
    showAllNotes();
})

let navAddNoteBtn = document.getElementById('navAddNote')
navAddNoteBtn.addEventListener('click',function(){
    addNoteContainer.style.display = 'block';
    addNoteBtn.innerText='Save';
})

function deleteNote(noteIndex){
    let allNotes = JSON.parse(localStorage.getItem('notes'));
    allNotes.splice(noteIndex,1);
    localStorage.setItem("notes",JSON.stringify(allNotes));
    showAllNotes();
}

function editNote(noteIndex){
    let allNotes = JSON.parse(localStorage.getItem('notes'));
    addNoteContainer.style.display = 'block';
    addNoteBtn.innerText = 'Update';

    let title = document.getElementById('title');
    let descp = document.getElementById('descp');
    let category = document.getElementById('note-category-select')
    let dateInput = document.getElementById('taskDate')
    title.value = allNotes[noteIndex].title;
    descp.value = allNotes[noteIndex].descp;
    category.value = allNotes[noteIndex].category;
    dateInput.value = allNotes[noteIndex].date;

    let editCard = document.querySelector('.card')
    editCard.setAttribute('editIndex',`${noteIndex}`)
}


let search = document.getElementById('search');
search.addEventListener('input',function(){
    let inputValue = search.value.toLowerCase();
    let allCards = document.getElementsByClassName('card');
    Array.from(allCards).forEach(function(ele){
        let cardText = ele.getElementsByTagName('p')[0].innerText
        if(cardText.toLowerCase().includes(inputValue)){
            ele.style.display = 'block';
        }
        else{
            ele.style.display = 'none';
        }
    })
})
// document.querySelector("#micButton").addEventListener("click",function(e){
//     e.target.classList.toggle("micEnabled");
//     e.target.classList.toggle("micDisabed");
//     if(e.target.classList.contains("micEnabled")){
//         speechRecognition.start();
//     }
// })

let navCategory = document.getElementById('nav-category-select');
navCategory.addEventListener('change',function(){
    console.log("changed");

    let catValue = navCategory.value;
    if(catValue == "All"){
        catValue  = "";
    }
    console.log(catValue);
    let allCards = document.getElementsByClassName('card');
    Array.from(allCards).forEach(function(ele){
        // console.log(ele.querySelector(".card-body").querySelector("#categorytext").innerText);
        let cardText = ele.querySelector(".card-body").querySelector("#categorytext").innerText;
        if(cardText.includes(catValue)){
            ele.style.display = 'block';
        }
        else{
            ele.style.display = 'none';
        }
    });
})

