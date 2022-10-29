/*
  Press enter to save file.
*/
function keyPressed() {
  if (keyCode === ENTER) {
    save();
  }
}

/*
Save Video
*/

// Above Setup
var fps = 50;
var captureSeconds = 5;
var capturer = new CCapture({ format: 'png', framerate: fps });

// In Setup
 frameRate(fps);

// Main Function
function captureVideo() {
  frameCount === 1 && capturer.start();

  if (frameCount === (fps * captureSeconds)) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  } else {
    capturer.capture(document.getElementById('defaultCanvas0'));
    let percentComplete = ((frameCount / fps) / captureSeconds) * 100;
    console.log(`Capture ${percentComplete.toFixed(1)}% complete`)
  };

}