"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateVaultTypeResult = exports.validateVaultId = exports.validateAddress = exports.tag = void 0;

var tag = function tag(strings) {
  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }

    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function (key, i) {
      return result.push(Number.isInteger(key) ? values[key] : dict[key], strings[i + 1]);
    });
    return result.join('');
  };
};

exports.tag = tag;

var validateAddress = function validateAddress() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return function (address) {
    return (!/^0x[0-9a-fA-F]{40}$/.test(address) || address === '0x0000000000000000000000000000000000000000') && tag.apply(void 0, args)({
      address: address === null ? '(null)' : address
    });
  };
};

exports.validateAddress = validateAddress;

var validateVaultId = function validateVaultId(id) {
  return !/^\d+$/.test(id) && "Invalid vault id: must be a positive integer. Received ".concat(id);
};

exports.validateVaultId = validateVaultId;

var validateVaultTypeResult = function validateVaultTypeResult(vaultType) {
  return !vaultType && 'Vault does not exist';
};

exports.validateVaultTypeResult = validateVaultTypeResult;