"use strict";

import {MMCR} from "../src";

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

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _servicesCore = require("@makerdao/services-core");

var _constants = require("./constants");

var _index = require("./index");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _tracksTransactions = _interopRequireDefault(require("./utils/tracksTransactions"));

var _EventHistory = require("./EventHistory");

var _class;

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SavingsService = (_class = /*#__PURE__*/function (_PublicService) {
  (0, _inherits2["default"])(SavingsService, _PublicService);

  var _super = _createSuper(SavingsService);

  function SavingsService() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.ServiceRoles.SAVINGS;
    (0, _classCallCheck2["default"])(this, SavingsService);
    return _super.call(this, name, ['smartContract', 'proxy', 'accounts', 'web3', _constants.ServiceRoles.SYSTEM_DATA]);
  }

  (0, _createClass2["default"])(SavingsService, [{
    key: "join",
    value: function () {
      var _join = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(amountInDai, _ref) {
        var promise;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                promise = _ref.promise;
                _context.next = 3;
                return this.get('proxy').ensureProxy();

              case 3:
                return _context.abrupt("return", this._proxyActions.join(this._daiAdapterAddress, this._pot.address, amountInDai.toFixed('wei'), {
                  dsProxy: true,
                  promise: promise
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function join(_x, _x2) {
        return _join.apply(this, arguments);
      }

      return join;
    }()
  }, {
    key: "exit",
    value: function () {
      var _exit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(amountInDai, _ref2) {
        var promise;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                promise = _ref2.promise;
                _context2.next = 3;
                return this.get('proxy').ensureProxy();

              case 3:
                return _context2.abrupt("return", this._proxyActions.exit(this._daiAdapterAddress, this._pot.address, amountInDai.toFixed('wei'), {
                  dsProxy: true,
                  promise: promise
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function exit(_x3, _x4) {
        return _exit.apply(this, arguments);
      }

      return exit;
    }()
  }, {
    key: "exitAll",
    value: function () {
      var _exitAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
        var promise;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                promise = _ref3.promise;
                _context3.next = 3;
                return this.get('proxy').ensureProxy();

              case 3:
                return _context3.abrupt("return", this._proxyActions.exitAll(this._daiAdapterAddress, this._pot.address, {
                  dsProxy: true,
                  promise: promise
                }));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function exitAll(_x5) {
        return _exitAll.apply(this, arguments);
      }

      return exitAll;
    }()
  }, {
    key: "balance",
    value: function () {
      var _balance = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var proxy;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.get('proxy').currentProxy();

              case 2:
                proxy = _context4.sent;
                return _context4.abrupt("return", proxy ? this.balanceOf(proxy) : (0, _index.MMCR)(0));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function balance() {
        return _balance.apply(this, arguments);
      }

      return balance;
    }()
  }, {
    key: "balanceOf",
    value: function () {
      var _balanceOf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(guy) {
        var slice, chi;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = _bignumber["default"];
                _context5.next = 3;
                return this._pot.pie(guy);

              case 3:
                _context5.t1 = _context5.sent;
                slice = new _context5.t0(_context5.t1);
                _context5.next = 7;
                return this.chi();

              case 7:
                chi = _context5.sent;
                return _context5.abrupt("return", (0, _index.MMCR)(slice.times(chi).div(_constants.WAD).dp(18)));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function balanceOf(_x6) {
        return _balanceOf.apply(this, arguments);
      }

      return balanceOf;
    }()
  }, {
    key: "getTotalDai",
    value: function () {
      var _getTotalDai = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var totalPie, chi;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.t0 = _bignumber["default"];
                _context6.next = 3;
                return this._pot.Pie();

              case 3:
                _context6.t1 = _context6.sent;
                totalPie = new _context6.t0(_context6.t1);
                _context6.next = 7;
                return this.chi();

              case 7:
                chi = _context6.sent;
                return _context6.abrupt("return", (0, _index.MMCR)(totalPie.times(chi).div(_constants.WAD).dp(18)));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getTotalDai() {
        return _getTotalDai.apply(this, arguments);
      }

      return getTotalDai;
    }()
  }, {
    key: "getYearlyRate",
    value: function () {
      var _getYearlyRate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var dsr;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.t0 = _bignumber["default"];
                _context7.next = 3;
                return this._pot.dsr();

              case 3:
                _context7.t1 = _context7.sent;
                dsr = new _context7.t0(_context7.t1).div(_constants.RAY);
                return _context7.abrupt("return", dsr.pow(_constants.SECONDS_PER_YEAR));

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getYearlyRate() {
        return _getYearlyRate.apply(this, arguments);
      }

      return getYearlyRate;
    }()
  }, {
    key: "chi",
    value: function () {
      var _chi = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.t0 = _bignumber["default"];
                _context8.next = 3;
                return this._pot.chi();

              case 3:
                _context8.t1 = _context8.sent;
                return _context8.abrupt("return", new _context8.t0(_context8.t1).div(_constants.RAY));

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function chi() {
        return _chi.apply(this, arguments);
      }

      return chi;
    }()
  }, {
    key: "getEventHistory",
    value: function getEventHistory(address) {
      if (!this._eventHistoryCache) this._eventHistoryCache = {};
      return (0, _EventHistory.getDsrEventHistory)(this, address, this._eventHistoryCache);
    }
  }, {
    key: "getEarningsToDate",
    value: function () {
      var _getEarningsToDate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(address) {
        var eventHistory, sum, balance;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!this._eventHistoryCache) this._eventHistoryCache = {};
                _context9.next = 3;
                return (0, _EventHistory.getDsrEventHistory)(this, address, this._eventHistoryCache);

              case 3:
                eventHistory = _context9.sent;
                sum = new _bignumber["default"](0);
                eventHistory.forEach(function (_ref4) {
                  var type = _ref4.type,
                      amount = _ref4.amount;
                  if (type === 'DSR_DEPOSIT') sum = sum.plus(amount);
                  if (type === 'DSR_WITHDRAW') sum = sum.minus(amount);
                });
                _context9.next = 8;
                return this.balanceOf(address);

              case 8:
                balance = _context9.sent;
                return _context9.abrupt("return", balance.gt(sum) ? balance.minus(sum) : (0, _index.MMCR)(0));

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getEarningsToDate(_x7) {
        return _getEarningsToDate.apply(this, arguments);
      }

      return getEarningsToDate;
    }()
  }, {
    key: "resetEventHistoryCache",
    value: function resetEventHistoryCache() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (address !== null) delete this._eventHistoryCache[address];else this._eventHistoryCache = {};
    }
  }, {
    key: "_proxyActions",
    get: function get() {
      return this.get('smartContract').getContract('PROXY_ACTIONS_DSR');
    }
  }, {
    key: "_pot",
    get: function get() {
      return this.get('smartContract').getContract('MCD_POT');
    }
  }, {
    key: "_daiAdapterAddress",
    get: function get() {
      return this.get(_constants.ServiceRoles.SYSTEM_DATA).adapterAddress('MCR');
    }
  }]);
  return SavingsService;
}(_servicesCore.PublicService), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "join", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "join"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "exit", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "exit"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "exitAll", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "exitAll"), _class.prototype)), _class);
exports["default"] = SavingsService;