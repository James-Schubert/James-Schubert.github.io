function add(arr){
    arr = arr.split("+");
    let sum = 0;
    arr.forEach((subArr) =>{
        if (subArr.includes("-")){
            subArr = subtract(subArr);
        }
        if(subArr.includes("\u00d7")){
            subArr = multiply(subArr);
        }
        if(subArr.includes("\u00f7")){
            subArr = divide(subArr);
        }
        sum += parseInt(subArr);
    })
    return sum.toString();
}

function subtract(arr){
    arr = arr.split("-");
    let difference = arr[0];
   
    if(difference.includes("\u00d7")){
        difference = multiply(difference);
    }
    if(difference.includes("\u00f7")){
        difference = divide(difference);
    }
    for(let i = 1; i<arr.length;i++){
        let subArr = arr[i];
        if(subArr.includes("\u00d7")){
            subArr = multiply(subArr);
        }
        if(subArr.includes("\u00f7")){
            subArr = divide(subArr);
        }
        difference -= parseInt(subArr);
    }
    return difference.toString();
}

function multiply(arr){
    arr = arr.split("\u00d7");
    let prod = 1;
    arr.forEach((subArr) =>{
        if(subArr.includes("\u00f7")){
            subArr = divide(subArr);
        }
        prod *= parseInt(subArr);
    })
    return prod.toString();
}

function divide(arr){
    arr = arr.split("\u00f7");
    let div = arr[0];
    for(let i = 1; i< arr.length; i++){
        let subArr  =arr[i];
        // if(subArr.includes("\u00d7")){
        //     subArr = multiply(subArr);
        // }
        div /= parseInt(subArr);
    }
    return div.toString();
}

function exponent(num1, num2){
    return num1**num2;
}

const container = document.querySelector("#container");

const calcBody = document.createElement('div');
calcBody.setAttribute("id","calcBody");

const buttons = [["AC", "C", "%", "\u00F7"],["7","8","9","+"],["4","5","6","-"],["1","2","3","\u00d7"],["0",".","="]];
const buttonVals = [["AC", "C", "%", "/"],["7","8","9","+"],["4","5","6","-"],["1","2","3","*"],["0",".","equals"]];
const buttonBox = document.createElement('div');
buttonBox.setAttribute("id","buttonBox");

let screenVals = "";
let lastInput = "";
let operators = "+-=\u00f7\u00d7";
let result = ">>>>>>>>>";

function addListeners(div){
    div.addEventListener("click",()=>{
        if(div.id == "AC"){
            screenVals = '';
        }
        else if(div.id == "C"){
            let lastInd = screenVals.length-lastInput.length;
            screenVals = screenVals.slice(0,lastInd);
        }
        else if(div.id == "equalButton") calculate();
        else{
            
            
            if (operators.includes(lastInput) && operators.includes(div.textContent)){
                
            }
            else {
                screenVals += div.textContent;
                lastInput =div.textContent;
            }
        }
        updateScreen();
    });
}

function calculate(){
    let lastline = screenVals.split(`=${result}`);
    lastline = lastline[lastline.length-1];
    lastline = lastline.replace("\n","");
    if(operators.includes(lastline.charAt(0))){
        lastline = `${result}${lastline}`;
        console.log(`lastLine(special):${lastline}`);
    }
    result = add(lastline);
    //result = 8008;
    displayResult(result);
}
function displayResult(result){
    screenVals +=`\n=${result}\n`;
    lastInput = `=${result}`;
    updateScreen();
}

// function pad(value, length) {
//     return (value.toString().length < length) ? pad("\u0020"+value, length):value;
// }


function updateScreen(){
    console.log(screenVals);
    let screenArr = screenVals.split('\n');
    if(screenArr.length >3){
        screenVals = screenArr[1]+"\n"+screenArr[2]+"\n"+screenArr[3];
    }
    screen.textContent = screenVals;
}


let rows = [];
for(let i = 0; i<5; i++){
    let row = document.createElement('div');
    row.classList.add("row");
    row.setAttribute("id",`row${i+1}`);
    rows.push(row);
}

for(let i = 0; i<5; i++){
    let row = rows[i];
    let rowButtons = buttons[i];
    rowButtons.forEach((buttonName) => {
        let div = document.createElement('div');
        div.classList.add("button");
        div.setAttribute("id",buttonName);
        div.textContent = buttonName;
        addListeners(div);
        row.appendChild(div);
    })
    buttonBox.appendChild(row);
}

const screen = document.createElement('div');
screen.setAttribute("id","screen");
calcBody.appendChild(screen);
container.appendChild(calcBody);
calcBody.appendChild(buttonBox);
container.appendChild(calcBody);


const row5 = document.querySelector("#row5");
const equalButton = row5.lastChild;
equalButton.setAttribute("id","equalButton");

let title = document.createElement('div');
title.textContent = "Created by Jimmy Schubert";
title.classList.add("title");
container.appendChild(title);





////first row of buttons
//const row1 = document.createElement('div');
//row1.classList.add("row");
// for (let i = 0; i<4; i++){
//     let div = document.createElement('div');
//     div.classList.add("button");
//     div.setAttribute("id",`${buttons[0][i]}`);
//     div.textContent = buttons[0][i];
//     row1.appendChild(div);
// }
// buttonBox.appendChild(row1);

// //second row of buttons
// const row2 = document.createElement('div');
// row2.classList.add("row");
// for (let i = 0; i<4; i++){
//     let div = document.createElement('div');
//     div.classList.add("button");
//     div.setAttribute("id",`${buttons[1][i]}`);
//     div.textContent = buttons[1][i];
//     row2.appendChild(div);
// }
// buttonBox.appendChild(row2);

// const row3 = document.createElement('div');
// row3.classList.add("row");
// for (let i = 0; i<4; i++){
//     let div = document.createElement('div');
//     div.classList.add("button");
//     div.setAttribute("id",`${buttons[2][i]}`);
//     div.textContent = buttons[2][i];
//     row3.appendChild(div);
// }
// buttonBox.appendChild(row3);

// const row4 = document.createElement('div');
// row4.classList.add("row");
// for (let i = 0; i<4; i++){
//     let div = document.createElement('div');
//     div.classList.add("button");
//     div.setAttribute("id",`${buttons[3][i]}`);
//     div.textContent = buttons[3][i];
//     row4.appendChild(div);
// }
// buttonBox.appendChild(row4);

// const row5 = document.createElement('div');
// row5.classList.add("row");
// for (let i = 0; i<3; i++){
//     let div = document.createElement('div');
//     div.classList.add("button");
//     div.setAttribute("id",`${buttons[4][i]}`);
//     div.textContent = buttons[4][i];
//     row5.appendChild(div);
// }
// const equalButton = row5.lastChild;
// equalButton.setAttribute("id","equalButton");
// buttonBox.appendChild(row5);

// calcBody.appendChild(buttonBox);
// container.appendChild(calcBody);



