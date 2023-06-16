import TripSortView from "../view/trip-sort";
import EventsListView from "../view/events-list";
import NoPointView from "../view/no-point";
import TripView from "../view/trip";
import { remove, render, RenderPosition } from "../utils/render";
import PointPresenter, {State as PointPresenterViewState} from "./point";
import PointNewPresenter from "./point-new";
import { sortPointPrice, sortedEvents, getRandomElement } from "../utils";
import { SortType, UpdateType, UserAction, FilterType } from "../const";
import { filter } from "../utils/filter";
import LoadingView from "../view/loading";

export default class Trip {
    constructor(tripContainer, pointsModel, filterModel, onNewPointClose, api) {
        this._tripContainer = tripContainer;
        this._pointsModel = pointsModel;
        this._filterModel = filterModel;
        this._pointPresenter = {};
        this._currentSortType = SortType.DAY;
        this._onNewPointClose = onNewPointClose;
        this._api = api;

        this._sortComponent = null;
        this._isLoading = true;
        
        this._tripComponent = new TripView(); 
        this._eventsListComponent = new EventsListView();
        this._noPointView = new NoPointView();
        this._loadingComponent =  new LoadingView();

        this._handleViewAction = this._handleViewAction.bind(this);
        this._handleModelEvent = this._handleModelEvent.bind(this);
        this._handleModeChange = this._handleModeChange.bind(this);
        this._handleSortTypeChange = this._handleSortTypeChange.bind(this);


        this._pointNewPresenter = new PointNewPresenter(this._eventsListComponent, this._handleViewAction, this._onNewPointClose);
    }

    init() {
        render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);
        render(this._tripComponent, this._eventsListComponent, RenderPosition.BEFOREEND);

        this._pointsModel.addObserver(this._handleModelEvent);
        this._filterModel.addObserver(this._handleModelEvent);

        this._renderTrip();
        
    }

    destroy() {
        this._clearTrip({resetSortType: true});
    
        remove(this._eventsListComponent);
        remove(this._tripComponent);
    
        this._pointsModel.removeObserver(this._handleModelEvent);
        this._filterModel.removeObserver(this._handleModelEvent);
    }

    createPoint(randomData, destinationsData, offersData) {
        console.log(randomData)
        this._currentSortType = SortType.DAY;
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        this._pointNewPresenter.init(randomData, destinationsData, offersData);
    }

    _getPoints() {
        const filterType = this._filterModel.getFilter();
        const points = this._pointsModel.getPoints();
        const filtredPoints = filter[filterType](points);;
        

        switch (this._currentSortType) {
            case SortType.TIME:
                return filtredPoints.sort(sortedEvents);
            case SortType.PRICE:
                return filtredPoints.sort(sortPointPrice);
        }

        return filtredPoints;
    }

    _handleModeChange() {
        this._pointNewPresenter.destroy();
        Object
          .values(this._pointPresenter)
          .forEach((presenter) => presenter.resetView());     
    }

    _handleViewAction(actionType, updateType, update) {
        switch(actionType) {
            case UserAction.UPDATE_POINT:
                this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
                this._api.updatePoint(update)
                  .then((response) => {
                      this._pointsModel.updatePoint(updateType, response);
                  })
                  .catch((err) => {
                      this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
                      console.log(err);
                  });
                break;
            case UserAction.ADD_POINT:
                this._pointNewPresenter.setSaving();
                this._api.addPoint(update)
                  .then((response) => {
                      this._pointsModel.addPoint(updateType, response);
                  })
                  .catch(() => {
                    this._pointNewPresenter[update.id].setAborting();
                  });
                break;
            case UserAction.DELETE_POINT:
                this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
                this._api.deletePoint(update)
                  .then(() => {
                    this._pointsModel.deletePoint(updateType, update);
                  })
                  .catch((err) => {
                    this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
                    console.log(err);
                  });
                break;        
        }
    }

    _handleModelEvent(updateType, data) {
        switch(updateType) {
            case UpdateType.PATCH:
                this._pointPresenter[data.id].init(data);
                break;
            case UpdateType.MINOR:
                this._clearTrip();
                this._renderTrip();
                break;
            case UpdateType.MAJOR:
                 this._clearTrip({resetSortType: true});
                 this._renderTrip();
                 break;
            case UpdateType.INIT:
                this._isLoading = false;
                remove(this._loadingComponent);
                this._renderTrip();
                break;             
        }
    };

 
    _handleSortTypeChange(sortType) {
        if (this._currentSortType === sortType) {
            return;
        }

        this._currentSortType = sortType;
        this._clearTrip();
        this._renderTrip();
    };


    _renderSort() {
        if (this._sortComponent !== null) {
            this._sortComponent = null;
        }

        this._sortComponent = new TripSortView(this._currentSortType)
        this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

        render(this._tripComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    }

    _renderPoint(point) {
       const pointPresenter = new PointPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange, this._pointsModel.getDestinations(), this._pointsModel.getOffers());
       pointPresenter.init(point);
       this._pointPresenter[point.id] = pointPresenter;
    };


    _renderPoints() {
        this._getPoints().forEach((point) => this._renderPoint(point));
    }

    _renderLoading() {
        render(this._tripComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
    }

    _renderNoPoint() {
        render(this._tripComponent, this._noPointView, RenderPosition.BEFOREEND);
    }

    _clearTrip({resetSortType = false} = {}) {
        this._pointNewPresenter.destroy();

        Object
          .values(this._pointPresenter)
          .forEach((presenter) => presenter._destroy()); //был destroy() resetView()
        this._pointPresenter = {};
        
        remove(this._sortComponent);
        remove(this._noPointView);
        remove(this._loadingComponent);

        if (resetSortType) {
           this._currentSortType = SortType.DAY;
        }
    }

    _renderTrip() {
        if (this._isLoading) {
            this._renderLoading();
            return;
        }

        if (this._getPoints().length < 1) {
            this._renderNoPoint();
            return;
        }
        
        this._renderSort();
        this._renderPoints();
    }
};