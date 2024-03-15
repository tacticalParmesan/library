import * as ui from "./ui.js"

const myLibrary = [];

function Book(title, author, yearOfPublication, pages, readStatus) {
	this.title = title;
	this.author = author;
	this.yearOfPublication = yearOfPublication;
	this.pages = pages;
	this.readStatus = readStatus;
}

function updateLibrary() {
	
}

function addtoLibrary(newBook) {
	myLibrary.push(newBook);
	updateLibrary();
}
