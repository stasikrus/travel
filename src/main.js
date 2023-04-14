import SiteMenuView from "./view/site-menu.js";
import TripFiltersView from "./view/trip-filters.js";
import TripInfoView from "./view/trip-info.js";
import TripSortView from "./view/trip-sort.js";
import EditPointView from "./view/edit-point.js";
import PointView from "./view/point.js";
import TripCoastView from "./view/trip-coast.js";
import { render, RenderPosition, remove, replace } from "./utils/render.js";
import { generatePoint } from "./mock/point.js";
import EventsListView from "./view/events-list.js";
import NoPointView from "./view/no-point.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteHeadElement = document.querySelector('.page-header');
const siteHeaderElement = siteHeadElement.querySelector('.trip-controls__navigation');


const renderPoint = (pointListElement, point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditPointView(point);

    const replaceCardToForm = () => {
        replace(pointEditComponent, pointComponent);
    }

    const replaceFormToCard = () => {
        replace(pointComponent, pointEditComponent);
    }

    const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          replaceFormToCard();
          document.removeEventListener('keydown', onEscKeyDown);
        }
    };

    pointComponent.setEditClickHandler(() => {
        replaceCardToForm();
        document.addEventListener('keydown', onEscKeyDown);
    });
    
    pointEditComponent.setFormSubmitHandler(() => {
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
}

render(siteHeaderElement, new SiteMenuView, RenderPosition.BEFOREEND);

const tripFilters = siteHeadElement.querySelector('.trip-controls__filters');

render(tripFilters, new TripFiltersView, RenderPosition.BEFOREEND);

const tripInfo = siteHeadElement.querySelector('.trip-main');

render(tripInfo, new TripInfoView(points), RenderPosition.AFTERBEGIN);

const coastTripInfo = tripInfo.querySelector('.trip-info');
render(coastTripInfo, new TripCoastView(points), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.page-main');
const tripEvents = siteMainElement.querySelector('.trip-events');

const tripListComponent = new TripSortView();
render(tripEvents, tripListComponent, RenderPosition.AFTERBEGIN);
render(tripEvents, new EventsListView, RenderPosition.BEFOREEND);

const tripList = tripEvents.querySelector('.trip-events__list');

if (points.length > 0) {
    for (let i = 0; i < POINT_COUNT; i++) {
    renderPoint(tripList, points[i]);
    }
} else {
    render(tripEvents, new NoPointView, RenderPosition.BEFOREEND);
}


console.log(points);