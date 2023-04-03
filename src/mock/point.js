const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
  
    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const createEventType = () => {
    const eventTypes = [
        'Taxi',
        'Bus',
        'Train',
        'Ship',
        'Transport',
        'Drive',
        'Flight',
        'Check-in',
        'Sightseeing',
        'Restaurant',
    ];

    const randomIndex = getRandomInteger(0, eventTypes.length - 1);

    return eventTypes[randomIndex];
};

const createDestination = () => {
    const destinations = [
        'Moscow',
        'Paris',
        'Madrid',
        'Minsk',
        'London',
    ];

    const randomIndex = getRandomInteger(0, destinations.length - 1);

    return destinations[randomIndex];
};

const createDescription = () => {
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

    let newDescription = [];
    let photos = [];


    for (let i = 0; i < descriptions.length - 1; i++) {
        if (i === getRandomInteger(0, descriptions.length - 1) && newDescription.length < getRandomInteger(0, 5)) {
            newDescription.push(descriptions[i]);
        };
    };

    for (let i = 0; i < getRandomInteger(0, 5); i++) {
        photos.push(`http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`)
    };

    console.log(photos);
};

export { createDescription };