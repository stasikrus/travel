import AbstractView from "./abstract";
import { MenuItem } from "../const";

const createSiteMenuTemplate = () => {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn trip-tabs__btn--active" id="${MenuItem.TABLE}" href="#">Table</a>
                <a class="trip-tabs__btn" id="${MenuItem.STATS}" href="#">Stats</a>
            </nav>`
};

export default class SiteMenu extends AbstractView { 
    constructor() {
        super();

        this._menuClickHandler = this._menuClickHandler.bind(this);
    } 

    getTemplate() {
        return createSiteMenuTemplate();
    }

    _menuClickHandler(evt) {
        evt.preventDefault();
        if (evt.target.tagName === 'A') {
            const links = this.getElement().querySelectorAll('.trip-tabs__btn');
            links.forEach((link) => {
                link.classList.remove('trip-tabs__btn--active');
            });
          
            evt.target.classList.add('trip-tabs__btn--active');
            this._callback.menuClick(evt.target.id);
        }
    }
    

    setMenuClickHandler(callback) {
        this._callback.menuClick = callback;
        this.getElement().addEventListener('click', this._menuClickHandler);
    }

    setMenuItem(menuItem) {
        const item = this.getElement().querySelector(`[.${menuItem}]`);
    
        if (item !== null) {
          item.classList.add('trip-tabs__btn--active');
        }
    }
}