const words = [
    "javascript", "computer", "hangman", "website",
    "coding", "mobile", "browser", "canvas",
    "program", "internet", "keyboard", "button"
];

let selectedWord = "";
let displayedWord = [];
let wrongAttempts = 0;
const maxAttempts = 6;

// DOM elements
const wordDisplay = document.getElementById("word-display");
const letterContainer = document.getElementById("letters");
const wrongCount = document.getElementById("wrong-count");
const resetBtn = document.getElementById("reset-btn");

function startGame() {
    // Pick random word
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(selectedWord.length).fill("_");
    wrongAttempts = 0;
    wrongCount.textContent = wrongAttempts;

    // Display blank word
    wordDisplay.textContent = displayedWord.join(" ");

    // Create buttons A–Z
    letterContainer.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const btn = document.createElement("button");
        btn.textContent = String.fromCharCode(i);
        btn.addEventListener("click", () => handleGuess(btn));
        letterContainer.appendChild(btn);
    }
}

function handleGuess(button) {
    const letter = button.textContent.toLowerCase();
    button.classList.add("used");
    button.disabled = true;

    if (selectedWord.includes(letter)) {
        // Correct guess
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                displayedWord[i] = letter;
            }
        }
        wordDisplay.textContent = displayedWord.join(" ");

        // Win check
        if (!displayedWord.includes("_")) {
            setTimeout(() => alert("🎉 You Win!"), 200);
        }
    } else {
        // Wrong guess
        wrongAttempts++;
        wrongCount.textContent = wrongAttempts;

        if (wrongAttempts >= maxAttempts) {
            wordDisplay.textContent = selectedWord.split("").join(" ");
            setTimeout(() => alert("❌ Game Over! The word was: " + selectedWord), 200);
        }
    }
}

// Restart
resetBtn.addEventListener("click", startGame);

// Initialize
startGame();
