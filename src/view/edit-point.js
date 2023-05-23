import { TYPES, DESTINATIONS, compareTwoDates } from "../const";
import { getRandomElement, getRandomInteger } from "../utils";
import SmartView from "./smart";
import dayjs from "dayjs";
import flatpickr from 'flatpickr';


import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEventTypeItemTemplate = (avaibleTypes, currentType ='') => {
  return avaibleTypes.map(({type: type}) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type} ${type === currentType ? 'checked' : ''}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`,).join('');
}

const formatDate = (dateString) => {
  const formattedDate = dayjs(dateString).format('DD/MM/YY HH:mm');
  return formattedDate;
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
            ${destination.type.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city.city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationsOptionTemplate(DESTINATIONS)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(destination.date_from)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(destination.date_to)}">
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
    this._datePickerStartDate = null;
    this._datePickerEndDate = null;
    this._onDateFromChange = this._onDateFromChange.bind(this);
    this._onDateToChange = this._onDateToChange.bind(this);

    this._setInnerHandlers();
    this._setDatePickerStart(this._datePickerStartDate);
    this._setDatePickerEnd(this._datePickerEndDate);

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
  
    this.updateData({
      type: {
        type: evt.target.value.trim(),
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
    this._setDatePickerStart(this._datePickerStartDate);
    this._setDatePickerEnd(this._datePickerEndDate);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._eventTypeChangeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
  }

  _setDatePickerStart(datePicker) {
    if (datePicker) {
      datePicker.destroy();
      datePicker = null;
    }

    datePicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._pointState.date_from,
        onChange: this._onDateFromChange,
      },
    );
  }

  _setDatePickerEnd(datePicker) {
    if (datePicker) {
      datePicker.destroy();
      datePicker = null;
    }

    datePicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._pointState.date_to,
        onChange: this._onDateFromChange,
      },
    );
  }


  _onDateFromChange(userInput) {
    if (compareTwoDates(this._pointState.date_to, userInput) < 0) {
      this.updateData({
        date_from: userInput,
        date_to: userInput,
      });
      return;
    }
    this.updateData({
      date_from: userInput,
    });
  }

  _onDateToChange(userInput) {
    if (compareTwoDates(userInput, this._pointState.date_from) < 0) {
      userInput = this._pointState.date_from;
    }
    this.updateData({
      date_to: userInput,
    });
  }


}