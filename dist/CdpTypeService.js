"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _servicesCore = require("@makerdao/services-core");

var _CdpType = _interopRequireDefault(require("./CdpType"));

var _constants = require("./constants");

var _assert = _interopRequireDefault(require("assert"));

var math = _interopRequireWildcard(require("./math"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var CDP_TYPE = _constants.ServiceRoles.CDP_TYPE,
    SYSTEM_DATA = _constants.ServiceRoles.SYSTEM_DATA;

var CdpTypeService = /*#__PURE__*/function (_PublicService) {
  (0, _inherits2["default"])(CdpTypeService, _PublicService);

  var _super = _createSuper(CdpTypeService);

  function CdpTypeService() {
    var _this;

    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CDP_TYPE;
    (0, _classCallCheck2["default"])(this, CdpTypeService);
    _this = _super.call(this, name, [SYSTEM_DATA]);
    _this.reset = _this.resetAllCdpTypes;
    return _this;
  }

  (0, _createClass2["default"])(CdpTypeService, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.settings = settings;
      this.cdpTypes = (settings.cdpTypes || []).map(function (cdpType) {
        return new _CdpType["default"](_this2, cdpType, {
          prefetch: settings.prefetch
        });
      });
    }
  }, {
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.settings.prefetch) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.prefetchAllCdpTypes();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "getCdpType",
    value: function getCdpType(currency, ilk) {
      var types = this.cdpTypes.filter(function (t) {
        return (!currency || t.currency.symbol === currency.symbol) && (!ilk || ilk === t.ilk);
      });
      if (types.length === 1) return types[0];
      var label = [currency && "currency ".concat(currency.symbol), ilk && "ilk ".concat(ilk)].filter(function (x) {
        return x;
      }).join(', ');
      (0, _assert["default"])(types.length <= 1, "".concat(label, " matches more than one cdp type"));
      (0, _assert["default"])(types.length > 0, "".concat(label, " matches no cdp type"));
    }
  }, {
    key: "resetAllCdpTypes",
    value: function resetAllCdpTypes() {
      this.cdpTypes.forEach(function (type) {
        return type.reset();
      });
    }
  }, {
    key: "prefetchAllCdpTypes",
    value: function () {
      var _prefetchAllCdpTypes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Promise.all(this.cdpTypes.map(function (type) {
                  return type.prefetch();
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function prefetchAllCdpTypes() {
        return _prefetchAllCdpTypes.apply(this, arguments);
      }

      return prefetchAllCdpTypes;
    }() //--system-wide functions
    //these functions should probably be moved to the system data service, but need to resolve circular dependency between cdpTypeService and SystemDataService first
    //this should equal the total dai supply as long as we account for all cdpTypes/ilks

  }, {
    key: "totalDebtAllCdpTypes",
    get: function get() {
      var debts = this.cdpTypes.map(function (ilk) {
        return ilk.totalDebt;
      });
      return debts.reduce(function (a, b) {
        return a.plus(b);
      });
    }
  }, {
    key: "totalCollateralValueAllCdpTypes",
    get: function get() {
      var collateralValues = this.cdpTypes.map(function (ilk) {
        return ilk.totalCollateral.times(ilk.price);
      });
      return collateralValues.reduce(function (a, b) {
        return a.plus(b);
      });
    }
  }, {
    key: "totalCollateralizationRatioAllCdpTypes",
    get: function get() {
      return math.collateralizationRatio(this.totalCollateralValueAllCdpTypes, this.totalDebtAllCdpTypes);
    }
  }]);
  return CdpTypeService;
}(_servicesCore.PublicService);

exports["default"] = CdpTypeService;