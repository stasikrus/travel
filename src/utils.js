import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
  
    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (arr) => {
    return arr[getRandomInteger(0, arr.length - 1)];
};

const getRandomDate = () => {
    const randomDay = dayjs().date(Math.floor(Math.random() * 28) + 1);
    return randomDay.format('DD-MM'); 
}


export const renderTemplate = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
    const newElement = document.createElement('div'); // 1
    newElement.innerHTML = template; // 2
  
    return newElement.firstChild; // 3
};

export const sortPointPrice = (a, b) => {
  return b.base_price - a.base_price;
}

export const sortedEvents = (a, b) => {
  const durationA = dayjs(a.date_to).diff(dayjs(a.date_from));
  const durationB = dayjs(b.date_to).diff(dayjs(b.date_from));
  return durationA - durationB;
};

export { getRandomInteger, getRandomElement, getRandomDate };