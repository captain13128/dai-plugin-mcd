"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("./utils");

var _tracksTransactions = _interopRequireWildcard(require("./utils/tracksTransactions"));

var _constants = require("./constants");

var _assert = _interopRequireDefault(require("assert"));

var _index = require("./index");

var math = _interopRequireWildcard(require("./math"));

var _dec, _dec2, _dec3, _class;

var ManagedCdp = (_dec = (0, _tracksTransactions.tracksTransactionsWithOptions)({
  numArguments: 3
}), _dec2 = (0, _tracksTransactions.tracksTransactionsWithOptions)({
  numArguments: 3
}), _dec3 = (0, _tracksTransactions.tracksTransactionsWithOptions)({
  numArguments: 1
}), (_class = /*#__PURE__*/function () {
  function ManagedCdp(id, ilk, cdpManager) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      prefetch: true
    };
    (0, _classCallCheck2["default"])(this, ManagedCdp);
    (0, _assert["default"])(typeof id === 'number', 'ID must be a number');
    this.id = id;
    (0, _assert["default"])(ilk && typeof ilk === 'string', 'Must specify ilk');
    this.ilk = ilk;
    this._cdpManager = cdpManager;
    this.type = cdpManager.get(_constants.ServiceRoles.CDP_TYPE).getCdpType(null, ilk);
    this.currency = this.type.currency;
    this.cache = {};
    if (options.prefetch) this.prefetch();
  }

  (0, _createClass2["default"])(ManagedCdp, [{
    key: "getOwner",
    value: function getOwner() {
      return this._cdpManager.getOwner(this.id);
    }
  }, {
    key: "getUrn",
    value: function getUrn() {
      return this._cdpManager.getUrn(this.id);
    } // TODO: after these operations complete, update the cache. once that's done,
    // update ManagedCdp.spec to use expectValues instead of
    // expectValuesAfterReset in more places

  }, {
    key: "lockCollateral",
    value: function lockCollateral(amount) {
      amount = (0, _utils.castAsCurrency)(amount, this.currency);
      return this._cdpManager.lock(this.id, this.ilk, amount, null);
    }
  }, {
    key: "drawDai",
    value: function drawDai(amount, _ref2) {
      var promise = _ref2.promise;
      return this._cdpManager.draw(this.id, this.ilk, amount, {
        promise: promise
      });
    }
  }, {
    key: "lockAndDraw",
    value: function lockAndDraw() {
      var lockAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currency(0);
      var drawAmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _index.MDAI)(0);

      var _ref3 = arguments.length > 2 ? arguments[2] : undefined,
          promise = _ref3.promise;

      (0, _assert["default"])(lockAmount && drawAmount, 'amounts must be defined');
      lockAmount = (0, _utils.castAsCurrency)(lockAmount, this.currency);
      drawAmount = (0, _utils.castAsCurrency)(drawAmount, _index.MDAI);
      return this._cdpManager.lockAndDraw(this.id, this.ilk, lockAmount, drawAmount, {
        promise: promise
      });
    }
  }, {
    key: "wipeDai",
    value: function wipeDai(amount) {
      amount = (0, _utils.castAsCurrency)(amount, _index.MDAI);
      return this._cdpManager.wipe(this.id, amount, null);
    }
  }, {
    key: "unsafeWipe",
    value: function unsafeWipe(amount) {
      amount = (0, _utils.castAsCurrency)(amount, _index.MDAI);
      return this._cdpManager.unsafeWipe(this.id, amount);
    }
  }, {
    key: "wipeAll",
    value: function wipeAll() {
      return this._cdpManager.wipeAll(this.id, null);
    }
  }, {
    key: "unsafeWipeAll",
    value: function unsafeWipeAll() {
      return this._cdpManager.unsafeWipeAll(this.id);
    }
  }, {
    key: "freeCollateral",
    value: function freeCollateral(amount) {
      return this.wipeAndFree(undefined, amount);
    }
  }, {
    key: "give",
    value: function give(address) {
      return this._cdpManager.give(this.id, address);
    }
  }, {
    key: "giveToProxy",
    value: function giveToProxy(address) {
      return this._cdpManager.giveToProxy(this.id, address);
    }
  }, {
    key: "wipeAndFree",
    value: function wipeAndFree() {
      var wipeAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _index.MDAI)(0);
      var freeAmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currency(0);

      var _ref4 = arguments.length > 2 ? arguments[2] : undefined,
          promise = _ref4.promise;

      (0, _assert["default"])(wipeAmount && freeAmount, 'amounts must be defined');
      wipeAmount = (0, _utils.castAsCurrency)(wipeAmount, _index.MDAI);
      freeAmount = (0, _utils.castAsCurrency)(freeAmount, this.currency);
      return this._cdpManager.wipeAndFree(this.id, this.ilk, wipeAmount, freeAmount, {
        promise: promise
      });
    }
  }, {
    key: "wipeAllAndFree",
    value: function wipeAllAndFree() {
      var freeAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currency(0);

      var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
          promise = _ref5.promise;

      (0, _assert["default"])(freeAmount, 'free amount must be defined');
      freeAmount = (0, _utils.castAsCurrency)(freeAmount, this.currency);
      return this._cdpManager.wipeAllAndFree(this.id, this.ilk, freeAmount, {
        promise: promise
      });
    }
  }, {
    key: "_getUrnInfo",
    value: function _getUrnInfo() {
      var _this = this;

      if (!this._urnInfoPromise) {
        this._urnInfoPromise = this._cdpManager.getUrn(this.id).then(function (urn) {
          return _this._cdpManager.vat.urns((0, _utils.stringToBytes)(_this.ilk), urn);
        });
      }

      return this._urnInfoPromise.then(function (value) {
        _this.cache.urnInfo = value;
        return value;
      });
    }
  }, {
    key: "_getCached",
    value: function _getCached(name) {
      (0, _assert["default"])(this.cache[name], "".concat(name, " is not cached"));
      return this.cache[name];
    }
  }, {
    key: "prefetch",
    value: function prefetch() {
      // TODO allow passing in a multicall instance to use that instead of making
      // separate calls
      return Promise.all([this._getUrnInfo(), this.type.prefetch()]);
    }
  }, {
    key: "reset",
    value: function reset() {
      this._urnInfoPromise = null;
      this.cache = {};
      this.type.reset();
    }
  }, {
    key: "collateralAmount",
    get: function get() {
      return math.collateralAmount(this.currency, this._getCached('urnInfo').ink);
    }
  }, {
    key: "collateralValue",
    get: function get() {
      return math.collateralValue(this.collateralAmount, this.type.price);
    }
  }, {
    key: "debtValue",
    get: function get() {
      return math.debtValue(this._getCached('urnInfo').art, this.type._getCached('vatInfo').rate);
    }
  }, {
    key: "collateralizationRatio",
    get: function get() {
      return math.collateralizationRatio(this.collateralValue, this.debtValue);
    }
  }, {
    key: "liquidationPrice",
    get: function get() {
      return math.liquidationPrice(this.collateralAmount, this.debtValue, this.type.liquidationRatio);
    }
  }, {
    key: "isSafe",
    get: function get() {
      return this.type.price.gte(this.liquidationPrice);
    }
  }, {
    key: "minSafeCollateralAmount",
    get: function get() {
      return math.minSafeCollateralAmount(this.debtValue, this.type.liquidationRatio, this.type.price);
    }
  }, {
    key: "collateralAvailable",
    get: function get() {
      return this.collateralAmount.minus(this.minSafeCollateralAmount);
    }
  }, {
    key: "daiAvailable",
    get: function get() {
      return math.daiAvailable(this.collateralValue, this.debtValue, this.type.liquidationRatio);
    }
  }]);
  return ManagedCdp;
}(), ((0, _applyDecoratedDescriptor2["default"])(_class.prototype, "drawDai", [_tracksTransactions["default"]], Object.getOwnPropertyDescriptor(_class.prototype, "drawDai"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "lockAndDraw", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "lockAndDraw"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "wipeAndFree", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "wipeAndFree"), _class.prototype), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "wipeAllAndFree", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "wipeAllAndFree"), _class.prototype)), _class));
exports["default"] = ManagedCdp;

ManagedCdp.create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(createTxo, ilk, cdpManager) {
    var id, cdp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = cdpManager.getNewCdpId(createTxo);
            cdp = new ManagedCdp(id, ilk, cdpManager);
            _context.next = 4;
            return cdp.prefetch();

          case 4:
            return _context.abrupt("return", cdp);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();