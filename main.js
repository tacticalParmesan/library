const myLibrary = [];

function Book(title, author, yearOfPublication, pages, readStatus) {
	this.title = title;
	this.author = author;
	this.year = yearOfPublication;
	this.pages = pages;
	this.status = readStatus;
}

/* ================= User Interface ================ */

const uiElements = {
	newBookButton: document.querySelector("#new-book-btn"),
	addBookModal: document.querySelector("dialog"),
	submitBookButton: document.querySelector("button[type=submit]"),
	closeModalButton: document.querySelector("#close-modal-btn"),
	libraryDisplay: document.querySelector(".books-container"),
	libraryDisplayList: document.querySelectorAll
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

	removeAllCards(uiElements.libraryDisplay)

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

		if (bookProperty.classList[0] !== "book-status") {
			bookProperty.textContent = bookObject[key];
		} else {
			const readCheckbox = document.createElement("input");
			readCheckbox.setAttribute("type", "checkbox");

			if (bookObject["status"] === "on") readCheckbox.checked = true;
			bookProperty.appendChild(readCheckbox);
		}

		newBookData.appendChild(bookProperty);
	}

	const deleteBookButton = document.createElement("button")
	deleteBookButton.classList.add("delete-book-btn")
	deleteBookButton.addEventListener("click", () => removeBook(bookIndex))

	newBookCard.appendChild(newBookData);
	newBookCard.appendChild(deleteBookButton);

	uiElements.libraryDisplay.appendChild(newBookCard);
}

function removeAllCards(parentNode) {
	while(parentNode.firstChild) {
		parentNode.removeChild(parentNode.firstChild)
	}
}

/* =============== Data Managment and Library Logic ============== */

document.addEventListener("DOMContentLoaded", () => {
	loadUIEventListeners();
});

function addtoLibrary() {
	const newBook = new Book(
		newBookElements.title.value,
		newBookElements.author.value,
		newBookElements.year.value,
		newBookElements.pages.value,
		newBookElements.status.value
	);
	myLibrary.push(newBook);
	updateLibraryUI(myLibrary);
}

function removeBook(bookIndex) {
	myLibrary.splice(bookIndex, 1)
	updateLibraryUI(myLibrary)
}

function resetFormValues() {
	for (const field in newBookElements) {
		newBookElements[field].value = null;
	}
}
