"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _servicesCore = require("@makerdao/services-core");

var _Auction = _interopRequireDefault(require("./Auction"));

var _constants = require("./constants");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AuctionService = /*#__PURE__*/function (_PublicService) {
  (0, _inherits2["default"])(AuctionService, _PublicService);

  var _super = _createSuper(AuctionService);

  function AuctionService() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.ServiceRoles.AUCTION;
    (0, _classCallCheck2["default"])(this, AuctionService);
    return _super.call(this, name, ['smartContract']);
  }

  (0, _createClass2["default"])(AuctionService, [{
    key: "getAuction",
    value: function getAuction(ilk) {
      return new _Auction["default"](ilk, this.get('smartContract'));
    }
  }]);
  return AuctionService;
}(_servicesCore.PublicService);

exports["default"] = AuctionService;