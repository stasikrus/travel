import Abstract from "./abstract";

export default class Smart extends Abstract {
    constructor() {
        super();
        this._state = {};
    }

    updateElement() {
        const prevElement = this.getElement();
        const parent = prevElement.parentElement;
        this.removeElement();

        const newElement = this.getElement();

        parent.replaceChild(newElement, prevElement);
        this.restoreHandlers();
    }

    updateData(update) {
        if (!update) {
            return;
        }

        this._pointState = Object.assign(
            {},
            this._pointState,
            update,
        );

        this.updateElement();
    }

    restoreHandlers() {
        throw new Error ('Abstract method not implemented: restoreHandlers');
    };


}