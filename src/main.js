import SiteMenuView from "./view/site-menu.js";
import FilterPresenter from "./presenter/filter.js";
import TripInfoView from "./view/trip-info.js";
import TripCoastView from "./view/trip-coast.js";
import { render, RenderPosition, remove} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import { getRandomElement, isOnline } from "./utils.js";
import { toast } from "./utils/toast.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import { MenuItem, UpdateType} from "./const.js";
import StatisticsView from "./view/statistics.js";
import ButtonNewView from "./view/button-new.js";
import Api from "./api/api.js";

const AUTHORIZATION = 'Basic academ14';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const store = new Store(STORE_NAME, window.localStorage);
const api = new Api(END_POINT, AUTHORIZATION);
const apiWithProvider = new Provider(api, store);

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

const siteContainerElement = document.querySelector('.page-main_container');

const tripPresenter = new TripPresenter(siteContainerElement, pointsModel, filterModel, onNewPointClose, apiWithProvider);
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
      if (!isOnline()) {
        toast('You can\'t create new point offline');
        //siteMenuComponent.setMenuItem(MenuItem.TABLE);
        break;
      }
      tripPresenter.createPoint(getRandomElement(pointsModel.getPoints()), pointsModel.getDestinations(), pointsModel.getOffers());
      buttonNewComponent.toggleDisablesStatus();
       break;  
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
buttonNewComponent.setButtonNewListener(handleSiteMenuClick);

apiWithProvider.getDestinations()
  .then((destinations) => { 
    console.log('Received destinations from the server:', destinations);
    pointsModel.setDestinations(destinations);
    return apiWithProvider.getOffers();  
  })
  .then((offers) => {
    console.log('Received offers from the server:', offers);
    pointsModel.setOffers(offers);
    return apiWithProvider.getPoints(); 
  })
  .then((points) => {
    console.log('Received points from the server:', points);
    pointsModel.setPoints(UpdateType.INIT, points);
    render(tripInfo, new TripInfoView(pointsModel.getPoints()), RenderPosition.AFTERBEGIN);
    const coastTripInfo = tripInfo.querySelector('.trip-info');
    render(coastTripInfo, new TripCoastView(pointsModel.getPoints()), RenderPosition.BEFOREEND);
    
  })
  .catch((error) => {
    console.error('Error occurred:', error);
    pointsModel.setPoints(UpdateType.INIT, []);
    console.log('Updated points model with empty array:', pointsModel.getPoints());
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });

  window.addEventListener('online', () => {
    document.title = document.title.replace(' [offline]', '');
    apiWithProvider.sync();
  });

  window.addEventListener('offline', () => {
    document.title += ' [offline]';
  });