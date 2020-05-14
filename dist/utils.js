"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringToBytes = stringToBytes;
exports.bytesToString = bytesToString;
exports.nullIfEmpty = nullIfEmpty;
exports.castAsCurrency = castAsCurrency;
exports.parseWeiNumeric = parseWeiNumeric;
exports.numberFromNumeric = numberFromNumeric;
exports.padRight = padRight;
exports.toHex = toHex;
exports.fromWei = fromWei;
exports.fromRay = fromRay;
exports.fromRad = fromRad;
exports.isBigNumber = isBigNumber;
exports.isCurrency = isCurrency;
exports.promiseWait = promiseWait;
exports.getMcdToken = exports.isValidAddressString = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _web = _interopRequireDefault(require("web3"));

var _currency = require("@makerdao/currency");

var _ = require(".");

var web3Utils = new _web["default"]().utils;

function stringToBytes(str) {
  (0, _assert["default"])(!!str, 'argument is falsy');
  (0, _assert["default"])(typeof str === 'string', 'argument is not a string');
  return '0x' + Buffer.from(str).toString('hex');
}

function bytesToString(hex) {
  return Buffer.from(hex.replace(/^0x/, ''), 'hex').toString().replace(/\x00/g, ''); // eslint-disable-line no-control-regex
}

function nullIfEmpty(value) {
  return value === '' ? null : value;
}

function castAsCurrency(value, currency) {
  if (currency.isInstance(value)) return value;
  if (typeof value === 'string' || typeof value === 'number') return currency(value);
  throw new Error("Can't cast ".concat(value, " as ").concat(currency.symbol));
}

function parseWeiNumeric(value) {
  var denom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ether';
  // fromWei will throw if passing a Bignumber value or string value that results
  // in being an exponent representation of a number when parsed as a number, e.g 1e18.
  // Passing value as a hex value seems to get around this
  return web3Utils.fromWei((0, _bignumber["default"])(value).toString(16), denom);
}

function numberFromNumeric(value) {
  return (0, _bignumber["default"])(value).toNumber();
}

function padRight(string, chars, sign) {
  return string + new Array(chars - string.length + 1).join(sign ? sign : '0');
}

function toHex(str) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$with0x = _ref.with0x,
      with0x = _ref$with0x === void 0 ? true : _ref$with0x,
      _ref$rightPadding = _ref.rightPadding,
      rightPadding = _ref$rightPadding === void 0 ? 64 : _ref$rightPadding;

  var result = '';

  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }

  if (rightPadding > 0) result = padRight(result, rightPadding);
  return with0x ? '0x' + result : result;
}

function fromWei(value) {
  return (0, _bignumber["default"])(value).shiftedBy(-18);
}

function fromRay(value) {
  return (0, _bignumber["default"])(value).shiftedBy(-27);
}

function fromRad(value) {
  return (0, _bignumber["default"])(value).shiftedBy(-45);
}

function isBigNumber(value) {
  return _bignumber["default"].isBigNumber(value);
}

function isCurrency(value) {
  return value instanceof _currency.Currency;
}

var isValidAddressString = function isValidAddressString(addressString) {
  return /^0x([A-Fa-f0-9]{40})$/.test(addressString);
};

exports.isValidAddressString = isValidAddressString;

var getMcdToken = function getMcdToken(token) {
  return _.defaultTokens.find(function (mcdToken) {
    return mcdToken.symbol === token;
  });
};

exports.getMcdToken = getMcdToken;

function promiseWait(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}