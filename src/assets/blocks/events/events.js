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

  createCalendar(selectedDate)
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

  createCalendar(selectedDate)
})

// Редактирование события
// Выводим конкретные события в дом
function buildChangeEvent(event, index) {
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

  eventNode.addEventListener('submit', function(e) {
    e.preventDefault()
    event.description = this.getElementsByTagName('textarea')[0].value
  })
}
function buildAddEvent(timelineDay) {
  let eventNode = document.createElement('form')
      eventNode.className = 'events__item event'

  let eventFieldset = document.createElement('fieldset')
      eventFieldset.className = 'events__fieldset'

  let eventName = document.createElement('input')
      eventName.className = 'event__name'
      eventName.placeholder = 'Событие'

  let eventPeople = document.createElement('input')
      eventPeople.className = 'event__people'
      eventPeople.placeholder = 'Участники'

  let eventDescription = document.createElement('textarea')
      eventDescription.className = 'event__description'
      eventDescription.placeholder = 'Описание'

  let eventButtonSubmit = document.createElement('button')
      eventButtonSubmit.className = 'event__button'
      eventButtonSubmit.type = 'submit'
      eventButtonSubmit.innerHTML = 'Готово'

  let eventButtonReset = document.createElement('button')
      eventButtonReset.className = 'event__button'
      eventButtonReset.type = 'reset'
      eventButtonReset.innerHTML = 'Удалить'

  eventFieldset.appendChild(eventName)
  eventFieldset.appendChild(eventPeople)
  eventFieldset.appendChild(eventDescription)
  eventNode.appendChild(eventFieldset)
  eventNode.appendChild(eventButtonSubmit)
  eventNode.appendChild(eventButtonReset)
  document.getElementById('events').appendChild(eventNode)

  eventNode.addEventListener('submit', function (e) {
    e.preventDefault()
    let formData = [... this.getElementsByTagName('fieldset')[0].elements].map((formItem) => formItem = formItem.value) // Формируем массив данных со всех полей
    events.push({
      date: timelineDay.dataset.date,
      name: formData[0],
      people: formData[1].split(','),
      description: formData[2]
    })
    updateCalendar(events[events.length - 1], events.length - 1, timelineDay)
  })
}