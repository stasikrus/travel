import SiteMenuView from "./view/site-menu.js";
import FilterPresenter from "./presenter/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripCoastView from "./view/trip-coast.js";
import { render, RenderPosition} from "./utils/render.js";
import { generatePoint } from "./mock/point.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import { getRandomElement } from "./utils.js";
import { MenuItem, UpdateType, FilterType } from "./const.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const randomDataNewPoint = getRandomElement(points);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeadElement = document.querySelector('.page-header');
const siteHeaderElement = siteHeadElement.querySelector('.trip-controls__navigation');

const siteMenuComponent = new SiteMenuView();
render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tripFilters = siteHeadElement.querySelector('.trip-controls__filters');

const filterPresenter = new FilterPresenter(tripFilters, filterModel, pointsModel);
filterPresenter.init();

const tripInfo = siteHeadElement.querySelector('.trip-main');

render(tripInfo, new TripInfoView(points), RenderPosition.AFTERBEGIN);

const coastTripInfo = tripInfo.querySelector('.trip-info');
render(coastTripInfo, new TripCoastView(points), RenderPosition.BEFOREEND);

const siteContainerElement = document.querySelector('.page-main_container');

const tripPresenter = new TripPresenter(siteContainerElement, pointsModel, filterModel, randomDataNewPoint);
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

console.log(points);

