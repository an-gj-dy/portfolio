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

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const gridContainer = document.querySelector(".home-grid"); //Select the grid container
const gridRowColSize = 8; //Set how many tiles each row and column should have
const gridSize = gridRowColSize * gridRowColSize; //Sets the grid size to make it an even square

//Create the grid tiles and append each tile to the grid
for (let i = 0; i < gridSize; i++) {
    const tileTemplate = document.getElementsByTagName("template")[0];
    const tile = tileTemplate.content.cloneNode(true);
    gridContainer.appendChild(tile);
}
gridContainer.style.gridTemplate = `repeat(${gridRowColSize}, 1fr) / repeat(${gridRowColSize}, 1fr)`;

const gridTiles = [...gridContainer.children]; //Turn all tiles into an array
const gridRows = []; //Store each row as an array
const gridColumns = []; //Store each column as an array

//Create an array of each ROW and store it in gridRows
let x = 0;
for (i = 0; i < gridRowColSize; i++) {
    let y = x + gridRowColSize;
    const rowFromGrid = gridTiles.slice(x, y);
    x += gridRowColSize;
    gridRows.push(rowFromGrid);
}

//Create an array of each COLUMN and store it in gridRows
for (i = 0; i < gridRowColSize; i++) {
    const columnFromGrid = [];
    x = 0;
    for (j = 0; j < gridRowColSize; j++) {
        columnFromGrid.push(gridTiles[i + x]);
        x += gridRowColSize;
    }
    gridColumns.push(columnFromGrid);
}

//Function to add delays in For.. loops. Loop must be inside an async function
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

//Get random x & y position in the grid and types out the menu indicator
async function getRandomGridIndex(string) {
    const wordLength = string.length;
    const randRow = Math.floor(Math.random() * 8);
    const randColumn = Math.floor(Math.random() * (8 - wordLength)); //Make sure the menu indicator won't overflow
    const row = gridRows[randRow];
    for (i = 0; i < wordLength; i++) {
        let startIndex = row[randColumn + i];
        startIndex.classList.toggle("flipped");
        startIndex.children[0].children[0].innerHTML = string[i];
        await delay(80);
    }
}

// Actual function to scramble the text.
function scrambleText(speed, duration, string) {
    let iterations = 0;
    let intervalID = setInterval(() => {
        gridTiles.forEach((tile) => {
            tile.innerHTML =
                characters[Math.floor(Math.random() * characters.length)];
        });
        if (++iterations === duration) {
            getRandomGridIndex(string);
            window.clearInterval(intervalID);
        }
    }, speed);
}

// scrambleText(50, 15, "HOME");

/* Navigation
0 = Home
1 = Projects
3 = Contact
*/

const navButtons = document.querySelector("nav").childNodes;

navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const indexOfClickedButton = [].indexOf.call(
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
