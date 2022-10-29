class Node {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.nodeSize = 30;
  }

  setAttention(attention) {
    this.attention = attention;
  }

  setColorLerped() {
    let distance = constrain(int(dist(this.x, this.y, this.attention.x, this.attention.y)), 0, width);
    let normalizedDistance = map(distance, 0, width, 0, 1);
    const colorA = color(palette[0]);
    const colorB = color(palette[palette.length - 1]);
    const lerped = lerpColor(colorA, colorB, normalizedDistance);
    return lerped;
  }

  setColorFlat(attention) {
    
    // Measure distance from attention to object, but constrain to half the
    // width so all colors are clearly visible
    let distance = constrain(int(dist(this.x, this.y, this.attention.x, this.attention.y)), 0, width /2);
    // Map to color index.
    let colorIndex = int(map(distance, 0, width /2 , 0, 4));
    return palette[colorIndex];
  }

  drawLine() {
    push();
    // Set mouse magnitude (line length)
    let centerV = createVector(this.x, this.y);

    let localAttention = this.attention.copy();;
    localAttention.sub(centerV);
    localAttention.setMag(15);

    translate(this.x, this.y);
    strokeWeight(2);
    stroke(this.setColorLerped());
    line(0, 0, localAttention.x, localAttention.y);
    pop();
  }

  drawCircle(palette) {

    push();
    
    var color = this.setColorFlat();
    let distance = constrain(int(dist(this.x, this.y, this.attention.x, this.attention.y)), 0, width);
    let distanceToWidth = map(distance, 0, width, 1, 10);
    let innerCircle = this.nodeSize - (distanceToWidth * 5) + 3;
    translate(this.x, this.y);
    // blendMode(MULTIPLY);
    noFill();
    strokeWeight(distanceToWidth);
    stroke( color );
    ellipse(0, 0, this.nodeSize, this.nodeSize);
    fill(color)
    noStroke()
    ellipse(0, 0, innerCircle, innerCircle );
    pop();
  }
}