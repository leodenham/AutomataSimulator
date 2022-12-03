


class Transition{

    constructor(path, destination, transitionLetter){
        this.path = path;
        this.destination = destination;
        this.transitionLetter = transitionLetter;
    }

    draw(){
        strokeWeight(2);
        stroke(0);
        noFill();
        for (var i = 0; i < this.path.length-1; i++){
            line(this.path[i][0], this.path[i][1], this.path[i+1][0], this.path[i+1][1]);
        }

        fill(150);
        noStroke();
        text(this.transitionLetter, this.path[parseInt(this.path.length/2)][0], this.path[parseInt(this.path.length/2)][1]-30)
    }


}