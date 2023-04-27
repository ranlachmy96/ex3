let numBoxes = 0;
let flag = 0;
let lastIndex = 0;
let letter1 = null;
let letter2 = null;
let box1, box2;
let letterholder;
let startingWord = "Start/ADD";
class Box {
    constructor() {
        this.width = "80px";
        this.height = "80px";
    }
    getWidth() {
        return parseInt(this.width) + numBoxes * 20 + "px";
    }
    getHeight() {
        return parseInt(this.height) + numBoxes * 20 + "px";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const startingWordElement = document.createElement("div");
    startingWordElement.style.color = "#FFFFFF";
    startingWordElement.style.fontFamily = "Amiko";
    startingWordElement.style.fontSize = "14px";
    startingWordElement.style.display = "flex";
    startingWordElement.style.justifyContent = "center";
    startingWordElement.style.alignItems = "center";
    startingWordElement.style.height = "100%";
    startingWordElement.innerHTML = startingWord;
    document.getElementsByTagName("section")[0].appendChild(startingWordElement);
});
function toggleLetterDisplay() {
    let letterSpan = this.querySelector("span");
    if (letterSpan.style.display === "none" && letter1 == null) {
        letterSpan.style.display = "block";
        box1 = this;
        letter1 = letterSpan;
        box1.style.pointerEvents = "none";
    }
    if (letterSpan.style.display === "none" && letter2 == null) {
        letterSpan.style.display = "block";
        box2 = this;
        letter2 = letterSpan;
        box2.style.pointerEvents = "none;"
    }
    if (letter1 != null && letter2 != null) {
        if (letter1.innerHTML === letter2.innerHTML) {
            box1.style.backgroundColor = "green";
            box2.style.backgroundColor = "green";
            letter1 = null;
            letter2 = null;
            box1 = undefined;
            box2 = undefined;
        }
        else {
            setTimeout(function () {
                box1.style.backgroundColor = "black";
                box2.style.backgroundColor = "black";
                letter1.style.display = "none";
                letter2.style.display = "none";
                letter1 = null;
                letter2 = null;
                box1 = undefined;
                box2 = undefined;
            }, 1000);
            box1.style.backgroundColor = "red";
            box2.style.backgroundColor = "red";
            box1.style.pointerEvents = "";
            box2.style.pointerEvents = "";
        }
    }
}
function createPairs() {
    let pairs = [];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    while (pairs.length < 10) {
        const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (pairs.filter(pair => pair === letter).length < 2) {
            pairs.push(letter);
        }
    }
    return pairs.concat(pairs).sort(() => Math.random() - 0.5);
}
const letterPairs = createPairs();
document.getElementsByTagName("section")[0].onclick = function () {
    for (i = 0; i < 3; i++) {
        let divObj = document.createElement("div");
        let b = new Box();
        divObj.style.backgroundColor = "black";
        divObj.style.width = b.getWidth();
        divObj.style.height = b.getHeight();
        divObj.style.marginTop = "120px";
        divObj.classList.add("blackBox");
        divObj.style.color = "#FFFFFF";
        divObj.style.fontSize = "64px";
        divObj.style.fontFamily = "Amiko";
        divObj.style.display = "flex";
        divObj.style.justifyContent = "center";
        divObj.style.alignItems = "center";
        document.getElementById("main-bar").appendChild(divObj);
        numBoxes++;
        let letterSpan = document.createElement("span");
        if (i % 2 == 0) {
            letterholder = letterPairs[lastIndex++];
        }
        letterSpan.innerHTML = letterholder;
        letterSpan.style.display = "none";
        divObj.appendChild(letterSpan);
    }
    if (numBoxes > 6 && flag == 0) {
        document.getElementById("main-for-layout3").style.height = "100%";
        flag = 1;
    }
}
document.getElementById("main-bar").addEventListener("click", function (event) {
    if (event.target.classList.contains("blackBox")) {
        toggleLetterDisplay.call(event.target);
    }
});


