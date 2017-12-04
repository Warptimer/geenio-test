const formattedDate = (date) => date.split('.').reverse().join('-'),
      daysInMonth = (date) => new Date(new Date(formattedDate(date)).getFullYear(), new Date(formattedDate(date)).getMonth()+1, 0).getDate(),
      monthName = (date) => new Date(formattedDate(date)).toLocaleDateString('ru-ru', {month: 'long'})

let thisDate = new Date().toLocaleDateString('ru-ru')

let selectedDate = thisDate;

function createCalendar(date) {
  document.querySelector('.timeline__content').innerHTML = ''
  
  let prevMonth = new Date(formattedDate(date))
      prevMonth.setMonth(prevMonth.getMonth() - 1)
      prevMonth = prevMonth.toLocaleDateString('ru-ru')

  let daysInPrevMonth = daysInMonth(prevMonth)

  let prevMonthDaysCount = new Date(
    new Date(formattedDate(date)).getFullYear(), 
    new Date(formattedDate(date)).getMonth(), 
    0
  ).getDay();

  for (let dayCounter = 0; dayCounter < prevMonthDaysCount; dayCounter++) {
    let timelineDay = document.createElement('div')
        timelineDay.className = 'timeline__day'

    let dayText = document.createElement('div')
        dayText.className = 'timeline__day-text'
        dayText.innerHTML = daysInPrevMonth - prevMonthDaysCount + 1 + dayCounter
        
    timelineDay.dataset.date = new Date(
      new Date(formattedDate(prevMonth)).getFullYear(),
      new Date(formattedDate(prevMonth)).getMonth(),
      daysInPrevMonth - prevMonthDaysCount + 1 + dayCounter
    ).toLocaleDateString('ru-ru');

    timelineDay.appendChild(dayText)

    document.getElementById('timeline').appendChild(timelineDay)
  }
  
  let daysInThisMonth = daysInMonth(date);  

  for (let dayCounter = 1; dayCounter <= daysInThisMonth; dayCounter++) {
    let timelineDay = document.createElement('div')
        timelineDay.className = 'timeline__day'

    let dayText = document.createElement('div')
        dayText.className = 'timeline__day-text'
        dayText.innerHTML = dayCounter
        
    timelineDay.dataset.date = new Date(
      new Date(formattedDate(date)).getFullYear(),
      new Date(formattedDate(date)).getMonth(),
      dayCounter
    ).toLocaleDateString('ru-ru');

    timelineDay.appendChild(dayText)

    document.getElementById('timeline').appendChild(timelineDay)
  }

  let nextMonth = new Date(formattedDate(date))
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      nextMonth = nextMonth.toLocaleDateString('ru-ru')

  let daysInNextMonth = daysInMonth(nextMonth)

  let nextMonthDaysCount = 42 - daysInThisMonth - prevMonthDaysCount;

  for (let dayCounter = 0; dayCounter < nextMonthDaysCount; dayCounter++) {
    let timelineDay = document.createElement('div')
        timelineDay.className = 'timeline__day'

    let dayText = document.createElement('div')
        dayText.className = 'timeline__day-text'
        dayText.innerHTML = dayCounter + 1
        
    timelineDay.dataset.date = new Date(
      new Date(formattedDate(nextMonth)).getFullYear(),
      new Date(formattedDate(nextMonth)).getMonth(),
      dayCounter + 1
    ).toLocaleDateString('ru-ru');

    timelineDay.appendChild(dayText)

    document.getElementById('timeline').appendChild(timelineDay)
  }

  let calendarDays = new Object();
  
  [... document.querySelectorAll('.timeline__day')].forEach(function(timelineDay) {
    calendarDays[timelineDay.dataset.date] = timelineDay
  })

  let eventDays = new Array();

  events.forEach(function(event, index) {
    if(typeof eventDays[event.date] == 'undefined'){
      eventDays[event.date] = []
    }
    eventDays[event.date].push(event)
  });
  Object.keys(eventDays).forEach(function(key) {
    eventDays[key].forEach(function(event, index) {
      if (typeof calendarDays[event.date] != 'undefined') {
        updateCalendar(event, index, calendarDays[event.date])
      }
    })
    delete calendarDays[key]
  })

  for (let date in calendarDays) {
    calendarDays[date].addEventListener('click', function() {
      document.getElementById('events').innerHTML = '';
      buildAddEvent(this);
      giglet = false;
    })
  }
}
createCalendar(selectedDate);

let giglet = false;

function updateCalendar(event, index, dayNode) {
  let dayContent = document.createElement('div')
      dayContent.className = 'timeline__day-content' 
  let dayName = document.createElement('div')
      dayName.className = 'timeline__day-name' 
      dayName.innerHTML = event.name
  let dayPeople = document.createElement('div')
      dayPeople.className = 'timeline__day-people' 
      dayPeople.innerHTML = event.people.join(', ')
  dayContent.appendChild(dayName)
  dayContent.appendChild(dayPeople)

  dayNode.appendChild(dayContent)

  dayNode.addEventListener('click', function() {
    if (!giglet) {
      document.getElementById('events').innerHTML = ''
      giglet = this.dataset.date
    } else {
      if (giglet != event.date) {
        document.getElementById('events').innerHTML = ''
      }
    }
    buildChangeEvent(event, index)
  })
}

document.querySelector('.timeline__prev').onclick = function(){
  let currentMonth = new Date(formattedDate(selectedDate))
      currentMonth.setMonth(currentMonth.getMonth() - 1)
  
  selectedDate = currentMonth.toLocaleDateString('ru-ru')

  createCalendar(selectedDate)
}
document.querySelector('.timeline__next').onclick = function(){
  let currentMonth = new Date(formattedDate(selectedDate))
      currentMonth.setMonth(currentMonth.getMonth() + 1)
  
  selectedDate = currentMonth.toLocaleDateString('ru-ru')

  createCalendar(selectedDate)
}