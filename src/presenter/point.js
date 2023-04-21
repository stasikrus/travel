import PointView from "../view/point";
import EditPointView from "../view/edit-point";
import { remove, render, RenderPosition, replace } from "../utils/render";

export default class PointPresenter {
    constructor(eventsListContainer, changeData) {
        this._eventsListContainer = eventsListContainer;
        this._changeData = changeData;

        this._pointComponent = null;
        this._pointEditComponent = null;

        this._handleEditClick = this._handleEditClick.bind(this);
        this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    }

    init(point) {
        this._point = point;

        const prevPointComponent = this._pointComponent;
        const prevEditComponent = this._pointEditComponent;

        this._pointComponent = new PointView(point);
        this._pointEditComponent = new EditPointView(point);

        this._pointComponent.setEditClickHandler(this._handleEditClick);
        this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick)
        this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

        if (prevPointComponent === null || prevEditComponent === null) {
            render(this._eventsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
            return;
        }

        if (this._eventsListContainer.getElement().contains(prevPointComponent.getElement())) {
            replace(this._pointComponent, prevPointComponent);
        }

        if (this._eventsListContainer.getElement().contains(prevEditComponent.getElement())) {
            replace(this._pointEditComponent, prevEditComponent);
        }

        remove(prevPointComponent);
        remove(prevEditComponent);
    }

    _destroy() {
        remove(this._pointComponent);
        remove(this._pointEditComponent);
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

    
    _handleFavoriteClick() {
        this._changeData(
          Object.assign(
            {},
            this._point,
            {
              is_favorite: !this._point.is_favorite,
            },
          ),
        );
    }
    
    _handleFormSubmit(point) {
        this._changeData(point);
        this._replaceFormToCard();
    }


}