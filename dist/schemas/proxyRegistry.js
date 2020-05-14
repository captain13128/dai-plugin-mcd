"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.proxyRegistryProxies = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("./_constants");

var _validators = require("./_validators");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Invalid address for proxyAddress: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var proxyRegistryProxies = {
  generate: function generate(address) {
    return {
      id: "PROXY_REGISTRY.proxies(".concat(address, ")"),
      contract: 'PROXY_REGISTRY',
      call: ['proxies(address)(address)', address],
      transforms: (0, _defineProperty2["default"])({}, _constants.PROXY_ADDRESS, function (v) {
        return v === '0x0000000000000000000000000000000000000000' ? null : v;
      })
    };
  },
  validate: {
    args: (0, _validators.validateAddress)(_templateObject(), 'address')
  },
  returns: [[_constants.PROXY_ADDRESS]]
};
exports.proxyRegistryProxies = proxyRegistryProxies;
var _default = {
  proxyRegistryProxies: proxyRegistryProxies
};
exports["default"] = _default;