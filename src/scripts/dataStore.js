'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function DataStore(gameDataStore) {
    this._store = window.localStorage || null;
    if (gameDataStore) {
        this.setupDefaultGameItems();
    }
}

DataStore.prototype.getItem = function (name) {
    if (this._store) {
        return this._store.getItem(name);
    } else {
        console.warn('get(): Store NOT available');
    }
};

DataStore.prototype.save = function (name, value) {
    if (this._store) {
        return this._store.setItem(name, value);
    } else {
        console.warn('save(): Store NOT available');
    }
};

DataStore.prototype.setupDefaultGameItems = function () {
    if (this._store) {
        var _highScore = this._store.getItem("_highScore") || 1;
        this._store.setItem("_highScore", _highScore);
        var _currentLevel = this._store.getItem("_currentLevel") || 1;
        this._store.setItem("_currentLevel", _currentLevel);
        // var _uuid = this._store.getItem("_uuid") || uuid.v4();
        // this._store.setItem("_uuid", _uuid);
    } else {
        console.warn('setupDefaultGameItems(): Store NOT available');
    }
};

var storeInstance = new DataStore(true);

exports.default = { DataStore: DataStore, storeInstance: storeInstance };
//# sourceMappingURL=dataStore.js.map
//# sourceMappingURL=dataStore.js.map
//# sourceMappingURL=dataStore.js.map
