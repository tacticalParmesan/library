import * as ui from "./uiupdate.js";
import { changeThemeButton, toggleDarkMode } from "./theme.js";

export const myLibrary = [];

function Book(title, author, yearOfPublication, pages, readStatus, iconColor) {
	this.title = title;
	this.author = author;
	this.year = yearOfPublication;
	this.pages = pages;
	this.status = readStatus == true ? "Yes" : "To Read";
	this.iconColor = iconColor;
}

function loadEventListeners() {
	ui.uiMain.newBookButton.addEventListener("click", () => {
		ui.modalUI.addBookModal.showModal();
	});

	ui.modalUI.closeModalButton.addEventListener("click", () => {
		ui.modalUI.addBookModal.close();
		ui.resetFormValues();
	});

	ui.modalUI.addBookForm.addEventListener("submit", (ev) => {
		ev.preventDefault();
		ui.modalUI.addBookModal.close();
		addtoLibrary();
		ui.resetFormValues();
	});

	ui.newBookElements.iconColor.addEventListener("input", () => {
		ui.modalUI.bookIconModal.style.color = ui.newBookElements.iconColor.value;
	});

	changeThemeButton.addEventListener("click", toggleDarkMode)
}

document.addEventListener("DOMContentLoaded", () => {
	_displayPlaceholders();
	loadEventListeners();
	ui.updateStatisticsPanel();
});

export function addtoLibrary() {
	const isRead = ui.newBookElements.status.checked ? true : false;
	const newBook = new Book(
		ui.newBookElements.title.value,
		ui.newBookElements.author.value,
		ui.newBookElements.year.value,
		ui.newBookElements.pages.value,
		isRead,
		ui.newBookElements.iconColor.value
	);
	myLibrary.push(newBook);
	ui.updateLibraryUI(myLibrary);
}

export function removeBook(bookIndex) {
	myLibrary.splice(bookIndex, 1);
	ui.updateLibraryUI(myLibrary);
}

export function changeReadStatus(bookIndex) {
	const bookToUpdate = document.querySelector(`div[data-index="${bookIndex}"]`);
	const readStatus = bookToUpdate.querySelector(".book-status");

	if (myLibrary[bookIndex].status == "Yes") {
		myLibrary[bookIndex].status = "To Read";
		readStatus.classList.replace("read", "to-read");
	} else if (myLibrary[bookIndex].status == "To Read") {
		myLibrary[bookIndex].status = "Yes";
		readStatus.classList.replace("to-read", "read");
	}

	readStatus.textContent = myLibrary[bookIndex].status;
	ui.updateStatisticsPanel();
}

/* ========================================================================== */
function _displayPlaceholders() {
	const dune = new Book("Dune", "Frank Herbert", 1965, 865, false, "#b85851");
	const _1984 = new Book("1984", "George Orwell", 1948, 274, true, "#000000");
	const masterAndMargarita = new Book(
		"Master and Margarita",
		"Mikhail Bulgakov",
		1956,
		302,
		true,
		"#12782d"
	);
	const hitchikersGuide = new Book(
		"The Hitchhiker's Guide to the Galaxy",
		"Douglas Adams",
		1979,
		224,
		false,
		"#3966ad"
	);
	myLibrary.push(dune, _1984, masterAndMargarita, hitchikersGuide);
	ui.updateLibraryUI(myLibrary);
}
