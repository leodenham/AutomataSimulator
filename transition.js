


class Transition{

    constructor(path, destination){
        this.path = path;
        this.destination = destination;
    }

    draw(){
        strokeWeight(2);
        stroke(0);
        for (var i = 0; i < this.path.length-1; i++){
            line(this.path[i][0], this.path[i][1], this.path[i+1][0], this.path[i+1][1]);
        }
    }
}