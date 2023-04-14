import AbstractView from "./abstract";

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

export default class TripCoast extends AbstractView {
  constructor(randomPoints) {
    super()
    this._randomPoints = randomPoints;
  }

  getTemplate() {
    return createCoastTemplate(this._randomPoints);
  }
}