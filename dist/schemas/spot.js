"use strict";

import {MMCR} from "../../src";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.spotPar = exports.spotIlks = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

var _currency = require("@makerdao/currency");

var _ = require("../..");

var _constants = require("./_constants");

var _validate;

var validateCollateralTypeName = function validateCollateralTypeName(name) {
  return !name && 'Invalid collateral type name';
};

var validatePriceFeedAddressResult = function validatePriceFeedAddressResult(result, _ref) {
  var _ref2 = (0, _slicedToArray2["default"])(_ref, 1),
      name = _ref2[0];

  return result === '0x0000000000000000000000000000000000000000' && "No collateral type with name ".concat(name, " found");
};

var validateLiquidationRatioResult = function validateLiquidationRatioResult(result, _ref3) {
  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 1),
      name = _ref4[0];

  return !result && "No collateral type with name ".concat(name, " found");
};

var spotIlks = {
  generate: function generate(collateralTypeName) {
    return {
      id: "MCD_SPOT.ilks(".concat(collateralTypeName, ")"),
      contract: 'MCD_SPOT',
      call: ['ilks(bytes32)(address,uint256)', (0, _utils.toHex)(collateralTypeName)],
      transforms: (0, _defineProperty2["default"])({}, _constants.LIQUIDATION_RATIO, function (liqRatio) {
        return liqRatio.toString() !== '0' ? (0, _currency.createCurrencyRatio)(_.USD, _.MMCR)((0, _utils.fromRay)(liqRatio)) : null;
      })
    };
  },
  validate: (_validate = {
    args: validateCollateralTypeName
  }, (0, _defineProperty2["default"])(_validate, _constants.PRICE_FEED_ADDRESS, validatePriceFeedAddressResult), (0, _defineProperty2["default"])(_validate, _constants.LIQUIDATION_RATIO, validateLiquidationRatioResult), _validate),
  returns: [[_constants.PRICE_FEED_ADDRESS], [_constants.LIQUIDATION_RATIO]]
};
exports.spotIlks = spotIlks;
var spotPar = {
  generate: function generate() {
    return {
      id: 'MCD_SPOT.par()',
      contract: 'MCD_SPOT',
      call: ['par()(uint256)']
    };
  },
  returns: [[_constants.RATIO_DAI_USD, function (v) {
    return (0, _currency.createCurrencyRatio)(_.MMCR, _.USD)((0, _utils.fromRay)(v));
  }]]
};
exports.spotPar = spotPar;
var _default = {
  spotIlks: spotIlks,
  spotPar: spotPar
};
exports["default"] = _default;