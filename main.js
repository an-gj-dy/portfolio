//Function to add delays in For.. loops. Loop must be inside an async function
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

//Mouse tracking background effect
const background = document.querySelector("main");
background.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    background.style.setProperty("--x-coord", `${x}px`);
    background.style.setProperty("--y-coord", `${y}px`);
});

// Make indicator buttons scroll to corresponding element
function scroller() {
    const index = [...this.parentElement.children].indexOf(this);
    const aunt = this.parentElement.nextElementSibling;
    const uncle = this.parentElement.previousElementSibling;
    const scrollOptions = {
        behavior: "smooth",
        inline: "start",
        block: "nearest",
    };
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
                ? auntCousins[index].classList.add("active")
                : auntCousins[index].classList.remove("active");
        } else {
            const uncleCousins = [...uncle.children];
            entry.isIntersecting
                ? uncleCousins[index].classList.add("active")
                : uncleCousins[index].classList.remove("active");
        }
    });
}

// About block scroll functionality
const navBtns = [...document.querySelectorAll(".about__nav-item")];
const aboutContent = [...document.querySelectorAll(".about__content")];

navBtns.forEach((btn) => {
    btn.addEventListener("click", scroller);
    btn.addEventListener("click", () => {
        btn.classList.add("active");
    });
});

const aboutObserver = new IntersectionObserver(changeIndication, {
    threshold: 0.95,
}); // Create observer for About block
aboutContent.forEach((item, index) => {
    item.sibling = index;
    aboutObserver.observe(item);
}); // Attach observer to About block

// Projects scroll functionality
const carouselItems = [...document.querySelector(".project").children];
const carouselDots = [...document.querySelectorAll(".project__dot")];

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

/* 
################
Contact buttons
################
*/

const contactButton = document.querySelector(".contact");

contactButton.addEventListener("mouseover", () => {
    contactButton.classList.remove("contact--cta");
    contactButton.classList.add("contact--hover");
});

contactButton.addEventListener("mouseleave", () => {
    contactButton.classList.add("contact--cta");
    contactButton.classList.remove("contact--hover");
});

const mailAddressButton = document.querySelector(".contact--email");

mailAddressButton.addEventListener("click", () => {
    mailAddressButton.classList.add("copied");
    navigator.clipboard.writeText("ante.dybedahl@gmail.com");
});

mailAddressButton.addEventListener("animationend", () => {
    mailAddressButton.classList.remove("copied");
});
