disableFriendlyErrors = true; // disables FES

var fps = 50;
// var captureSeconds = 5;
// var capturer = new CCapture({ format: 'png', framerate: fps });

const { Bodies, Body, Composite, Engine, Events, World } = Matter;
var engine = Engine.create();
var world = engine.world;

const circlesPerSide = 5;
const margin = 100;
const circles = [];
const boxes = [];

function setup() {
  createCanvas(700, 700);
  frameRate(fps);

  Engine.run(engine);

  const cellSize = (width - (margin * 2)) / (circlesPerSide);

  for (var x = 1; x <= circlesPerSide; x++) {
    for (var y = 1; y <= circlesPerSide; y++) {
      // wheel = Body.create({ parts, isStatic: true });

      circles.push(new Circle(x, y, cellSize));
      boxes.push(new Box(x, y, cellSize));

    }
  }
}

function draw() {
  background(100);

  Engine.update(engine);

  circles.forEach((circle, i) => {
    circle.draw();
    boxes[i].draw();
  });


  // captureVideo()

}

// function captureVideo() {
//   frameCount === 1 && capturer.start();

//   if (frameCount === (fps * captureSeconds)) {
//     noLoop();
//     console.log('finished recording.');
//     capturer.stop();
//     capturer.save();
//     return;
//   } else {
//     capturer.capture(document.getElementById('defaultCanvas0'));
//     let percentComplete = ((frameCount/ fps) / captureSeconds )* 100;
//     console.log( `Capture ${percentComplete.toFixed(1) }% complete`)
//   };

// }