// Capture 
var fps = 30;
var seconds = 30;
var capturer = new CCapture({ format: 'png', framerate: fps });

// Variables to hold items
var nodes = []
var particles = []
var attractor;

// Constants
var nodeCount = 300;
var particleCount = 350;

// Colors
var palette = ["#355070", "#6d597a", "#b56576", "#e56b6f", "#eaac8b"];
palette.reverse();

function setup() {
  createCanvas(800, 800);
  noCursor();
  frameRate(fps);

  attractor = new Attractor();

  var cellSize = int(width / int(sqrt(nodeCount)));

  for (var x = cellSize; x < width-cellSize; x = x + cellSize) {
    for (var y = cellSize; y < height-cellSize; y = y + cellSize) {
      nodes.push(new Node(x, y));
    }
  }

    for (var x = 0; x < particleCount; x++ ) {
      particles.push(new Particle(random(0, width), random(0, height)));
  }

}

function draw() {
  background("#FFFFFF");
  for (var particle of particles) {
    var force = attractor.attract(particle);
    particle.applyForce(force);
    particle.update();
    particle.display();
  }

  for (var node of nodes) {
    node.setAttention(attractor.position);
    // node.drawLine();
    node.drawCircle();
  }

  attractor.update();
  attractor.display();

  captureVideo()

}

function captureVideo() {
  frameCount === 1 && capturer.start();

  if (frameCount === (fps * seconds)) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  } else {
    capturer.capture(document.getElementById('defaultCanvas0'));
    let percentComplete = ((frameCount/ fps) / seconds )* 100;
    console.log( `Capture ${percentComplete.toFixed(1) }% complete`)
  };

}
