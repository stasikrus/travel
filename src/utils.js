const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
  
    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (arr) => {
    return arr[getRandomInteger(0, arr.length - 1)];
};


export const renderTemplate = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
    const newElement = document.createElement('div'); // 1
    newElement.innerHTML = template; // 2
  
    return newElement.firstChild; // 3
};

export const updateItem = (items, update) => {
    const index = items.findIndex((item) => item.id === update.id);
  
    if (index === -1) {
      return items;
    }
  
    return [
      ...items.slice(0, index),
      update,
      ...items.slice(index + 1),
    ];
  };

export { getRandomInteger, getRandomElement };