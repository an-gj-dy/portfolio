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

const letterTiles = document.querySelectorAll(".home-letters-checkboard p");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

scrambleText(50, 15);

letterTiles.forEach((tile) => {
    tile.innerHTML = characters[Math.floor(Math.random() * characters.length)];
});

function scrambleText(speed, duration) {
    let iterations = 0;
    let intervalID = window.setInterval(() => {
        letterTiles.forEach((tile) => {
            tile.innerHTML =
                characters[Math.floor(Math.random() * characters.length)];
        });
        if (++iterations === duration) {
            window.clearInterval(intervalID);
        }
    }, speed);
}

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

const cardArray = Array.from(
    document.querySelectorAll(".projects-carousel-card")
);
const cardWith = cardArray[0].getBoundingClientRect().width;

const setCarouselCardPositions = (card, index) => {
    console.log((card.style.left = (cardWith + 20) * index + "px"));
};

cardArray.forEach(setCarouselCardPositions);
