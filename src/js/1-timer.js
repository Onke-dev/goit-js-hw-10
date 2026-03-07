// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const datatimePiker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]")
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0].getTime() < Date.now()) {
          startBtn.disabled = true;
          iziToast.error({
              title: 'Error',
              message: 'Please choose a date in the future',
          });
      } else {
          startBtn.disabled = false;
          userSelectedDate = selectedDates[0];
      } 
  },
};
flatpickr("#datetime-picker", options)


let intervalId;

startBtn.addEventListener('click', () => {

    startBtn.disabled = true;
    datatimePiker.disabled = true;
    intervalId = setInterval(() => {
        const timeNow = Date.now();
        const diff = userSelectedDate.getTime() - timeNow;
        if (diff <= 0) {
            clearInterval(intervalId);
            datatimePiker.disabled = false;
            return;
        }
        const time = convertMs(diff);
        daysEl.textContent = addLeadingZero(time.days);
        hoursEl.textContent = addLeadingZero(time.hours);
        minutesEl.textContent = addLeadingZero(time.minutes);
        secondsEl.textContent = addLeadingZero(time.seconds);
    }, 1000);
});

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

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
