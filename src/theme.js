const root = document.querySelector(":root");
const DEFAULT_MODE = "light";
export const changeThemeButton = document.querySelector(".dark");

let currentMode = DEFAULT_MODE;

const lightModeProperties = {
	elementsBackground: "var(--caribbean-current)",
	bodyBackground: "var(--white)",
	themeButtonColor: "black",
    cardsColor: "var(--white)"
};

const darkModeProperties = {
	elementsBackground: "var(--indigo-dye)",
	bodyBackground: "var(--dark-indigo)",
	themeButtonColor: "var(--white)",
    cardsColor: "var(--platinum)"
};

export function toggleDarkMode() {
	if (currentMode === "light") {
		root.style.setProperty(
			"--elements-bgcolor",
			darkModeProperties.elementsBackground
		);

		root.style.setProperty("--body-bgcolor", darkModeProperties.bodyBackground);
		root.style.setProperty("--cards-bgcolor", darkModeProperties.cardsColor)
        changeThemeButton.style.color = darkModeProperties.themeButtonColor;

	} else if (currentMode === "dark") {
		root.style.setProperty(
			"--elements-bgcolor",
			lightModeProperties.elementsBackground
		);

		root.style.setProperty("--body-bgcolor", lightModeProperties.bodyBackground);
		root.style.setProperty("--cards-bgcolor", lightModeProperties.cardsColor)
        changeThemeButton.style.color = lightModeProperties.themeButtonColor;
	}

	currentMode = currentMode == "light" ? "dark" : "light";
}


function loadDefaultMode() {
    if (DEFAULT_MODE !== "light") {
        currentMode = "light"
        toggleDarkMode()
    }
}

loadDefaultMode()