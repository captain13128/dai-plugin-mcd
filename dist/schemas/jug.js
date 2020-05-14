"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.jugBase = exports.jugIlks = void 0;

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _utils = require("../utils");

var _constants = require("../constants");

var _constants2 = require("./_constants");

var secondsPerYear = 60 * 60 * 24 * 365;
var jugIlks = {
  generate: function generate(collateralTypeName) {
    return {
      id: "MCD_JUG.ilks(".concat(collateralTypeName, ")"),
      contract: 'MCD_JUG',
      call: ['ilks(bytes32)(uint256,uint48)', (0, _utils.toHex)(collateralTypeName)]
    };
  },
  returns: [[_constants2.ANNUAL_STABILITY_FEE, function (v) {
    v = new _bignumber["default"](v.toString()).dividedBy(_constants.RAY);

    _bignumber["default"].config({
      POW_PRECISION: 100
    });

    return v.pow(secondsPerYear).minus(1);
  }], [_constants2.DATE_STABILITY_FEES_LAST_LEVIED, function (val) {
    return new Date(val * 1000);
  }]]
};
exports.jugIlks = jugIlks;
var jugBase = {
  generate: function generate() {
    return {
      id: 'MCD_JUG.base',
      contract: 'MCD_JUG',
      call: ['base()(uint256)']
    };
  },
  returns: [[_constants2.BASE_COLLATERAL_FEE, function (v) {
    return (0, _bignumber["default"])(v);
  }]]
};
exports.jugBase = jugBase;
var _default = {
  jugIlks: jugIlks,
  jugBase: jugBase
};
exports["default"] = _default;