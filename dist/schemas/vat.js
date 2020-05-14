"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.vatLine = exports.vatGem = exports.vatUrns = exports.vatDebt = exports.vatIlks = void 0;

var _utils = require("../utils");

var _ = require("../..");

var _constants = require("./_constants");

var vatIlks = {
  generate: function generate(ilkName) {
    return {
      id: "MCD_VAT.ilks(".concat(ilkName, ")"),
      contract: 'MCD_VAT',
      call: ['ilks(bytes32)(uint256,uint256,uint256,uint256,uint256)', (0, _utils.toHex)(ilkName)]
    };
  },
  returns: [[_constants.TOTAL_ENCUMBERED_DEBT, _utils.fromWei], [_constants.DEBT_SCALING_FACTOR, _utils.fromRay], [_constants.PRICE_WITH_SAFETY_MARGIN, _utils.fromRay], [_constants.DEBT_CEILING, function (v) {
    return (0, _.MDAI)(v, 'rad');
  }], [_constants.DEBT_FLOOR, _utils.fromRad]]
};
exports.vatIlks = vatIlks;
var vatDebt = {
  generate: function generate() {
    return {
      id: 'MCD_VAT.debt()',
      contract: 'MCD_VAT',
      call: ['debt()(uint256)']
    };
  },
  returns: [[_constants.TOTAL_DAI_SUPPLY, function (v) {
    return (0, _.MDAI)(v, 'rad');
  }]]
};
exports.vatDebt = vatDebt;
var vatUrns = {
  generate: function generate(ilkName, urn) {
    return {
      id: "MCD_Vat.urns(".concat(ilkName, ",").concat(urn, ")"),
      contract: 'MCD_VAT',
      call: ['urns(bytes32,address)(uint256,uint256)', (0, _utils.toHex)(ilkName), urn]
    };
  },
  returns: [[_constants.ENCUMBERED_COLLATERAL, _utils.fromWei], [_constants.ENCUMBERED_DEBT, _utils.fromWei]]
};
exports.vatUrns = vatUrns;
var vatGem = {
  generate: function generate(ilkName, urn) {
    return {
      id: "MCD_Vat.gem(".concat(ilkName, ",").concat(urn, ")"),
      contract: 'MCD_VAT',
      call: ['gem(bytes32,address)(uint)', (0, _utils.toHex)(ilkName), urn]
    };
  },
  "return": [_constants.UNLOCKED_COLLATERAL, _utils.fromWei]
};
exports.vatGem = vatGem;
var vatLine = {
  generate: function generate() {
    return {
      id: 'MCD_VAT.Line',
      contract: 'MCD_VAT',
      call: ['Line()(uint256)']
    };
  },
  returns: [[_constants.GLOBAL_DEBT_CEILING, function (v) {
    return (0, _.MDAI)(v, 'rad');
  }]]
};
exports.vatLine = vatLine;
var _default = {
  vatIlks: vatIlks,
  vatDebt: vatDebt,
  vatUrns: vatUrns,
  vatGem: vatGem,
  vatLine: vatLine
};
exports["default"] = _default;