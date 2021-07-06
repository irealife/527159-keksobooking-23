import {
  getZeroBeforeInt,
  getRandomIntFloat,
  getRandomInt,
  getRandomArrayElement,
  getOfferFeatures
} from './util.js';

const CHOOSE_OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHOOSE_OFFER_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHOOSE_OFFER_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const CHOOSE_OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const CHOOSE_OFFER_PHOTO = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const MIN_COUNT_AUTHOR = 1;
const MAX_COUNT_AUTHOR = 10;
const MIN_VALUE_PRICE = 10;
const MAX_VALUE_PRICE = 10000;
const MIN_VALUE_ROOM = 1;
const MAX_VALUE_ROOM = 5;
const MIN_COUNT_QUEST = 1;
const MAX_COUNT_QUEST = 10;

const CREATE_AD = () => {
  const AUTHOR = {
    avatar: `img/avatars/user${getZeroBeforeInt(MIN_COUNT_AUTHOR, MAX_COUNT_AUTHOR)}.png`,
  };
  const LOCATION = {
    lat: getRandomIntFloat(35.65000, 35.70000, 5),
    lng: getRandomIntFloat(139.70000, 139.80000, 5),
  };
  const OFFER = {
    title: 'Добро пожаловать!',
    address: `${LOCATION.lat}, ${LOCATION.lng}`,
    price: getRandomInt(MIN_VALUE_PRICE, MAX_VALUE_PRICE),
    type: getRandomArrayElement(CHOOSE_OFFER_TYPE),
    rooms: getRandomInt(MIN_VALUE_ROOM, MAX_VALUE_ROOM),
    guests: getRandomInt(MIN_COUNT_QUEST, MAX_COUNT_QUEST),
    checkin: getRandomArrayElement(CHOOSE_OFFER_CHECKIN),
    checkout: getRandomArrayElement(CHOOSE_OFFER_CHECKOUT),
    features: getOfferFeatures(CHOOSE_OFFER_FEATURES),
    description: 'Просторно, современно, уютно',
    photos: getRandomArrayElement(CHOOSE_OFFER_PHOTO),
  };
  const objFlat = {
    author: {...AUTHOR},
    offer: {...OFFER},
    location: {...LOCATION},
  };
  return objFlat;
};

const SIMILAR_AD_COUNT = 10;

const GET_SIMILAR_AD = new Array(SIMILAR_AD_COUNT).fill(null).map(() => CREATE_AD());

GET_SIMILAR_AD;

export {
  GET_SIMILAR_AD
};
