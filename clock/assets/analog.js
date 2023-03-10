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

const initClock = () => {
  document.querySelector('#clockCanvas').style.backgroundColor =
    analogClock.settings.backgroundColor;

  window.addEventListener('click', () => {
    toggleFullscreen();
  });

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
  const canvas = document.querySelector('#clockCanvas');
  const width = canvas.offsetWidth * analogClock.settings.rates.resolution;
  const height = canvas.offsetHeight * analogClock.settings.rates.resolution;
  
  if (canvas.width != width) canvas.width = width;
  if (canvas.height != height) canvas.height = height;

  analogClock.draw(canvas);
  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);
