"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECONDS_PER_YEAR = exports.RAD = exports.RAY = exports.WAD = exports.ServiceRoles = void 0;

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var ServiceRoles = {
  CDP_MANAGER: 'mcd:cdpManager',
  CDP_TYPE: 'mcd:cdpType',
  AUCTION: 'mcd:auction',
  SYSTEM_DATA: 'mcd:systemData',
  SAVINGS: 'mcd:savings'
};
exports.ServiceRoles = ServiceRoles;
var WAD = new _bignumber["default"]('1e18');
exports.WAD = WAD;
var RAY = new _bignumber["default"]('1e27');
exports.RAY = RAY;
var RAD = new _bignumber["default"]('1e45');
exports.RAD = RAD;
var SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
exports.SECONDS_PER_YEAR = SECONDS_PER_YEAR;