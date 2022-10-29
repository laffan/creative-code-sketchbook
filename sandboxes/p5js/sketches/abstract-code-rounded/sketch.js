
// Variables to hold items

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Colors
var palette = ["#355070", "#6d597a", "#b56576", "#e56b6f", "#eaac8b"];
palette.reverse();

function setup() {
  createCanvas(800, 800, SVG);
  strokeWeight(10);
  strokeCap(ROUND);
  noFill(); // better not to have a fill for laser
  background(255);
  stroke('#ED225D');

}

function draw() {

  const rows = 15;
  const lineHeight = 20;
  const wordSpacing = 30;
  const cols = 6;
  let wordPos = 0;

  for (y = 1; y < rows; y++) {
    for (x = 1; x < getRandom(4, 8); x++) {


      const startX = wordPos + wordSpacing;
      const finishX = wordPos + wordSpacing + getRandom(10, 50);

      line(startX, y * lineHeight + 100, finishX, y * lineHeight + 100);

      wordPos = finishX;

    }
    wordPos = 0;
  }

  // save();
  noLoop();


}
