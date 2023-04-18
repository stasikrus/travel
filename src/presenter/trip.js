import TripSortView from "../view/trip-sort";
import EventsListView from "../view/events-list";
import NoPointView from "../view/no-point";
import EditPointView from "../view/edit-point";
import PointView from "../view/point";
import TripView from "../view/trip";
import { render, RenderPosition } from "../utils/render";

export default class Trip {
    constructor(tripContainer) {
        this._tripContainer = tripContainer;
        
        this._tripCompopent = new TripView(); 
        this._sortComponent = new TripSortView();
        this._eventsListComponent = new EventsListView();
        this._noPointView = new NoPointView();
    }

    init(tripPoints) {
        this._tripPoints = tripPoints.slice();

        render(this._tripContainer, this._tripCompopent, RenderPosition.BEFOREEND);
        render(this._tripCompopent, this._eventsListComponent, RenderPosition.BEFOREEND);

        this._renderTrip();
    }

    _renderSort() {
        render(this._tripCompopent, this._sortComponent, RenderPosition.AFTERBEGIN);
    }

    _renderPoint(point) {
        // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
       // текущая функция renderPoint в main.js
    }

    _renderPoints() {
        this._tripPoints.forEach((point) => this._renderPoint(point));
    }

    _renderNoPoint() {
        render(this._tripCompopent, this._renderNoPoint, RenderPosition.AFTERBEGIN);
    }

    _renderTrip() {
        if (this._tripPoints.length = 0) {
            this._renderNoPoint();
            return;
        }
        
        this._renderSort();
        this._renderPoints();
    }
};