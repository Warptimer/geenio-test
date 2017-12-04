// Codekit import
//@codekit-append '../blocks/search/search';
//@codekit-append '../blocks/events/events';
//@codekit-append '../blocks/calendar/calendar';

const settings = {};

const events = [{
    date: '05.12.2017',
    name: 'Напиться',
    people: ['Витя Костин', 'Петр Михайлов'],
    description: ''
  },
  {
    date: '03.12.2017',
    name: 'Пойти гулять',
    people: ['Петр Иванов', 'Иван Петров'],
    description: 'Гулять по набережной'
  },
  {
    date: '03.12.2017',
    name: 'Отправиться в путешествие',
    people: ['Петр Иванов', 'Иван Петров'],
    description: 'На Алтай'
  },
  {
    date: '02.12.2017',
    name: 'Ужин в ресторане',
    people: ['Костя Петров'],
    description: 'Венеция'
  }
];

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