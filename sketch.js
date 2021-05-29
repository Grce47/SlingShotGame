// module aliases
var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  World = Matter.World,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint;
  
var engine;
var grounds = [];
var world;
var boxes = [];
var canvasMouse;
var mConst;
var sling;
var fire = false;
function setup() {
  var canvas = createCanvas(1500, 700);
  canvasMouse =  Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1;
  var options = {
    mouse : canvasMouse,
    constraint: {
      stiffness : 1
    }
  };
  mConst = MouseConstraint.create(engine,options);
  World.add(world,mConst);
  createGrounds();
  createBoxes();
}

function draw() {
  
  // console.log(frameRate());
  background(135, 206, 235);
  Engine.update(engine);
  fill(155, 118, 83);
  stroke(0);
  rectMode(CORNER);
  rect(300-2.5,500-5,5,height-500);
  drawGroundsAndBoxes();
  if(fire)
    {
        sling.bodyB = null;
        fire = false;
        // print("fire done");
        setTimeout(function () {
            boxes.push(new Circle(300,500,50));
            sling.bodyB = boxes[boxes.length-1].body;
        },1000);
    }
  // noLoop();
}


