let buttonCreate = document.querySelector(".btnCreate");
let gridBox = document.querySelector(".grid");
let number = document.querySelector(".number");
let randomColorBtn = document.querySelector(".btnRandomColor");
let rainbowBtn = document.querySelector(".rainbow");
let clearBtn = document.querySelector(".btnClear");
let colorBtn = document.querySelector('.colorBtn');
let spanWord = document.querySelector(".spanBox");

const DEFAULT_SIZE = 15;
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = '#333333';

let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;

function setCurrentMode(mode){
    currentMode = mode;
}
function setCurrentSize(size){
    currentSize = size;
}
function setCurrentColor(color){
    currentColor = color;
}

function activateBtn(newMode){

}
function clearGrid() {
    console.log('clear')
    gridBox.innerHTML = '';
    number.value = '';
}

function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}

let randomRGB = function() {
    return `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`
}

function setupGrid(size) {
    gridBox.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridBox.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size ** 2; i++) {
        let gridChild = document.createElement('div');
        gridChild.classList.add('boxStyle')
        gridBox.appendChild(gridChild)
        gridChild.addEventListener('mouseover', changeColor)
    }
}

function changeColor(e){
    if (currentMode === 'rainbow') {
        // const randomR = Math.floor(Math.random() * 256)
        // const randomG = Math.floor(Math.random() * 256)
        // const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = randomRGB();
    }else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'random') {
        e.target.style.backgroundColor = currentColor
    }
}
let getColor = function(e){
    setCurrentMode('color')
    setCurrentColor(e.target.value)
    spanWord.classList.add('color')
}

function setRandomColor(){
    setCurrentMode('random')
    setCurrentColor(randomRGB())
    console.log("random color")
}
function setRainbowColor(){
    setCurrentMode('rainbow')
}

buttonCreate.addEventListener('click', () => setupGrid(number.value));
clearBtn.addEventListener('click', () => clearGrid());
randomColorBtn.addEventListener('click', setRandomColor);
rainbowBtn.addEventListener('click', setRainbowColor);
colorBtn.addEventListener('input', getColor);