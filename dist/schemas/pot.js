"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.annualDaiSavingsRate = exports.potRho = exports.potChi = exports.potDsr = exports.potpie = exports.potPie = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _utils = require("../utils");

var _constants = require("./_constants");

var _validators = require("./_validators");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Invalid address: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var potPie = {
  generate: function generate() {
    return {
      id: 'MCD_POT.Pie',
      contract: 'MCD_POT',
      call: ['Pie()(uint256)']
    };
  },
  returns: [[_constants.TOTAL_SAVINGS_DAI, _utils.fromWei]]
};
exports.potPie = potPie;
var potpie = {
  generate: function generate(address) {
    return {
      id: "MCD_POT.pie(".concat(address, ")"),
      contract: 'MCD_POT',
      call: ['pie(address)(uint256)', address]
    };
  },
  validate: {
    args: (0, _validators.validateAddress)(_templateObject(), 'address')
  },
  returns: [[_constants.SAVINGS_DAI, _utils.fromWei]]
};
exports.potpie = potpie;
var potDsr = {
  generate: function generate() {
    return {
      id: 'MCD_POT.dsr',
      contract: 'MCD_POT',
      call: ['dsr()(uint256)']
    };
  },
  returns: [[_constants.DAI_SAVINGS_RATE, _utils.fromRay]]
};
exports.potDsr = potDsr;
var potChi = {
  generate: function generate() {
    return {
      id: 'MCD_POT.chi',
      contract: 'MCD_POT',
      call: ['chi()(uint256)']
    };
  },
  returns: [[_constants.SAVINGS_RATE_ACCUMULATOR, _utils.fromRay]]
};
exports.potChi = potChi;
var potRho = {
  generate: function generate() {
    return {
      id: 'MCD_POT.rho',
      contract: 'MCD_POT',
      call: ['rho()(uint256)']
    };
  },
  returns: [[_constants.DATE_EARNINGS_LAST_ACCRUED, function (val) {
    return new Date(val.toNumber() * 1000);
  }]]
};
exports.potRho = potRho;
var annualDaiSavingsRate = {
  generate: function generate() {
    return {
      dependencies: function dependencies() {
        return [[_constants.DAI_SAVINGS_RATE]];
      },
      computed: function computed(daiSavingsRate) {
        return daiSavingsRate.pow(365 * 24 * 60 * 60).minus(1).times(100);
      }
    };
  }
};
exports.annualDaiSavingsRate = annualDaiSavingsRate;
var _default = {
  potPie: potPie,
  potpie: potpie,
  potDsr: potDsr,
  potRho: potRho,
  potChi: potChi,
  // computed
  annualDaiSavingsRate: annualDaiSavingsRate
};
exports["default"] = _default;