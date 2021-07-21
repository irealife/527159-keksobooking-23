
const mapFilters = document.querySelector('.map__filters');
const mapFilter = document.querySelector('.map__filter');
const mapFeatures = document.querySelector('.map__features');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingQuests = document.querySelector('#housing-guests');
const VALUE_DEFAULT = 'any';

let enabledFeatures = [];
const getCardsRank = (data) => {
  let rank = 0;

  for (let i = 0; i < enabledFeatures.length; i++) {
    if (data.offer.features && data.offer.features.includes(enabledFeatures[i])) {
      rank += 1;
    }
  }
  return rank;
};

const sortOffers = (value1, value2) => {
  const rank1 = getCardsRank(value1);
  const rank2 = getCardsRank(value2);
  return rank2 - rank1;
};

const setFeatures = (feature) => {
  feature.addEventListener('change', () => {
    const checkedFeatures = Array.from(mapFeatures.querySelectorAll('input:checked'));
    enabledFeatures = checkedFeatures.map(((item) => item.value));
    feature();
  });
};

const isValueFilterMatched = (value, proviso) => value === String(proviso) || value === VALUE_DEFAULT;

const pricesRange = {
  LOW_PRICE: 10000,
  MIDDLE_PRICE: 50000,
};

const isValuePriceMatched = (value, proviso) => {
  if (value === 'low') {
    return proviso < pricesRange.LOW_PRICE;
  } else if (value === 'middle') {
    return proviso > pricesRange.LOW_PRICE && proviso < pricesRange.MIDDLE_PRICE;
  } else if (value === 'high') {
    return proviso > pricesRange.MIDDLE_PRICE;
  }
  return true;
};

const filterValues = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
};

const matchesFilters = ((data) => {
  const typeMatched = isValueFilterMatched(filterValues.type, data.offer.type);
  const priceMatched = isValueFilterMatched(filterValues.price, data.offer.price);
  const roomsMatched = isValueFilterMatched(filterValues.rooms, data.offer.rooms);
  const guestsMatched = isValueFilterMatched(filterValues.guests, data.offer.guests);

  return typeMatched
    && priceMatched
    && roomsMatched
    && guestsMatched;
});

const filterElements = {
  type: housingType,
  price: housingPrice,
  rooms: housingRooms,
  guests: housingQuests,
};

const setFilters = (filter) => {
  Object.keys(mapFilters).forEach((key) => {
    filterElements[key].addEventListener('change', (evt) => {
      filterValues[key] = evt.target.value;

      filter();
    });
  });
};

const resetFilters = () => {
  mapFilters.reset();
};

export {
  matchesFilters,
  setFeatures,
  setFilters,
  resetFilters,
  sortOffers
};
