import PointView from "../view/point";
import EditPointView from "../view/edit-point";
import { render, RenderPosition, replace } from "../utils/render";

export default class PointPresenter {
    constructor(eventsListContainer) {
        this._eventsListContainer = eventsListContainer;

        this._pointComponent = null;
        this._pointEditComponent = null;

        this._handleEditClick = this._handleEditClick.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    }

    init(point) {
        this._point = point;

        this._pointComponent = new PointView(point);
        this._pointEditComponent = new EditPointView(point);

        this._pointComponent.setEditClickHandler(this._handleEditClick);
        this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

        render(this._eventsListContainer, this._pointComponent, RenderPosition.BEFOREEND);

    }

    _replaceCardToForm() {
        replace(this._pointEditComponent, this._pointComponent);
        document.addEventListener('keydown', this._escKeyDownHandler);
    }

    _replaceFormToCard() {
        replace(this._pointComponent, this._pointEditComponent);
        document.removeEventListener('keydown', this._escKeyDownHandler);
    }

    _escKeyDownHandler(evt) {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
            evt.preventDefault();
            this._replaceFormToCard();
        } 
    }

    _handleEditClick() {
        this._replaceCardToForm();
    }

    _handleFormSubmit() {
        this._replaceFormToCard();
    }
}