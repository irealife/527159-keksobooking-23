import {showAlert} from './showAlert.js';

const getData = (onSuccess) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking/data'
  )
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      showAlert('Не удалось загрузить данные с сервера');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      'method': 'POST',
      'body': body,
    },
  )
    .then((res) => {
      if (res.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {
  getData,
  sendData
};
