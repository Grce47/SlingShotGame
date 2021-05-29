
var global_friction = 0.8;
var global_restitution = 0.5;
class Box {
    constructor(x, y, w, h,fixed = false) {
        var options = {
            friction: global_friction,
            restitution: global_restitution,
            isStatic : fixed,
            // density : 0.000001,
            //   angle: random(TWO_PI)
            angle: 0,
        };
        this.R = random(255);
        this.G = random(255);
        this.B = random(255);
        this.body = Bodies.rectangle(x, y, w, h, options);
        World.add(world, this.body);
        this.w = w;
        this.h = h;
    }
    show() {
        var ang = this.body.angle;
        var pos = this.body.position;
        rectMode(CENTER);
        push();
        translate(pos.x, pos.y);
        rotate(ang);
        fill(this.R,this.G,this.B);
        stroke(255);
        rect(0, 0, this.w, this.h);
        pop();
    };
    offScreen() {
        var px = this.body.position.x;
        var py = this.body.position.y;
        return (
            px < 0 - this.w / 2 ||
            px > width + this.w / 2 ||
            py < 0 - this.h / 2 ||
            py > height + this.h / 2
        );
    };
    removeFromWorld() {
        World.remove(world, this.body);
    };
    isThere(x,y) {
        var px = this.body.position.x;
        var py = this.body.position.y;
        return (abs(px-x) < this.w/2 && abs(py-x) < this.h/2);
    };
};

class Circle {
    constructor(x, y, r,fixed = false) {
        var options = {
            friction: global_friction,
            isStatic : fixed,
            restitution: global_restitution,
            density : 0.5
        };
        this.body = Bodies.circle(x, y, r, options);
        World.add(world, this.body);
        this.r = r;
        this.d = 2 * r;
    }
    show() {
        var pos = this.body.position;
        fill(125);
        stroke(255);
        circle(pos.x, pos.y, this.d);
    };
    offScreen() {
        var px = this.body.position.x;
        var py = this.body.position.y;
        return (
            px < 0 - this.r / 2 ||
            px > width + this.r / 2 ||
            py < 0 - this.r / 2 ||
            py > height + this.r / 2
        );
    };
    removeFromWorld() {
        World.remove(world, this.body);
    };
    isThere(x,y) {
        var px = this.body.position.x;
        var py = this.body.position.y;
        var d = dist(px,py,x,y);
        return (d<this.r);
    };
};

class Square {
    constructor(x, y, w,fixed = false) {
        var options = {
            friction: global_friction,
            restitution: global_restitution,
            isStatic : fixed,
            //   angle: random(TWO_PI)
            angle: 0
        };
        this.body = Bodies.rectangle(x, y, w, w, options);
        World.add(world, this.body);
        this.w = w;
        this.h = w;
    }
    show() {
        var ang = this.body.angle;
        var pos = this.body.position;
        rectMode(CENTER);
        push();
        translate(pos.x, pos.y);
        rotate(ang);
        fill(125);
        stroke(255);
        rect(0, 0, this.w, this.h);
        pop();
    };
    offScreen() {
        var px = this.body.position.x;
        var py = this.body.position.y;
        return (
            px < 0 - this.w / 2 ||
            px > width + this.w / 2 ||
            py < 0 - this.h / 2 ||
            py > height + this.h / 2
        );
    };
    removeFromWorld() {
        World.remove(world, this.body);
    };
    isThere(x,y) {
        var px = this.body.position.x;
        var py = this.body.position.y;
        return (abs(px-x) < this.w/2 && abs(py-y) < this.h/2);
    };
};
function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }  
class Polygon {
    constructor(x,y,sides,r)
    {
        this.side = sides;
        this.r = r;
        this.body = Bodies.polygon(x,y,sides,r);
        World.add(world,this.body);
    };
    show()
    {
        var px = this.body.position.x;
        var ang = this.body.angle;
        var py = this.body.position.y;
        push();
        translate(px,py);
        rotate(ang + (PI/this.side));
        fill(125);
        stroke(255);
        polygon(0,0,this.r,this.side);
        pop();
    }
}
class Stack {
    constructor(x,y,row,col,rowGap,colGap,w,h)
    {
        this.x = x;
        this.y = y;
        this.col = col;
        this.row = row;
        this.colGap = colGap;
        this.rowGap = rowGap;
        this.w = w;
        this.h = h;
        this.body = [];
        for(var i = 0;i<this.row;i++)
        {
            for(var j=0;j<this.col;j++)
            {
                this.body.push(new Box(this.x + (j*(this.colGap + this.w)),this.y + (i*(this.rowGap + this.h)),this.w,this.h));
            }
        }
    }
    show() {
        for(var i=0;i<this.body.length;i++)
        {
            this.body[i].show();
        }
    };
};