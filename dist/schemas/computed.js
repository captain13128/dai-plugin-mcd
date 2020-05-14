"use strict";

import {MMCR} from "../../src";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.proxyOwner = exports.systemCollateralization = exports.collateralTypeCollateralization = exports.collateralDebt = exports.userVaultsData = exports.userVaultsList = exports.savings = exports.allowance = exports.balance = exports.totalDaiLockedInDsr = exports.daiLockedInDsr = exports.vault = exports.collateralTypesData = exports.collateralTypeData = exports.collateralAvailableValue = exports.collateralAvailableAmount = exports.minSafeCollateralAmount = exports.daiAvailable = exports.liquidationPrice = exports.collateralizationRatio = exports.debtValue = exports.collateralValue = exports.collateralAmount = exports.vaultCollateralAndDebt = exports.vaultExternalOwner = exports.vaultTypeAndAddress = exports.defaultCollateralTypesPrices = exports.collateralTypesPrices = exports.collateralTypePrice = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _currency = require("@makerdao/currency");

var _math = require("../math");

var _ = require("../");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _constants = require("./_constants");

var _validators = require("./_validators");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Invalid address for proxyOwner: ", ""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Invalid address for userVaultsList: ", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Invalid address for savings: ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Invalid address for daiLockedInDsr: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var collateralTypePrice = {
  generate: function generate(collateralTypeName) {
    return {
      dependencies: [[_constants.RATIO_DAI_USD], [_constants.PRICE_WITH_SAFETY_MARGIN, collateralTypeName], [_constants.LIQUIDATION_RATIO, collateralTypeName]],
      computed: function computed(ratioDaiUsd, priceWithSafetyMargin, liquidationRatio) {
        var _collateralTypeName$s = collateralTypeName.split('-'),
            _collateralTypeName$s2 = (0, _slicedToArray2["default"])(_collateralTypeName$s, 1),
            symbol = _collateralTypeName$s2[0];

        var currency = (0, _currency.createCurrency)(symbol);
        var ratio = (0, _currency.createCurrencyRatio)(_.USD, currency);
        var price = priceWithSafetyMargin.times(ratioDaiUsd.toNumber()).times(liquidationRatio.toNumber());
        return ratio(price);
      }
    };
  }
};
exports.collateralTypePrice = collateralTypePrice;
var collateralTypesPrices = {
  generate: function generate(types) {
    return {
      dependencies: function dependencies() {
        return types.map(function (collateralTypeName) {
          return [_constants.COLLATERAL_TYPE_PRICE, collateralTypeName];
        });
      },
      computed: function computed() {
        for (var _len = arguments.length, prices = new Array(_len), _key = 0; _key < _len; _key++) {
          prices[_key] = arguments[_key];
        }

        return prices;
      }
    };
  }
};
exports.collateralTypesPrices = collateralTypesPrices;
var defaultCollateralTypesPrices = {
  generate: function generate() {
    return {
      dependencies: function dependencies() {
        return _.defaultCdpTypes.map(function (_ref) {
          var collateralTypeName = _ref.ilk;
          return [_constants.COLLATERAL_TYPE_PRICE, collateralTypeName];
        });
      },
      computed: function computed() {
        for (var _len2 = arguments.length, prices = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          prices[_key2] = arguments[_key2];
        }

        return prices;
      }
    };
  }
};
exports.defaultCollateralTypesPrices = defaultCollateralTypesPrices;
var vaultTypeAndAddress = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.VAULT_TYPE, id], [_constants.VAULT_ADDRESS, id]],
      computed: function computed(vaultType, vaultAddress) {
        return [vaultType, vaultAddress];
      }
    };
  }
};
exports.vaultTypeAndAddress = vaultTypeAndAddress;
var vaultExternalOwner = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.PROXY_OWNER, [_constants.VAULT_OWNER, id]], [_constants.VAULT_OWNER, id]],
      computed: function computed(owner) {
        return owner;
      }
    };
  }
};
exports.vaultExternalOwner = vaultExternalOwner;
var vaultCollateralAndDebt = {
  generate: function generate(vaultType, vaultAddress) {
    return {
      dependencies: [[_constants.ENCUMBERED_COLLATERAL, vaultType, vaultAddress], [_constants.ENCUMBERED_DEBT, vaultType, vaultAddress]],
      computed: function computed(encumberedCollateral, encumberedDebt) {
        return [encumberedCollateral, encumberedDebt];
      }
    };
  }
}; // TODO This should also account for unencumbered collateral which is collateral on the
// join adapter

