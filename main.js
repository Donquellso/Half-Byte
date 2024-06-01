window.onload = function () {
    render();
}
////////////
//interface
const library = [
{
name: 'Harry Potter',
author: 'J.K. Rowling',
pages: 300,
isRead: true,
},
{
name: 'Wiedźmin',
author: 'Andrzej Sapkowski',
pages: 400,
isRead: false,
},
{
name: 'Hobbit',
author: 'J.R.R. Tolkien',
pages: 500,
isRead: true,
},
{
name: 'W pustyni i w puszczy',
author: 'Henry Sienkiewicz',
pages: 200,
isRead: false,
},
{
name: 'Magiczne drzewo',
author: 'Andrzej Maleszka',
pages: 100,
isRead: true,
}
];
let all = document.getElementById('all');
let header = document.createElement('div');
header.classList.add('header');
let panel = document.createElement('div');
panel.classList.add('panel');
let username = document.createElement('h2');
username.textContent = 'Welcome Donquellso';
let count = document.createElement('div');
let pagecount = document.createElement('div');
panel.appendChild(username);
panel.appendChild(count);
panel.appendChild(pagecount);
header.appendChild(panel);

const createtoggle = document.createElement('div');
createtoggle.classList.add('toggle');
header.appendChild(createtoggle);
let content = document.createElement('div');
content.classList.add('content');
let footer = document.createElement('div');
footer.classList.add('footer');
let footerText = document.createElement('div');
footerText.textContent = 'Made by Donquellso';
footer.appendChild(footerText);
footerText.classList.add('footerText');
all.appendChild(header);
all.appendChild(content);
all.appendChild(footer);
//modal
let modal = document.getElementById('modal');
let confirmbtn = document.getElementById('confirm');
let cancelbtn = document.getElementById('cancel');
let inputName = document.getElementById('name');
let pages = document.getElementById('pages');
let author = document.getElementById('author');
let modalContent = document.getElementById('modalcontent');
let errorText = document.createElement('div');
errorText.classList.add('error');
modalContent.appendChild(errorText);
//////////////////////
//Odpalenie modala
createtoggle.addEventListener('click', function () {
modal.style.display='grid';
inputName.value='';
pages.value='';
author.value='';
errorText.textContent='';
});


//////////////////////
//Dodanie ksiazki confirmem
confirmbtn.addEventListener('click', function (e) {
if (inputName.value === '' || pages.value === '' || author.value === '') {
errorText.textContent = 'Fill all fields';
} else{
e.preventDefault();
let newBook = new Book(inputName.value, author.value, pages.value);
library.push(newBook);
modal.style.display='none';
render();
}
});
cancelbtn.addEventListener('click', function (e) {
e.preventDefault();
modal.style.display='none';
});
//////////////////////
//Konstruktor
function Book(name, author, pages) {
this.name = name;
this.author = author;
this.pages = pages;
this.isRead = true;
}
//Dodanie ksiazki
function addTile(Book){
let tile = document.createElement('div');
tile.classList.add('tile');

let title = document.createElement('h2');
title.textContent = Book.name;

let authorText = document.createElement('div');
authorText.textContent = 'By ' + Book.author;

let pagesText = document.createElement('div');
pagesText.textContent = Book.pages + ' pages';

let removebtn = document.createElement('img');
removebtn.classList.add('removebtn');
removebtn.src = 'images/remove.svg';
removebtn.addEventListener('click', ()=>{
library.splice(library.indexOf(Book), 1);
render();
});

let readbtn = document.createElement('img');
readbtn.classList.add('readbtn');
readbtn.src = Book.isRead ? 'images/confirm.svg' : 'images/cancel.svg';

console.log(Book.isRead);
readbtn.onclick = function () {
    readbtn.src = Book.isRead ? 'images/cancel.svg' : 'images/confirm.svg';
    Book.isRead = !Book.isRead;
    console.log(Book.isRead);
};
tile.appendChild(removebtn);
tile.appendChild(readbtn);
tile.appendChild(title);
tile.appendChild(authorText);
tile.appendChild(pagesText);
content.appendChild(tile);
}

////////////
//Render
function render(){
content.innerHTML='';
library.forEach(function(Book){
addTile(Book);
});
}
///////////


