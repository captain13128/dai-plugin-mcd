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

var _assert = _interopRequireDefault(require("assert"));

var _constants = require("./constants");

var _utils = require("./utils");

var _index = require("./index");

var math = _interopRequireWildcard(require("./math"));

var CdpType = /*#__PURE__*/function () {
  function CdpType(cdpTypeService, _ref) {
    var currency = _ref.currency,
        ilk = _ref.ilk,
        decimals = _ref.decimals;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      prefetch: true
    };
    (0, _classCallCheck2["default"])(this, CdpType);
    (0, _assert["default"])(currency && ilk, 'currency and ilk are required');
    this._cdpTypeService = cdpTypeService;
    this._systemData = cdpTypeService.get(_constants.ServiceRoles.SYSTEM_DATA);
    this._web3Service = this._systemData.get('smartContract').get('web3');
    this.currency = currency;
    this.decimals = decimals || 18;
    this.ilk = ilk;
    this._ilkBytes = (0, _utils.stringToBytes)(this.ilk);
    this.cache = {};
    if (options.prefetch) this.prefetch();
  }

  (0, _createClass2["default"])(CdpType, [{
    key: "ilkInfo",
    value: function () {
      var _ilkInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var contract,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                contract = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'vat';
                return _context.abrupt("return", this._systemData[contract].ilks(this._ilkBytes));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ilkInfo() {
        return _ilkInfo.apply(this, arguments);
      }

      return ilkInfo;
    }()
  }, {
    key: "prefetch",
    value: function () {
      var _prefetch = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this = this;

        var adapterAddress, _ref2, symbol;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // TODO allow passing in a multicall instance to use that instead of making
                // separate calls
                if (!this._prefetchPromise) {
                  adapterAddress = this._systemData.adapterAddress(this.ilk);
                  _ref2 = this.currency === _index.ETH ? _index.MWETH : this.currency, symbol = _ref2.symbol;
                  this._prefetchPromise = Promise.all([this._systemData.get('token').getToken(symbol).balanceOf(adapterAddress).then(function (x) {
                    return _this.cache.adapterBalance = x;
                  }), this.ilkInfo().then(function (x) {
                    return _this.cache.vatInfo = x;
                  }), this.ilkInfo('cat').then(function (x) {
                    return _this.cache.catInfo = x;
                  }), this.ilkInfo('jug').then(function (x) {
                    return _this.cache.jugInfo = x;
                  }), this.ilkInfo('spot').then(function (x) {
                    return _this.cache.spotInfo = x;
                  }), this._systemData.spot.par().then(function (x) {
                    return _this.cache.par = x;
                  })]);
                }

                return _context2.abrupt("return", this._prefetchPromise);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function prefetch() {
        return _prefetch.apply(this, arguments);
      }

      return prefetch;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._prefetchPromise = null;
                this.cache = {};

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "_getCached",
    value: function _getCached(name) {
      (0, _assert["default"])(this.cache[name], "".concat(name, " is not cached"));
      return this.cache[name];
    }
  }, {
    key: "totalCollateral",
    get: function get() {
      return this.currency(this._getCached('adapterBalance'));
    }
  }, {
    key: "totalDebt",
    get: function get() {
      var _this$_getCached = this._getCached('vatInfo'),
          Art = _this$_getCached.Art,
          rate = _this$_getCached.rate;

      return _index.MDAI.wei(Art).times(rate).shiftedBy(-27);
    }
  }, {
    key: "debtCeiling",
    get: function get() {
      return math.debtCeiling(this._getCached('vatInfo').line);
    }
  }, {
    key: "liquidationRatio",
    get: function get() {
      return math.liquidationRatio(this._getCached('spotInfo').mat);
    }
  }, {
    key: "price",
    get: function get() {
      return math.price(this.currency, this._getCached('par'), this._getCached('vatInfo').spot, this.liquidationRatio);
    }
  }, {
    key: "liquidationPenalty",
    get: function get() {
      return math.liquidationPenalty(this._getCached('catInfo').chop);
    }
  }, {
    key: "annualStabilityFee",
    get: function get() {
      return math.annualStabilityFee(this._getCached('jugInfo').duty);
    }
  }, {
    key: "_pipAddress",
    get: function get() {
      var contract = 'PIP_' + this.currency.symbol;
      return this._systemData.get('smartContract').getContractAddress(contract);
    }
  }]);
  return CdpType;
}();

exports["default"] = CdpType;