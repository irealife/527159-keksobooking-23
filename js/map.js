import {createCardList} from './card.js';
//import {getRandomIntFloat} from './util.js';
import {getData} from './api.js';
import {setFeatures, setFilters, matchesFilters, sortOffers} from './filter.js';
import {debounce} from './utils/debounce.js';

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
const markerGroup = L.layerGroup().addTo(mapLeaflet);
const RERENDER_DELAY = 500;

//Обычные метки на карте

const createMarkers = () => {

  getData().then((data) => {
    renderMap(data);
    setFeatures(debounce(
      () => renderMap(data),
      RERENDER_DELAY,
    ));
    setFilters(debounce(
      () => renderMap(data),
      RERENDER_DELAY,
    ));

    data.forEach((card) => {
      const pinIcon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      const marker = L.marker(
        {
          lat: card.location.lat,
          lng: card.location.lng,
        },
        {
          icon: pinIcon,
        },
      );

      marker
        .addTo(markerGroup)
        .bindPopup(() => {
            return createCardList(card);
          },
          {
            keepInView: true,
          },
        );
    });
  });
};

const mapInit = () => {
  // mapLeaflet.eachLayer((layer) => layer.remove());
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
  const SIGNS_AFTER_DOT = 5;

  address.setAttribute('value', `lat: ${mainPinMarker._latlng.lat}, lng: ${mainPinMarker._latlng.lng}`);

  mainPinMarker.on('moveend', () => {
    address.setAttribute('value', `lat: ${mainPinMarker._latlng.lat.toFixed(SIGNS_AFTER_DOT)}, lng: ${mainPinMarker._latlng.lng.toFixed(SIGNS_AFTER_DOT)}`);
  });
  createMarkers();
};

const COUNT_CARD = 10;
const renderMap = (data) => {
  markerGroup.clearLayers();

  const sortedCards = data
    .slice()
    .sort(sortOffers);

  let matchedCards = 0;

  for ( let i = 0; i < sortedCards.length; i++) {
    if (matchedCards >= COUNT_CARD) {
      break;
    }

    if (matchesFilters(sortedCards[i])){
      mapInit(sortedCards[i]);
      matchedCards++;
    }
  }
};

export {
  mapInit,
  renderMap
};
