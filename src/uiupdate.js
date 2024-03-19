import {
	myLibrary,
	changeReadStatus,
	removeBook,
} from "./main.js";

export const newBookElements = {
	title: document.querySelector("input[id=title]"),
	author: document.querySelector("input[id=author]"),
	year: document.querySelector("input[id=year]"),
	pages: document.querySelector("input[id=pages]"),
	status: document.querySelector("input[id=status]"),
	iconColor: document.querySelector("input[id=color]"),
};

export const uiMain = {
	newBookButton: document.querySelector("#new-book-btn"),
	libraryDisplay: document.querySelector(".books-container"),
	libraryDisplayList: document.querySelectorAll,
};

export const statsPanel = {
	totalBooks: document.querySelector(".total-books"),
	readBooks: document.querySelector(".read-books"),
	percentageRead: document.querySelector(".percentage-read"),
	totalPages: document.querySelector(".total-pages"),
};

export const modalUI = {
	addBookModal: document.querySelector("dialog"),
	addBookForm: document.querySelector("form"),
	closeModalButton: document.querySelector("#close-modal-btn"),
	bookIconModal: document.querySelector(".book-creation"),
};

export function resetFormValues() {
	for (const field in newBookElements) {
		newBookElements[field].value = null;
	}
	modalUI.bookIconModal.style.color = "black";
}

export function updateLibraryUI(libraryArray) {
	removeAllCards(uiMain.libraryDisplay);

	for (let i = 0; i < libraryArray.length; i++) {
		const bookIndex = i;
		createBookCard(libraryArray[i], bookIndex);
	}
	updateStatisticsPanel();
}

export function createBookCard(bookObject, bookIndex) {

	function createNewCard() {
		const newBookCard = document.createElement("div");
		newBookCard.classList.add("book-item");
		newBookCard.setAttribute("data-index", bookIndex);
		return newBookCard;
	}

	function createNewIcon(card) {
		const newBookIcon = document.createElement("span");
		newBookIcon.classList.add("material-symbols-outlined", "book-icon");
		newBookIcon.textContent = "book";
		newBookIcon.style.color = bookObject.iconColor;
		card.appendChild(newBookIcon);
	}

	function loadBookData(card) {
		const newBookData = document.createElement("div");
		newBookData.classList.add("book-data");

		for (const key in bookObject) {
			const bookProperty = document.createElement("div");
			bookProperty.classList.add(`book-${String(key)}`);

			if (bookProperty.classList[0] !== "book-iconColor")
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

		card.appendChild(newBookData);
	}

	function createButtons(card) {
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

		buttonsContainer.appendChild(deleteBookButton)
        buttonsContainer.appendChild(changeReadStatusButton);
        card.appendChild(buttonsContainer)
	}

    const newBookCard = createNewCard();
    createNewIcon(newBookCard);
    loadBookData(newBookCard);
    createButtons(newBookCard)
	uiMain.libraryDisplay.appendChild(newBookCard);
}

export function removeAllCards(parentNode) {
	while (parentNode.firstChild) {
		parentNode.removeChild(parentNode.firstChild);
	}
}

export function updateStatisticsPanel() {
	const readBooksArray = myLibrary.filter((book) => book.status == "Yes");

	let totalPagesRead = 0;
	for (const book of readBooksArray) {
		totalPagesRead += +book.pages;
	}

	statsPanel.totalBooks.textContent = myLibrary.length;
	statsPanel.readBooks.textContent = readBooksArray.length;
	statsPanel.percentageRead.textContent =
		Math.round((readBooksArray.length / myLibrary.length) * 100) + "%";
	statsPanel.totalPages.textContent = totalPagesRead;
}
