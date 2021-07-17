// import {GET_SIMILAR_AD} from './data.js';
//
// GET_SIMILAR_AD;

//Вывод типа жилья (квартира, бунгало, дом и т.д.)

const CHOOSE_OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const typeObjectValue = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const keysOfferType = Object.keys(typeObjectValue);
const valuesOfferType = Object.values(typeObjectValue);

const getObjectValue = (array, keys, values) => {
  for (let arrCounter = 0; arrCounter <= array.length; arrCounter++) {
    let arrType = [];
    arrType = array[arrCounter];
    for(let arrCounterKey = 0; arrCounterKey <= keys.length; arrCounterKey++) {
      if (arrType === keys[arrCounterKey]) {
        let typeValue = [];
        typeValue = values[arrCounterKey];
        return typeValue;
      }
    }
  }
};

//Карточка объявления

const templateFragmentCard = document.querySelector('#card').content;
const templateCard = templateFragmentCard.querySelector('article');

const cardElementList = document.querySelector('.ad-form__element--block').querySelector('.ad-form__element-list');


//const cards = [];

// const renderCardList = (cards) => {
//   const cardListFragment = document.createDocumentFragment();
//   cards.forEach(({title, address, price, type, rooms, guests, checkin, checkout, features, description, photos, avatar}) => {
//     const cardElement = templateCard.cloneNode(true);
//     cardElement.querySelector('.popup__title').textContent = title;
//     cardElement.querySelector('.popup__text--address').textContent = address;
//     cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
//     cardElement.querySelector('.popup__type').textContent = type;
//     cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей.`;
//     cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
//     cardElement.querySelector('.popup__features').textContent = features;
//     cardElement.querySelector('.popup__description').textContent = description;
//     cardElement.querySelector('.popup__photos').src = photos;
//     cardElement.querySelector('.popup__avatar').src = avatar;
//     cardListFragment.appendChild(cardElement);
//   });
//   cardElementList.appendChild(cardListFragment);
//   console.log(cardElementList);
// };

//Создает элемент с заданным классом
const createElement = (name, elementClass) => {
  let newElement = document.createElement(name);
  if (elementClass) {
    newElement.className = elementClass;
  }
  return newElement;
};

//Создает картинку
const createImg = (src, width, height, alt, elementClass) => {
  let newImg = createElement('img', elementClass);
  newImg.src = src;
  newImg.width = width;
  newImg.height = height;
  newImg.alt = alt;
  return newImg;
};

//Создание фотографий жилья
const PHOTO_DESC = {
  width: 45,
  height: 40,
  alt: 'Фотография жилья'
};

const createPhotos = (array) => {
  let fragmentPhoto = document.createDocumentFragment();
  for (let count = 0; count <= array; count++) {
    let photo = createImg(array[count], PHOTO_DESC.width, PHOTO_DESC.height, PHOTO_DESC.alt, 'popup__photo');
    fragmentPhoto.appendChild(photo);
    console.log(fragmentPhoto);
  }
  // array.forEach((item) => {
  //   console.log(item);
  //   let photo = createImg(item, PHOTO_DESC.width, PHOTO_DESC.height, PHOTO_DESC.alt, 'popup__photo');
  //   fragmentPhoto.appendChild(photo);
  //
  // });
  return fragmentPhoto;
};


const renderCardList = (cards) => {
  const cardListFragment = document.createDocumentFragment();
    for (let arrCounterCard = 0; arrCounterCard <= cards.length - 1; arrCounterCard++) {
      const cardElement = templateCard.cloneNode(true);
      const popupTitle = cardElement.querySelector('.popup__title');
      popupTitle.textContent = cards[arrCounterCard].offer.title;
      const popupAddress = cardElement.querySelector('.popup__text--address');
      popupAddress.textContent = cards[arrCounterCard].offer.address;
      const popupPrice = cardElement.querySelector('.popup__text--price');
      popupPrice.textContent = `${cards[arrCounterCard].offer.price} ₽/ночь`;
      const popupType = cardElement.querySelector('.popup__type');
      popupType.textContent = getObjectValue(cards[arrCounterCard].offer.type, keysOfferType, valuesOfferType);
      const popupCapacity = cardElement.querySelector('.popup__text--capacity');
      popupCapacity.textContent = `${cards[arrCounterCard].offer.rooms} комнаты для ${cards[arrCounterCard].offer.guests} гостей.`;
      const popupTime = cardElement.querySelector('.popup__text--time');
      popupTime.textContent = `Заезд после ${cards[arrCounterCard].offer.checkin}, выезд до ${cards[arrCounterCard].offer.checkout}`;

      //Вывод доступных удобств в номере

      const popupFeatures = cardElement.querySelector('.popup__features');
      const featuresModifiers = cards[arrCounterCard].offer.features;
      featuresModifiers.map((`${cards[arrCounterCard].offer.features}`) => `popup__feature--${cards[arrCounterCard].offer.features}`);
      popupFeatures.querySelectorAll('.popup__feature').forEach((item) => {
        const featureModifier = item.classList[1];
        if (!featuresModifiers.includes(featureModifier)) {
          item.remove();
          console.log(featureModifier);
          return featuresModifiers;
        }
      });

      const popupDescription = cardElement.querySelector('.popup__description');
      popupDescription.textContent = cards[arrCounterCard].offer.description;

      //Вывод всех фото объявления

      const popupPhotos = cardElement.querySelector('.popup__photos');
      popupPhotos.textContent = '';
      popupPhotos.appendChild(createPhotos(cards[arrCounterCard].offer.photos));

      // popupPhotos.querySelectorAll('.popup__photo').forEach((item) => {
      //   item.src = cards[arrCounterCard].offer.photos;
      // });

      const popupAvatar = cardElement.querySelector('.popup__avatar');
      popupAvatar.src = cards[arrCounterCard].author.avatar;
      cardListFragment.appendChild(cardElement);
    }
    cardElementList.appendChild(cardListFragment);
    console.log(cardElementList);
};

export {
  renderCardList,
};
