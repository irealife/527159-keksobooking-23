import {sendData} from './api.js';
import {mapInit} from './map.js';

const ESCAPE = 'Escape';

const form = document.querySelector('.ad-form');
const housingFilter = document.querySelector('#housing-type');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const isEscEvent = (evt) => evt.key === ESCAPE;

//Сообщение об успешном завершении отправки данных

const onSuccessMessageClick = () => closeSuccessMessage();
const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

function showSuccessMessage () {
  form.insertAdjacentElement('beforeend', successMessage);
  successMessage.addEventListener('mousedown', onSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
}

function closeSuccessMessage () {
  successMessage.remove();
  successMessage.removeEventListener('mousedown', onSuccessMessageClick);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

//Сообщение об ошибке

const onErrorMessageClick = () => closeErrorMessage();
const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

function showErrorMessage () {
  form.insertAdjacentElement('beforeend', errorMessage);
  errorMessage.addEventListener('mousedown', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
}

function closeErrorMessage() {
  errorMessage.remove();
  errorMessage.removeEventListener('mousedown', onErrorMessageClick);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
}

const resetForm = () => {
  form.reset();
};

const onSubmit = () => {
  showSuccessMessage();
  resetForm();
};

const setButtonSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

const setFilter = (onSuccess, onFail) => {
  housingFilter.addEventListener('change', (evt) => {
    mapInit();
  })
}

export {
  setFilter,
  onSubmit,
  setButtonSubmit,
  showErrorMessage
}


