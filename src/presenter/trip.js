import TripSortView from "../view/trip-sort";
import EventsListView from "../view/events-list";
import NoPointView from "../view/no-point";
import TripView from "../view/trip";
import { render, RenderPosition } from "../utils/render";
import PointPresenter from "./point";

export default class Trip {
    constructor(tripContainer) {
        this._tripContainer = tripContainer;
        this._pointPresenter = {};
        
        this._tripComponent = new TripView(); 
        this._sortComponent = new TripSortView();
        this._eventsListComponent = new EventsListView();
        this._noPointView = new NoPointView();
    }

    init(tripPoints) {
        this._tripPoints = tripPoints.slice();

        render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);
        render(this._tripComponent, this._eventsListComponent, RenderPosition.BEFOREEND);

        this._renderTrip();
    }

    _renderSort() {
        render(this._tripComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    }

    _renderPoint(point) {
       const pointPresenter = new PointPresenter(this._eventsListComponent);
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