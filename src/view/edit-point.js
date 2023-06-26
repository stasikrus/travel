import { compareTwoDates } from "../const";
import SmartView from "./smart";
import dayjs from "dayjs";
import flatpickr from 'flatpickr';


import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEventTypeItemTemplate = (offersData) => {
  return offersData.map(({type}) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`).join('');
}

const formatDate = (dateString) => {
  const formattedDate = dayjs(dateString).format('DD/MM/YY HH:mm');
  return formattedDate;
} 

const createDestinationsOptionTemplate = (destinations) => {
      return destinations.map(({ name }) => `<option value="${name}"></option>`).join("");
};


const createEventOfferTemplate = ({ offers, type, isDisabled}, offersData) => {
  

  if (offers.length > 0) {
    const offersIndex = offersData.findIndex((offer) => offer.type === type);
    const offerTemplate = offersData[offersIndex].offers
      .map(({title, price}) => {
        const offerClassName = title.split(' ').pop();
        
        return `<div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="event-offer-${offerClassName}-1" type="checkbox" name="event-offer-${offerClassName}" ${isDisabled ? 'disabled' : ''} ${offers.some((offer) => offer.title === title) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${offerClassName}-1">
            <span class="event__offer-title">${title}</span>
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
     ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join("")} 
  </div>
  </div>`
  : '';
};

const createEventDestinationTemplate = ({destination: {description, pictures}}) => {
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
  ${createPhotoContainer(pictures)}
</section>`; 
};


const createEditPoint = (destination, destinationsData, offersData) => {
    return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${destination.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${destination.isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventTypeItemTemplate(offersData)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${destination.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.destination.name}" list="destination-list-1" ${destination.isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${createDestinationsOptionTemplate(destinationsData)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(destination.date_from)}" ${destination.isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(destination.date_to)}" ${destination.isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${destination.base_price}" required  ${destination.isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${destination.isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset">${destination.isDeleting ? 'Deleting...' : 'Delete'}</button>
      </header>
      <section class="event__details">     
        ${createEventOfferTemplate(destination, offersData)}    
      </section>
      ${createEventDestinationTemplate(destination)}
      </section>
    </form>
  </li>`
};

export default class EditPoint extends SmartView {
  constructor(destination, destinationsData, offersData) {
    super()
    this._pointState = EditPoint.parsePointDataToState(destination); 
    this._destinationsData = destinationsData;
    this._offersData = offersData;
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._datePickerStartDate = null;
    this._datePickerEndDate = null;
    this._onDateFromChange = this._onDateFromChange.bind(this);
    this._onDateToChange = this._onDateToChange.bind(this);

    this._setInnerHandlers();
    this._setDatePickerStart(this._datePickerStartDate);
    this._setDatePickerEnd(this._datePickerEndDate);

  }

  removeElement() {
    super.removeElement();

    if (this._datePickerStartDate) {
      this._datePickerStartDate.destroy();
      this._datePickerStartDate = null;
    }

    if (this._datePickerEndDate) {
      this._datePickerEndDate.destroy();
      this._datePickerEndDate = null;
    }

  }

  getTemplate() {
    return createEditPoint(this._pointState, this._destinationsData, this._offersData);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parsePointStateToDate(this._pointState));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    console.log(evt.id)
    this._callback.deleteClick(EditPoint.parsePointStateToDate(this._pointState));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointDataToState(pointData) {
    return Object.assign(
      {}, 
      pointData,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parsePointStateToDate(state) {
    state = Object.assign({}, state);

    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;

    return state;
  }

  _eventTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    const selectedTypeObject = this._offersData.find(obj => obj.type === evt.target.value);

    if (selectedTypeObject) {
        this.updateData({
          type: selectedTypeObject.type,
          offers: selectedTypeObject.offers,
      })
    }  
  }
  _destinationChangeHandler(evt) {
        if (!this._destinationsData.some(obj => obj.name === evt.target.value)) {
          return;        
        }
  
        evt.preventDefault();
      
        const selectedTypeObject = this._destinationsData.find(obj => obj.name === evt.target.value);
  
        if (selectedTypeObject) {
          this.updateData({
            destination: {
              name: selectedTypeObject.name,
              description: selectedTypeObject.description,
              pictures: selectedTypeObject.pictures,
            }
          })
        }  
  }

  _priceChangeHandler(evt) {
    this._pointState.base_price = evt.target.value;
  }
  
  restoreHandlers() {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._setInnerHandlers();
    this._setDatePickerStart(this._datePickerStartDate);
    this._setDatePickerEnd(this._datePickerEndDate);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._eventTypeChangeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._priceChangeHandler);
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
        onChange: this._onDateToChange,
      },
    );
  }


  _onDateFromChange(userInput) {
    if (compareTwoDates(this._pointState.date_to, userInput) < 0) {
      this.updateData({
        date_from: dayjs(userInput).toDate(),
        date_to: dayjs(userInput).toDate(),
      });
      return;
    }
    this.updateData({
      date_from: dayjs(userInput).toDate(),
    });
  }

  _onDateToChange(userInput) {
    if (compareTwoDates(userInput, this._pointState.date_from) < 0) {
      userInput = this._pointState.date_from;
    }
    this.updateData({
      date_to: dayjs(userInput).toDate(),
    });
  }


}