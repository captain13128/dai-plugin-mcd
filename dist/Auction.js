"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _constants = require("./constants");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _index = require("./index");

var Auction = /*#__PURE__*/function () {
  function Auction(ilk, smartContractService) {
    (0, _classCallCheck2["default"])(this, Auction);

    switch (ilk) {
      case _index.MDAI.symbol:
        this.contract = smartContractService.getContract('MCD_FLAP');
        break;

      case 'MKR':
        this.contract = smartContractService.getContract('MCD_FLOP');
        break;

      default:
        this.contract = smartContractService.getContract('MCD_FLIP_' + ilk.replace(/-/g, '_'));
    }
  } // returns time in hours


  (0, _createClass2["default"])(Auction, [{
    key: "getMaxBidLifetime",
    value: function () {
      var _getMaxBidLifetime = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.contract.ttl();

              case 2:
                _context.t0 = _context.sent;
                return _context.abrupt("return", _context.t0 / 3600);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMaxBidLifetime() {
        return _getMaxBidLifetime.apply(this, arguments);
      }

      return getMaxBidLifetime;
    }() // returns time in days

  }, {
    key: "getMaxAuctionDuration",
    value: function () {
      var _getMaxAuctionDuration = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.contract.tau();

              case 2:
                _context2.t0 = _context2.sent;
                return _context2.abrupt("return", _context2.t0 / 86400);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMaxAuctionDuration() {
        return _getMaxAuctionDuration.apply(this, arguments);
      }

      return getMaxAuctionDuration;
    }() // returns decimal representation of minimum percentage increase

  }, {
    key: "getMinBidIncrease",
    value: function () {
      var _getMinBidIncrease = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var beg;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.contract.beg();

              case 2:
                beg = _context3.sent;
                return _context3.abrupt("return", new _bignumber["default"](beg).div(_constants.WAD).minus(1).toNumber());

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getMinBidIncrease() {
        return _getMinBidIncrease.apply(this, arguments);
      }

      return getMinBidIncrease;
    }()
  }]);
  return Auction;
}();

exports["default"] = Auction;