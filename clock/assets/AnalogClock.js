const AnalogClock = class {

  static numberList = [
    [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],'bold', 'arial'],
    [['', '', '3', '', '', '6', '', '', '9', '', '', '12'],'bold', 'arial'],
    [['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],'normal', 'fantasy'],
    [['', '', 'III', '', '', 'VI', '', '', 'IX', '', '', 'XII'],'normal', 'fantasy'],
    [['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],'bold', 'serif'],
    [['', '', '三', '', '', '六', '', '', '九', '', '', '十二'],'bold', 'serif'],
  ];

  static viewList = [
    [true, false, true, 0],
    [true, false, false, 0],
    [false, true, false, 0],
    [false, true, false, 1],
    [false, true, false, 2],
    [false, true, false, 3],
    [false, true, false, 4],
    [false, true, false, 5],
  ];


  constructor(settings_) {
    this.settings = settings_;
    this.drawHourScale = true,
    this.drawHourNumber = false,
    this.drawMinuteScale = false,

    this.viewIndex = 0;
    this.numberListIndex = 0;

    this.currentDate = 0;
  };


  setViewIndex(index) {
    this.viewIndex = index;
    this.drawHourScale = AnalogClock.viewList[this.viewIndex][0];
    this.drawHourNumber = AnalogClock.viewList[this.viewIndex][1];
    this.drawMinuteScale = AnalogClock.viewList[this.viewIndex][2];
    this.numberListIndex = AnalogClock.viewList[this.viewIndex][3];;
  }

  increaseViewIndex() {
    let index  = this.viewIndex + 1
    if (index >= AnalogClock.viewList.length) {
      index = 0;
    }
    this.setViewIndex(index);
  };
  
  draw(canvas) {
    const now = Date.now();
    if ( (now - this.currentDate) < this.settings.interval ) {
      return;
    }
    this.currentDate = now;

    const width = canvas.width;
    const height = canvas.height;
    let radius = -1;
    if (width < height) {
      radius = width * this.settings.rates.radius;
    } else {
      radius = height * this.settings.rates.radius;
    }

    const ctx = canvas.getContext('2d');

    const date = new Date();
    const sec = date.getSeconds() + date.getMilliseconds() / 1000;
    const min = date.getMinutes();
    let hour = date.getHours();
    if (hour >= 12) {
      hour = hour - 12;
    }
    
    const lineWidth = (radius * this.settings.rates.lineWidth).toFixed();

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width/2, height/2);
    ctx.rotate(-Math.PI / 2);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    // 文字盤
    const faceRadius = radius - lineWidth * 3.8;

    // 文字盤の時
    const hourLength = lineWidth * 3;
    ctx.save();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = this.settings.hourScaleColor;
    ctx.fillStyle = this.settings.hourNumberColor;
    const fontSize = (lineWidth * 6).toFixed();

    const fontWeight = AnalogClock.numberList[this.numberListIndex][1];
    const fontName = AnalogClock.numberList[this.numberListIndex][2]
    ctx.font = `${fontWeight} ${fontSize}px ${fontName}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    
    for (let i = 0; i < 12; i++) {
      ctx.rotate(Math.PI / 6);
      if (this.drawHourScale) {
        ctx.beginPath();
        ctx.moveTo(faceRadius - hourLength, 0);
        ctx.lineTo(faceRadius, 0);
        ctx.stroke();
      }
      if (this.drawHourNumber) {
        ctx.save();
        ctx.translate(faceRadius - lineWidth*2.5, 0);
        ctx.rotate(Math.PI * (0.5 - (i+1)/6));
        const num = AnalogClock.numberList[this.numberListIndex][0][i];
        ctx.fillText(num, 0, 0);
        ctx.restore();
      }
    }
    ctx.restore();

    // 文字盤の分
    if (this.drawMinuteScale) {
      const minuteLength = lineWidth * 2;
      ctx.save();
      ctx.lineWidth = lineWidth * .6;
      ctx.strokeStyle = this.settings.minuteScaleColor;
      for (let i = 0; i < 60; i++) {
        if (i % 5!= 0) {
          ctx.beginPath();
          ctx.moveTo(faceRadius - minuteLength, 0);
          ctx.lineTo(faceRadius, 0);
          ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
      }
      ctx.restore();
    }



    // 時針
    const hourHandLength = radius - lineWidth * 16;
    ctx.strokeStyle = this.settings.hourHandColor;
    ctx.fillStyle = this.settings.hourHandColor;
    ctx.save();
    ctx.rotate(hour * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) *sec);
    ctx.lineWidth = lineWidth*2.5;
    ctx.beginPath();
    ctx.moveTo(-hourHandLength*.25, 0);
    ctx.lineTo(hourHandLength, 0);
    ctx.stroke();
    ctx.restore();

    // 分針
    const minuteHandLength = radius - lineWidth * 6;
    ctx.strokeStyle = this.settings.minuteHandColor;
    ctx.fillStyle = this.settings.minuteHandColor;
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = lineWidth*1.7;
    ctx.beginPath();
    ctx.moveTo(-minuteHandLength*.25, 0);
    ctx.lineTo(minuteHandLength, 0);
    ctx.stroke();
    ctx.restore();

    // 秒針
    const secondHandLength = radius - lineWidth * 4;
    ctx.strokeStyle = this.settings.secondHandColor;
    ctx.fillStyle = this.settings.secondHandColor;
    ctx.save();
    ctx.rotate(sec * Math.PI / 30);
    ctx.lineWidth = lineWidth * .2;
    ctx.beginPath();
    ctx.moveTo(secondHandLength, 0);
    ctx.lineTo(-secondHandLength*.4, -lineWidth*.5);
    ctx.lineTo(-secondHandLength*.4, lineWidth*.5);
    ctx.lineTo(secondHandLength, 0);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, lineWidth*1.2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = this.settings.edgeColor;
    ctx.arc(0, 0, radius-lineWidth, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.restore();

  };  
};
