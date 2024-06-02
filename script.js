let buttonCreate = document.querySelector(".btnCreate");
let gridBox = document.querySelector(".grid");
let number = document.querySelector(".number");
let color = document.querySelector(".btnRandomColor");
let clicked = false;

const DEAFULT_SIZE = 15;
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = '#333333';
number.addEventListener('click', () => {
    while (gridBox.firstChild) {
        gridBox.removeChild(gridBox.firstChild);
        number.value = '';
        clicked = false;
    }
})
function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}

function setupGrid(size){
    gridBox.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridBox.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size ** 2; i++) {
        let gridChild = document.createElement('div');
        gridChild.classList.add('boxStyle')
        gridBox.appendChild(gridChild)
        if (clicked === true){
            gridChild.addEventListener('mouseover', () => {
                const colorRandom = `rgba(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()},1)`;
                gridChild.style.backgroundColor = colorRandom;
                gridChild.style.borderColor =  colorRandom;
            });
        }else{
            gridChild.addEventListener('mouseover', () => {
                gridChild.style.backgroundColor = `black`;
                gridChild.style.borderColor = 'black';
            });
        }
    }
}

color.addEventListener('click', () => {clicked = true})
buttonCreate.addEventListener('click', () => setupGrid(number.value));