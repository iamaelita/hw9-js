


import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedDate = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('<Будь ласка, введіть дату у майбутньому>');
      refs.startBtn.setAttribute('disabled', true);
    } else {
      refs.startBtn.removeAttribute('disabled', '');
    }
  },
};
flatpickr('input#datetime-picker', options);

refs.startBtn.addEventListener('click', startCountdown);

function startCountdown() {
  refs.startBtn.setAttribute('disabled', '');
  refs.input.setAttribute('disabled', '');
  timerId = setInterval(timeOut, 1000);
}

function timeOut() {
  const getTimeComponents = selectedDate - new Date();

  if (getTimeComponents <= 0) {
    clearInterval(timerId);
    return;
  }

  const { days, hours, mins, seconds } = convertMs(getTimeComponents);

  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.mins.textContent = pad(mins);
  refs.seconds.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const mins = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, mins, seconds };
}