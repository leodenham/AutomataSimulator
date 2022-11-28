allStates = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220);
    for (var i = 0; i < allStates.length; i++){
            allStates[i].draw();
    }
}


function mouseClicked(){

    if (allStates.length < 100){
        allStates.push(new State(mouseX, mouseY, "q" + allStates.length));
    }
}