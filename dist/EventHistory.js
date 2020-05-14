"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getEventHistory;
exports.getDsrEventHistory = getDsrEventHistory;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _web3EthAbi = _interopRequireDefault(require("web3-eth-abi"));

var _padStart = _interopRequireDefault(require("lodash/padStart"));

var _padEnd = _interopRequireDefault(require("lodash/padEnd"));

var _orderBy = _interopRequireDefault(require("lodash/orderBy"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _utils = require("./utils");

var formatAddress = function formatAddress(v) {
  return '0x' + v.slice(26).toLowerCase();
};

var funcSigTopic = function funcSigTopic(v) {
  return (0, _padEnd["default"])(_web3EthAbi["default"].encodeFunctionSignature(v), 66, '0');
};

var EVENT_GIVE = funcSigTopic('give(uint256,address)');
var EVENT_DAI_ADAPTER_EXIT = funcSigTopic('exit(address,uint256)');
var EVENT_DAI_ADAPTER_JOIN = funcSigTopic('join(address,uint256)');
var EVENT_POT_JOIN = funcSigTopic('join(uint256)');
var EVENT_POT_EXIT = funcSigTopic('exit(uint256)');
var EVENT_VAT_FROB = funcSigTopic('frob(bytes32,address,address,address,int256,int256)');
var EVENT_MANAGER_FROB = funcSigTopic('frob(uint256,int256,int256)');

var decodeManagerFrob = function decodeManagerFrob(data) {
  var sig = _web3EthAbi["default"].encodeFunctionSignature('frob(uint256,int256,int256)').slice(2);

  var decoded = _web3EthAbi["default"].decodeParameters(['uint256', // id
  'int256', // dink
  'int256' // dart
  ], '0x' + data.replace(new RegExp('^.+?' + sig), ''));

  return {
    id: decoded[0].toString(),
    dink: decoded[1],
    dart: decoded[2] // can't be used directly because would need to be scaled up using vat.ilks[ilk].rate

  };
};

var decodeVatFrob = function decodeVatFrob(data) {
  var sig = _web3EthAbi["default"].encodeFunctionSignature('frob(bytes32,address,address,address,int256,int256)').slice(2);

  var decoded = _web3EthAbi["default"].decodeParameters(['bytes32', // ilk
  'address', // u (urnHandler)
  'address', // v (urnHandler)
  'address', // w (urnHandler)
  'int256', // dink
  'int256' // dart
  ], '0x' + data.replace(new RegExp('^.+?' + sig), ''));

  return {
    ilk: (0, _utils.bytesToString)(decoded[0].toString()),
    urnHandler: decoded[1].toString(),
    dink: decoded[4].toString(),
    dart: decoded[5].toString()
  };
};

function getEventHistory(_x, _x2, _x3) {
  return _getEventHistory.apply(this, arguments);
}

function _getEventHistory() {
  _getEventHistory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(cdpManager, managedCdp, cache) {
    var MCD_JOIN_DAI, MCD_JOIN_SAI, CDP_MANAGER, MIGRATION, MCD_VAT, MCD_CAT, id, web3, utils, fromBlock, promisesBlockTimestamp, getBlockTimestamp, urnHandler, ilk, NewCdp, Bite, lookups;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            MCD_JOIN_DAI = cdpManager.get('smartContract').getContractAddress('MCD_JOIN_DAI');
            MCD_JOIN_SAI = cdpManager.get('smartContract').getContractAddress('MCD_JOIN_SAI');
            CDP_MANAGER = cdpManager.get('smartContract').getContractAddress('CDP_MANAGER');
            MIGRATION = cdpManager.get('smartContract').getContractAddress('MIGRATION');
            MCD_VAT = cdpManager.get('smartContract').getContractAddress('MCD_VAT');
            MCD_CAT = cdpManager.get('smartContract').getContractAddress('MCD_CAT');
            id = managedCdp.id;

            if (!cache[id]) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", cache[id]);

          case 9:
            web3 = cdpManager.get('web3');
            utils = web3._web3.utils; // 8600000 is 2019-09-22 on mainnet and 2018-09-04 on kovan

            fromBlock = [1, 42].includes(web3.networkId()) ? 8600000 : 1;
            promisesBlockTimestamp = {};

            getBlockTimestamp = function getBlockTimestamp(block) {
              if (!promisesBlockTimestamp[block]) {
                promisesBlockTimestamp[block] = web3.getBlock(block, false);
              }

              return promisesBlockTimestamp[block];
            };

            _context5.next = 16;
            return cdpManager.getUrn(id);

          case 16:
            urnHandler = _context5.sent.toLowerCase();
            ilk = managedCdp.ilk;
            NewCdp = cdpManager.get('smartContract').getContract('CDP_MANAGER')["interface"].events.NewCdp;
            Bite = cdpManager.get('smartContract').getContract('MCD_CAT')["interface"].events.Bite;
            lookups = [{
              request: web3.getPastLogs({
                address: CDP_MANAGER,
                topics: [utils.keccak256(utils.toHex(NewCdp.signature)), null, null, '0x' + (0, _padStart["default"])(id.toString(16), 64, '0')],
                fromBlock: fromBlock
              }),
              result: function result(r) {
                return r.map(function (_ref) {
                  var block = _ref.blockNumber,
                      txHash = _ref.transactionHash;
                  return {
                    type: 'OPEN',
                    order: 0,
                    block: block,
                    txHash: txHash,
                    id: id,
                    ilk: ilk
                  };
                });
              }
            }, {
              request: web3.getPastLogs({
                address: CDP_MANAGER,
                topics: [EVENT_MANAGER_FROB, null, '0x' + (0, _padStart["default"])(id.toString(16), 64, '0')],
                fromBlock: fromBlock
              }),
              result: function () {
                var _result = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(r) {
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          return _context2.abrupt("return", r.reduce( /*#__PURE__*/function () {
                            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(acc, _ref2) {
                              var block, data, topics, _decodeManagerFrob, dart, _acc, proxy, joinDaiEvents;

                              return _regenerator["default"].wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      block = _ref2.blockNumber, data = _ref2.data, topics = _ref2.topics;
                                      _decodeManagerFrob = decodeManagerFrob(data), dart = _decodeManagerFrob.dart;
                                      _context.next = 4;
                                      return acc;

                                    case 4:
                                      acc = _context.sent;
                                      dart = new _bignumber["default"](dart); // Imprecise debt amount frobbed (not scaled by vat.ilks[ilk].rate)

                                      if (!(dart.lt(0) || dart.gt(0))) {
                                        _context.next = 12;
                                        break;
                                      }

                                      // Lookup the mcr join events on this block for this proxy address
                                      proxy = topics[1];
                                      _context.next = 10;
                                      return web3.getPastLogs({
                                        address: [MCD_JOIN_DAI, MCD_JOIN_SAI],
                                        topics: [dart.lt(0) ? EVENT_DAI_ADAPTER_JOIN : EVENT_DAI_ADAPTER_EXIT, proxy],
                                        fromBlock: block,
                                        toBlock: block
                                      });

                                    case 10:
                                      joinDaiEvents = _context.sent;

                                      (_acc = acc).push.apply(_acc, (0, _toConsumableArray2["default"])(joinDaiEvents.map(function (_ref4) {
                                        var address = _ref4.address,
                                            block = _ref4.blockNumber,
                                            txHash = _ref4.transactionHash,
                                            topics = _ref4.topics;
                                        return {
                                          type: dart.lt(0) ? 'PAY_BACK' : 'GENERATE',
                                          order: 2,
                                          block: block,
                                          txHash: txHash,
                                          id: id,
                                          ilk: ilk,
                                          adapter: address.toLowerCase(),
                                          proxy: formatAddress(topics[1]),
                                          recipient: formatAddress(topics[2]),
                                          amount: (0, _utils.parseWeiNumeric)(topics[3])
                                        };
                                      })));

                                    case 12:
                                      return _context.abrupt("return", acc);

                                    case 13:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            }));

                            return function (_x8, _x9) {
                              return _ref3.apply(this, arguments);
                            };
                          }(), []));

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                function result(_x7) {
                  return _result.apply(this, arguments);
                }

                return result;
              }()
            }, {
              request: web3.getPastLogs({
                address: MCD_VAT,
                topics: [EVENT_VAT_FROB, null, '0x' + (0, _padStart["default"])(urnHandler.slice(2), 64, '0')],
                fromBlock: fromBlock
              }),
              result: function result(r) {
                return r.map(function (_ref5) {
                  var address = _ref5.address,
                      block = _ref5.blockNumber,
                      txHash = _ref5.transactionHash,
                      data = _ref5.data,
                      topics = _ref5.topics,
                      transactionLogIndex = _ref5.transactionLogIndex;

                  var _decodeVatFrob = decodeVatFrob(data),
                      ilk = _decodeVatFrob.ilk,
                      dink = _decodeVatFrob.dink,
                      urnHandler = _decodeVatFrob.urnHandler;

                  dink = new _bignumber["default"](dink);
                  var reclaim = formatAddress(topics[2]) === urnHandler.toLowerCase() && formatAddress(topics[3]) == urnHandler.toLowerCase() && parseInt(transactionLogIndex, 16) === 1;
                  return dink.lt(0) || dink.gt(0) ? {
                    type: dink.lt(0) ? 'WITHDRAW' : reclaim ? 'RECLAIM' : 'DEPOSIT',
                    order: dink.lt(0) ? 3 : 1,
                    block: block,
                    txHash: txHash,
                    id: id,
                    ilk: ilk,
                    gem: managedCdp.currency.symbol,
                    adapter: address.toLowerCase(),
                    amount: Math.abs((0, _utils.parseWeiNumeric)(dink)).toString()
                  } : null;
                });
              }
            }, {
              request: web3.getPastLogs({
                address: CDP_MANAGER,
                topics: [EVENT_GIVE, null, '0x' + (0, _padStart["default"])(id.toString(16), 64, '0')],
                fromBlock: fromBlock
              }),
              result: function result(r) {
                return r.map(function (_ref6) {
                  var block = _ref6.blockNumber,
                      txHash = _ref6.transactionHash,
                      topics = _ref6.topics;
                  var prevOwner = formatAddress(topics[1]);
                  return {
                    type: prevOwner === MIGRATION ? 'MIGRATE' : 'GIVE',
                    order: 1,
                    block: block,
                    txHash: txHash,
                    prevOwner: prevOwner,
                    id: (0, _utils.numberFromNumeric)(topics[2]),
                    newOwner: formatAddress(topics[3])
                  };
                });
              }
            }, {
              request: web3.getPastLogs({
                address: MCD_CAT,
                topics: [utils.keccak256(utils.toHex(Bite.signature)), null, '0x' + (0, _padStart["default"])(urnHandler.slice(2), 64, '0')],
                fromBlock: fromBlock
              }),
              result: function result(r) {
                return r.map(function (tx) {
                  var topics = tx.topics,
                      data = tx.data,
                      block = tx.blockNumber,
                      txHash = tx.transactionHash;
                  var inputs = Bite.inputs.names.reduceRight(function (acc, name, idx) {
                    if (['ilk', 'urn'].some(function (indexed) {
                      return indexed === name;
                    })) return acc;
                    return [{
                      type: Bite.inputs.types[idx],
                      name: name
                    }].concat((0, _toConsumableArray2["default"])(acc));
                  }, []);

                  var _ethAbi$decodeLog = _web3EthAbi["default"].decodeLog(inputs, data, topics),
                      id = _ethAbi$decodeLog.id,
                      ink = _ethAbi$decodeLog.ink;

                  return {
                    type: 'BITE',
                    auctionId: (0, _utils.numberFromNumeric)(id),
                    amount: new _bignumber["default"](ink).shiftedBy(-18),
                    gem: managedCdp.currency.symbol,
                    block: block,
                    txHash: txHash
                  };
                });
              }
            }]; // eslint-disable-next-line require-atomic-updates

            cache[id] = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
              var results;
              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return Promise.all(lookups.map(function (l) {
                        return l.request;
                      }));

                    case 2:
                      results = _context4.sent;
                      _context4.t0 = _orderBy["default"];
                      _context4.t1 = Promise;
                      _context4.t2 = _flatten["default"];
                      _context4.next = 8;
                      return Promise.all(results.map(function (r, i) {
                        return lookups[i].result(r);
                      }));

                    case 8:
                      _context4.t3 = _context4.sent;
                      _context4.t4 = (0, _context4.t2)(_context4.t3).filter(function (r) {
                        return r !== null;
                      }).map( /*#__PURE__*/function () {
                        var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(e) {
                          return _regenerator["default"].wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return getBlockTimestamp(e.block);

                                case 2:
                                  e.timestamp = _context3.sent.timestamp;
                                  return _context3.abrupt("return", e);

                                case 4:
                                case "end":
                                  return _context3.stop();
                              }
                            }
                          }, _callee3);
                        }));

                        return function (_x10) {
                          return _ref8.apply(this, arguments);
                        };
                      }());
                      _context4.next = 12;
                      return _context4.t1.all.call(_context4.t1, _context4.t4);

                    case 12:
                      _context4.t5 = _context4.sent;
                      _context4.t6 = ['block', 'order'];
                      _context4.t7 = ['desc', 'desc'];
                      return _context4.abrupt("return", (0, _context4.t0)(_context4.t5, _context4.t6, _context4.t7).map(function (e) {
                        delete e.order;
                        return e;
                      }));

                    case 16:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }))();
            return _context5.abrupt("return", cache[id]);

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getEventHistory.apply(this, arguments);
}

