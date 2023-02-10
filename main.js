function typeWriter(selector, interval) {
    const stringContainer = document.querySelector(selector);
    const stringToAnimate = Array.from(stringContainer.innerHTML);
    let finished = false;
    stringContainer.innerHTML = "";
    let letterCount = 0;
    let intervalID = setInterval(() => {
        if (letterCount < stringToAnimate.length) {
            stringContainer.innerHTML += stringToAnimate[letterCount];
            letterCount++;
        } else if ((letterCount = stringToAnimate.length)) {
            clearInterval(intervalID);
            finished = true;
        }
    }, interval);
}

window.addEventListener("DOMContentLoaded", typeWriter("h1", 100));
