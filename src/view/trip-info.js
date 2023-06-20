import AbstractView from "./abstract";
import dayjs from "dayjs";

const formatDates = (datesArray) => {
  if (datesArray.length === 0) {
    return ''; // Если массив пустой, вернуть пустую строку
  }

  const firstDate = dayjs(datesArray[0].date_from);
  const lastDate = dayjs(datesArray[datesArray.length - 1].date_to);

  const firstDateFormatted = firstDate.format('MMM DD');
  const lastDateFormatted = lastDate.format('MMM DD');

  return `<p class="trip-info__dates">${firstDateFormatted}&nbsp;&mdash;&nbsp;${lastDateFormatted}</p>`;
}


const getRoute = (destination) => {
  const totalRoute = destination.map(({destination}) => destination.name);

  return totalRoute.length <=3 ? totalRoute.join(' &mdash; ') : `${totalRoute[0]} &mdash;... &mdash;${totalRoute[totalRoute.length-1]}`;
}

const createTripInfo = (destination) => {

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getRoute(destination)}</h1>

      ${formatDates(destination)}
    </div>

    </section>`
};

export default class TripInfo extends AbstractView {
  constructor(destination) {
    super()
    this._destination = destination;

    console.log(this._destination)
  }

  getTemplate() {
    return createTripInfo(this._destination);
  }
}