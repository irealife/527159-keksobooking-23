import {renderCardList} from './card.js';
import {mapLeaflet} from './map.js';

mapLeaflet;


fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((cards) => {
    renderCardList(cards);
  });
