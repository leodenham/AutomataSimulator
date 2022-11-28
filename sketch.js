allStates = [];
currentMode = 0; // 1 == New State, 2 == New Transition, 3 == Assign Letter to transition
currentPath = null;
startNode = null;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220);
    drawPathBeingMade();
    for (var i = 0; i < allStates.length; i++){
            allStates[i].draw();
    }

    fill(255,0,0);
    text("Current Mode: " + currentMode, 100, 100);

}

function keyPressed(){
    if (key == "n"){
        currentMode = 1;
    } else if (key == 'm'){
        currentMode = 2;
    }
}

function mouseClicked(){
    if (currentMode == 1){
        if (allStates.length < 100){
            canMake = true;
            for (var i = 0; i < allStates.length; i++){
                if (Math.sqrt(Math.pow(mouseX-allStates[i].x, 2) + Math.pow(mouseY-allStates[i].y,2)) < State.radius){
                    canMake = false;
                    break;
                }
            }
            if (canMake){
                allStates.push(new State(mouseX, mouseY, "q" + allStates.length));
            }
        }
        currentMode = 0;
 
    }
}


function mousePressed(){

    if (currentMode == 2){
        for (var i = 0; i < allStates.length; i++){
            if (Math.sqrt(Math.pow(mouseX-allStates[i].x, 2) + Math.pow(mouseY-allStates[i].y,2)) < State.radius){
                startNode = allStates[i];
                break;
            }
        }
        if (startNode != null){
            currentPath = [[startNode.x, startNode.y]];
        }
    }
}

function mouseDragged(){
    if (currentPath != null && currentMode == 2){
        currentPath.push([mouseX, mouseY]);
    }
}

function mouseReleased(){
    if (currentMode == 2){
        endNode = null
        for (var i = 0; i < allStates.length; i++){
            if (Math.sqrt(Math.pow(mouseX-allStates[i].x, 2) + Math.pow(mouseY-allStates[i].y,2)) < State.radius){
                endNode = allStates[i];
                break;
            }
        }
        if (endNode != null){
            startNode.transitions.push(new Transition(currentPath, endNode));
            currentMode = 3;
        } else {
            currentMode = 0;
        }
        currentPath = null;
        startNode = null;

    }


}


function drawPathBeingMade(){
    if (currentPath != null){
        strokeWeight(3);
        stroke(0);
        for (var i = 0; i < currentPath.length-1; i++){
            line(currentPath[i][0], currentPath[i][1], currentPath[i+1][0], currentPath[i+1][1]);
        }
    }
}