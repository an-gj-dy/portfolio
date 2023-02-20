//Function to add delays in For.. loops. Loop must be inside an async function
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

const scrollOptions = {
    behavior: "smooth",
    inline: "start",
    block: "nearest",
};

function scroller() {
    const index = [...this.parentElement.children].indexOf(this);
    const aunt = this.parentElement.nextElementSibling;
    const uncle = this.parentElement.previousElementSibling;

    if (aunt != null) {
        const auntCousins = [...aunt.children];
        auntCousins[index].scrollIntoView(scrollOptions);
    } else {
        const uncleCousins = [...uncle.children];
        uncleCousins[index].scrollIntoView(scrollOptions);
    }
}

function changeIndication(entries) {
    entries.forEach((entry) => {
        const target = entry.target;
        const index = target.sibling;
        const aunt = target.parentElement.nextElementSibling;
        const uncle = target.parentElement.previousElementSibling;
        if (aunt != null) {
            const auntCousins = [...aunt.children];
            entry.isIntersecting
                ? auntCousins[index].classList.add("in-view")
                : auntCousins[index].classList.remove("in-view");
        } else {
            const uncleCousins = [...uncle.children];
            entry.isIntersecting
                ? uncleCousins[index].classList.add("in-view")
                : uncleCousins[index].classList.remove("in-view");
        }
    });
}

// About block scroll functionality
const navBtns = [...document.querySelectorAll(".about__nav-item")];
const aboutContent = [...document.querySelectorAll(".about__content")];

navBtns.forEach((btn) => {
    btn.addEventListener("click", scroller);
});

const aboutObserver = new IntersectionObserver(changeIndication, {
    threshold: 0.95,
}); // Create observer for About block
aboutContent.forEach((item, index) => {
    item.sibling = index;
    aboutObserver.observe(item);
}); // Attach observer to About block

// Projects scroll functionality
const carouselItems = [...document.querySelector(".carousel").children];
const carouselDots = [...document.querySelectorAll(".carousel__dot")];

carouselDots.forEach((dot) => {
    dot.addEventListener("click", scroller);
});

const carouselObserver = new IntersectionObserver(changeIndication, {
    threshold: 0.55,
}); // Create observer for Projects carousel
carouselItems.forEach((item, index) => {
    item.sibling = index;
    carouselObserver.observe(item);
}); // Attach observer to Projects carousel
