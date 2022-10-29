
class Circle {

  constructor(x, y, container) {
    this.x = x;
    this.y = y;
    this.container = container;
    this.xCtr = this.x * this.container + (this.container / 2);
    this.yCtr = this.y * this.container + (this.container / 2);

    this.r = random(5, 20);
    
    var options = {
      friction: 0.3,
      restitution: 0.6
    }
    
    this.shape = Bodies.circle(this.xCtr, this.yCtr, this.r, options);
    
    World.add(world, this.shape);

  }


  draw() {
    var pos = this.shape.position;
    var angle = this.shape.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);

    fill(255);
    noFill();
    stroke(255);

    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
  }
}