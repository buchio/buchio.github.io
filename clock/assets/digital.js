const digitalClock = new DigitalClock({
  number: TextNumber,
  foregroundColor: 'white',
  borderColor: '#111',
  backgroundColor: 'black',
  transitionTime: 200,
  });

const sevenSegmentClock = new DigitalClock({
  number: SegmentNumber,
  foregroundColor: 'white',
  borderColor: '#111',
  backgroundColor: 'black',
  transitionTime: 200,
  rates: {
    segmentSpaceHorizontal: 0.0875,
    segmentSpaceVertical: 0.0875,
    segmentWidth: 0.15,
    segmentHeight: 0.045,
  }});


const clocks = [ digitalClock, sevenSegmentClock ];
let clockIndex = 0;

const initClock = () => {

  document.querySelector('#digitalClockCanvas').style.backgroundColor =
    clocks[clockIndex].settings.backgroundColor;

  window.addEventListener('click', () => {
    toggleFullscreen();
  });

  let viewIndex = 0;
  document.addEventListener('keydown', (event) => {
    if (event.key == 't') {
      clockIndex += 1;
      if (clockIndex >= clocks.length) {
        clockIndex = 0;
      }
      document.querySelector('#digitalClockCanvas').style.backgroundColor =
        clocks[clockIndex].settings.backgroundColor;
    }
    if (event.key == 'f') {
      toggleFullscreen();
    }
  }, false);
}
window.addEventListener('load', initClock);

const clock = () => {
  const canvas = document.querySelector('#digitalClockCanvas');
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  
  if (canvas.width != width) canvas.width = width;
  if (canvas.height != height) canvas.height = height;
  
  clocks[clockIndex].draw(canvas);

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);
