window.onload = function () {
    render();
}
import library from './library.js';
import {rating, rate, remove} from './rating.js';
////////////
//interface

let all = document.getElementById('all');
////////////////////
//CALY GORNY PASEK
let header = document.createElement('div');
header.classList.add('header');
let panel = document.createElement('div');
panel.classList.add('panel');
let username = document.createElement('h2');
username.textContent = 'Welcome Donquellso';

let pagecount = document.createElement('div');
pagecount.classList.add('pagecount');
let pagecounttext = document.createElement('h3');
pagecounttext.innerHTML='0';
let pagecountimg = document.createElement('img');
pagecountimg.src='images/pagecount.svg';
pagecountimg.classList.add('pagecountimg');
pagecount.appendChild(pagecountimg);
pagecount.appendChild(pagecounttext);

let count = document.createElement('div');
count.classList.add('bookcount');
let bookcountimg = document.createElement('img');
let bookcounttext = document.createElement('h3');
bookcounttext.innerHTML='0';
bookcountimg.src='images/bookcount.svg';
bookcountimg.classList.add('bookcountimg');
count.appendChild(bookcountimg);
count.appendChild(bookcounttext);

panel.appendChild(username);
panel.appendChild(count);
panel.appendChild(pagecount);
header.appendChild(panel);
const createtoggle = document.createElement('div');
createtoggle.classList.add('toggle');
header.appendChild(createtoggle);
all.appendChild(header);
/////////////////////
//CONTENT + STOPKA
let content = document.createElement('div');
content.classList.add('content');
let footer = document.createElement('div');
footer.classList.add('footer');
let footerText = document.createElement('div');
footerText.textContent = 'Made by Donquellso';
footer.appendChild(footerText);
footerText.classList.add('footerText');
all.appendChild(content);
all.appendChild(footer);
/////////////////////
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
//LICZENIE ILOSCI KSIAZEK I STRON W BIBLIOTECE
function calculate(){
let bookcount = library.length;
let pagecount = library.reduce((sum, count) => sum + count.pages, 0);
return {bookcount, pagecount};
};

//////////////////////
//Dodanie ksiazki confirmem
confirmbtn.addEventListener('click', function (e) {
if (inputName.value === '' || pages.value === '' || author.value === '') {
errorText.textContent = 'Fill all fields';
} else{
e.preventDefault();
let newBook = new Books(inputName.value, author.value, pages.valueAsNumber);
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
class Books {
constructor(name, author, pages) {
this.name = name;
this.author = author;
this.pages = pages;
this.isRead = true;
this.rate = 0;
}
//Dodanie ksiazki
static addTile(Book){
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

readbtn.onclick = function () {
    readbtn.src = Book.isRead ? 'images/cancel.svg' : 'images/confirm.svg';
    Book.isRead = !Book.isRead;
};
//ratingowanie

let ratingCopy = rating.cloneNode(true);
ratingCopy.classList.add('ratingCopy');
let items = ratingCopy.querySelectorAll('.nstar');
rate(Book.rate, items);

items.forEach(function(item, index){
item.addEventListener('click',function(){
  Book.rate = rate(index, items);
});
});
//////////
tile.appendChild(removebtn);
tile.appendChild(readbtn);
tile.appendChild(title);
tile.appendChild(authorText);
tile.appendChild(pagesText);
tile.appendChild(ratingCopy);
content.appendChild(tile);
}
}
////////////
//Render
function render(){
content.innerHTML='';
console.log(library);
library.forEach(function(Book){
Books.addTile(Book);
bookcounttext.innerHTML=`${calculate().bookcount}`;
pagecounttext.innerHTML=`${calculate().pagecount}`;
console.log(calculate().bookcount);
});
bookcounttext.innerHTML=`${calculate().bookcount}`;
pagecounttext.innerHTML=`${calculate().pagecount}`;
}
///////////


