//Function to add delays in For.. loops. Loop must be inside an async function
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

/* 
###############################
Header Menu Indicator
###############################
*/

/* Navigation
0 = Home
1 = Projects
3 = Contact
*/

const navButtons = document.querySelector(".about__nav").childNodes;

navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const indexOfClickedButton = [].indexOf.call(
            e.target.parentNode.children,
            e.target
        );
        console.log(indexOfClickedButton);
    });
});

/* 
###############################
Projects Carousel Functionality
###############################
*/

// Variables
const carouselItems = Array.from(document.querySelector(".carousel").children);
const dots = document.querySelector(".carousel__dots");

// Makes dots clickable and scroll to corresponding projects card
dots.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.matches(".carousel__dot")) {
        return;
    }
    const index = Array.from(dots.children).indexOf(target);
    const selector = `.carousel__card:nth-child(${index + 1})`;
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
            const selector = `.carousel__dot:nth-child(${index + 1})`;
            const dot = document.querySelector(selector);
            if (entry.isIntersecting) {
                dot.classList.add("carousel__dot--selected");
            } else {
                dot.classList.remove("carousel__dot--selected");
            }
        });
    },
    {
        threshold: 0.55, // How much of the next image should be visible before animation start (1=100%, 0=0%)
    }
);

// Add observer to each projects card
carouselItems.forEach((item) => {
    carouselObserver.observe(item);
});
