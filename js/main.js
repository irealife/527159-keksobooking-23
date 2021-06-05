function userError (message) {
  this.message = message;
  this.name = "Исключение ошибки";
}

function getRandomInt (min, max) {
  if (min >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (min >= max || min < 0) {
    throw new userError('Введите правильные значения, где min меньше max и min >= 0');
  }
}

getRandomInt();

function getRandomIntFloat (min, max, intFloat) {
  if (min >= 0 && min < max) {
    return Number((Math.random() * (max - min + 1) + min).toFixed(intFloat));
  }
  if (min >= max || min < 0) {
    throw new userError('Введите правильные значения, где min меньше max и min >= 0');
  }
}

getRandomIntFloat();
