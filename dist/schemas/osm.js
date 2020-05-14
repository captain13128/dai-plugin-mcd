"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.tokenPricesNextUpdates = exports.tokenPriceNextUpdate = exports.tokenPriceUpdateInterval = exports.tokenPriceLastUpdate = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _constants = require("./_constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var tokenPriceLastUpdate = {
  generate: function generate(token) {
    return {
      id: "PIP_".concat(token, ".zzz"),
      contract: "PIP_".concat(token),
      call: ['zzz()(uint64)']
    };
  },
  returns: [[_constants.TOKEN_PRICE_LAST_UPDATE, function (v) {
    return (0, _bignumber["default"])(v).times(1000);
  }]]
};
exports.tokenPriceLastUpdate = tokenPriceLastUpdate;
var tokenPriceUpdateInterval = {
  generate: function generate(token) {
    return {
      id: "PIP_".concat(token, ".hop"),
      contract: "PIP_".concat(token),
      call: ['hop()(uint16)']
    };
  },
  returns: [[_constants.TOKEN_PRICE_UPDATE_INTERVAL, function (v) {
    return (0, _bignumber["default"])(v).times(1000);
  }]]
};
exports.tokenPriceUpdateInterval = tokenPriceUpdateInterval;
var tokenPriceNextUpdate = {
  generate: function generate(token) {
    return {
      dependencies: [[_constants.TOKEN_PRICE_LAST_UPDATE, token], [_constants.TOKEN_PRICE_UPDATE_INTERVAL, token]],
      computed: function computed(lastUpdate, interval) {
        return new Date(lastUpdate.plus(interval).toNumber());
      }
    };
  }
};
exports.tokenPriceNextUpdate = tokenPriceNextUpdate;
var tokenPricesNextUpdates = {
  generate: function generate(tokenList) {
    return {
      dependencies: tokenList.map(function (token) {
        return [_constants.TOKEN_PRICE_NEXT_UPDATE, token];
      }),
      computed: function computed() {
        for (var _len = arguments.length, list = new Array(_len), _key = 0; _key < _len; _key++) {
          list[_key] = arguments[_key];
        }

        return list.reduce(function (acc, time, idx) {
          return _objectSpread((0, _defineProperty2["default"])({}, "".concat(tokenList[idx]), time), acc);
        }, {});
      }
    };
  }
};
exports.tokenPricesNextUpdates = tokenPricesNextUpdates;
var _default = {
  tokenPriceLastUpdate: tokenPriceLastUpdate,
  tokenPriceUpdateInterval: tokenPriceUpdateInterval,
  tokenPriceNextUpdate: tokenPriceNextUpdate,
  tokenPricesNextUpdates: tokenPricesNextUpdates
};
exports["default"] = _default;