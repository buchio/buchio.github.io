analogClock = new AnalogClock({
  interval: 40,
  rates: {
    resolution: 1,
    radius:.45,
    lineWidth: .03,
  },
  backgroundColor: '#cccccc',
  hourScaleColor: '#666666',
  hourNumberColor: '#666666',
  minuteScaleColor: '#666666',
  hourHandColor: 'black',
  minuteHandColor: 'black',
  secondHandColor : '#D40000',
  edgeColor : '#333333',
});

const digitalClock = new DigitalClock({
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

const initClock = () => {
  console.log(digitalClock);
  digitalClock.test = 10;
  console.log(digitalClock.test);

  document.querySelector('#analogClockCanvas').style.backgroundColor =
    analogClock.settings.backgroundColor;

  document.querySelector('#digitalClockCanvas').style.backgroundColor =
    digitalClock.settings.backgroundColor;

  window.addEventListener('click', () => {
    toggleFullscreen();
  });

  let viewIndex = 0;
  document.addEventListener('keydown', (event) => {
    if (event.key == 'v') {
      analogClock.increaseViewIndex();
    } 
    if (event.key == 'f') {
      toggleFullscreen();
    }
    
  }, false);
}
window.addEventListener('load', initClock);

let currentDate = 0;
const clock = () => {
  
  { // Analog
    const canvas = document.querySelector('#analogClockCanvas');
    const width = canvas.offsetWidth * analogClock.settings.rates.resolution;
    const height = canvas.offsetHeight * analogClock.settings.rates.resolution;
    
    if (canvas.width != width) canvas.width = width;
    if (canvas.height != height) canvas.height = height;

    analogClock.draw(canvas);
  }
  { // Digital
    const canvas = document.querySelector('#digitalClockCanvas');
    const width = canvas.offsetWidth * analogClock.settings.rates.resolution;
    const height = canvas.offsetHeight * analogClock.settings.rates.resolution;
    
    if (canvas.width != width) canvas.width = width;
    if (canvas.height != height) canvas.height = height;

    digitalClock.draw(canvas);
  }

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);
