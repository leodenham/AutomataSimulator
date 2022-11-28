

class State {

    static radius = 60;
    
    constructor(posX, posY, stateName){
        this.x = posX;
        this.y = posY;
        this.stateName = stateName;
    }

    draw(){
        stroke(0);
        strokeWeight(2);
        fill(255);
        console.log(this.x)
        circle(this.x, this.y, State.radius);
        fill(150);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(32);
        text(this.stateName, this.x, this.y);


    }


}