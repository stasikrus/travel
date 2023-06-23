export default class Store {
    constructor(key, storage) {
      this._storage = storage;
      this._storeKey = key;
    }
  
    getItems(key) {
      try {
        return JSON.parse(this._storage.getItem(key)) || {};
      } catch (err) {
        return {};
      }
    }
  
    setItems(key, items) {
      this._storage.setItem(
        key,
        JSON.stringify(items),
      );
    }
  
    setItem(key, field, value) {
      const store = this.getItems(key);
  
      this._storage.setItem(
        key,
        JSON.stringify(
          Object.assign({}, store, {
            [field]: value,
          }),
        ),
      );
    }
  
    removeItem(key) {
      const store = this.getItems('points');
  
      delete store[key];
  
      this._storage.setItem(
        'points',
        JSON.stringify(store),
      );
    }
  }