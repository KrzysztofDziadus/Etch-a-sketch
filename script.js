let btnBorder = document.querySelector(".btnBorder");
let gridBox = document.querySelector(".grid");
let sizeSLizer = document.querySelector(".number");
let randomColorBtn = document.querySelector(".btnRandomColor");
let rainbowBtn = document.querySelector(".rainbow");
let clearBtn = document.querySelector(".btnClear");
let colorBtn = document.querySelector('.colorBtn');
let eraserBtn = document.querySelector(".eraser");
let spanBox = document.querySelector('.spanBox');
let displaySize = document.querySelector(".displayNumber");
let paintBtn = document.querySelector(".paint");


const DEFAULT_SIZE = 15;
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = '#333333';

let stopFunction = false;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


function setCurrentMode(mode) {
    activeButton(mode);
    currentMode = mode;
}

function setCurrentSize(size) {
    currentSize = size;
}

function setCurrentColor(color) {
    currentColor = color;
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize)
}

function clearGrid() {
    gridBox.innerHTML = '';
    setCurrentMode(DEFAULT_MODE)

}

function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}

let randomRGB = function () {
    return `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`
}

function setupGrid(size) {
    gridBox.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridBox.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size ** 2; i++) {
        let gridChild = document.createElement('div');
        gridChild.classList.add('boxStyle');
        gridBox.appendChild(gridChild);
        gridChild.addEventListener('mouseover', changeColor);
        gridChild.addEventListener('click', changeColor);
    }
}


function toggleBorder() {
    if (isClicked()) {
        btnBorder.textContent = 'Hide Border'
    } else {
        btnBorder.textContent = 'Show Border'
    }
    let gridChildren = document.querySelectorAll('.boxStyle')
    let lastColumnChilds = document.querySelectorAll(`.boxStyle:nth-child(${currentSize}n)`)
    for (let i = 0; i < gridChildren.length; i++) {
        gridChildren[i].classList.toggle('borderTopLeft')
    }
    if (lastColumnChilds) {
        for (let i = 0; i < lastColumnChilds.length; i++) {
            lastColumnChilds[i].classList.toggle('borderRight')
        }
    }
    let lastRowChilds = Array.from(gridChildren).slice(-`${currentSize}`);
    for (let rowChild of lastRowChilds) {
        rowChild.classList.toggle('borderBottom')
    }
}

let clicked = false

function isClicked() {
    return clicked = clicked === false;
}

function updateDisplayValue() {
    displaySize.innerHTML = `${sizeSLizer.value} x ${sizeSLizer.value}`
}

function changeSize() {
    setCurrentSize(sizeSLizer.value)
    setupGrid()
    reloadGrid()
    updateDisplayValue()
    setCurrentMode(DEFAULT_MODE)
}

function activeButton(mode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('clicked')
    } else if (currentMode === 'color') {
        spanBox.classList.remove('clicked')
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('clicked')
    } else if (currentMode === 'random') {
        randomColorBtn.classList.remove('clicked')
    } else if (currentMode === 'paint') {
        paintBtn.classList.remove('clicked')
    }
    if (mode === 'rainbow') {
        rainbowBtn.classList.add('clicked')
    } else if (mode === 'color') {
        spanBox.classList.add('clicked')
    } else if (mode === 'eraser') {
        eraserBtn.classList.add('clicked')
    } else if (mode === 'random') {
        randomColorBtn.classList.add('clicked')
    } else if (mode === 'paint') {
        paintBtn.classList.add('clicked')
    }
}

function changeColor(e) {
    if (stopFunction) return;
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = randomRGB();
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'random') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#3a3c4e';
    } else if (currentMode === 'paint') {
        e.target.style.backgroundColor = currentColor;
    }
}

let getColor = function (e) {
    setCurrentMode('color')
    setCurrentColor(e.target.value)
}

function getPreviousColor() {
    setCurrentMode('color')
    setCurrentColor(colorBtn.value)
}

function setRandomColor(e) {
    setCurrentMode('random')
    setCurrentColor(randomRGB())
    e.target.style.color = `${currentColor}`
}

function setRainbowColor() {
    setCurrentMode('rainbow')
}

function setEraser() {
    setCurrentMode('eraser')
}


sizeSLizer.addEventListener('click', () => changeSize())
clearBtn.addEventListener('click', () => reloadGrid());
randomColorBtn.addEventListener('click', setRandomColor);
rainbowBtn.addEventListener('click', setRainbowColor);
colorBtn.addEventListener('input', getColor);
spanBox.addEventListener('click', getPreviousColor);
eraserBtn.addEventListener('click', setEraser)
btnBorder.addEventListener('click', () => toggleBorder())


window.onload = () => {
    setupGrid(currentSize)
    spanBox.classList.add('clicked')
}
