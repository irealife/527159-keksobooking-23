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
