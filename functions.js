var sel = false;
function createGrounds()
{
    grounds.push(new Ground(width/2,height+130,2*width,300));
    grounds.push(new Ground(3*width/4 , 3*height/4, width/2,10));
};

function createBoxes() {
    boxes[0] = new Stack(width/2+20,height/2-130,8,15,0,0,30,30);
    boxes[1] = new Circle(300,500,50);
    sling = Constraint.create({
        pointA : {x : 300,y:500},
        bodyB : boxes[1].body,
        stiffness : 0.05
      });
    World.add(world,sling);
};

function drawGroundsAndBoxes() {
    for(var i=0;i<grounds.length;i++)
    {
        grounds[i].show();
    }
    for(var i=0;i<boxes.length;i++)
    {
        boxes[i].show();
    }
    noFill();
    stroke(0);
    if(sling.bodyB)
    {
        line(boxes[boxes.length-1].body.position.x,boxes[boxes.length-1].body.position.y,300,500);
    }
    
};
function mousePressed() {
    if(boxes[boxes.length-1].isThere(mouseX,mouseY))
    {
        // print("sel = true");
        sel = true;
    }
}
function mouseReleased() {
    if(sel)
    {
        // print("fire = true");
        fire = true;
        sel = false;
    }
}
// function mouseDragged() {
// }
// function clickToRemove() {
//     if(mConst.body)
//     {
//         var mx = mouseX;
//         var my = mouseY;
//         for(var i=0;i<boxes.length;i++)
//         {
//         if(boxes[i].isThere(mx,my))
//         {
//             boxes[i].removeFromWorld();
//             boxes.splice(i,1);
//             i--;
//         }
//         }
//     }
// };
