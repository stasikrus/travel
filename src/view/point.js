import { createElement } from "../utils";

const createPointOfferTemplate = (offers) => {
  return offers.length > 0 ? `${offers.map(({offer, price}) => `<li
    class="event__offer">
    <span class="event__offer-title">${offer}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
    </li>`).join('')}`
    : '';
};


const createPointTrip = ({type, is_favorite, base_price, offers: {type: event, offers}}) => {
  
  const favoriteClassBtn = is_favorite ? 'event__favorite-btn--active' : '';
  

    return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">MAR 18</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${event}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event} ${type}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
        </p>
        <p class="event__duration">30M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${base_price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createPointOfferTemplate(offers)}
      </ul>
      <button class="event__favorite-btn ${favoriteClassBtn}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
};

export default class Point {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createPointTrip(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
    
  }

  removeElement() {
    this._element = null;
  }
};