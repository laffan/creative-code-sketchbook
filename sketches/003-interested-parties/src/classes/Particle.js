class Particle {

  constructor(x, y) {
    this.mass = random(0.1, 1);
    this.position = createVector(x, y);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
    this.color = color(palette[int(random(0, 4))]);
  }

  applyForce(force) {
    var f = force.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration).limit(10);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {

    var distance = constrain(
      dist(attractor.position.x, attractor.position.y, this.position.x, this.position.y) - 30, // -100 protects the very center with 0% alpha
      0,
      width / 2);

    var alpha = map(distance, 0, width / 5, 0, 100);
    this.color.setAlpha(alpha);
    stroke(this.color); // Change the color
    strokeWeight(10); // Make the points 10 pixels in size
    point(this.position.x, this.position.y);
  }
}