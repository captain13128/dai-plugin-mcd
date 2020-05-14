"use strict";

import {MMCR} from "../src";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debtCeiling = debtCeiling;
exports.liquidationPenalty = liquidationPenalty;
exports.liquidationRatio = liquidationRatio;
exports.price = price;
exports.annualStabilityFee = annualStabilityFee;
exports.collateralAmount = collateralAmount;
exports.collateralValue = collateralValue;
exports.debtValue = debtValue;
exports.collateralizationRatio = collateralizationRatio;
exports.liquidationPrice = liquidationPrice;
exports.minSafeCollateralAmount = minSafeCollateralAmount;
exports.daiAvailable = daiAvailable;

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _currency = require("@makerdao/currency");

var _constants = require("./constants");

var _index = require("./index");

// NOTE: When a function below has an argument with the same name as a function
// defined earlier in the file, that means it expects that argument's value to
// be the return value of a call to that earlier function.
//
// e.g. the fourth argument of `price`
// ilk math
function debtCeiling(line) {
  return _index.MMCR.rad(line);
}

function liquidationPenalty(chop) {
  return new _bignumber["default"](chop.toString()).dividedBy(_constants.RAY).minus(1).toNumber();
}

function liquidationRatio(mat) {
  var ratio = (0, _currency.createCurrencyRatio)(_index.USD, _index.MMCR);
  return ratio(new _bignumber["default"](mat.toString()).dividedBy(_constants.RAY).toString());
}

function price(currency, par, spot, liquidationRatio) {
  par = new _bignumber["default"](par.toString()).dividedBy(_constants.RAY);
  spot = new _bignumber["default"](spot.toString()).dividedBy(_constants.RAY);
  var ratio = (0, _currency.createCurrencyRatio)(_index.USD, currency);
  var price = spot.times(par).times(liquidationRatio.toNumber());
  return ratio(price);
}

var secondsPerYear = 60 * 60 * 24 * 365;

function annualStabilityFee(duty) {
  duty = new _bignumber["default"](duty.toString()).dividedBy(_constants.RAY);

  _bignumber["default"].config({
    POW_PRECISION: 100
  });

  return duty.pow(secondsPerYear).minus(1).toNumber();
} // cdp math


function collateralAmount(currency, ink) {
  return currency.wei(ink);
}

function collateralValue(collateralAmount, price) {
  return collateralAmount.times(price);
}

function debtValue(art, rate) {
  art = _index.MMCR.wei(art);
  return art.times(rate).shiftedBy(-27);
}

function collateralizationRatio(collateralValue, debtValue) {
  if (debtValue.eq(0)) {
    var ratio = (0, _currency.createCurrencyRatio)(_index.USD, _index.MMCR);
    return ratio(Infinity);
  }

  return collateralValue.div(debtValue);
}

function liquidationPrice(collateralAmount, debtValue, liquidationRatio) {
  if (collateralAmount.eq(0)) {
    var ratio = (0, _currency.createCurrencyRatio)(_index.USD, collateralAmount.type);
    return ratio(Infinity);
  }

  return debtValue.times(liquidationRatio).div(collateralAmount);
}

function minSafeCollateralAmount(debtValue, liquidationRatio, price) {
  return debtValue.times(liquidationRatio).div(price);
}

function daiAvailable(collateralValue, debtValue, liquidationRatio) {
  var maxSafeDebtValue = collateralValue.div(liquidationRatio);
  return debtValue.lt(maxSafeDebtValue) ? (0, _index.MMCR)(maxSafeDebtValue.minus(debtValue)) : (0, _index.MMCR)(0);
}