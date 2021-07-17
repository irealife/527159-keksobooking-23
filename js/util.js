const userError = (message) => {
  this.message = message;
  this.name = 'Исключение ошибки';
};

const getRandomInt = (min, max) => {
  if (min >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (min >= max || min < 0) {
    throw new userError('Введите правильные значения, где min меньше max и min >= 0');
  }
};

const getRandomIntFloat = (min, max, intFloat) => {
  if (min >= 0 && min < max) {
    return Number((Math.random() * (max - min + 1) + min).toFixed(intFloat));
  }
  if (min >= max || min < 0) {
    throw new userError('Введите правильные значения, где min меньше max и min >= 0');
  }
};

const getRandomArrayElement = (elements) => {
  return elements[_.random(0, elements.length - 1)];
};

const getZeroBeforeInt = (min, max) => {
  const randomValue = getRandomInt(min, max);
  if (randomValue < 10) {
    return `0${randomValue}`;
  }
  return randomValue;
};

const getOfferFeatures = (array) => {
  const index = getRandomInt(0, array.length-1);
  return array.slice(0, index);
};

export {
  getRandomInt,
  getRandomIntFloat,
  getRandomArrayElement,
  getZeroBeforeInt,
  getOfferFeatures
};
