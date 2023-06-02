import EditPointView from "../view/edit-point";
import { nanoid } from "nanoid";
import { remove, render, RenderPosition } from "../utils/render";
import { UserAction, UpdateType } from "../const";

export default class PointNew {
    constructor(pointListContainer, changeData, randomDataNewPoint) {
        this._pointListContainer = pointListContainer;
        this._changeData = changeData;
        this._randomDataNewPoint = randomDataNewPoint;

        this._pointEditComponent = null;


        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
        this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    }

    init() {
        if (this._pointEditComponent !== null) {
            return;
        }

        this._pointEditComponent = new EditPointView(this._randomDataNewPoint);
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

    _handleFormSubmit(point) {
        this._changeData(
          UserAction.ADD_POINT,
          UpdateType.MINOR,
          // Пока у нас нет сервера, который бы после сохранения
          // выдывал честный id задачи, нам нужно позаботиться об этом самим
          Object.assign({id: nanoid()}, point),
        );
        this.destroy();
    }

    _handleDeleteClick() {
        this.destroy();
    }

    _escKeyDownHandler(evt) {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          this.destroy();
        }
    }
}