"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.endWhen = exports.endLive = void 0;

var _constants = require("./_constants");

var endLive = {
  generate: function generate() {
    return {
      id: 'MCD_END.live',
      contract: 'MCD_END',
      call: ['live()(uint256)']
    };
  },
  returns: [[_constants.EMERGENCY_SHUTDOWN_ACTIVE, function (val) {
    return val.eq(0);
  }]]
};
exports.endLive = endLive;
var endWhen = {
  generate: function generate() {
    return {
      id: 'MCD_END.When',
      contract: 'MCD_END',
      call: ['when()(uint256)']
    };
  },
  returns: [[_constants.EMERGENCY_SHUTDOWN_TIME, function (val) {
    return new Date(val.toNumber() * 1000);
  }]]
};
exports.endWhen = endWhen;
var _default = {
  endLive: endLive,
  endWhen: endWhen
};
exports["default"] = _default;