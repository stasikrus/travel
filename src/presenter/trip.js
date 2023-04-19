import TripSortView from "../view/trip-sort";
import EventsListView from "../view/events-list";
import NoPointView from "../view/no-point";
import EditPointView from "../view/edit-point";
import PointView from "../view/point";
import TripView from "../view/trip";
import { render, RenderPosition, replace } from "../utils/render";

export default class Trip {
    constructor(tripContainer) {
        this._tripContainer = tripContainer;
        
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
       const pointComponent = new PointView(point);
       const pointEditComponent = new EditPointView(point);

       const replaceCardToForm = () => {
          replace(pointEditComponent, pointComponent);
        };

       const replaceFormToCard = () => {
          replace(pointComponent, pointEditComponent);
        };

        const onEscKeyDown = (evt) => {
           if (evt.key === 'Escape' || evt.key === 'Esc') {
            evt.preventDefault();
            replaceFormToCard();
            document.removeEventListener('keydown', onEscKeyDown);
           } 
        }

        pointComponent.setEditClickHandler(() => {
            replaceCardToForm();
            document.addEventListener('keydown', onEscKeyDown);
        });
        
        pointEditComponent.setFormSubmitHandler(() => {
            replaceFormToCard();
            document.removeEventListener('keydown', onEscKeyDown);
        });
    
        render(this._eventsListComponent, pointComponent, RenderPosition.BEFOREEND);
    };


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