const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

//////
stopBtn.disabled = true;
let intervalID = null;


////
const randomBodyColorGenerator = {
  DELAY: 1000,

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },

  interval() {
    intervalID = setInterval(() => {
      changeBgColorRandom();
    }, this.DELAY);
    stopBtn.disabled = false;
  },

  start() {
    startBtn.addEventListener('click', () => {
      this.interval();
      startBtn.disabled = true;
      stopBtn.disabled = false;
    });
    stopBtn.addEventListener('click', this.stop);
  },

  stop() {
    clearInterval(intervalID);
    stopBtn.disabled = true;
    startBtn.disabled = false;
  },
};

function changeBgColorRandom() {
  body.style.backgroundColor = `${randomBodyColorGenerator.getRandomHexColor()}`;
}

randomBodyColorGenerator.start();
