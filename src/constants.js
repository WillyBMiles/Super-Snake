const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const GROUND = "ground";
const EGG = "egg";
const WALL = "wall";

const DIALOGUE = "dialogue";

const HEAD = "s_head";
const HEAD_DETAILS = "s_head_details";

const STRAIGHT_BODY = "s_body";
const STRAIGHT_BODY_DETAILS = "s_body_details"

const TURN_BODY = "s_turn";
const TURN_BODY_DETAILS = "s_turn_details"

const TAIL = "s_tail";
const TAIL_DETAILS = "s_tail_details";

const FONT = "font";

const BLOCK_SIZE = 16;
const WIDTH = 8;
const HEIGHT = 16;


const T_HEAD = "head";
const T_BODY = "body";
const T_EGG = "egg";

function directionToTuple(direction){
    switch (direction){
        case UP:
            return [0,-1];
        case DOWN:
            return [0,1];
        case RIGHT:
            return [1,0];
        case LEFT:
            return [-1,0];
    }
}

//Only works for adjacent points
function directionBetween(from_x, from_y, to_x, to_y){
    if (to_x > from_x){
        return RIGHT;
    }
    if (to_x < from_x){
        return LEFT;
    }
    if (to_y > from_y){
        return DOWN;
    }
    if (to_y < from_y){
        return UP;
    }
}

function directionToAngle(direction){
    var angle;
    switch (direction){
        case UP:
            angle = 0;
            break;
        case DOWN:
            angle = 180;
            break;
        case RIGHT:
            angle = 90;
            break;
        case LEFT:
            angle = 270;
            break;
    }
    return Phaser.Math.DegToRad(angle);
}

function whichWayToTurn(direction1, direction2){
    if ((direction1 + 1) %4 == direction2)
        return RIGHT;
    return LEFT;
}


function areDirectionsAdjacent(direction1, direction2){
    var t1 = directionToTuple(direction1);
    var t2 = directionToTuple(direction2);
    return (t1[0] != -t2[0]) && (t1[1] != -t2[1])
}





