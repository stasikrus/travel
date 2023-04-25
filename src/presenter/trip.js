import TripSortView from "../view/trip-sort";
import EventsListView from "../view/events-list";
import NoPointView from "../view/no-point";
import TripView from "../view/trip";
import { render, RenderPosition } from "../utils/render";
import PointPresenter from "./point";
import { updateItem, sortPointPrice } from "../utils";
import { SortType } from "../const";

export default class Trip {
    constructor(tripContainer) {
        this._tripContainer = tripContainer;
        this._pointPresenter = {};
        this._currentSortType = SortType.DAY;
        
        this._tripComponent = new TripView(); 
        this._sortComponent = new TripSortView();
        this._eventsListComponent = new EventsListView();
        this._noPointView = new NoPointView();

        this._handlePointChange = this._handlePointChange.bind(this);
        this._handleModeChange = this._handleModeChange.bind(this);
    }

    init(tripPoints) {
        this._tripPoints = tripPoints.slice();
        this._sourcedTripPoints = tripPoints.slice();

        render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);
        render(this._tripComponent, this._eventsListComponent, RenderPosition.BEFOREEND);

        this._renderTrip();
    }

    _handleModeChange() {
        Object
          .values(this._pointPresenter)
          .forEach((presenter) => presenter.resetView());
          
    }

    _handlePointChange(updatePoint) {
        this._tripPoints = updateItem(this._tripPoints, updatePoint);
        this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatePoint);
        this._pointPresenter[updatePoint.id].init(updatePoint);
    }

    _sortPoints(sortType) {
        switch (sortType) {
            case SortType.TIME:
                this._tripPoints.sort();
                break;
            case SortType.PRICE:
                this._tripPoints.sort();
                break;
            default:
                this._tripPoints = this._sourcedTripPoints.slice();        
        }

        this._currentSortType = sortType;
    }

    _handleSortTypeChange(sortType) {
        if (this._currentSortType === sortType) {
            return;
        }

        this._sortPoints(sortType);
        this._clearPointList();
        this._renderPoints();
    };


    _renderSort() {
        render(this._tripComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
        this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }

    _renderPoint(point) {
       const pointPresenter = new PointPresenter(this._eventsListComponent, this._handlePointChange, this._handleModeChange);
       pointPresenter.init(point);
       this._pointPresenter[point.id] = pointPresenter;
       console.log(this._pointPresenter)
    };


    _renderPoints() {
        this._tripPoints.forEach((point) => this._renderPoint(point));
    }

    _renderNoPoint() {
        render(this._tripComponent, this._noPointView, RenderPosition.BEFOREEND);
    }

    _clearPointList() {
        Object
          .values(this._pointPresenter)
          .forEach((presenter) => presenter.destroy());
        this._pointPresenter = {};  
    }

    _renderTrip() {
        if (this._tripPoints.length < 1) {
            this._renderNoPoint();
            return;
        }
        
        this._renderSort();
        this._renderPoints();
    }
};