import AbstractView from "./abstract";

const getRoute = (randomPoints) => {
  const uniqueCityList = new Set(randomPoints.map(({city}) => city.city));
  const totalRoute = Array.from(uniqueCityList).join(' &mdash; ');

  return totalRoute;
}

const createTripInfo = (randomPoints) => {

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getRoute(randomPoints)}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    </section>`
};

export default class TripInfo extends AbstractView {
  constructor(randomPoints) {
    super()
    this._randomPoints = randomPoints;
  }

  getTemplate() {
    return createTripInfo(this._randomPoints);
  }
}