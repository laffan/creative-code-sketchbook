class Box {

  constructor(x, y, side) {
    this.x = x * side;
    this.y = y * side;
    this.side = side;
    this.t = 1;

    var options = {
      isStatic: true,
      label: "bottom"
    }

    this.walls = [];
    // this.top = Bodies.rectangle(this.x, this.y, this.side, this.t,options);
    // this.right = Bodies.rectangle(this.x + this.side, this.y, this.t, this.side,options);
    const bottom = Bodies.rectangle(this.x, this.y + this.side, this.side, this.t, options);
    // this.left = Bodies.rectangle(this.x, this.y, this.t, this.side, options);
    this.walls.push( bottom );
    // this.shape = Body.create({ walls, isStatic: true });
    World.add(world, this.walls);

    // console.log(world);
    // console.log(this.bottom);


  }

  draw() {
    // var pos = this.shape.position;
    // var angle = this.shape.angle;
    stroke(255);
    this.walls.forEach((wall, i) => {
      fill(255);
      beginShape();
      for (var i = 0; i < wall.vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
      }
      endShape();

    })
    // translate(pos.x, pos.y);
    // rect(this.top.position.x, this.top.position.y, this.side, this.t);
    // rect(this.right.position.x, this.right.position.y , this.t, this.side);
    // rect(this.bottom.position.x, this.bottom.position.y, this.side, this.t);
    // rect(this.left.position.x, this.left.position.y, this.t, this.side);
    // pop();


  }
}