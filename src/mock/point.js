const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
  
    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (arr) => {
    return arr[getRandomInteger(0, arr.length - 1)];
};

const eventTypes = [
    'taxi',
    'bus',
    'train',
    'ship',
    'transport',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
];

const destinations = [
    'Moscow',
    'Paris',
    'Madrid',
    'Minsk',
    'London',
];

const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
];

const offers = [
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


const createDestination = () => {

    let desArr = []; 
    let photoValue = [];


    let destination = {
       "description": desArr,
       "name": getRandomElement(destinations),
       "pictures": photoValue
    };

    for (let i = 0; i < getRandomInteger(0, 5); i++) {     
           desArr.push(descriptions[getRandomInteger(0, descriptions.length - 1)]) ;
    };

    for (let i = 0; i < getRandomInteger(0, 5); i++) {
        photoValue.push(`http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`);
    };

    if (desArr.length > 1) {
       destination.description = desArr.join(''); 
    };
        
    
    return destination;

};

const createOffers = () => {
    let offersList = {   
        "type": getRandomElement(eventTypes),
        "offers": getRandomElement(offers)         
    };
    

    //for (let i = 0; i < getRandomInteger(0, 5); i++) {
        //randomOffers.push(offers[i]);
    //};

    return offersList;
};

export const generatePoint = () => {
    return {
      "base_price": 1100,
      "date_from": "2019-07-10T22:55:56.845Z",
      "date_to": "2019-07-11T11:22:13.375Z",
      "destination": createDestination(),
      "id": "0",
      "is_favorite": false,
      "offers": createOffers(),
      "type": getRandomElement(destinations)
    };
};