import { createElement } from "../utils";

const createTripCoast = (randomPoints) => {
    let totalCoast = 0;
    randomPoints.forEach(({base_price}) => totalCoast += base_price);
    return totalCoast;
};

const createCoastTemplate = (randomPoints) => {
    return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${createTripCoast(randomPoints)}</span>
    </p>`
};

export default class TripCoast {
  constructor(randomPoints) {
    this._randomPoints = randomPoints;
    this._element = null;
  }

  getTemplate() {
    return createCoastTemplate(this._randomPoints);
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
}