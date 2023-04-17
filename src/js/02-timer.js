import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector(`button[data-start]`);
const daysEl = document.querySelector(`span[data-days]`);
const hoursEl = document.querySelector(`span[data-hours]`);
const minutesEl = document.querySelector(`span[data-minutes]`);
const secondsEl = document.querySelector(`span[data-seconds]`);





startBtn.addEventListener(`click`, onStartBtnClick);
startBtn.disabled = true;

let TIMER_DEADLINE = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < options.defaultDate){
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        startBtn.disabled = false;
      TIMER_DEADLINE = selectedDates[0];
    },
  };
 

  flatpickr(input, options);
  
  function onStartBtnClick(evt){
    const timerId = setInterval(() =>{
        const now = Date.now();
        const diff = TIMER_DEADLINE - now;
        const timeComponents = convertMs(diff)
        updateTimer(timeComponents)
        console.log (diff);
        if(diff <= 1000){
          clearInterval(timerId)
        }
    }, 1000);

  }

  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    
    const days = Math.floor(ms / day);
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
  function updateTimer ({ days, hours, minutes, seconds }){
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minutesEl.textContent = `${minutes}`;
    secondsEl.textContent = `${seconds}`;
    
  }