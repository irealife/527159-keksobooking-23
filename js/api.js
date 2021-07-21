import {showAlert} from './showAlert.js';

const getData = () => {
  return fetch(
    'https://23.javascript.pages.academy/keksobooking/data'
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => {
      showAlert('Не удалось загрузить данные с сервера');
    });
};

const sendData = (onSuccess, onError, body) => {
  return fetch(
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
