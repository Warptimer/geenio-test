const settings = {};

const events = [{
    date: '05.12.2017',
    name: 'Напиться',
    people: ['Витя Костин', 'Петр Михайлов'],
    description: ''
  },
  {
    date: '05.12.2017',
    name: 'Пойти гулять',
    people: ['Петр Иванов', 'Иван Петров'],
    description: 'Гулять по набережной'
  },
  {
    date: '02.12.2017',
    name: 'Ужин в ресторане',
    people: ['Костя Петров'],
    description: 'Венеция'
  }
];

const search = document.getElementById('search');

search.addEventListener('keyup', debounce(function () {
  if (this.value.length != 0 && /\S/.test(this.value)) { // смотрим, чтобы поле не было пустым
    document.getElementById('result').innerHTML = ''
    let resultArray = liveSearch(this.value);
    if (typeof resultArray === 'string') { // выводим сообщение, если живой поиск ничего не нашел
      let resultItem = document.createElement('div')
          resultItem.className = 'result__item'

      let resultMessage = document.createElement('div')
          resultMessage.className = 'result__item-message'
          resultMessage.innerHTML = resultArray

      resultItem.appendChild(resultMessage)
      document.getElementById('result').appendChild(resultItem)
    } else {
      resultArray.forEach(function(resultItem) {
        createResultItem(resultItem.name, resultItem.date) // наполняем result элементами
      })
    }
  }
}, 400));

const createResultItem = (name, date) => {
  let resultItem = document.createElement('div')
      resultItem.className = 'result__item'

  let resultName = document.createElement('div')
      resultName.className = 'result__item-name'
      resultName.innerHTML = name

  resultItem.appendChild(resultName)

  let resultDate = document.createElement('div')
      resultDate.className = 'result__item-date'
      resultDate.innerHTML = date

  resultItem.appendChild(resultDate)

  document.getElementById('result').appendChild(resultItem)
}


// Добавляем событие в список событий
const addEventForm = document.getElementById('addEvent');

addEventForm.addEventListener('submit', function (e) {
  e.preventDefault()
  let formData = [... this.getElementsByTagName('fieldset')[0].elements].map((formItem) => formItem = formItem.value) // Формируем массив данных со всех полей
  events.push({
    date: formData[1].split('-').reverse().join('.'),
    name: formData[0],
    people: formData[2].split(','),
    description: formData[3]
  })
})

// Быстрое добавление события (сейчас требует строгих обязательных данных - "дд.мм.гггг; название события; участники; описание")
const addFastEventForm = document.getElementById('addFastEvent');

addFastEventForm.addEventListener('submit', function (e) {
  e.preventDefault()
  let formData = [... this.getElementsByTagName('fieldset')[0].elements].map((formItem) => formItem = formItem.value)
  events.push({
    date: formData[0].split(';')[0],
    name: formData[0].split(';')[1],
    people: formData[0].split(';')[2].split(','),
    description: formData[0].split(';')[3]
  })
})

const todaysDate = new Date().toLocaleDateString('ru-ru')

const formattedDate = (date) => date.split('.').reverse().join('-')
const daysInMonth = (date) => new Date(new Date(formattedDate(date)).getFullYear(), new Date(formattedDate(date)).getMonth()+1, 0).getDate()
const monthName = (date) => new Date(formattedDate(date)).toLocaleDateString('ru-ru', {month: 'long'})

// Создаем обертку для месяца
const timelineContent = document.querySelector('.timeline__content')
const timelineGrid = document.createElement('div')
      timelineGrid.className = 'timeline__grid'

