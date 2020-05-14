"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.catIlks = void 0;

var _utils = require("../utils");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _constants = require("../constants");

var _constants2 = require("./_constants");

var validateCollateralTypeName = function validateCollateralTypeName(name) {
  return !name && 'Invalid collateral type name';
};

var catIlks = {
  generate: function generate(collateralTypeName) {
    return {
      id: "MCD_CAT.ilks(".concat(collateralTypeName, ")"),
      contract: 'MCD_CAT',
      call: ['ilks(bytes32)(address,uint256,uint256)', (0, _utils.toHex)(collateralTypeName)]
    };
  },
  validate: {
    args: validateCollateralTypeName
  },
  returns: [[_constants2.LIQUIDATOR_ADDRESS], [_constants2.LIQUIDATION_PENALTY, function (v) {
    return (0, _utils.fromRay)((0, _bignumber["default"])(v).minus(_constants.RAY));
  }], [_constants2.MAX_AUCTION_LOT_SIZE, function (v) {
    return (0, _bignumber["default"])(v).shiftedBy(-18);
  }]]
};
exports.catIlks = catIlks;
var _default = {
  catIlks: catIlks
};
exports["default"] = _default;