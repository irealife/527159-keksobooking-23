import {showAlert} from './showAlert.js';


const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingQuests = document.querySelector('#housing-guests');

// const filterData = (data) => {
//   console.log(data);
//
//   let filteredData = Array();
//   if (housingType.value !== 'any') {
//     filteredData = data.filter(element => element.offer.type === housingType.value);
//   }
//   switch (housingPrice.value) {
//     case 'middle':
//       filteredData = data.filter(element => element.offer.price >= 10000);
//       filteredData = data.filter(element => element.offer.price >= 50000);
//       console.log(housingPrice.value);
//       break;
//     case 'low':
//       filteredData = data.filter(element => element.offer.price < 10000);
//       break;
//     case 'high':
//       filteredData = data.filter(element => element.offer.price > 50000);
//       break;
//     default:
//       break;
//   }
//   if (housingRooms.value !== 'any') {
//     filteredData = data.filter(element => element.offer.rooms === housingRooms.value);
//   }
//   if (housingQuests.value !== 'any') {
//     filteredData = data.filter(element => element.offer.guests === housingQuests.value);
//   }
//
//   return filteredData.slice(0,10);
// }

const getData = () => {
  return fetch(
    'https://23.javascript.pages.academy/keksobooking/data'
  )
    .then((response) => response.json())
    .then((data) => data)
    // .then((data) => filterData(data))
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
