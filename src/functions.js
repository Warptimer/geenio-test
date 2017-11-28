const settings = {};

const events = [{
    date: '05.11.2017',
    name: 'Напиться',
    people: ['Витя Костин', 'Петр Михайлов']
  },
  {
    date: '02.11.2017',
    name: 'Пойти гулять',
    people: ['Петр Иванов', 'Иван Петров']
  }
];

const search = document.getElementById('search');

search.addEventListener('keyup', debounce(function () {
  if (this.value.length != 0 && /\S/.test(this.value)) {
    console.log(liveSearch(this.value))
  }
}, 400));

function liveSearch(value) {
  let needle = [];
  const reg = new RegExp(value.split('').join('\\w*').replace(/\W/, ''), 'i');

  events.forEach((event, index) => {
    event = Object.values(event).reduce((flat, current) => flat.concat(current), []);
    event.forEach(eventProp => {
      if (eventProp.match(reg)) {
        return needle[index] = events[index];
      }
    });
  });

  if (needle.length == 0) {
    return needle = 'Ничего не найдено'
  }
  return needle
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