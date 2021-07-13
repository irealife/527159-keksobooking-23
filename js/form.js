const form = document.querySelector('.ad-form');

//Валидация поля "Заголовок объявления"

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const title = form.querySelector('#title');

title.addEventListener('invalid', () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
});

title.addEventListener('input', () => {
  const valueLength = title.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    title.setCustomValidity('');
  }
});

//Валидация цена за ночь

const price = form.querySelector('#price');

price.addEventListener('invalid', () => {
  if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
});

//Валидация полей "Количество комнат" и "Количество мест"

const roomCount = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const getRoomToCapacity = () => {
  const capacityOptions = capacity.querySelectorAll('option');
  const roomCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };
  capacityOptions.forEach((quest) => {
    quest.disabled = true;
  });
  roomCapacity[roomCount.value].forEach((quest) => {
    const changeCapacity = capacity.querySelector(`option[value='${quest}']`);
    changeCapacity.disabled = false;
    capacity.value = quest;
  });
};

roomCount.addEventListener('change', getRoomToCapacity);

//Валидация типа жилья

const typeHousing = form.querySelector('#type');
const priceHouse = form.querySelector('#price');

typeHousing.addEventListener('change', () => {
  switch (typeHousing.value) {
    case 'bungalow':
      priceHouse.min = 0;
      priceHouse.placeholder = 0;
      break;
    case 'flat':
      priceHouse.min = 1000;
      priceHouse.placeholder = 1000;
      break;
    case 'hotel':
      priceHouse.min = 3000;
      priceHouse.placeholder = 3000;
      break;
    case 'house':
      priceHouse.min = 5000;
      priceHouse.placeholder = 5000;
      break;
    case 'palace':
      priceHouse.min = 10000;
      priceHouse.placeholder = 10000;
      break;
  }
});

//Валидация время заезда и время выезда

const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  for (let inElement=0; inElement<timeIn.options.length; inElement++) {
    if (timeIn.options[inElement].selected) {
      for (let outElement=0; outElement<timeOut.options.length; outElement++) {
        if (timeIn.options[inElement].value === timeOut.options[outElement].value) {
          timeOut.options[outElement].selected = true;
        }
      }
    }
  }
});

timeOut.addEventListener('change', () => {
  for (let inElement=0; inElement<timeOut.options.length; inElement++) {
    if (timeOut.options[inElement].selected) {
      for (let outElement=0; outElement<timeIn.options.length; outElement++) {
        if (timeOut.options[inElement].value === timeIn.options[outElement].value) {
          timeIn.options[outElement].selected = true;
        }
      }
    }
  }
});
