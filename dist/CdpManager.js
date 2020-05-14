"use strict";

import {MMCR} from "../src";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMethod = setMethod;
exports.transferToBag = transferToBag;
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _currency = require("@makerdao/currency");

var _servicesCore = require("@makerdao/services-core");

var _tracksTransactions = _interopRequireWildcard(require("./utils/tracksTransactions"));

var _constants = require("./constants");

var _assert = _interopRequireDefault(require("assert"));

var _ManagedCdp = _interopRequireDefault(require("./ManagedCdp"));

var _utils = require("./utils");

var _has = _interopRequireDefault(require("lodash/has"));

var _padStart = _interopRequireDefault(require("lodash/padStart"));

var _index = require("./index");

var _EventHistory = _interopRequireDefault(require("./EventHistory"));

var _dec, _dec2, _class;

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var CDP_MANAGER = _constants.ServiceRoles.CDP_MANAGER,
    CDP_TYPE = _constants.ServiceRoles.CDP_TYPE,
    SYSTEM_DATA = _constants.ServiceRoles.SYSTEM_DATA;
var CdpManager = (_dec = (0, _tracksTransactions.tracksTransactionsWithOptions)({
  numArguments: 5
}), _dec2 = (0, _tracksTransactions.tracksTransactionsWithOptions)({
  numArguments: 5
}), (_class = /*#__PURE__*/function (_LocalService) {
  (0, _inherits2["default"])(CdpManager, _LocalService);

  var _super = _createSuper(CdpManager);

  function CdpManager() {
    var _this;

    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CDP_MANAGER;
    (0, _classCallCheck2["default"])(this, CdpManager);
    _this = _super.call(this, name, ['smartContract', CDP_TYPE, SYSTEM_DATA, 'accounts', 'proxy', 'token', 'web3']);
    _this._getCdpIdsPromises = {};
    _this._getUrnPromises = {};
    return _this;
  }

  (0, _createClass2["default"])(CdpManager, [{
    key: "getCdpIds",
    value: function () {
      var _getCdpIds = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(proxyAddress) {
        var descending,
            getCdpsMethod,
            _yield$this$_getCdpId,
            _yield$this$_getCdpId2,
            ids,
            ilks,
            _args = arguments;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                descending = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                getCdpsMethod = descending ? 'getCdpsDesc' : 'getCdpsAsc';

                if (!this._getCdpIdsPromises[proxyAddress]) {
                  this._getCdpIdsPromises[proxyAddress] = this.get('smartContract').getContract('GET_CDPS') //eslint-disable-next-line no-unexpected-multiline
                  [getCdpsMethod](this._managerAddress, proxyAddress);
                }

                _context.next = 5;
                return this._getCdpIdsPromises[proxyAddress];

              case 5:
                _yield$this$_getCdpId = _context.sent;
                _yield$this$_getCdpId2 = (0, _slicedToArray2["default"])(_yield$this$_getCdpId, 3);
                ids = _yield$this$_getCdpId2[0];
                ilks = _yield$this$_getCdpId2[2];
                (0, _assert["default"])(ids.length === ilks.length, 'ids and ilks must be the same length');
                return _context.abrupt("return", ids.map(function (id, index) {
                  return {
                    id: id.toNumber(),
                    ilk: (0, _utils.bytesToString)(ilks[index])
                  };
                }));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCdpIds(_x4) {
        return _getCdpIds.apply(this, arguments);
      }

      return getCdpIds;
    }()
  }, {
    key: "getCdp",
    value: function () {
      var _getCdp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, options) {
        var cacheEnabled, cdp, ilk;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cacheEnabled = !(0, _has["default"])(options, 'cache') || options.cache;
                cdp = this._getFromInstanceCache(id, cacheEnabled);

                if (!cdp) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", cdp);

              case 4:
                _context2.next = 6;
                return this.getIlkForCdp(id);

              case 6:
                ilk = _context2.sent;
                cdp = new _ManagedCdp["default"](id, ilk, this, options);

                this._putInInstanceCache(id, cdp, cacheEnabled);

                if (!(!(0, _has["default"])(options, 'prefetch') || options.prefetch)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 12;
                return cdp.prefetch();

              case 12:
                return _context2.abrupt("return", cdp);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCdp(_x5, _x6) {
        return _getCdp.apply(this, arguments);
      }

      return getCdp;
    }()
  }, {
    key: "getIlkForCdp",
    value: function () {
      var _getIlkForCdp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = _utils.bytesToString;
                _context3.next = 3;
                return this._manager.ilks(id);

              case 3:
                _context3.t1 = _context3.sent;
                return _context3.abrupt("return", (0, _context3.t0)(_context3.t1));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getIlkForCdp(_x7) {
        return _getIlkForCdp.apply(this, arguments);
      }

      return getIlkForCdp;
    }()
  }, {
    key: "getCombinedDebtValue",
    value: function () {
      var _getCombinedDebtValue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(proxyAddress) {
        var _this2 = this;

        var descending,
            ids,
            debts,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                descending = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : true;
                _context4.next = 3;
                return this.getCdpIds(proxyAddress, descending);

              case 3:
                ids = _context4.sent;
                _context4.next = 6;
                return Promise.all(ids.map(function (c) {
                  var cdp = new _ManagedCdp["default"](c.id, c.ilk, _this2);
                  return cdp.prefetch().then(function () {
                    return cdp.debtValue;
                  });
                }));

              case 6:
                debts = _context4.sent;
                return _context4.abrupt("return", debts.reduce(function (a, b) {
                  return a.plus(b);
                }));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getCombinedDebtValue(_x8) {
        return _getCombinedDebtValue.apply(this, arguments);
      }

      return getCombinedDebtValue;
    }()
  }, {
    key: "open",
    value: function () {
      var _open = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ilk, _ref) {
        var promise, _ref$cache, cache, proxy, op, cdp;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                promise = _ref.promise, _ref$cache = _ref.cache, cache = _ref$cache === void 0 ? true : _ref$cache;
                _context5.next = 3;
                return this.get('proxy').ensureProxy({
                  promise: promise
                });

              case 3:
                proxy = _context5.sent;
                op = this.proxyActions.open(this._managerAddress, (0, _utils.stringToBytes)(ilk), proxy, {
                  dsProxy: true,
                  promise: promise,
                  metadata: {
                    ilk: ilk
                  }
                });
                _context5.t0 = _ManagedCdp["default"];
                _context5.next = 8;
                return op;

              case 8:
                _context5.t1 = _context5.sent;
                _context5.t2 = ilk;
                _context5.t3 = this;
                _context5.next = 13;
                return _context5.t0.create.call(_context5.t0, _context5.t1, _context5.t2, _context5.t3);

              case 13:
                cdp = _context5.sent;

                this._putInInstanceCache(cdp.id, cdp, cache);

                return _context5.abrupt("return", cdp);

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function open(_x9, _x10) {
        return _open.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: "reclaimCollateral",
    value: function () {
      var _reclaimCollateral = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, dink, _ref2) {
        var promise;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                promise = _ref2.promise;
                dink = (0, _utils.castAsCurrency)(dink, _index.ETH);
                return _context6.abrupt("return", this.proxyActions.frob(this._managerAddress, this.getIdBytes(id), dink.toFixed('wei'), 0, {
                  dsProxy: true,
                  promise: promise,
                  metadata: {
                    id: id,
                    dink: dink
                  }
                }));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function reclaimCollateral(_x11, _x12, _x13) {
        return _reclaimCollateral.apply(this, arguments);
      }

      return reclaimCollateral;
    }() // ilk is required if the currency type corresponds to more than one ilk; if
    // it's omitted, it is inferred from lockAmount's currency type

  }, {
    key: "openLockAndDraw",
    value: function () {
      var _openLockAndDraw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(ilk, lockAmount, drawAmount, _ref3) {
        var promise, _ref3$cache, cache, type, op, cdp;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                promise = _ref3.promise, _ref3$cache = _ref3.cache, cache = _ref3$cache === void 0 ? true : _ref3$cache;
                type = this.get(CDP_TYPE).getCdpType(lockAmount.type, ilk);
                op = this.lockAndDraw(null, type.ilk, lockAmount, drawAmount, {
                  promise: promise
                });
                _context7.t0 = _ManagedCdp["default"];
                _context7.next = 6;
                return op;

              case 6:
                _context7.t1 = _context7.sent;
                _context7.t2 = type.ilk;
                _context7.t3 = this;
                _context7.next = 11;
                return _context7.t0.create.call(_context7.t0, _context7.t1, _context7.t2, _context7.t3);

              case 11:
                cdp = _context7.sent;

                this._putInInstanceCache(cdp.id, cdp, cache);

                return _context7.abrupt("return", cdp);

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function openLockAndDraw(_x14, _x15, _x16, _x17) {
        return _openLockAndDraw.apply(this, arguments);
      }

      return openLockAndDraw;
    }()
  }, {
    key: "lockAndDraw",
    value: function () {
      var _lockAndDraw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id, ilk, lockAmount) {
        var _this$proxyActions;

        var drawAmount,
            _ref4,
            promise,
            proxyAddress,
            jugAddress,
            isEth,
            isGnt,
            method,
            args,
            _args8 = arguments;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                drawAmount = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : (0, _index.MMCR)(0);
                _ref4 = _args8.length > 4 ? _args8[4] : undefined, promise = _ref4.promise;
                (0, _assert["default"])(lockAmount && drawAmount, 'both amounts must be specified');
                (0, _assert["default"])(lockAmount instanceof _currency.Currency, 'lockAmount must be a Currency value');
                drawAmount = (0, _utils.castAsCurrency)(drawAmount, _index.MMCR);
                _context8.next = 7;
                return this.get('proxy').ensureProxy({
                  promise: promise
                });

              case 7:
                proxyAddress = _context8.sent;
                jugAddress = this.get('smartContract').getContractAddress('MCD_JUG');
                isEth = _index.ETH.isInstance(lockAmount);
                isGnt = _index.GNT.isInstance(lockAmount);
                method = setMethod(isEth, isGnt, id);
                args = [this._managerAddress, jugAddress, this._adapterAddress(ilk), this._adapterAddress('MCR'), id || (0, _utils.stringToBytes)(ilk), !isEth && lockAmount.toFixed(this._precision(lockAmount)), drawAmount.toFixed('wei'), {
                  dsProxy: true,
                  value: isEth ? lockAmount.toFixed('wei') : 0,
                  promise: promise,
                  metadata: {
                    id: id,
                    ilk: ilk,
                    lockAmount: lockAmount,
                    drawAmount: drawAmount
                  }
                }].filter(function (x) {
                  return x;
                }); // If opening a new GNT CDP, GNT must first be transferred
                // to the proxy (so it can be transferred to the new bag)

                if (!(method === 'openLockGNTAndDraw')) {
                  _context8.next = 16;
                  break;
                }

                _context8.next = 16;
                return this.get('token').getToken('GNT').transfer(proxyAddress, lockAmount);

              case 16:
                if (!(id && isGnt)) {
                  _context8.next = 19;
                  break;
                }

                _context8.next = 19;
                return transferToBag(lockAmount, proxyAddress, this);

              case 19:
                // Indicates if gem supports transferFrom
                if (!isEth && method !== 'openLockGNTAndDraw') args.splice(-1, 0, !_index.GNT.isInstance(lockAmount));
                _context8.next = 22;
                return (_this$proxyActions = this.proxyActions)[method].apply(_this$proxyActions, (0, _toConsumableArray2["default"])(args));

              case 22:
                return _context8.abrupt("return", _context8.sent);

              case 23:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function lockAndDraw(_x18, _x19, _x20) {
        return _lockAndDraw.apply(this, arguments);
      }

      return lockAndDraw;
    }()
  }, {
    key: "lock",
    value: function () {
      var _lock = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(id, ilk, lockAmount, owner, _ref5) {
        var _this$proxyActions2;

        var promise, proxyAddress, isEth, isGnt, method, args;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                promise = _ref5.promise;

                if (owner) {
                  _context9.next = 5;
                  break;
                }

                _context9.next = 4;
                return this.getOwner(id);

              case 4:
                owner = _context9.sent;

              case 5:
                _context9.next = 7;
                return this.get('proxy').ensureProxy({
                  promise: promise
                });

              case 7:
                proxyAddress = _context9.sent;
                isEth = _index.ETH.isInstance(lockAmount);
                isGnt = _index.GNT.isInstance(lockAmount);
                method = "safeLock".concat(isEth ? 'ETH' : 'Gem');
                args = [this._managerAddress, this._adapterAddress(ilk), id, !isEth && lockAmount.toFixed(this._precision(lockAmount)), owner, {
                  dsProxy: true,
                  value: isEth ? lockAmount.toFixed('wei') : 0,
                  promise: promise,
                  metadata: {
                    id: id,
                    ilk: ilk,
                    lockAmount: lockAmount
                  }
                }].filter(function (x) {
                  return x;
                }); // Transfers to bag if locking GNT in existing CDP

                if (!(id && isGnt)) {
                  _context9.next = 15;
                  break;
                }

                _context9.next = 15;
                return transferToBag(lockAmount, proxyAddress, this);

              case 15:
                // Indicates if gem supports transferFrom
                if (!isEth) args.splice(-2, 0, !_index.GNT.isInstance(lockAmount));
                return _context9.abrupt("return", (_this$proxyActions2 = this.proxyActions)[method].apply(_this$proxyActions2, (0, _toConsumableArray2["default"])(args)));

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function lock(_x21, _x22, _x23, _x24, _x25) {
        return _lock.apply(this, arguments);
      }

      return lock;
    }()
  }, {
    key: "draw",
    value: function () {
      var _draw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(id, ilk, drawAmount, _ref6) {
        var promise;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                promise = _ref6.promise;
                return _context10.abrupt("return", this.proxyActions.draw(this._managerAddress, this.get('smartContract').getContractAddress('MCD_JUG'), this._adapterAddress('MCR'), this.getIdBytes(id), (0, _utils.castAsCurrency)(drawAmount, _index.MMCR).toFixed('wei'), {
                  dsProxy: true,
                  promise: promise,
                  metadata: {
                    id: id,
                    ilk: ilk,
                    drawAmount: drawAmount
                  }
                }));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function draw(_x26, _x27, _x28, _x29) {
        return _draw.apply(this, arguments);
      }

      return draw;
    }()
  }, {
    key: "wipeAndFree",
    value: function wipeAndFree(id, ilk) {
      var wipeAmount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _index.MMCR)(0);
      var freeAmount = arguments.length > 3 ? arguments[3] : undefined;

      var _ref7 = arguments.length > 4 ? arguments[4] : undefined,
          promise = _ref7.promise;

      var isEth = _index.ETH.isInstance(freeAmount);

      var method = isEth ? 'wipeAndFreeETH' : 'wipeAndFreeGem';
      return this.proxyActions[method](this._managerAddress, this._adapterAddress(ilk), this._adapterAddress('MCR'), this.getIdBytes(id), freeAmount.toFixed(this._precision(freeAmount)), wipeAmount.toFixed('wei'), {
        dsProxy: true,
        promise: promise,
        metadata: {
          id: id,
          ilk: ilk,
          wipeAmount: wipeAmount,
          freeAmount: freeAmount
        }
      });
    }
  }, {
    key: "wipe",
    value: function () {
      var _wipe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(id, wipeAmount, owner, _ref8) {
        var promise;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                promise = _ref8.promise;

                if (owner) {
                  _context11.next = 5;
                  break;
                }

                _context11.next = 4;
                return this.getOwner(id);

              case 4:
                owner = _context11.sent;

              case 5:
                return _context11.abrupt("return", this.proxyActions.safeWipe(this._managerAddress, this._adapterAddress('MCR'), this.getIdBytes(id), wipeAmount.toFixed('wei'), owner, {
                  dsProxy: true,
                  promise: promise,
                  metadata: {
                    id: id,
                    wipeAmount: wipeAmount
                  }
                }));

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function wipe(_x30, _x31, _x32, _x33) {
        return _wipe.apply(this, arguments);
      }

      return wipe;
    }()
  }, {
    key: "unsafeWipe",
    value: function unsafeWipe(id, wipeAmount, _ref9) {
      var promise = _ref9.promise;
      return this.proxyActions.wipe(this._managerAddress, this._adapterAddress('MCR'), this.getIdBytes(id), wipeAmount.toFixed('wei'), {
        dsProxy: true,
        promise: promise,
        metadata: {
          id: id,
          wipeAmount: wipeAmount
        }
      });
    }
  }, {
    key: "wipeAll",
    value: function () {
      var _wipeAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(id, owner) {
        var _ref10,
            promise,
            _args12 = arguments;

        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _ref10 = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : {}, promise = _ref10.promise;

                if (owner) {
                  _context12.next = 5;
                  break;
                }

                _context12.next = 4;
                return this.getOwner(id);

              case 4:
                owner = _context12.sent;

              case 5:
                return _context12.abrupt("return", this.proxyActions.safeWipeAll(this._managerAddress, this._adapterAddress('MCR'), this.getIdBytes(id), owner, {
                  dsProxy: true,
                  promise: promise,
                  metadata: {
                    id: id
                  }
                }));

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function wipeAll(_x34, _x35) {
        return _wipeAll.apply(this, arguments);
      }

      return wipeAll;
    }()
  }, {
    key: "unsafeWipeAll",
    value: function unsafeWipeAll(id) {
      var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          promise = _ref11.promise;

      return this.proxyActions.wipeAll(this._managerAddress, this._adapterAddress('MCR'), this.getIdBytes(id), {
        dsProxy: true,
        promise: promise,
        metadata: {
          id: id
        }
      });
    }
  }, {
    key: "wipeAllAndFree",
    value: function wipeAllAndFree(id, ilk, freeAmount, _ref12) {
      var promise = _ref12.promise;

      var isEth = _index.ETH.isInstance(freeAmount);

      var method = isEth ? 'wipeAllAndFreeETH' : 'wipeAllAndFreeGem';
      return this.proxyActions[method](this._managerAddress, this._adapterAddress(ilk), this._adapterAddress('MCR'), this.getIdBytes(id), freeAmount.toFixed(this._precision(freeAmount)), {
        dsProxy: true,
        promise: promise,
        metadata: {
          id: id,
          ilk: ilk,
          freeAmount: freeAmount
        }
      });
    } // Gives CDP directly to the supplied address

  }, {
    key: "give",
    value: function give(id, address, _ref13) {
      var promise = _ref13.promise;
      return this.proxyActions.give(this._managerAddress, this.getIdBytes(id), address, {
        dsProxy: true,
        promise: promise,
        metadata: {
          id: id
        }
      });
    } // Gives CDP to the proxy of the supplied address

  }, {
    key: "giveToProxy",
    value: function giveToProxy(id, address, _ref14) {
      var promise = _ref14.promise;
      return this.proxyActions.giveToProxy(this._contractAddress('PROXY_REGISTRY'), this._managerAddress, this.getIdBytes(id), address, {
        dsProxy: true,
        promise: promise,
        metadata: {
          id: id,
          address: address
        }
      });
    }
  }, {
    key: "getUrn",
    value: function getUrn(id) {
      if (!this._getUrnPromises[id]) {
        this._getUrnPromises[id] = this._manager.urns(id);
      }

      return this._getUrnPromises[id];
    }
  }, {
    key: "getOwner",
    value: function getOwner(id) {
      return this._manager.owns(this.getIdBytes(id));
    }
  }, {
    key: "getIdBytes",
    value: function getIdBytes(id) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      (0, _assert["default"])(typeof id === 'number', 'ID must be a number');
      return (prefix ? '0x' : '') + (0, _padStart["default"])(id.toString(16), 24, '0');
    }
  }, {
    key: "reset",
    value: function reset() {
      this._getCdpIdsPromises = {};
      this._getUrnPromises = {};
    }
  }, {
    key: "_contractAddress",
    value: function _contractAddress(name) {
      return this.get('smartContract').getContractAddress(name);
    }
  }, {
    key: "_adapterAddress",
    value: function _adapterAddress(ilk) {
      return this.get(SYSTEM_DATA).adapterAddress(ilk);
    }
  }, {
    key: "_precision",
    value: function _precision(amount) {
      return amount.type.symbol === 'ETH' ? 'wei' : this.get(CDP_TYPE).getCdpType(amount.type).decimals;
    }
  }, {
    key: "_getFromInstanceCache",
    value: function _getFromInstanceCache(id, enabled) {
      if (!enabled) return;
      if (!this._instanceCache) this._instanceCache = {};
      var instance = this._instanceCache[id];
      if (instance) return instance;
    }
  }, {
    key: "_putInInstanceCache",
    value: function _putInInstanceCache(id, instance, enabled) {
      if (!enabled) return;
      if (!this._instanceCache) this._instanceCache = {};
      this._instanceCache[id] = instance;
    }
  }, {
    key: "getNewCdpId",
    value: function getNewCdpId(txo) {
      var logs = txo.receipt.logs;
      var managerContract = this.get('smartContract').getContract('CDP_MANAGER');

      var web3 = this.get('web3')._web3;

      var NewCdp = managerContract["interface"].events.NewCdp;
      var topic = web3.utils.keccak256(web3.utils.toHex(NewCdp.signature));
      var receiptEvent = logs.filter(function (e) {
        return e.topics[0].toLowerCase() === topic.toLowerCase();
      });
      var parsedLog = NewCdp.parse(receiptEvent[0].topics, receiptEvent[0].data);
      (0, _assert["default"])(parsedLog['cdp'], 'could not find log for NewCdp event');
      return parseInt(parsedLog['cdp']);
    }
  }, {
    key: "getEventHistory",
    value: function getEventHistory(managedCdp) {
      if (!this._eventHistoryCache) this._eventHistoryCache = {};
      return (0, _EventHistory["default"])(this, managedCdp, this._eventHistoryCache);
    }
  }, {
    key: "resetEventHistoryCache",
    value: function resetEventHistoryCache() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (id !== null) delete this._eventHistoryCache[id];else this._eventHistoryCache = {};
    }
  }, {
    key: "proxyActions",
    get: function get() {
      return this.get('smartContract').getContract('PROXY_ACTIONS');
    }
  }, {
    key: "vat",
    get: function get() {
      return this.get(SYSTEM_DATA).vat;
    }
  }, {
    key: "_manager",
    get: function get() {
      return this.get('smartContract').getContract('CDP_MANAGER');
    }
  }, {
    key: "_managerAddress",
    get: function get() {
      return this._contractAddress('CDP_MANAGER');
    }
  }]);
  return CdpManager;
}(_servicesCore.LocalService), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "open", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "open"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "reclaimCollateral", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "reclaimCollateral"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "openLockAndDraw", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "openLockAndDraw"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "lockAndDraw", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "lockAndDraw"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "lock", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "lock"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "draw", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "draw"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "wipeAndFree", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "wipeAndFree"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "wipe", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "wipe"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "unsafeWipe", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "unsafeWipe"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "wipeAll", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "wipeAll"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "unsafeWipeAll", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "unsafeWipeAll"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "wipeAllAndFree", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "wipeAllAndFree"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "give", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "give"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "giveToProxy", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "giveToProxy"), _class.prototype)), _class));
exports["default"] = CdpManager;

function setMethod(isEth, isGnt, id) {
  if (id && isEth) {
    return 'lockETHAndDraw';
  } else if (isEth) {
    return 'openLockETHAndDraw';
  } else if (!id && isGnt) {
    return 'openLockGNTAndDraw';
  } else if (id) {
    return 'lockGemAndDraw';
  }

  return 'openLockGemAndDraw';
}

function transferToBag(_x, _x2, _x3) {
  return _transferToBag.apply(this, arguments);
}

function _transferToBag() {
  _transferToBag = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(lockAmount, proxyAddress, cdpMgr) {
    var gntToken, gntAdapter, bagAddress;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            gntToken = cdpMgr.get('token').getToken(_index.GNT);
            gntAdapter = cdpMgr.get('smartContract').getContract('MCD_JOIN_GNT_A');
            _context13.next = 4;
            return gntAdapter.bags(proxyAddress);

          case 4:
            bagAddress = _context13.sent;
            return _context13.abrupt("return", gntToken.transfer(bagAddress, lockAmount));

          case 6:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _transferToBag.apply(this, arguments);
}