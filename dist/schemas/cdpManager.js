"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.cdpManagerOwner = exports.cdpManagerCdpi = exports.cdpManagerIlks = exports.cdpManagerUrns = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("../utils");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _constants = require("./_constants");

var _validators = require("./_validators");

var cdpManagerUrns = {
  generate: function generate(id) {
    return {
      id: "CDP_MANAGER.urns(".concat(id, ")"),
      contract: 'CDP_MANAGER',
      call: ['urns(uint256)(address)', parseInt(id)]
    };
  },
  returns: [_constants.VAULT_ADDRESS]
};
exports.cdpManagerUrns = cdpManagerUrns;
var cdpManagerIlks = {
  generate: function generate(id) {
    return {
      id: "CDP_MANAGER.ilks(".concat(id, ")"),
      contract: 'CDP_MANAGER',
      call: ['ilks(uint256)(bytes32)', parseInt(id)]
    };
  },
  validate: (0, _defineProperty2["default"])({
    args: _validators.validateVaultId
  }, _constants.VAULT_TYPE, _validators.validateVaultTypeResult),
  returns: [[_constants.VAULT_TYPE, _utils.bytesToString]]
};
exports.cdpManagerIlks = cdpManagerIlks;
var cdpManagerCdpi = {
  generate: function generate() {
    return {
      id: 'CDP_MANAGER.cdpi',
      contract: 'CDP_MANAGER',
      call: ['cdpi()(uint256)']
    };
  },
  returns: [[_constants.VAULTS_CREATED, function (v) {
    return (0, _bignumber["default"])(v);
  }]]
};
exports.cdpManagerCdpi = cdpManagerCdpi;
var cdpManagerOwner = {
  generate: function generate(id) {
    return {
      id: "CDP_MANAGER.owner(".concat(id, ")"),
      contract: 'CDP_MANAGER',
      call: ['owns(uint256)(address)', id]
    };
  },
  returns: [[_constants.VAULT_OWNER]]
};
exports.cdpManagerOwner = cdpManagerOwner;
var _default = {
  cdpManagerUrns: cdpManagerUrns,
  cdpManagerIlks: cdpManagerIlks,
  cdpManagerCdpi: cdpManagerCdpi,
  cdpManagerOwner: cdpManagerOwner
};
exports["default"] = _default;