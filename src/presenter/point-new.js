import EditPointView from "../view/edit-point";
import { remove, render, RenderPosition } from "../utils/render";
import { UserAction, UpdateType } from "../const";

export default class PointNew {
    constructor(pointListContainer, changeData, onNewPointClose) {
        this._pointListContainer = pointListContainer;
        this._changeData = changeData;
        this._onNewPointClose = onNewPointClose;

        this._pointEditComponent = null;


        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
        this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    }

    init(randomData, destinationsData, offersData) {
        if (this._pointEditComponent !== null) {
            return;
        }

        this._pointEditComponent = new EditPointView(randomData, destinationsData, offersData);
        this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
        this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);


        render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

        document.addEventListener('keydown', this._escKeyDownHandler);
    }

    destroy() {
        if (this._pointEditComponent === null) {
          return;
        }
    
        remove(this._pointEditComponent);
        this._pointEditComponent = null;
    
        document.removeEventListener('keydown', this._escKeyDownHandler);
    }

    setSaving() {
        this._pointEditComponent.updateData({
            isDisabled: true,
            isSaving: true,
        });
    }

    setAborting() {
        const resetFormState = () => {
          this._pointEditComponent.updateData({
            isDisabled: false,
            isSaving: false,
            isDeleting: false,
          });
        };
    
        this._pointEditComponent.shake(resetFormState);
    }

    _handleFormSubmit(point) {
        this._changeData(
          UserAction.ADD_POINT,
          UpdateType.MINOR,
          point,
        );
        this._onNewPointClose();
        this.destroy();
    }

    _handleDeleteClick() {
        this.destroy();
    }

    _escKeyDownHandler(evt) {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          this._onNewPointClose();
          this.destroy();
        }
    }
}