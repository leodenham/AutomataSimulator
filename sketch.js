allStates = [];
currentMode = 0; // 1 == New State, 2 == New Transition, 3 == Assign Letter to transition
currentPath = null;
startNode = null;
waitForKey = false;
transitionKey = null;
nextNode = null;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220);
    drawPathBeingMade();
    for (var i = 0; i < allStates.length; i++){
        allStates[i].drawTransitions();
    }

    for (var i = 0; i < allStates.length; i++){
            allStates[i].draw();
    }
    
    fill(255,0,0);
    text("Current Mode: " + currentMode, 100, 100);

}

function reset(){
    allStates = [];
    currentMode = 0; // 1 == New State, 2 == New Transition, 3 == Assign Letter to transition
    currentPath = null;
    startNode = null;
    waitForKey = false;
    transitionKey = null;
    nextNode = null;
}

function keyPressed(){
    if (waitForKey){
        if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90))){
            return;
        }
        waitForKey = false;
        startNode.transitions.push(new Transition(currentPath, nextNode, key));
        currentMode = 0;
        // console.log("h");
        return;
    }
    
    if (key == "n"){
        currentMode = 1;
    } else if (key == 'm'){
        currentMode = 2;
    } else if (key === 'r') {
        reset();
        return;
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
    if (waitForKey & currentMode == 3 ){
        waitForKey = false;
        currentMode = 0;
    }

    if (currentMode == 3){
        waitForKey = true;
    }

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
    foundState = false;
    for (let i = 0; i < allStates.length; i++){
        if (Math.sqrt(Math.pow(mouseX-allStates[i].x, 2) + Math.pow(mouseY-allStates[i].y,2)) < 30){
            if (allStates[i] == startNode){
                if (currentPath.length < 50){ // Make this so that it only creates this if it has left the start 
                                               // node and reentered rather than just if its been long enough
                    continue;
                }
            }
            foundState = true;
            break;
        }
    }
    if (foundState){
        mouseReleased();
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
            // for (var i = 0; i < startNode.transitions.length; i++){
            //     if (startNode.transitions[i].destination == endNode){
            //         currentMode = 0;
            //         currentPath = null;
            //         startNode = null;
            //     }
            // }
            if (currentMode==2){
                nextNode = endNode;
                waitForKey = true;
                // startNode.transitions.push(new Transition(currentPath, endNode));
                currentMode = 3;
            }
        } else {
            currentMode = 0;

            currentPath = null;
            startNode = null;
        }

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