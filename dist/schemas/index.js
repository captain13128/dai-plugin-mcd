"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _vat = _interopRequireDefault(require("./vat"));

var _spot = _interopRequireDefault(require("./spot"));

var _proxyRegistry = _interopRequireDefault(require("./proxyRegistry"));

var _cdpManager = _interopRequireDefault(require("./cdpManager"));

var _jug = _interopRequireDefault(require("./jug"));

var _pot = _interopRequireDefault(require("./pot"));

var _cat = _interopRequireDefault(require("./cat"));

var _token = _interopRequireDefault(require("./token"));

var _end = _interopRequireDefault(require("./end"));

var _osm = _interopRequireDefault(require("./osm"));

var _getCdps = _interopRequireDefault(require("./getCdps"));

var _computed = _interopRequireDefault(require("./computed"));

var _constants = require("./_constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = _objectSpread({}, _vat["default"], {}, _spot["default"], {}, _proxyRegistry["default"], {}, _cdpManager["default"], {}, _jug["default"], {}, _pot["default"], {}, _cat["default"], {}, _computed["default"], {}, _token["default"], {}, _getCdps["default"], {}, _end["default"], {}, _osm["default"]);
/*
 * Notes on structure:
 *
 * Base schemas, those which make a basic function call, such as vat.debt
 * should be stored in a file under the name of the contract which is to
 * be called from. In this case vat.js
 *
 * Naming of base observable schemas should follow the template of
 * camelCasing the contract name and function call. So following the
 * example of vat.debt, the resulting schema should be an exported
 * constant, vatDebt
 *
 * All observable keys should be located in the constants.js file.
 * For base observables, there could be 1 or more return values
 * using these constant names.
 *
 * For computed observables, the observable keys should match the name of
 * the exported constant. Using 'ilkPrices' as an example, the exported
 * constant will be ilkPrices, the corresponding constant key to match it
 * will be ILK_PRICES = 'ilkPrices'.
 *
 * In the majority of cases, computed observables should exist under
 * computed.js, especially if they are intending to compose calls to multiple
 * functions from multiple contracts.
 *
 * The exception to this is for instances where a computed observable has a
 * relationship with base observable(s) from a single contract such that a
 * untransformed and transformed value can be present within the api. An example
 * to better illustrate this is rawLiquidationRatio which returns a number value
 * and liquidationRatio which returns a currencyRatio object for that number
 * value. The baseObservable return value key should be prepended with "raw"
 * to strongly indicate we are getting a chain value. The computed key should
 * map to what the base observable key would be named should it not exist,
 * hence liquidationRatio. Both of the schemas for these should exist in the
 * file for the base observable, spot.js in this case.
 *
 */


exports["default"] = _default;