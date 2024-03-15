// User interface references
const newBookButton = document.querySelector("#new-book-btn");

function loadDefaultEventListeners() {
	newBookButton.addEventListener("click", () => {
		console.log("Showing modal...")
	})
}

// Attaching event listeners on page load
document.addEventListener("DOMContentLoaded", loadDefaultEventListeners);
