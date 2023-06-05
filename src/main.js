import SiteMenuView from "./view/site-menu.js";
import FilterPresenter from "./presenter/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripCoastView from "./view/trip-coast.js";
import { render, RenderPosition, remove} from "./utils/render.js";
import { generatePoint } from "./mock/point.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import { getRandomElement } from "./utils.js";
import { MenuItem, UpdateType, FilterType } from "./const.js";
import StatisticsView from "./view/statistics.js";
import ButtonNewView from "./view/button-new.js";
import Api from "./api.js";

const POINT_COUNT = 20;
const AUTHORIZATION = 'Basic academy14';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';


const points = new Array(POINT_COUNT).fill().map(generatePoint);
const api = new Api(END_POINT, AUTHORIZATION);



const randomDataNewPoint = getRandomElement(points);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const onNewPointClose = () => {
  buttonNewComponent.toggleDisablesStatus();
};

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

const tripPresenter = new TripPresenter(siteContainerElement, pointsModel, filterModel, randomDataNewPoint, onNewPointClose);
tripPresenter.init();

const buttonNewComponent = new ButtonNewView();
render(tripInfo, buttonNewComponent, RenderPosition.BEFOREEND); 


let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      buttonNewComponent.toggleDisablesStatus();
      remove(statisticsComponent);
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(siteContainerElement, statisticsComponent, RenderPosition.BEFOREEND);
      statisticsComponent._setCharts();
      buttonNewComponent.toggleDisablesStatus();
      // Показать статистику
      break;
    case MenuItem.NEW_EVENT:
      tripPresenter.destroy();
      tripPresenter.init();
      tripPresenter.createPoint();
      buttonNewComponent.toggleDisablesStatus();
       break;  
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
buttonNewComponent.setButtonNewListener(handleSiteMenuClick);

console.log(points);
console.log(pointsModel.getPoints());
console.log(api.getPoints());

