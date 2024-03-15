import * as ui from "./ui.js"

const myLibrary = [];

function Book(title, author, yearOfPublication, pages, readStatus) {
	this.title = title;
	this.author = author;
	this.year = yearOfPublication;
	this.pages = pages;
	this.status = readStatus;
}



function addtoLibrary(newBook) {
	myLibrary.push(newBook);
}

const bookOne = new Book("Dune", "Frank Herbert", 1965, 895, false)
const bookTwo = new Book("Crime and Punishment", "Fedor Dostoevsky", 1866, 430, false)
const bookThree = new Book("Master and Margarita", "Mikhail Bulgakov", 1967, 372, true)
myLibrary.push(bookOne, bookTwo, bookThree)
console.log(myLibrary);

ui.updateLibraryUI(myLibrary)