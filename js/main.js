import {formCard} from './card.js';

formCard;

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

activeForm();
