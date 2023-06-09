import PointView from "../view/point";
import EditPointView from "../view/edit-point";
import { remove, render, RenderPosition, replace } from "../utils/render";
import { UserAction, UpdateType } from "../const";
import { isOnline } from "../utils";
import { toast } from "../utils/toast";


const Mode = {
    DEFAULT: 'DEFAULT',
    EDITING: 'EDITING',
};

export const State = {
    SAVING: 'SAVING',
    DELETING: 'DELETING',
    ABORTING: 'ABORTING',
};
  

export default class PointPresenter {
    constructor(eventsListContainer, changeData, changeMode, destinationsData, offersData) {
        this._eventsListContainer = eventsListContainer;
        this._changeData = changeData;
        this._changeMode = changeMode;
        this._destinationsData = destinationsData;
        this._offersData = offersData;

        this._pointComponent = null;
        this._pointEditComponent = null;
        this._mode = Mode.DEFAULT;


        this._handleEditClick = this._handleEditClick.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
        this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    }

    init(point) {
        this._point = point;

        const prevPointComponent = this._pointComponent;
        const prevEditComponent = this._pointEditComponent;

        this._pointComponent = new PointView(point);
        this._pointEditComponent = new EditPointView(point, this._destinationsData, this._offersData);

        this._pointComponent.setEditClickHandler(this._handleEditClick);
        this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick)
        this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
        this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

        if (prevPointComponent === null || prevEditComponent === null) {
            render(this._eventsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
            return;
        }

        if (this._mode === Mode.DEFAULT) {
            replace(this._pointComponent, prevPointComponent);
        }

        if (this._mode === Mode.EDITING) {
            replace(this._pointEditComponent, prevEditComponent);
            this._mode = Mode.DEFAULT;
        }

        remove(prevPointComponent);
        remove(prevEditComponent);
    }

    _destroy() {
        remove(this._pointComponent);
        remove(this._pointEditComponent);
    }

    resetView() {
        if (this._mode !== Mode.DEFAULT) {
            this._replaceFormToCard();
        }
    }

    setViewState(state) {
        const resetFormState = () => {
            this._pointEditComponent.updateData({
              isDisabled: false,
              isSaving: false,
              isDeleting: false,
            });
        };

        switch (state) {
          case State.SAVING:
            this._pointEditComponent.updateData({
              isDisabled: true,
              isSaving: true,
            });
            break;
          case State.DELETING:
            this._pointEditComponent.updateData({
              isDisabled: true,
              isDeleting: true,
            });
            break;
          case State.ABORTING:
            this._pointComponent.shake(resetFormState);
            this._pointEditComponent.shake(resetFormState);
            break; 
        }
    }

    _replaceCardToForm() {
        replace(this._pointEditComponent, this._pointComponent);
        document.addEventListener('keydown', this._escKeyDownHandler);
        this._changeMode();
        this._mode = Mode.EDITING;
    }

    _replaceFormToCard() {
        replace(this._pointComponent, this._pointEditComponent);
        document.removeEventListener('keydown', this._escKeyDownHandler);
        this._mode = Mode.DEFAULT;
    }

    _escKeyDownHandler(evt) {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
            evt.preventDefault();
            this._replaceFormToCard();
        } 
    }

    _handleEditClick() {
        if (!isOnline()) {
            toast('You can\'t edit point offline');
            return;
        }

        this._replaceCardToForm();
    }

    
    _handleFavoriteClick() {
        this._changeData(
          UserAction.UPDATE_POINT,
          UpdateType.MINOR,  
          Object.assign(
            {},
            this._point,
            {
              is_favorite: !this._point.is_favorite,
            },
          ),
        );
    }
    
    _handleFormSubmit(update) {
        const isMinorUpdate = 
          this._point.date_from !== update.date_from || 
          this._point.date_to !== update.date_to || 
          this._point.type !== update.type ||
          this._point.base_price !== update.base_price;

        this._changeData(
            UserAction.UPDATE_POINT,
            isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
            update);
    }

    _handleDeleteClick(point) {
        if (!isOnline()) {
            toast('You can\'t delete point offline');
            return;
        }

        this._changeData(
            UserAction.DELETE_POINT,
            UpdateType.MINOR,
            point,
        )
    }


}