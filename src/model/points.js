import Observer from "../utils/observer";

export default class Points extends Observer {
    constructor() {
        super();
        this._points = [];
        this._destinations = [];
        this._offers = [];
    }

    setPoints(updateType, points) {
        this._points = points.slice();

        this._notify(updateType);
    }

    getPoints() {
        return this._points;
    }

    updatePoint(updateType, update) {
        const index = this._points.findIndex((point) => point.id === update.id);
    
        if (index === -1) {
          throw new Error('Can\'t update unexisting point');
        }
    
        this._points = [
          ...this._points.slice(0, index),
          update,
          ...this._points.slice(index + 1),
        ];
    
        this._notify(updateType, update);
    }
    
    addPoint(updateType, update) {
        this._points = [
          update,
          ...this._points,
        ];
    
        this._notify(updateType, update);
    }
    
    deletePoint(updateType, update) {
        const index = this._points.findIndex((point) => point.id === update.id);
        console.log(updateType, update.id)
    
        if (index === -1) {
          throw new Error('Can\'t delete unexisting point');
        }
    
        this._points = [
          ...this._points.slice(0, index),
          ...this._points.slice(index + 1),
        ];
    
        this._notify(updateType);
    }

    setDestinations(destinations) {
      this._destinations = destinations;
    }

    getDestinations() {
      return this._destinations;
    }

    setOffers(offers) {
      this._offers = offers;
    }

    getOffers() {
      return this._offers;
    }



    static adaptToClient(point) {
      const adaptedPoint = Object.assign(
        {},
        point,
        {
          date_from: new Date(point.date_from),
          date_to: new Date(point.date_to), 
        },
      );

      return adaptedPoint;
    }

    static adaptToServer(point) {
      const adaptedPoint = Object.assign(
        {},
        point,
        {
          'date_from': point.date_from instanceof Date ? point.date_from.toISOString() : null, // На сервере дата хранится в ISO формате
          'date_to': point.date_to instanceof Date ? point.date_to.toISOString() : null,
          'base_price': parseInt(point.base_price),
        },
      );
  
      return adaptedPoint;
    }  
    
}