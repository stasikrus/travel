import { TYPES, DESTINATIONS, OFFERS } from "../const";
import { getRandomElement, getRandomInteger } from "../utils";
import SmartView from "./smart";

const createEventTypeItemTemplate = (avaibleTypes, currentType ='') => {
  return avaibleTypes.map(({type: type}) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type} ${type === currentType ? 'checked' : ''}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`,).join('');
}

const createDestinationsOptionTemplate = (cities) => {
  return cities.map(({city}) => `<option value=${city}></option>`).join("");
};

const createEventOfferTemplate = ({ type: { offers } }) => {
  if (offers.length > 0) {
    const offerTemplate = offers
      .map(({ offer, price }) => {
        const offerClassName = offer.split(' ').pop();
        const checkedAttribute = getRandomInteger() ? 'checked' : '';
        return `<div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="event-offer-${offerClassName}-1" type="checkbox" name="event-offer-${offerClassName}" ${checkedAttribute}>
          <label class="event__offer-label" for="event-offer-${offerClassName}-1">
            <span class="event__offer-title">${offer}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`;
      })
      .join('');

    return `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offerTemplate}
      </div>
    </section>`;
  }

  return '';
};

const createPhotoContainer = (pictures) => {
  return pictures.length > 0 ? `<div class="event__photos-container">
  <div class="event__photos-tape">
     ${pictures.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join("")} 
  </div>
  </div>`
  : '';
};

const createEventDestinationTemplate = ({city: {description, photo}}) => {
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
  ${createPhotoContainer(photo)}
</section>`; 
};


const createEditPoint = (destination) => {
    const randomEvent = getRandomElement(TYPES);
    return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${destination.type.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventTypeItemTemplate(TYPES, randomEvent.type)};

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationsOptionTemplate(DESTINATIONS)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">     
        ${createEventOfferTemplate(destination)}    
      </section>
      ${createEventDestinationTemplate(destination)}
      </section>
    </form>
  </li>`
};

export default class EditPoint extends SmartView {
  constructor(destination) {
    super()
    this._pointState = EditPoint.parsePointDataToState(destination); // ПРОВЕРИТЬ ЗАВИСИМОСТИ!!
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();

  }

  getTemplate() {
    return createEditPoint(this._pointState);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parsePointStateToDate(this._pointState));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  static parsePointDataToState(pointData) {
    return Object.assign({}, pointData);
  }

  static parsePointStateToDate(state) {
    return Object.assign({}, state) ;
  }

  _eventTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    const selectedTypeObject = TYPES.find(obj => obj.type === evt.target.value.trim());

    const findSelectedOffers = () => {
      if (selectedTypeObject) {
        return selectedTypeObject.offers.map(({ offer, price }) => ({ offer, price }));
      }
      return [];
    }

    console.log(evt.target.value);
    console.log(selectedTypeObject);
    console.log(findSelectedOffers());
    console.log(`'${evt.target.value.trim()}'`)


  
    this.updateData({
      type: {
        type: evt.target.value,
        offers: findSelectedOffers()
      }
    });
  }

  _destinationChangeHandler(evt) {
    if (!DESTINATIONS.some(obj => obj.city === evt.target.value)) {
      return;
    }

    evt.preventDefault();
    
    
    const selectedTypeObject = DESTINATIONS.find(obj => obj.city === evt.target.value);

    console.log(selectedTypeObject);

    if (selectedTypeObject) {
      this.updateData({
        city: {
          city: evt.target.value,
          description: selectedTypeObject.description,
          photo: selectedTypeObject.photo,
        }
      });
    }
  }
  
  restoreHandlers() {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._eventTypeChangeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
  }
}