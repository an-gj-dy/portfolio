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

const prevButton = document.querySelector(".projects-carousel-button.prev");
const nextButton = document.querySelector(".projects-carousel-button.next");
const carouselItems = Array.from(
    document.querySelector(".projects-carousel-container").children
);
const dots = document.querySelector(".projects-carousel-dots");
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

const carouselObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const target = entry.target;
            const index = carouselItems.indexOf(target);
            const selector = `.projects-carousel-dot:nth-child(${index + 1})`;
            const dot = document.querySelector(selector);
            if (entry.isIntersecting) {
                dot.style.width = "40px";
                dot.style.background = "hsl(0,0%,40%)";
            } else {
                dot.style.width = "20px";
                dot.style.background = "hsl(0, 0%, 70%)";
            }
        });
    },
    {
        threshold: 0.51,
    }
);

carouselItems.forEach((item) => {
    carouselObserver.observe(item);
});
