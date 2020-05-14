"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getCdps = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _constants = require("./_constants");

var _validators = require("./_validators");

var _utils = require("../utils");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Invalid address for getCdps: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var getCdps = {
  generate: function generate(vaultManagerAddress, proxyAddress) {
    var descending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return {
      id: "GET_CDPS.getCdps".concat(descending ? 'Desc' : 'Asc', "(").concat(proxyAddress, ")"),
      contract: 'GET_CDPS',
      call: ["getCdps".concat(descending ? 'Desc' : 'Asc', "(address,address)(uint256[],address[],bytes32[])"), vaultManagerAddress, proxyAddress]
    };
  },
  validate: {
    args: function args(_, address) {
      return (0, _validators.validateAddress)(_templateObject(), 'address')(address);
    }
  },
  returns: [[_constants.USER_VAULT_IDS, function (v) {
    return v.map(function (n) {
      return n.toNumber();
    });
  }], [_constants.USER_VAULT_ADDRESSES], [_constants.USER_VAULT_TYPES, function (v) {
    return v.map(_utils.bytesToString);
  }]]
};
exports.getCdps = getCdps;
var _default = {
  getCdps: getCdps
};
exports["default"] = _default;