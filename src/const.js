import dayjs from "dayjs";
import Api from "./api";

export const compareTwoDates = (dateA, dateB) => dayjs(dateA).diff(dateB);

export const MenuItem = {
  TABLE: 'TABLE',
  STATS: 'STATS',
  NEW_EVENT: 'NEW EWENT',
};

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


const DESTINATIONS = [
  {
    city: 'Moscow',
    description: 'Moscow fermentum tortor ac porta dapibus.',
    photo: ['http://picsum.photos/248/152?r=10', 'http://picsum.photos/248/152?r=1'],
  },
  {
    city: 'Paris',
    description: 'Paris fermentum tortor ac porta dapibus.',
    photo: ['http://picsum.photos/248/152?r=2', 'http://picsum.photos/248/152?r=7'],
  },
  {
      city: 'Madrid',
      description: 'Madrid fermentum tortor ac porta dapibus.',
      photo: ['http://picsum.photos/248/152?r=4', 'http://picsum.photos/248/152?r=6'],
    },
    {
      city: 'Minsk',
      description: 'Minsk fermentum tortor ac porta dapibus.',
      photo: ['http://picsum.photos/248/152?r=5', 'http://picsum.photos/248/152?r=9'],
    },
    {
      city: 'London',
      description: 'London fermentum tortor ac porta dapibus.',
      photo: ['http://picsum.photos/248/152?r=4', 'http://picsum.photos/248/152?r=9'],
    },
]

const AUTHORIZATION = 'Basic academy14';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const DESTINATIONS_NEW = () => {
  api.getDestinations()
  .then((destinations) => { 
    console.log('Received destinations from the server:', destinations);
    return destinations;
  })  
    
  .catch((error) => {
    console.error('Error occurred:', error);
  });
};



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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
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

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
}

export { TYPES, DESTINATIONS, DESCRIPTIONS, SortType, OFFERS, FilterType, DESTINATIONS_NEW};