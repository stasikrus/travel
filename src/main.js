import SiteMenuView from "./view/site-menu.js";
import TripFiltersView from "./view/trip-filters.js";
import { createTripInfo } from "./view/trip-info.js";
import TripSortView from "./view/trip-sort.js";
import { createEditPoint } from "./view/edit-point.js";
import { createPointTrip } from "./view/point.js";
import { createNewPoint } from "./view/new-point.js";
import { createCoastTemplate } from "./view/trip-coast.js";
import { renderTemplate, renderElement, RenderPosition } from "./utils.js";
import { generatePoint } from "./mock/point.js";
import { eventsList } from "./view/events-list.js";

const POINT_COUNT = 10;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteHeadElement = document.querySelector('.page-header');
const siteHeaderElement = siteHeadElement.querySelector('.trip-controls__navigation');

renderElement(siteHeaderElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const tripFilters = siteHeadElement.querySelector('.trip-controls__filters');

renderElement(tripFilters, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);

const tripInfo = siteHeadElement.querySelector('.trip-main');

renderTemplate(tripInfo, createTripInfo(points), 'afterbegin');

const coastTripInfo = tripInfo.querySelector('.trip-info');
renderTemplate(coastTripInfo, createCoastTemplate(points), 'beforeend');

const siteMainElement = document.querySelector('.page-main');
const tripEvents = siteMainElement.querySelector('.trip-events');

const tripListComponent = new TripSortView();
renderElement(tripEvents, tripListComponent.getElement(), RenderPosition.AFTERBEGIN);
renderTemplate(tripEvents, eventsList(), 'beforeend');

const tripList = tripEvents.querySelector('.trip-events__list');

renderTemplate(tripList, createNewPoint(generatePoint()), 'beforeend');


for (let i = 0; i < POINT_COUNT; i++) {
    renderTemplate(tripList, createPointTrip(points[i]), 'beforeend');
};

renderTemplate(tripList, createEditPoint(points[0]), 'beforeend');

console.log(points);