exports.vaultCollateralAndDebt = vaultCollateralAndDebt;
var collateralAmount = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.VAULT_TYPE, id], [_constants.ENCUMBERED_COLLATERAL, [_constants.VAULT_TYPE, id], [_constants.VAULT_ADDRESS, id]]],
      computed: function computed(vaultType, encumberedCollateral) {
        var _vaultType$split = vaultType.split('-'),
            _vaultType$split2 = (0, _slicedToArray2["default"])(_vaultType$split, 1),
            symbol = _vaultType$split2[0];

        var currency = (0, _currency.createCurrency)(symbol);
        return currency(encumberedCollateral);
      }
    };
  }
};
exports.collateralAmount = collateralAmount;
var collateralValue = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.COLLATERAL_TYPE_PRICE, [_constants.VAULT_TYPE, id]], [_constants.COLLATERAL_AMOUNT, id]],
      computed: function computed(collateralTypePrice, collateralAmount) {
        return (0, _math.collateralValue)(collateralAmount, collateralTypePrice);
      }
    };
  }
};
exports.collateralValue = collateralValue;
var debtValue = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.ENCUMBERED_DEBT, [_constants.VAULT_TYPE, id], [_constants.VAULT_ADDRESS, id]], [_constants.DEBT_SCALING_FACTOR, [_constants.VAULT_TYPE, id]]],
      computed: function computed(encumberedDebt, debtScalingFactor) {
        return (0, _.MMCR)(encumberedDebt).times(debtScalingFactor);
      }
    };
  }
};
exports.debtValue = debtValue;
var collateralizationRatio = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.COLLATERAL_VALUE, id], [_constants.DEBT_VALUE, id]],
      computed: function computed(collateralValue, debtValue) {
        return (0, _math.collateralizationRatio)(collateralValue, debtValue);
      }
    };
  }
};
exports.collateralizationRatio = collateralizationRatio;
var liquidationPrice = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.COLLATERAL_AMOUNT, id], [_constants.DEBT_VALUE, id], [_constants.LIQUIDATION_RATIO, [_constants.VAULT_TYPE, id]]],
      computed: function computed(collateralAmount, debtValue, liquidationRatio) {
        return (0, _math.liquidationPrice)(collateralAmount, debtValue, liquidationRatio);
      }
    };
  }
};
exports.liquidationPrice = liquidationPrice;
var daiAvailable = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.COLLATERAL_VALUE, id], [_constants.DEBT_VALUE, id], [_constants.LIQUIDATION_RATIO, [_constants.VAULT_TYPE, id]]],
      computed: function computed(collateralValue, debtValue, liquidationRatio) {
        return (0, _math.daiAvailable)(collateralValue, debtValue, liquidationRatio);
      }
    };
  }
};
exports.daiAvailable = daiAvailable;
var minSafeCollateralAmount = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.DEBT_VALUE, id], [_constants.LIQUIDATION_RATIO, [_constants.VAULT_TYPE, id]], [_constants.COLLATERAL_TYPE_PRICE, [_constants.VAULT_TYPE, id]]],
      computed: function computed(debtValue, liquidationRatio, price) {
        return (0, _math.minSafeCollateralAmount)(debtValue, liquidationRatio, price);
      }
    };
  }
};
exports.minSafeCollateralAmount = minSafeCollateralAmount;
var collateralAvailableAmount = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.COLLATERAL_AMOUNT, id], [_constants.MIN_SAFE_COLLATERAL_AMOUNT, id]],
      computed: function computed(collateralAmount, minSafeCollateralAmount) {
        if (minSafeCollateralAmount.toBigNumber().gt(collateralAmount.toBigNumber())) {
          return (0, _currency.createCurrency)(collateralAmount.symbol)(0);
        } else {
          return collateralAmount.minus(minSafeCollateralAmount);
        }
      }
    };
  }
};
exports.collateralAvailableAmount = collateralAvailableAmount;
var collateralAvailableValue = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.COLLATERAL_AVAILABLE_AMOUNT, id], [_constants.COLLATERAL_TYPE_PRICE, [_constants.VAULT_TYPE, id]]],
      computed: function computed(collateralAvailableAmount, collateralTypePrice) {
        return (0, _math.collateralValue)(collateralAvailableAmount, collateralTypePrice);
      }
    };
  }
};
exports.collateralAvailableValue = collateralAvailableValue;
var collateralTypeData = {
  generate: function generate(collateralTypeName) {
    return {
      dependencies: [[_constants.COLLATERAL_TYPE_PRICE, collateralTypeName], [_constants.ANNUAL_STABILITY_FEE, collateralTypeName], [_constants.LIQUIDATION_PENALTY, collateralTypeName], [_constants.LIQUIDATION_RATIO, collateralTypeName], [_constants.PRICE_WITH_SAFETY_MARGIN, collateralTypeName], [_constants.DEBT_FLOOR, collateralTypeName]],
      computed: function computed(collateralTypePrice, annualStabilityFee, liquidationPenalty, liquidationRatio, priceWithSafetyMargin, debtFloor) {
        return {
          symbol: collateralTypeName,
          collateralTypePrice: collateralTypePrice,
          annualStabilityFee: annualStabilityFee,
          liquidationRatio: liquidationRatio,
          liquidationPenalty: liquidationPenalty,
          priceWithSafetyMargin: priceWithSafetyMargin,
          debtFloor: debtFloor,
          calculateCollateralizationRatio: function calculateCollateralizationRatio(collateralAmount, debtValue) {
            return (0, _math.collateralizationRatio)(this.collateralTypePrice.times(collateralAmount), debtValue).times(100).toNumber();
          },
          calculateliquidationPrice: function calculateliquidationPrice(collateralAmount, debtValue) {
            return (0, _math.liquidationPrice)(collateralAmount, debtValue, this.liquidationRatio);
          },
          calculateMaxDai: function calculateMaxDai(collateralAmount) {
            return priceWithSafetyMargin.times(collateralAmount);
          }
        };
      }
    };
  }
};
exports.collateralTypeData = collateralTypeData;
var collateralTypesData = {
  generate: function generate(types) {
    return {
      dependencies: function dependencies() {
        return types.map(function (collateralTypeName) {
          return [_constants.COLLATERAL_TYPE_DATA, collateralTypeName];
        });
      },
      computed: function computed() {
        for (var _len3 = arguments.length, collateralTypes = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          collateralTypes[_key3] = arguments[_key3];
        }

        return collateralTypes;
      }
    };
  }
};
exports.collateralTypesData = collateralTypesData;
var vault = {
  generate: function generate(id) {
    return {
      dependencies: [[_constants.VAULT_TYPE, id], [_constants.VAULT_ADDRESS, id], [_constants.VAULT_OWNER, id], [_constants.VAULT_EXTERNAL_OWNER, id], [_constants.ENCUMBERED_COLLATERAL, [_constants.VAULT_TYPE, id], [_constants.VAULT_ADDRESS, id]], [_constants.ENCUMBERED_DEBT, [_constants.VAULT_TYPE, id], [_constants.VAULT_ADDRESS, id]], [_constants.COLLATERAL_TYPE_PRICE, [_constants.VAULT_TYPE, id]], [_constants.DEBT_VALUE, id], [_constants.COLLATERALIZATION_RATIO, id], [_constants.COLLATERAL_AMOUNT, id], [_constants.COLLATERAL_VALUE, id], [_constants.LIQUIDATION_PRICE, id], [_constants.DAI_AVAILABLE, id], [_constants.COLLATERAL_AVAILABLE_AMOUNT, id], [_constants.COLLATERAL_AVAILABLE_VALUE, id], [_constants.UNLOCKED_COLLATERAL, [_constants.VAULT_TYPE, id], [_constants.VAULT_ADDRESS, id]], [_constants.LIQUIDATION_RATIO, [_constants.VAULT_TYPE, id]], [_constants.LIQUIDATION_PENALTY, [_constants.VAULT_TYPE, id]], [_constants.ANNUAL_STABILITY_FEE, [_constants.VAULT_TYPE, id]], [_constants.DEBT_FLOOR, [_constants.VAULT_TYPE, id]], [_constants.MIN_SAFE_COLLATERAL_AMOUNT, id]],
      computed: function computed(vaultType, vaultAddress, ownerAddress, externalOwnerAddress, encumberedCollateral, encumberedDebt, collateralTypePrice, debtValue, collateralizationRatio, collateralAmount, collateralValue, liquidationPrice, daiAvailable, collateralAvailableAmount, collateralAvailableValue, unlockedCollateral, liquidationRatio, liquidationPenalty, annualStabilityFee, debtFloor, minSafeCollateralAmount) {
        return {
          id: parseInt(id),
          vaultType: vaultType,
          vaultAddress: vaultAddress,
          ownerAddress: ownerAddress,
          externalOwnerAddress: externalOwnerAddress,
          encumberedCollateral: encumberedCollateral,
          encumberedDebt: encumberedDebt,
          collateralTypePrice: collateralTypePrice,
          debtValue: debtValue,
          collateralizationRatio: collateralizationRatio,
          collateralAmount: collateralAmount,
          collateralValue: collateralValue,
          liquidationPrice: liquidationPrice,
          daiAvailable: daiAvailable,
          collateralAvailableAmount: collateralAvailableAmount,
          collateralAvailableValue: collateralAvailableValue,
          unlockedCollateral: unlockedCollateral,
          liquidationRatio: liquidationRatio,
          liquidationPenalty: liquidationPenalty,
          annualStabilityFee: annualStabilityFee,
          debtFloor: debtFloor,
          minSafeCollateralAmount: minSafeCollateralAmount,
          calculateLiquidationPrice: function calculateLiquidationPrice() {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref2$collateralAmoun = _ref2.collateralAmount,
                collateralAmount = _ref2$collateralAmoun === void 0 ? this.collateralAmount : _ref2$collateralAmoun,
                _ref2$debtValue = _ref2.debtValue,
                debtValue = _ref2$debtValue === void 0 ? this.debtValue : _ref2$debtValue,
                _ref2$liquidationRati = _ref2.liquidationRatio,
                liquidationRatio = _ref2$liquidationRati === void 0 ? this.liquidationRatio : _ref2$liquidationRati;

            if (!collateralAmount || !debtValue || !liquidationRatio) return;
            return (0, _math.liquidationPrice)(collateralAmount, debtValue, liquidationRatio);
          },
          calculateCollateralizationRatio: function calculateCollateralizationRatio() {
            var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref3$collateralValue = _ref3.collateralValue,
                collateralValue = _ref3$collateralValue === void 0 ? this.collateralValue : _ref3$collateralValue,
                _ref3$debtValue = _ref3.debtValue,
                debtValue = _ref3$debtValue === void 0 ? this.debtValue : _ref3$debtValue;

            if (!collateralValue || !debtValue) return;
            return (0, _math.collateralizationRatio)(collateralValue, debtValue).times(100).toNumber();
          }
        };
      }
    };
  },
  validate: {
    args: _validators.validateVaultId
  }
};
exports.vault = vault;
var daiLockedInDsr = {
  generate: function generate(address) {
    return {
      dependencies: [[_constants.SAVINGS_DAI, [_constants.PROXY_ADDRESS, address]], [_constants.SAVINGS_RATE_ACCUMULATOR]],
      computed: function computed(savingsDai, savingsRateAccumulator) {
        return (0, _.DSR_DAI)(savingsDai.times(savingsRateAccumulator));
      }
    };
  },
  validate: {
    args: (0, _validators.validateAddress)(_templateObject(), 'address')
  }
};
exports.daiLockedInDsr = daiLockedInDsr;
var totalDaiLockedInDsr = {
  generate: function generate() {
    return {
      dependencies: [[_constants.TOTAL_SAVINGS_DAI], [_constants.SAVINGS_RATE_ACCUMULATOR]],
      computed: function computed(totalSavingsDai, savingsRateAccumulator) {
        return (0, _.DSR_DAI)(totalSavingsDai.times(savingsRateAccumulator));
      }
    };
  }
};
exports.totalDaiLockedInDsr = totalDaiLockedInDsr;
var balance = {
  generate: function generate(symbol, address) {
    return {
      dependencies: function dependencies() {
        if (symbol === 'DSR-MCR') {
          return [[_constants.DAI_LOCKED_IN_DSR, address]];
        }

        return [[_constants.TOKEN_BALANCE, address, symbol]];
      },
      computed: function computed(v) {
        return v;
      }
    };
  }
};
exports.balance = balance;
var allowance = {
  generate: function generate(symbol, address) {
    return {
      dependencies: [symbol === 'ETH' ? [[_.ALLOWANCE_AMOUNT]] : [_constants.TOKEN_ALLOWANCE, address, [_constants.PROXY_ADDRESS, address], symbol]],
      computed: function computed(v) {
        return v.isEqualTo(_.ALLOWANCE_AMOUNT);
      }
    };
  }
};
exports.allowance = allowance;
var savings = {
  generate: function generate(address) {
    return {
      dependencies: [[_constants.ANNUAL_DAI_SAVINGS_RATE], [_constants.DAI_SAVINGS_RATE], [_constants.DATE_EARNINGS_LAST_ACCRUED], [_constants.DAI_LOCKED_IN_DSR, address], [_constants.PROXY_ADDRESS, address], [_constants.SAVINGS_RATE_ACCUMULATOR], [_constants.SAVINGS_DAI, [_constants.PROXY_ADDRESS, address]]],
      computed: function computed(annualDaiSavingsRate, daiSavingsRate, dateEarningsLastAccrued, daiLockedInDsr, proxyAddress, savingsRateAccumulator, savingsDai) {
        return {
          annualDaiSavingsRate: annualDaiSavingsRate,
          daiSavingsRate: daiSavingsRate,
          dateEarningsLastAccrued: dateEarningsLastAccrued,
          daiLockedInDsr: daiLockedInDsr,
          proxyAddress: proxyAddress,
          savingsRateAccumulator: savingsRateAccumulator,
          savingsDai: savingsDai
        };
      }
    };
  },
  validate: {
    args: (0, _validators.validateAddress)(_templateObject2(), 'address')
  }
};
exports.savings = savings;
var userVaultsList = {
  generate: function generate(address) {
    return {
      dependencies: function dependencies(_ref4) {
        var get = _ref4.get;
        var cdpManagerAddress = get('smartContract').getContractAddress('CDP_MANAGER');
        return [[_constants.USER_VAULT_IDS, cdpManagerAddress, [_constants.PROXY_ADDRESS, address]], [_constants.USER_VAULT_ADDRESSES, cdpManagerAddress, [_constants.PROXY_ADDRESS, address]], [_constants.USER_VAULT_TYPES, cdpManagerAddress, [_constants.PROXY_ADDRESS, address]]];
      },
      computed: function computed(ids, addresses, types) {
        return ids.reduce(function (acc, id, idx) {
          return [].concat((0, _toConsumableArray2["default"])(acc), [{
            vaultId: id,
            vaultAddress: addresses[idx],
            vaultType: types[idx]
          }]);
        }, []);
      }
    };
  },
  validate: {
    args: (0, _validators.validateAddress)(_templateObject3(), 'address')
  }
};
exports.userVaultsList = userVaultsList;
var userVaultsData = {
  generate: function generate(ids) {
    return {
      dependencies: ids.map(function (id) {
        return [_constants.VAULT, id];
      }),
      computed: function computed() {
        for (var _len4 = arguments.length, vaults = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          vaults[_key4] = arguments[_key4];
        }

        return vaults;
      }
    };
  }
};
exports.userVaultsData = userVaultsData;
var collateralDebt = {
  generate: function generate(collateralTypeName) {
    return {
      dependencies: [[_constants.TOTAL_ENCUMBERED_DEBT, collateralTypeName], [_constants.DEBT_SCALING_FACTOR, collateralTypeName]],
      computed: function computed(totalEncumberedDebt, debtScalingFactor) {
        return (0, _.MMCR)(totalEncumberedDebt).times(debtScalingFactor);
      }
    };
  }
};
exports.collateralDebt = collateralDebt;
var collateralTypeCollateralization = {
  generate: function generate(collateralTypeName) {
    var percentage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return {
      dependencies: [[_constants.COLLATERAL_DEBT, collateralTypeName], [_constants.COLLATERAL_TYPE_PRICE, collateralTypeName], [_constants.ADAPTER_BALANCE, collateralTypeName]],
      computed: function computed(debt, price, amount) {
        var collateral = (0, _math.collateralValue)(amount, price.toBigNumber());
        var ratio = (0, _math.collateralizationRatio)(collateral, debt.toBigNumber()).times(100);
        return percentage ? ratio : {
          collateralValue: collateral,
          debtValue: debt
        };
      }
    };
  }
};
exports.collateralTypeCollateralization = collateralTypeCollateralization;
var systemCollateralization = {
  generate: function generate(vaultTypes) {
    return {
      dependencies: vaultTypes.map(function (vaultType) {
        return [_constants.COLLATERAL_TYPE_COLLATERALIZATION, vaultType, false];
      }),
      computed: function computed() {
        for (var _len5 = arguments.length, collateralizationValues = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          collateralizationValues[_key5] = arguments[_key5];
        }

        var _collateralizationVal = collateralizationValues.reduce(function (acc, _ref5) {
          var collateralValue = _ref5.collateralValue,
              debtValue = _ref5.debtValue;
          return {
            totalCollateralValue: acc.totalCollateralValue.plus(collateralValue.toBigNumber()),
            totalDebtValue: acc.totalDebtValue.plus(debtValue.toBigNumber())
          };
        }, {
          totalCollateralValue: (0, _bignumber["default"])(0),
          totalDebtValue: (0, _bignumber["default"])(0)
        }),
            totalCollateralValue = _collateralizationVal.totalCollateralValue,
            totalDebtValue = _collateralizationVal.totalDebtValue;

        return (0, _math.collateralizationRatio)(totalCollateralValue, totalDebtValue).times(100);
      }
    };
  }
};
exports.systemCollateralization = systemCollateralization;
var proxyOwner = {
  generate: function generate(address) {
    return {
      dependencies: function dependencies(_ref6) {
        var get = _ref6.get;
        return [[/*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return get('smartContract').get('transactionManager').get('proxy').getOwner(address);

                case 3:
                  return _context.abrupt("return", _context.sent);

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", null);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 6]]);
        }))]];
      },
      computed: function computed(owner) {
        return owner;
      }
    };
  },
  validate: {
    args: (0, _validators.validateAddress)(_templateObject4(), 'address')
  }
};
exports.proxyOwner = proxyOwner;
var _default = {
  collateralTypePrice: collateralTypePrice,
  collateralTypesPrices: collateralTypesPrices,
  defaultCollateralTypesPrices: defaultCollateralTypesPrices,
  vaultTypeAndAddress: vaultTypeAndAddress,
  vaultExternalOwner: vaultExternalOwner,
  vaultCollateralAndDebt: vaultCollateralAndDebt,
  vault: vault,
  collateralAmount: collateralAmount,
  collateralValue: collateralValue,
  debtValue: debtValue,
  collateralizationRatio: collateralizationRatio,
  liquidationPrice: liquidationPrice,
  daiAvailable: daiAvailable,
  minSafeCollateralAmount: minSafeCollateralAmount,
  collateralAvailableAmount: collateralAvailableAmount,
  collateralAvailableValue: collateralAvailableValue,
  daiLockedInDsr: daiLockedInDsr,
  totalDaiLockedInDsr: totalDaiLockedInDsr,
  balance: balance,
  allowance: allowance,
  savings: savings,
  userVaultsList: userVaultsList,
  userVaultsData: userVaultsData,
  collateralDebt: collateralDebt,
  collateralTypeCollateralization: collateralTypeCollateralization,
  systemCollateralization: systemCollateralization,
  proxyOwner: proxyOwner,
  collateralTypeData: collateralTypeData,
  collateralTypesData: collateralTypesData
};
exports["default"] = _default;