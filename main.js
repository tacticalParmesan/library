const myLibrary = [];

function Book(title, author, yearOfPublication, pages, readStatus) {
	this.title = title;
	this.author = author;
	this.year = yearOfPublication;
	this.pages = pages;
	this.status = readStatus == true ? "Yes" : "To Read";
}

/* ================= User Interface ================ */

const uiElements = {
	newBookButton: document.querySelector("#new-book-btn"),
	addBookModal: document.querySelector("dialog"),
	submitBookButton: document.querySelector("button[type=submit]"),
	closeModalButton: document.querySelector("#close-modal-btn"),
	libraryDisplay: document.querySelector(".books-container"),
	libraryDisplayList: document.querySelectorAll,
};

const newBookElements = {
	title: document.querySelector("input[id=title]"),
	author: document.querySelector("input[id=author]"),
	year: document.querySelector("input[id=year]"),
	pages: document.querySelector("input[id=pages]"),
	status: document.querySelector("input[id=status]"),
};

function loadUIEventListeners() {
	uiElements.newBookButton.addEventListener("click", () => {
		uiElements.addBookModal.showModal();
	});

	uiElements.closeModalButton.addEventListener("click", () => {
		uiElements.addBookModal.close();
		resetFormValues();
	});

	uiElements.submitBookButton.addEventListener("click", (clickEvent) => {
		clickEvent.preventDefault();
		uiElements.addBookModal.close();
		addtoLibrary();
		resetFormValues();
	});
}

// Card creation process

function updateLibraryUI(libraryArray) {
	removeAllCards(uiElements.libraryDisplay);

	for (let i = 0; i < libraryArray.length; i++) {
		const bookIndex = i;
		createBookCard(libraryArray[i], bookIndex);
	}
}

function createBookCard(bookObject, bookIndex) {
	const newBookCard = document.createElement("div");
	newBookCard.classList.add("book-item");
	newBookCard.setAttribute("data-index", bookIndex);

	const newBookIcon = document.createElement("div");
	newBookIcon.classList.add("book-icon");
	newBookIcon.textContent = "📙";
	newBookCard.appendChild(newBookIcon);

	const newBookData = document.createElement("div");
	newBookData.classList.add("book-data");

	for (const key in bookObject) {
		const bookProperty = document.createElement("div");
		bookProperty.classList.add(`book-${String(key)}`);
		bookProperty.textContent = bookObject[key];
		newBookData.appendChild(bookProperty);
	}

	const deleteBookButton = document.createElement("button");
	deleteBookButton.classList.add("delete-book-btn");
	deleteBookButton.textContent = "Delete";
	deleteBookButton.addEventListener("click", () => removeBook(bookIndex));

	const changeReadStatusButton = document.createElement("button");
	changeReadStatusButton.classList.add("mark-read-btn");
	changeReadStatusButton.textContent = "Read?";
	changeReadStatusButton.addEventListener("click", () =>
		changeReadStatus(bookIndex)
	);

	newBookCard.appendChild(newBookData);
	newBookCard.appendChild(deleteBookButton);
	newBookCard.appendChild(changeReadStatusButton);
	uiElements.libraryDisplay.appendChild(newBookCard);
}

function removeAllCards(parentNode) {
	while (parentNode.firstChild) {
		parentNode.removeChild(parentNode.firstChild);
	}
}

/* =============== Data Managment and Library Logic ============== */

document.addEventListener("DOMContentLoaded", () => {
	loadUIEventListeners();
});

function addtoLibrary() {
	const isRead = (newBookElements.status.checked) ? true : false;
	const newBook = new Book(
		newBookElements.title.value,
		newBookElements.author.value,
		newBookElements.year.value,
		newBookElements.pages.value,
		isRead
	);
	myLibrary.push(newBook);
	console.log(newBookElements.status)
	updateLibraryUI(myLibrary);
}

function removeBook(bookIndex) {
	myLibrary.splice(bookIndex, 1);
	updateLibraryUI(myLibrary);
}

function changeReadStatus(bookIndex) {

	if (myLibrary[bookIndex].status == "Yes")
		myLibrary[bookIndex].status = "To Read";
	else if (myLibrary[bookIndex].status == "To Read")
		myLibrary[bookIndex].status = "Yes";

	const bookToUpdate = document.querySelector(`div[data-index="${bookIndex}"]`);
	const readStatus = bookToUpdate.querySelector(".book-status");
	readStatus.textContent = myLibrary[bookIndex].status;
}

function resetFormValues() {
	for (const field in newBookElements) {
		newBookElements[field].value = null;
	}
}
