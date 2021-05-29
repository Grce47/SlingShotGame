class Ground {
  constructor(x, y, w, h, ang=0) {
    var options = {
      isStatic: true,
      angle: ang,
      friction: 0.2,
      restitution: 1,
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);
    this.w = w;
    this.h = h;

    this.show = function () {
      var a = this.body.angle;
      var pos = this.body.position;
      push();
      translate(pos.x, pos.y);
      rectMode(CENTER);
      noStroke();
      fill(155, 118, 83);
      rotate(a);
      rect(0, 0, this.w, this.h);
      pop();
    };
  }
}
