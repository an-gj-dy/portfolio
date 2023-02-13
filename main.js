/* function typeWriter(selector, interval) {
    const stringContainer = document.querySelector(selector);
    const stringToAnimate = Array.from(stringContainer.innerHTML);
    stringContainer.innerHTML = "";
    finishedTyping = false;
    let letterCount = 0;
    let intervalID = setInterval(() => {
        if (letterCount < stringToAnimate.length) {
            stringContainer.innerHTML += stringToAnimate[letterCount];
            letterCount++;
        } else if ((letterCount = stringToAnimate.length)) {
            console.log(intervalID);
            clearInterval(intervalID);
        }
    }, interval);
} */

/* 
###########################
Letter Checkboard Scrambler 
###########################
*/

// Scramble on DOM load

/*
## Tile Index Visualisation 
[ 0] [ 1] [ 2] [ 3] [ 4] [ 5] [ 6] [ 7]
[ 8] [ 9] [10] [11] [12] [13] [14] [15]
[16] [17] [18] [19] [20] [21] [22] [23]
[24] [25] [26] [27] [28] [29] [30] [31]
[32] [33] [34] [35] [36] [37] [38] [39]
[40] [41] [42] [43] [44] [45] [46] [47]
[48] [49] [50] [51] [52] [53] [54] [55]
[56] [57] [58] [59] [60] [61] [62] [63]
*/

// Variables
const letterTiles = Array.from(
    document.querySelectorAll(".home-letters-checkboard p")
);
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const tilesRow1 = letterTiles.slice(0, 8);
const tilesRow2 = letterTiles.slice(8, 16);
const tilesRow3 = letterTiles.slice(16, 24);
const tilesRow4 = letterTiles.slice(24, 32);
const tilesRow5 = letterTiles.slice(32, 40);
const tilesRow6 = letterTiles.slice(40, 48);
const tilesRow7 = letterTiles.slice(48, 56);
const tilesRow8 = letterTiles.slice(56, 64);

const tilesRowArray = [
    tilesRow1,
    tilesRow2,
    tilesRow3,
    tilesRow4,
    tilesRow5,
    tilesRow6,
    tilesRow7,
    tilesRow8,
];

function getRandomCheckboardIndex(string) {
    const wordLength = string.length;
    const randRow = Math.floor(Math.random() * 8);
    const randColumn = Math.floor(Math.random() * (8 - wordLength));
    const row = tilesRowArray[randRow];
    for (i = 0; i < wordLength; i++) {
        let startIndex = row[randColumn + i];
        startIndex.classList.add("selected");
        startIndex.innerHTML = string[i];
    }
}

// Actual function to scramble the text.
function scrambleText(speed, duration, string) {
    let iterations = 0;
    let intervalID = window.setInterval(() => {
        letterTiles.forEach((tile) => {
            tile.innerHTML =
                characters[Math.floor(Math.random() * characters.length)];
        });
        if (++iterations === duration) {
            window.clearInterval(intervalID);
            getRandomCheckboardIndex(string);
        }
    }, speed);
}

scrambleText(50, 15, "HOME");

/* Navigation
0 = Home
1 = Projects
3 = Contact
*/

const navButtons = document.querySelector("nav").childNodes;

navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let indexOfClickedButton = [].indexOf.call(
            e.target.parentNode.children,
            e.target
        );
    });
});

/* 
###############################
Projects Carousel Functionality
###############################
*/

// Variables
const carouselItems = Array.from(
    document.querySelector(".projects-carousel-container").children
);
const dots = document.querySelector(".projects-carousel-dots");

// Makes dots clickable and scroll to corresponding projects card
dots.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.matches(".projects-carousel-dot")) {
        return;
    }
    const index = Array.from(dots.children).indexOf(target);
    const selector = `.projects-carousel-card:nth-child(${index + 1})`;
    const card = document.querySelector(selector);
    card.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
    });
});

// Observer to check which projects card is in view and highlights corresponding dot
const carouselObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const target = entry.target;
            const index = carouselItems.indexOf(target);
            const selector = `.projects-carousel-dot:nth-child(${index + 1})`;
            const dot = document.querySelector(selector);
            if (entry.isIntersecting) {
                dot.classList.add("selected");
            } else {
                dot.classList.remove("selected");
            }
        });
    },
    {
        threshold: 0.85,
    }
);

// Add observer to each projects card
carouselItems.forEach((item) => {
    carouselObserver.observe(item);
});
