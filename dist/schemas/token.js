"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.adapterBalance = exports.tokenAllowance = exports.tokenAllowanceBase = exports.tokenBalances = exports.tokenBalance = exports.ALLOWANCE_AMOUNT = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("../utils");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _constants = require("./_constants");

var _validators = require("./_validators");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Invalid proxy address for tokenAllowance: ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Invalid address for tokenAllowance: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ALLOWANCE_AMOUNT = (0, _bignumber["default"])('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
exports.ALLOWANCE_AMOUNT = ALLOWANCE_AMOUNT;
var tokenBalance = {
  generate: function generate(address, symbol) {
    if (symbol === 'WETH') symbol = 'MWETH';
    if (symbol === 'DAI') symbol = 'MDAI';
    var currencyToken = (0, _utils.getMcdToken)(symbol);
    var contract = symbol === 'MDAI' ? 'MCD_DAI' : symbol === 'MWETH' ? 'ETH' : symbol;
    if (!currencyToken) throw new Error("".concat(symbol, " token is not part of the default tokens list"));
    if (symbol === 'DSR-DAI') throw new Error("Balance of DAI in savings cannot be retrieved from a token contract call. To get DAI balance in savings call 'balance('DSR-DAI')'");
    return {
      id: "balance.".concat(symbol, ".").concat(address),
      contract: symbol === 'ETH' ? 'MULTICALL' : contract,
      call: [symbol === 'ETH' ? 'getEthBalance(address)(uint256)' : 'balanceOf(address)(uint256)', address],
      transforms: (0, _defineProperty2["default"])({}, _constants.TOKEN_BALANCE, function (v) {
        if (symbol === 'USDC') {
          return currencyToken(v, -6);
        } else {
          return currencyToken(v, 'wei');
        }
      })
    };
  },
  returns: [_constants.TOKEN_BALANCE]
};
exports.tokenBalance = tokenBalance;
var tokenBalances = {
  generate: function generate(address, symbols) {
    return {
      dependencies: symbols.map(function (symbol) {
        return [_constants.TOKEN_BALANCE, address, symbol];
      }),
      computed: function computed() {
        for (var _len = arguments.length, balances = new Array(_len), _key = 0; _key < _len; _key++) {
          balances[_key] = arguments[_key];
        }

        return balances;
      }
    };
  }
};
exports.tokenBalances = tokenBalances;
var tokenAllowanceBase = {
  generate: function generate(address, proxyAddress, symbol) {
    if (symbol === 'WETH') symbol = 'MWETH';
    if (symbol === 'DAI') symbol = 'MDAI';
    if (symbol === 'ETH' || symbol === 'DSR-DAI') throw new Error("".concat(symbol, " does not require an allowance to be set"));
    var currencyToken = (0, _utils.getMcdToken)(symbol);
    var contract = symbol === 'MDAI' ? 'MCD_DAI' : symbol === 'MWETH' ? 'ETH' : symbol;
    if (!currencyToken) throw new Error("".concat(symbol, " token is not part of the default tokens list"));
    return {
      id: "allowance.".concat(symbol, ".").concat(address),
      contract: contract,
      call: ['allowance(address,address)(uint256)', address, proxyAddress]
    };
  },
  returns: [[_constants.TOKEN_ALLOWANCE_BASE, function (v) {
    return (0, _bignumber["default"])(v);
  }]]
};
exports.tokenAllowanceBase = tokenAllowanceBase;
var tokenAllowance = {
  generate: function generate(address, proxyAddress, symbol) {
    return {
      dependencies: [symbol === 'ETH' ? [[ALLOWANCE_AMOUNT]] : [_constants.TOKEN_ALLOWANCE_BASE, address, proxyAddress, symbol]],
      computed: function computed(v) {
        return v;
      }
    };
  },
  validate: {
    args: function args(address, proxyAddress) {
      return (0, _validators.validateAddress)(_templateObject(), 'address')(address) || (0, _validators.validateAddress)(_templateObject2(), 'address')(proxyAddress);
    }
  }
};
exports.tokenAllowance = tokenAllowance;
var adapterBalance = {
  generate: function generate(collateralTypeName) {
    return {
      dependencies: function dependencies(_ref) {
        var get = _ref.get;
        collateralTypeName = collateralTypeName === 'MDAI' ? 'DAI' : collateralTypeName;
        var tokenSymbol = collateralTypeName.split('-')[0];
        tokenSymbol = tokenSymbol === 'ETH' ? 'MWETH' : tokenSymbol;
        return [[_constants.TOKEN_BALANCE, get('smartContract').getContractAddress("MCD_JOIN_".concat(collateralTypeName.replace('-', '_'))), tokenSymbol]];
      },
      computed: function computed(v) {
        return v;
      }
    };
  }
};
exports.adapterBalance = adapterBalance;
var _default = {
  tokenBalance: tokenBalance,
  tokenAllowanceBase: tokenAllowanceBase,
  // computed
  adapterBalance: adapterBalance,
  tokenAllowance: tokenAllowance,
  tokenBalances: tokenBalances
};
exports["default"] = _default;