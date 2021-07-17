import {GET_SIMILAR_AD} from './data.js';
import {renderCardList} from './card.js';

GET_SIMILAR_AD;

const adForm = document.querySelector('.ad-form');
const fieldsetAdForm = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const selectsMapFilters = mapFilters.querySelectorAll('select');
const fieldsetMapFilters = mapFilters.querySelectorAll('fieldset');

//Неактивное состояние формы

const disableElements = (elements) => {
  elements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const nonActiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  disableElements(fieldsetAdForm);
  disableElements(selectsMapFilters);
  disableElements(fieldsetMapFilters);
};

nonActiveForm();

//Активное состояние формы

const enableElements = (elements) => {
  elements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const activeForm = () => {
  if (adForm.classList.contains('ad-form--disabled') && mapFilters.classList.contains('map__filters--disabled')) {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    enableElements(fieldsetAdForm);
    enableElements(selectsMapFilters);
    enableElements(fieldsetMapFilters);
  }
};

//Карта leaflet

const mapLeaflet = L.map('map-canvas');

mapLeaflet
  .on('load', () => {
    activeForm();
  })
  .setView({
    lat: 35.681700,
    lng: 139.753891,
  }, 7.5);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapLeaflet);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.681700,
    lng: 139.753891,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapLeaflet);

const address = document.querySelector('#address');

address.setAttribute('value', `lat: ${mainPinMarker._latlng.lat}, lng: ${mainPinMarker._latlng.lng}`);

mainPinMarker.on('moveend', () => {
  address.setAttribute('value', `lat: ${mainPinMarker._latlng.lat.toFixed(5)}, lng: ${mainPinMarker._latlng.lng.toFixed(5)}`);
});

//Обычные метки на карте

const markerLocation = [];

const getLocationMark = (array) => {
  for (let ad = 0; ad < array.length; ad++) {
    markerLocation.push(array[ad].location);
  }
};

getLocationMark(GET_SIMILAR_AD);

const createMarker = () => {
  markerLocation.forEach(({lat, lng}) => {
    const pinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pinIcon,
      },
    );

    marker
      .addTo(mapLeaflet)
      .bindPopup(
        renderCardList(),
        {
          keepInView: true,
        },
      );
  });
};

// markerLocation.forEach((mark) => {
//   createMarker(mark);
// });

export {
  mapLeaflet
};