// Создаем месяц
const createTimelineMonth = (date, direction) => {
  let timelineMonth = document.createElement('div')
      timelineMonth.className = 'timeline__month'
      timelineMonth.setAttribute('data-month-name', monthName(date))
      timelineMonth.setAttribute('data-month-number', new Date(formattedDate(date)).getMonth()+1)
      timelineMonth.setAttribute('data-year', new Date(formattedDate(date)).getFullYear())

  // Создаем все дни в текущем месяце
  for (let dayCounter = 1; dayCounter <= daysInMonth(date); dayCounter++) {
    let timelineDay = document.createElement('div')
        timelineDay.className = 'timeline__day'

    let dayText = document.createElement('div')
        dayText.className = 'timeline__day-text'
        dayText.innerHTML = dayCounter

    timelineDay.appendChild(dayText)

    timelineMonth.appendChild(timelineDay) // Вставляем день в месяц
    // Проверяем есть ли событие на выбранную дату
    let currentDate = new Date((dayCounter + '.' + timelineMonth.dataset.monthNumber + '.' + timelineMonth.dataset.year).split('.').reverse().join('-')).toLocaleDateString('ru-ru')

    events.forEach(function(event, index) {
      if (currentDate == event.date) {
        let dayContent = document.createElement('div')
            dayContent.className = 'timeline__day-content' 
        let dayName = document.createElement('div')
            dayName.className = 'timeline__day-name' 
            dayName.innerHTML =  event.name
        let dayPeople = document.createElement('div')
            dayPeople.className = 'timeline__day-people' 
            dayPeople.innerHTML =  event.people.join(', ')
        dayContent.appendChild(dayName)
        dayContent.appendChild(dayPeople)

        timelineDay.appendChild(dayContent)      
      }
    })

    timelineDay.addEventListener('click', function() {
      document.getElementById('events').innerHTML = ''
      events.forEach(function(event, index) {
        if (currentDate == event.date) {
          buildEvent(event, index)
        }
      })
    })
  }

  // Месяц можно вставить как в начало, так и в конец сетки
  // По дефолту ставится в конец (следующий месяц)
  switch(direction) {
    case 'forward':
    case 'next':
      timelineGrid.appendChild(timelineMonth)
      break
    case 'backward':
    case 'back':
      timelineGrid.insertBefore(timelineMonth, timelineGrid.firstChild)
      break
    default:
      timelineGrid.appendChild(timelineMonth)
  }
}

// Наполняем сетку 
const createTimelineGrid = () => {
  timelineContent.appendChild(timelineGrid)
  createTimelineMonth(todaysDate)
}

createTimelineGrid()

// Выводим конкретные события в дом
function buildEvent(event, index) {
  let eventNode = document.createElement('form')
      eventNode.className = 'events__item event'

  let eventName = document.createElement('div')
      eventName.className = 'event__name'
      eventName.innerHTML = event.name

  let eventDate = document.createElement('div')
      eventDate.className = 'event__date'
      eventDate.innerHTML = event.date

  let eventPeople = document.createElement('div')
      eventPeople.className = 'event__people'
      eventPeople.innerHTML = event.people.join(', ')

  let eventDescription = document.createElement('textarea')
      eventDescription.className = 'event__description'

  if (event.description == '' || event.description == undefined) {
    eventDescription.placeholder = 'Описание'
  } else {
    eventDescription.value = event.description
  }

  eventNode.addEventListener('submit', function(e) {
    e.preventDefault()
    events[index].description = this.getElementsByTagName('textarea')[0].value
  })

  let eventButtonSubmit = document.createElement('button')
      eventButtonSubmit.className = 'event__button'
      eventButtonSubmit.type = 'submit'
      eventButtonSubmit.innerHTML = 'Готово'

  let eventButtonReset = document.createElement('button')
      eventButtonReset.className = 'event__button'
      eventButtonReset.type = 'reset'
      eventButtonReset.innerHTML = 'Удалить'

  eventNode.appendChild(eventName)
  eventNode.appendChild(eventDate)
  eventNode.appendChild(eventPeople)
  eventNode.appendChild(eventDescription)
  eventNode.appendChild(eventButtonSubmit)
  eventNode.appendChild(eventButtonReset)
  document.getElementById('events').appendChild(eventNode)
}

// Живой поиск. Вернет массив с подходящими объектами или строку с сообщением
function liveSearch(value) {
  let needle = [];
  const reg = new RegExp(value.split('').join('\\w*').replace(/\W/, ''), 'i');
  events.forEach((event, index) => {
    event = Object.values(event).reduce((flat, current) => flat.concat(current), []); // Вернет массив со текстом события
    event.forEach(eventProp => {
      if (eventProp.match(reg)) {
        return needle[index] = events[index];
      }
    });
  });

  if (needle.length == 0) {
    return needle = 'Ничего не найдено'
  }
  return needle.filter(function(n){ return n != undefined })
}

function debounce(func, delay) {
  let inDebounce = undefined;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(inDebounce);
    return (inDebounce = setTimeout(function () {
      return func.apply(context, args);
    }, delay));
  };
}