import SiteMenuView from "./view/site-menu.js";
import FilterPresenter from "./presenter/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripCoastView from "./view/trip-coast.js";
import { render, RenderPosition, remove} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import { getRandomElement } from "./utils.js";
import { MenuItem, UpdateType, FilterType } from "./const.js";
import StatisticsView from "./view/statistics.js";
import ButtonNewView from "./view/button-new.js";
import Api from "./api.js";

const AUTHORIZATION = 'Basic academy14';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

//const randomDataNewPoint = getRandomElement(points);

const pointsModel = new PointsModel();

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

render(tripInfo, new TripInfoView(pointsModel.getPoints()), RenderPosition.AFTERBEGIN);

const coastTripInfo = tripInfo.querySelector('.trip-info');
render(coastTripInfo, new TripCoastView(pointsModel.getPoints()), RenderPosition.BEFOREEND);

const siteContainerElement = document.querySelector('.page-main_container');

const tripPresenter = new TripPresenter(siteContainerElement, pointsModel, filterModel, getRandomElement(pointsModel.getPoints()), onNewPointClose, api);
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

api.getPoints()
  .then((points) => {
    console.log('Received points from the server:', points);
    pointsModel.setPoints(UpdateType.INIT, points);
    console.log('Updated points model:', pointsModel.getPoints());
  })
  .catch((err) => {
    console.log('Error occurred:', err);
    pointsModel.setPoints(UpdateType.INIT, []);
    console.log('Updated points model with empty array:', pointsModel.getPoints());
  });


console.log(api.getPoints());

