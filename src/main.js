import SiteMenuView from "./view/site-menu.js";
import TripFiltersView from "./view/trip-filters.js";
import TripInfoView from "./view/trip-info.js";
import TripCoastView from "./view/trip-coast.js";
import { render, RenderPosition} from "./utils/render.js";
import { generatePoint } from "./mock/point.js";
import TripPresenter from "./presenter/trip.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteHeadElement = document.querySelector('.page-header');
const siteHeaderElement = siteHeadElement.querySelector('.trip-controls__navigation');


render(siteHeaderElement, new SiteMenuView, RenderPosition.BEFOREEND);

const tripFilters = siteHeadElement.querySelector('.trip-controls__filters');

render(tripFilters, new TripFiltersView, RenderPosition.BEFOREEND);

const tripInfo = siteHeadElement.querySelector('.trip-main');

render(tripInfo, new TripInfoView(points), RenderPosition.AFTERBEGIN);

const coastTripInfo = tripInfo.querySelector('.trip-info');
render(coastTripInfo, new TripCoastView(points), RenderPosition.BEFOREEND);

const siteContainerElement = document.querySelector('.page-main_container');

const tripPresenter = new TripPresenter(siteContainerElement);
tripPresenter.init(points);


console.log(points);