function getDsrEventHistory(_x4, _x5, _x6) {
  return _getDsrEventHistory.apply(this, arguments);
}

function _getDsrEventHistory() {
  _getDsrEventHistory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(service, address, cache) {
    var MCD_JOIN_DAI, MCD_POT, web3, fromBlock, promisesBlockTimestamp, getBlockTimestamp, lookups;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            MCD_JOIN_DAI = service.get('smartContract').getContractAddress('MCD_JOIN_DAI');
            MCD_POT = service.get('smartContract').getContractAddress('MCD_POT');
            address = address.toLowerCase();

            if (!cache[address]) {
              _context12.next = 5;
              break;
            }

            return _context12.abrupt("return", cache[address]);

          case 5:
            web3 = service.get('web3'); // 8600000 is 2019-09-22 on mainnet and 2018-09-04 on kovan

            fromBlock = [1, 42].includes(web3.networkId()) ? 8600000 : 1;
            promisesBlockTimestamp = {};

            getBlockTimestamp = function getBlockTimestamp(block) {
              if (!promisesBlockTimestamp[block]) {
                promisesBlockTimestamp[block] = web3.getBlock(block, false);
              }

              return promisesBlockTimestamp[block];
            };

            lookups = [{
              request: web3.getPastLogs({
                address: MCD_POT,
                topics: [EVENT_POT_JOIN, '0x' + (0, _padStart["default"])(address.slice(2), 64, '0')],
                fromBlock: fromBlock
              }),
              result: function () {
                var _result2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(r) {
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          return _context7.abrupt("return", r.reduce( /*#__PURE__*/function () {
                            var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(acc, _ref9) {
                              var block, txHash, adapterJoinEvents, _adapterJoinEvents$fi, _adapterJoinEvents$fi2, adapterTopics;

                              return _regenerator["default"].wrap(function _callee6$(_context6) {
                                while (1) {
                                  switch (_context6.prev = _context6.next) {
                                    case 0:
                                      block = _ref9.blockNumber, txHash = _ref9.transactionHash;
                                      _context6.next = 3;
                                      return acc;

                                    case 3:
                                      acc = _context6.sent;
                                      _context6.next = 6;
                                      return web3.getPastLogs({
                                        address: MCD_JOIN_DAI,
                                        topics: [EVENT_DAI_ADAPTER_JOIN, '0x' + (0, _padStart["default"])(address.slice(2), 64, '0')],
                                        fromBlock: fromBlock
                                      });

                                    case 6:
                                      adapterJoinEvents = _context6.sent;
                                      _adapterJoinEvents$fi = adapterJoinEvents.filter(function (x) {
                                        return x.transactionHash === txHash;
                                      }), _adapterJoinEvents$fi2 = (0, _slicedToArray2["default"])(_adapterJoinEvents$fi, 1), adapterTopics = _adapterJoinEvents$fi2[0].topics;
                                      acc.push({
                                        type: 'DSR_DEPOSIT',
                                        order: 0,
                                        block: block,
                                        txHash: txHash,
                                        amount: (0, _utils.parseWeiNumeric)(adapterTopics[3]),
                                        gem: 'MCR'
                                      });
                                      return _context6.abrupt("return", acc);

                                    case 10:
                                    case "end":
                                      return _context6.stop();
                                  }
                                }
                              }, _callee6);
                            }));

                            return function (_x12, _x13) {
                              return _ref10.apply(this, arguments);
                            };
                          }(), []));

                        case 1:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                function result(_x11) {
                  return _result2.apply(this, arguments);
                }

                return result;
              }()
            }, {
              request: web3.getPastLogs({
                address: MCD_POT,
                topics: [EVENT_POT_EXIT, '0x' + (0, _padStart["default"])(address.slice(2), 64, '0')],
                fromBlock: fromBlock
              }),
              result: function () {
                var _result3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(r) {
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          return _context9.abrupt("return", r.reduce( /*#__PURE__*/function () {
                            var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(acc, _ref11) {
                              var block, txHash, adapterExitEvents, _adapterExitEvents$fi, _adapterExitEvents$fi2, adapterTopics;

                              return _regenerator["default"].wrap(function _callee8$(_context8) {
                                while (1) {
                                  switch (_context8.prev = _context8.next) {
                                    case 0:
                                      block = _ref11.blockNumber, txHash = _ref11.transactionHash;
                                      _context8.next = 3;
                                      return acc;

                                    case 3:
                                      acc = _context8.sent;
                                      _context8.next = 6;
                                      return web3.getPastLogs({
                                        address: MCD_JOIN_DAI,
                                        topics: [EVENT_DAI_ADAPTER_EXIT, '0x' + (0, _padStart["default"])(address.slice(2), 64, '0')],
                                        fromBlock: fromBlock
                                      });

                                    case 6:
                                      adapterExitEvents = _context8.sent;
                                      _adapterExitEvents$fi = adapterExitEvents.filter(function (x) {
                                        return x.transactionHash === txHash;
                                      }), _adapterExitEvents$fi2 = (0, _slicedToArray2["default"])(_adapterExitEvents$fi, 1), adapterTopics = _adapterExitEvents$fi2[0].topics;
                                      acc.push({
                                        type: 'DSR_WITHDRAW',
                                        order: 0,
                                        block: block,
                                        txHash: txHash,
                                        amount: (0, _utils.parseWeiNumeric)(adapterTopics[3]),
                                        gem: 'MCR'
                                      });
                                      return _context8.abrupt("return", acc);

                                    case 10:
                                    case "end":
                                      return _context8.stop();
                                  }
                                }
                              }, _callee8);
                            }));

                            return function (_x15, _x16) {
                              return _ref12.apply(this, arguments);
                            };
                          }(), []));

                        case 1:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));

                function result(_x14) {
                  return _result3.apply(this, arguments);
                }

                return result;
              }()
            }]; // eslint-disable-next-line require-atomic-updates

            cache[address] = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
              var results;
              return _regenerator["default"].wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.next = 2;
                      return Promise.all(lookups.map(function (l) {
                        return l.request;
                      }));

                    case 2:
                      results = _context11.sent;
                      _context11.t0 = _orderBy["default"];
                      _context11.t1 = Promise;
                      _context11.t2 = _flatten["default"];
                      _context11.next = 8;
                      return Promise.all(results.map(function (r, i) {
                        return lookups[i].result(r);
                      }));

                    case 8:
                      _context11.t3 = _context11.sent;
                      _context11.t4 = (0, _context11.t2)(_context11.t3).filter(function (r) {
                        return r !== null;
                      }).map( /*#__PURE__*/function () {
                        var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(e) {
                          return _regenerator["default"].wrap(function _callee10$(_context10) {
                            while (1) {
                              switch (_context10.prev = _context10.next) {
                                case 0:
                                  _context10.next = 2;
                                  return getBlockTimestamp(e.block);

                                case 2:
                                  e.timestamp = _context10.sent.timestamp;
                                  return _context10.abrupt("return", e);

                                case 4:
                                case "end":
                                  return _context10.stop();
                              }
                            }
                          }, _callee10);
                        }));

                        return function (_x17) {
                          return _ref14.apply(this, arguments);
                        };
                      }());
                      _context11.next = 12;
                      return _context11.t1.all.call(_context11.t1, _context11.t4);

                    case 12:
                      _context11.t5 = _context11.sent;
                      _context11.t6 = ['block', 'order'];
                      _context11.t7 = ['desc', 'desc'];
                      return _context11.abrupt("return", (0, _context11.t0)(_context11.t5, _context11.t6, _context11.t7).map(function (e) {
                        delete e.order;
                        return e;
                      }));

                    case 16:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, _callee11);
            }))();
            return _context12.abrupt("return", cache[address]);

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _getDsrEventHistory.apply(this, arguments);
}