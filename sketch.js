var ball;

var database

var position

function setup(){
    database = firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red"

    //refer to the node that we want to read/update the value from/to
    var ballPosition = database.ref("ball/position")
    //.on() reads the value and performs a function on it
    ballPosition.on("value", readPosition)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    // updates the values of the database nodes
    database.ref("ball/position").set({
        'x' : position.x + x,
        "y" : position.y + y
    })
    
}
function readPosition(data){
    position = data.val()
    ball.x = position.x
    ball.y = position.y
}