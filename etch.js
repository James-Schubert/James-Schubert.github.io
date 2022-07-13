const drawboard = document.querySelector("#drawboard");
let numSquares = 16;
const canvasWidth = 900;
let tileSize = canvasWidth/(numSquares**0.5)-2;

function drawCanvas(){
    while (drawboard.firstChild){drawboard.removeChild(drawboard.firstChild);}
    for(i = 0; i<numSquares**0.5; i++){
        let row = document.createElement('div');
        row.classList.add("row");
        for(j = 0; j<numSquares**0.5; j++){
            let tile = document.createElement('div');
            tile.classList.add("tile");
            tile.style.width = `${tileSize}px`;
            tile.style.height = `${tileSize}px`;

            tile.addEventListener("mouseover", (e) => colorTile1(e,tile));
            tile.addEventListener("mousedown", (e) => colorTile1(e,tile));

            row.appendChild(tile);
        }
        drawboard.appendChild(row);
    }
}


function colorTile1(e, tile){
    
    if (e.buttons == 1){
        tile.classList.toggle("coloredTile");
    }
    
}

function clearCanvas(){
    let tiles = document.querySelectorAll(".coloredTile");
    tiles.forEach(function(tile){
        tile.classList.remove("coloredTile")});
}

function sliderChange(val){
    console.log(val);
    numSquares = val**2;
    tileSize = canvasWidth/(numSquares**0.5);
    sliderTitle.textContent = `Number of Tiles: ${numSquares}`;
    drawCanvas();
}

drawCanvas();
const controlbar = document.querySelector("#controlbar");
const resetButton = document.createElement("button");
resetButton.classList.add("resetButton");
resetButton.textContent = "Reset Canvas";
resetButton.addEventListener("click", ()=>clearCanvas());
controlbar.appendChild(resetButton);


const sizeSlider = document.createElement("input");
sizeSlider.type = "range";
sizeSlider.min = 4;
sizeSlider.max = 30;
sizeSlider.value = 4;
//sizeSlider.setAttribute("type","range");
sizeSlider.classList.add("slider");
sizeSlider.addEventListener("mouseup",() => sliderChange(sizeSlider.value));


const sliderTitle = document.createElement("div");
sliderTitle.textContent = `Number of Tiles: ${numSquares}`;
controlbar.appendChild(sizeSlider);
controlbar.appendChild(sliderTitle);
