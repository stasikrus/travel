import PointsModel from '../model/points.js';
import {isOnline} from '../utils.js';

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setItems('points', items);  
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems('points'));

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem('points', updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          console.log(this._store.getItems('points')[updatedPoint.id])
          return updatedPoint;
        });
    }

    this._store.setItem('points', point.id, PointsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          console.log(newPoint.id)
          this._store.setItem('points', newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    this._store.setItem('points', point.id, PointsModel.adaptToServer(Object.assign({}, point)));

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = destinations.map(PointsModel.adaptToServer);
          this._store.setItems('destinations', items);
          console.log(Object.values(this._store.getItems('destinations')))
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getItems('destinations'));

    return Promise.resolve(storeDestinations.map(PointsModel.adaptToClient));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = offers.map(PointsModel.adaptToServer);
          this._store.setItems('offers', items);
          console.log(offers)
          return offers;
        });
    }

    const storeDestinations = Object.values(this._store.getItems('offers'));

    return Promise.resolve(storeDestinations.map(PointsModel.adaptToClient));
  }



  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems('points'));
      console.log(storePoints)

      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems('points', items);
          //console.log(this._store.getItems('points'))
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}