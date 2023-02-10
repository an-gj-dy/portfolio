function typeWriter(selector, interval) {
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
}

const fullNameTypeWriter = typeWriter("h1", 100);
