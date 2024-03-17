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
	addBookForm: document.querySelector("form"),
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

	uiElements.addBookForm.addEventListener("submit", (ev) => {
		ev.preventDefault();
		uiElements.addBookModal.close();
		addtoLibrary();
		resetFormValues();
	})
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

	const newBookIcon = document.createElement("span");
	newBookIcon.classList.add("material-symbols-outlined", "book-icon");
	newBookIcon.textContent = "book";
	newBookCard.appendChild(newBookIcon);

	const newBookData = document.createElement("div");
	newBookData.classList.add("book-data");

	for (const key in bookObject) {
		const bookProperty = document.createElement("div");
		bookProperty.classList.add(`book-${String(key)}`);
		bookProperty.textContent = bookObject[key];

		if (bookProperty.textContent.length > 20) {
			bookProperty.style.fontSize = "1rem";
		}

		if (bookProperty.classList[0] === "book-status") {
			if (bookProperty.textContent === "Yes") {
				bookProperty.classList.add("read");
			} else if (bookProperty.textContent === "To Read") {
				bookProperty.classList.add("to-read");
			}
		}

		newBookData.appendChild(bookProperty);
	}

	const buttonsContainer = document.createElement("div");
	buttonsContainer.classList.add("buttons-container");

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
	buttonsContainer.appendChild(deleteBookButton);
	buttonsContainer.appendChild(changeReadStatusButton);
	newBookCard.appendChild(buttonsContainer);
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
	const isRead = newBookElements.status.checked ? true : false;
	const newBook = new Book(
		newBookElements.title.value,
		newBookElements.author.value,
		newBookElements.year.value,
		newBookElements.pages.value,
		isRead
	);
	myLibrary.push(newBook);
	console.log(newBookElements.status);
	updateLibraryUI(myLibrary);
}

function removeBook(bookIndex) {
	myLibrary.splice(bookIndex, 1);
	updateLibraryUI(myLibrary);
}

function changeReadStatus(bookIndex) {
	const bookToUpdate = document.querySelector(`div[data-index="${bookIndex}"]`);
	const readStatus = bookToUpdate.querySelector(".book-status");

	if (myLibrary[bookIndex].status == "Yes") {
		myLibrary[bookIndex].status = "To Read";
		readStatus.classList.replace("read", "to-read");
	}
		
	else if (myLibrary[bookIndex].status == "To Read") {
		myLibrary[bookIndex].status = "Yes";
		readStatus.classList.replace("to-read", "read")
	}

	readStatus.textContent = myLibrary[bookIndex].status;
}

function resetFormValues() {
	for (const field in newBookElements) {
		newBookElements[field].value = null;
	}
}

function _displayPlaceholdes() {
	const dune = new Book("Dune", "Frank Herbert", 1965, 865, false);

	const _1984 = new Book("1984", "George Orwell", 1948, 274, true);
	myLibrary.push(dune, _1984);
	updateLibraryUI(myLibrary);
}

_displayPlaceholdes();
