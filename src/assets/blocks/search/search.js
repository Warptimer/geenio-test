const search = document.getElementById('search');

search.addEventListener('keyup', debounce(function () {
  if (this.value.length != 0 && /\S/.test(this.value)) { // Смотрим, чтобы поле не было пустым
    document.getElementById('result').innerHTML = ''
    let resultArray = liveSearch(this.value);
    if (typeof resultArray === 'string') { // Выводим сообщение, если живой поиск ничего не нашел
      let resultItem = document.createElement('div')
          resultItem.className = 'result__item'

      let resultMessage = document.createElement('div')
          resultMessage.className = 'result__item-message'
          resultMessage.innerHTML = resultArray

      resultItem.appendChild(resultMessage)
      document.getElementById('result').appendChild(resultItem)
    } else {
      resultArray.forEach(function(resultItem) {
        createResultItem(resultItem.name, resultItem.date)
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