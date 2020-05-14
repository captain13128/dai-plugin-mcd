"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqueId = void 0;

// https://stackoverflow.com/a/43963612/56817
var uniqueId = function () {
  var currentId = 0;
  var map = new WeakMap();
  return function (object) {
    if (!map.has(object)) {
      map.set(object, ++currentId);
    }

    return map.get(object);
  };
}();

exports.uniqueId = uniqueId;