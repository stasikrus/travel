import AbstractView from "./abstract";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const createPointOfferTemplate = (offers) => {
  return offers.length > 0 ? `${offers.map(({title, price}) => `<li
    class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
    </li>`).join('')}`
    : '';
};

const getDuration = (dateFrom, dateTo) => {
  const duration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  return `${days}D ${hours}H ${minutes}M`;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const createPointTrip = ({destination: {name}, offers, is_favorite, base_price, type, date_from, date_to}) => {
  
  const favoriteClassBtn = is_favorite ? 'event__favorite-btn--active' : '';
  

    return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(date_from).format('YYYY-MM-DD')}">${dayjs(date_from).format('DD-MMM')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${name} ${capitalizeFirstLetter(type)}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(date_from).format('YYYY-MM-DD[T]HH:mm')}">${dayjs(date_from).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(date_to).format('YYYY-MM-DD[T]HH:mm')}">${dayjs(date_to).format('HH:mm')}</time>
        </p>
        <p class="event__duration">${getDuration(date_from, date_to)}</p>
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

export default class Point extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTrip(this._data);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

};