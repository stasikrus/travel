const TYPES = ['taxi','bus','train','ship','transport','drive','flight','check-in','sightseeing','restaurant'];
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
];;

export { TYPES, DESTINATIONS, DESCRIPTIONS, SortType, OFFERS};