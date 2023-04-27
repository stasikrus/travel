import { getRandomElement, getRandomInteger } from "../utils";
import { TYPES, DESTINATIONS, DESCRIPTIONS } from "../const";
import dayjs from "dayjs";
import {nanoid} from 'nanoid';

const Period = {
    START_DATE_MIN: -7,
    START_DATE_MAX: -4,
    DATE_FROM_MIN: 60,
    DATE_FROM_MAX: 120,
    DATE_TO_MIN: 180,
    DATE_TO_MAX: 2880,
    BASE_PRICE_MIN: 20,
    BASE_PRICE_MAX: 1500,
}

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
       "name": getRandomElement(DESTINATIONS),
       "pictures": photoValue
    };

    for (let i = 0; i < getRandomInteger(0, 5); i++) {     
           desArr.push(DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]) ;
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
        "type": getRandomElement(TYPES),
        "offers": []         
    };
    

    for (let i = 0; i < getRandomInteger(0, 5); i++) {
        offersList.offers.push(getRandomElement(offers));
    };

    return offersList;
};

const createDateGenerator = () => {
    let startDate = dayjs().add(getRandomInteger(Period.START_DATE_MIN, Period.START_DATE_MAX), 'd');
    return () => {
        const dateFrom = dayjs(startDate).add(getRandomInteger(Period.DATE_FROM_MIN, Period.DATE_FROM_MAX), 'm').toDate();
        const dateTo = dayjs(dateFrom).add(getRandomInteger(Period.DATE_TO_MIN, Period.DATE_TO_MAX), 'm').toDate();
        startDate = dateTo;
        return {
            dateFrom, dateTo,
        };

    };
};

const dateGenerator = createDateGenerator();



export const generatePoint = () => {
    const generatedDates = dateGenerator();
    return {
      "base_price": getRandomInteger(Period.BASE_PRICE_MIN, Period.BASE_PRICE_MAX),
      "date_from": generatedDates.dateFrom,
      "date_to": generatedDates.dateTo,
      "destination": createDestination(),
      "id": nanoid(),
      "is_favorite": Boolean(getRandomInteger()),
      "offers": createOffers(),
      "type": getRandomElement(DESTINATIONS)
    };
};