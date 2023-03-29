import { createSiteMenuTemplate } from "./view/site-menu.js";
import { createTripFilters } from "./view/trip-filters.js";
import { createTripInfo } from "./view/trip-info.js";
import { createTripSort } from "./view/trip-sort.js";

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const siteHeadElement = document.querySelector('.page-header');
const siteHeaderElement = siteHeadElement.querySelector('.trip-controls__navigation');

render(siteHeaderElement, createSiteMenuTemplate(), 'beforeend');

const tripFilters = siteHeadElement.querySelector('.trip-controls__filters');

render(tripFilters, createTripFilters(), 'beforeend');

const tripInfo = siteHeadElement.querySelector('.trip-main');

render(tripInfo, createTripInfo(), 'afterbegin');

const siteMainElement = document.querySelector('.page-main');
const tripEvents = siteMainElement.querySelector('.trip-events');

render(tripEvents, createTripSort(), 'afterbegin');