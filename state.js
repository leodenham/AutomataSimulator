

class State {

    static radius = 60;
    
    constructor(posX, posY, stateName){
        this.x = posX;
        this.y = posY;
        this.stateName = stateName;
        this.transitions = [];
    }

    draw(){
        for (var i = 0; i < this.transitions.length; i++){
            this.transitions[i].draw();
        }
        stroke(0);
        strokeWeight(2);
        fill(255);
        circle(this.x, this.y, State.radius);
        fill(150);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(32);
        text(this.stateName, this.x, this.y);


    }


}