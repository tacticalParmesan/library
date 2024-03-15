// User interface references
const newBookButton = document.querySelector("#new-book-btn");
const libraryDisplay = document.querySelector(".books-container");

function loadDefaultEventListeners() {
	newBookButton.addEventListener("click", () => {
		alert("Showing modal...");
	});
}

// Attaching event listeners on page load
document.addEventListener("DOMContentLoaded", loadDefaultEventListeners);

// Card creation process
export function updateLibraryUI(libraryArray) {
	for (let i = 0; i < libraryArray.length; i++) {
		const bookIndex = i;
		createBookCard(libraryArray[i], bookIndex)
	}
}

function createBookCard(bookObject, bookIndex) {

	const newBookCard = document.createElement("div");
	newBookCard.classList.add("book-item");
	newBookCard.setAttribute("data-index", bookIndex);

	const newBookIcon = document.createElement("div");
	newBookIcon.classList.add("book-icon")
	newBookIcon.textContent = "📙";
	newBookCard.appendChild(newBookIcon)

	const newBookData = document.createElement("div")
	newBookData.classList.add("book-data")

	for (const key in bookObject) {
		const bookProperty = document.createElement("div");
		bookProperty.classList.add(`book-${String(key)}`)
		
		if (bookProperty.classList[0] !== "book-status") {
			bookProperty.textContent = bookObject[key];
		}

		else {
			const readCheckbox = document.createElement("input")
			readCheckbox.setAttribute("type", "checkbox");
			bookProperty.appendChild(readCheckbox)
		}

		newBookData.appendChild(bookProperty)

	}

	newBookCard.appendChild(newBookData);

	libraryDisplay.appendChild(newBookCard)
}
