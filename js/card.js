import {createElement} from './util.js';
import {getData} from './api.js';

const typeObjectValue = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const PHOTO_DESC = {
  width: 45,
  height: 40,
  alt: 'Фотография жилья'
};

//Карточка объявления



//Карточка объявления
const templateFragmentCard = document.querySelector('#card').content;
const templateCard = templateFragmentCard.querySelector('article');

const cardElementList = document.querySelector('.ad-form__element--block').querySelector('.ad-form__element-list');

const createCardList = (card) => {
  const cardElement = templateCard.cloneNode(true);
    const popupTitle = cardElement.querySelector('.popup__title');
    popupTitle.textContent = card.offer.title;
    const popupAddress = cardElement.querySelector('.popup__text--address');
    popupAddress.textContent = card.offer.address;
    const popupPrice = cardElement.querySelector('.popup__text--price');
    popupPrice.textContent = `${card.offer.price} ₽/ночь`;
    const popupType = cardElement.querySelector('.popup__type');
    popupType.textContent = typeObjectValue[card.offer.type];
    const popupCapacity = cardElement.querySelector('.popup__text--capacity');
    popupCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей.`;
    const popupTime = cardElement.querySelector('.popup__text--time');
    popupTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

    //Вывод доступных удобств в номере

    const popupFeatures = cardElement.querySelector('.popup__features');
    const featuresModifiers = card.offer.features;
    popupFeatures.textContent = '';
    featuresModifiers && featuresModifiers.forEach((feature) => {
      const featureClass = `popup__feature popup__feature--${feature}`;
      const featureElement = createElement('li', featureClass);
      popupFeatures.appendChild(featureElement);
    });

    const popupDescription = cardElement.querySelector('.popup__description');
    popupDescription.textContent = card.offer.description;

    //Вывод всех фото объявления

    const popupPhotos = cardElement.querySelector('.popup__photos');
    const photosModifiers = card.offer.photos;
    popupPhotos.textContent = '';
    photosModifiers && photosModifiers.forEach((photo) => {
      const photoClass = `popup__photo`;
      const photoElement = createElement('img', photoClass);
      photoElement.src = photo;
      photoElement.width = PHOTO_DESC.width;
      photoElement.height = PHOTO_DESC.height;
      photoElement.alt = PHOTO_DESC.alt;
      popupPhotos.appendChild(photoElement);
    });

    const popupAvatar = cardElement.querySelector('.popup__avatar');
    popupAvatar.src = card.author.avatar;

  return cardElement;
};

export {
  createCardList
};
