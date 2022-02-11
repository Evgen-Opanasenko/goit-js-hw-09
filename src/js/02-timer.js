import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refsInputData = document.querySelector('#datetime-picker');
const refsBtnStart = document.querySelector('button');
const refsTimerSpansDays = document.querySelector('[data-days]');
const refsTimerSpansHours = document.querySelector('[data-hours]');
const refsTimerSpansMinutes = document.querySelector('[data-minutes]');
const refsTimerSpansSeconds = document.querySelector('[data-seconds]');
const refsDiv = document.querySelector('.timer');
refsDiv.style.display = 'flex';
refsDiv.style.justifyContent = 'space-evenly';
refsDiv.style.paddingTop = '70px';
// refsDiv.style.flexDirection = 'row - reverse';

refsBtnStart.addEventListener('click', () => {
  renderTime();
  setInterval(renderTime, 1000);
  refsBtnStart.disabled = true;
});

console.log(refsInputData);
console.log(refsBtnStart);
console.log(refsTimerSpansSeconds);
let inputDate = null;
refsBtnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates);
    inputDate = selectedDates[0].getTime();
    console.log(selectedDates[0].getTime());
    if (Date.now() > inputDate) {
      alert('Please choose a date in the future');
      refsBtnStart.disabled = true;
      return;
    }
    refsBtnStart.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const addLeadingZero = value => String(value).padStart(2, 0);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const renderTime = () => {
  const diff = inputDate - Date.now();

  const { days, hours, minutes, seconds } = convertMs(diff);
  console.log(convertMs(diff));
  refsTimerSpansDays.textContent = String(days).padStart(3, 0);
  refsTimerSpansHours.textContent = addLeadingZero(hours);
  refsTimerSpansMinutes.textContent = addLeadingZero(minutes);
  refsTimerSpansSeconds.textContent = addLeadingZero(seconds);
  // time.textContent = `${days} days / ${hours} hours / ${minutes} minutes / ${seconds} seconds`;
};
