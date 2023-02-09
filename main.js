const terminalText = (selector, string) => {
    const heading = document.querySelector(selector);
    const stringToAnimate = string;
    let letterCount = 0;
    setInterval(() => {
        if (letterCount < stringToAnimate.length) {
            heading.innerHTML += stringToAnimate[letterCount];
            letterCount++;
        }
    }, 100);
};

setTimeout(terminalText, 1000, "h1", "Ante Dybedahl");
