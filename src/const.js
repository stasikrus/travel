const TYPES = [
    {
      type: 'taxi',
      offers: [
        { offer: 'Economy offer', price: 20 },
        { offer: 'Comfort offer', price: 25 },
      ]
    },
    {
      type: 'bus',
      offers: [
        { offer: 'Bus to LY', price: 10 },
        { offer: 'Bus to Moscow', price: 12 },
      ]
    },
    {
        type: 'train',
        offers: [
          { offer: 'Train offer', price: 20 },
          { offer: 'Train offer', price: 25 },
          { offer: 'Train offer', price: 30 }
        ]
      },
      {
        type: 'ship',
        offers: [
          { offer: 'Ship offer', price: 10 },
          { offer: 'Ship offer', price: 12 },
          { offer: 'Ship offer', price: 15 }
        ]
      },
      {
        type: 'transport',
        offers: [
          { offer: 'Transport offer', price: 20 },
          { offer: 'Transport offer', price: 25 },
          { offer: 'Transport offer', price: 30 }
        ]
      },
      {
        type: 'drive',
        offers: [
          { offer: 'Drive offer', price: 10 },
        ]
      },
      {
        type: 'flight',
        offers: [
          { offer: 'Flight offer', price: 20 },
          { offer: 'Flight offer', price: 25 },
          { offer: 'Flight offer', price: 30 }
        ]
      },
      {
        type: 'check-in',
        offers: [
          { offer: 'check-in offer', price: 10 },
          { offer: 'check-in offer', price: 12 },
          { offer: 'check-in offer', price: 15 }
        ]
      },
      {
        type: 'sightseeing',
        offers: [
          { offer: 'sightseeing offer', price: 20 },
        ]
      },
      {
        type: 'restaurant',
        offers: [
          { offer: 'restaurant offer', price: 10 },
          { offer: 'restaurant offer', price: 12 },
          { offer: 'restaurant offer', price: 15 }
        ]
      },
  ];


//const TYPES = ['taxi','bus','train','ship','transport','drive','flight','check-in','sightseeing','restaurant'];
const DESTINATIONS = ['Moscow','Paris','Madrid','Minsk','London'];
const DESCRIPTIONS = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.','Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.','Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
];

const SortType = {
    DAY: 'day',
    TIME: 'time',
    PRICE: 'price',
};

const OFFERS = [
    {
        offer: 'Add luggage',
        price: 50,
    },
    {
        offer: 'Switch to comfort',
        price: 80,
    },
    {
        offer: 'Add meal',
        price: 80,
    },
    {
        offer: 'Choose seats',
        price: 5,
    },
    {
        offer: 'Travel by train',
        price: 40,
    },
];

export { TYPES, DESTINATIONS, DESCRIPTIONS, SortType, OFFERS};