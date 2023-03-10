const checkFullscreen = () => {
  // FF provides nice flag, maybe others will add support for this later on?
  if(window['fullScreen'] !== undefined) {
    return window.fullScreen;
  }
  // 5px height margin, just in case (needed by e.g. IE)
  let heightMargin = 5;
  if(window.webkitRequestFullscreen && /Apple Computer/.test(navigator.vendor)) {
    // Safari in full screen mode shows the navigation bar, 
    // which is 40px  
    heightMargin = 42;
  }
  return screen.width == window.innerWidth &&
    Math.abs(screen.height - window.innerHeight) < heightMargin;
};

const requestFullscreen = () => {
  const elem = document.querySelector('body');
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  }
};

const toggleFullscreen = () => {
  if (checkFullscreen()) {
    exitFullscreen();
  } else {
    requestFullscreen();
  }
};
