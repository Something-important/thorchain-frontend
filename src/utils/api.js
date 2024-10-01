"use strict";
// midgardAPI.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.midgardAPI = exports.fetchLastBlock = exports.fetchBalance = exports.fetchStats = exports.fetchTHORNameDetails = exports.fetchSaverDetails = exports.fetchMemberDetails = exports.fetchMembers = exports.fetchActions = exports.fetchNetwork = exports.fetchNodes = exports.fetchLiquidityChangesHistory = exports.fetchTVLHistory = exports.fetchSwapsHistory = exports.fetchEarningsHistory = exports.fetchRUNEPoolHistory = exports.fetchSaversHistory = exports.fetchDepthHistory = exports.fetchPoolStats = exports.fetchPool = exports.fetchPools = exports.fetchKnownPools = exports.fetchChurns = exports.fetchHealth = void 0;
var API_BASE_URL = 'https://midgard.ninerealms.com/v2';
function fetchFromAPI(endpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(API_BASE_URL).concat(endpoint), {
                        next: { revalidate: 60 }
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("API error: ".concat(response.status, " ").concat(response.statusText));
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
function fetchHealth() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/health')];
        });
    });
}
exports.fetchHealth = fetchHealth;
function fetchChurns() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/churns')];
        });
    });
}
exports.fetchChurns = fetchChurns;
function fetchKnownPools() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/knownpools')];
        });
    });
}
exports.fetchKnownPools = fetchKnownPools;
function fetchPools() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/pools')];
        });
    });
}
exports.fetchPools = fetchPools;
function fetchPool(asset) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI("/pool/".concat(asset))];
        });
    });
}
exports.fetchPool = fetchPool;
function fetchPoolStats(asset) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI("/pool/".concat(asset, "/stats"))];
        });
    });
}
exports.fetchPoolStats = fetchPoolStats;
function fetchDepthHistory(pool) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI("/history/depths/".concat(pool))];
        });
    });
}
exports.fetchDepthHistory = fetchDepthHistory;
function fetchSaversHistory(pool) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI("/history/savers/".concat(pool))];
        });
    });
}
exports.fetchSaversHistory = fetchSaversHistory;
function fetchRUNEPoolHistory() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/history/runepool')];
        });
    });
}
exports.fetchRUNEPoolHistory = fetchRUNEPoolHistory;
function fetchEarningsHistory() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/history/earnings')];
        });
    });
}
exports.fetchEarningsHistory = fetchEarningsHistory;
function fetchSwapsHistory() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/history/swaps')];
        });
    });
}
exports.fetchSwapsHistory = fetchSwapsHistory;
function fetchTVLHistory() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/history/tvl')];
        });
    });
}
exports.fetchTVLHistory = fetchTVLHistory;
function fetchLiquidityChangesHistory() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/history/liquidity_changes')];
        });
    });
}
exports.fetchLiquidityChangesHistory = fetchLiquidityChangesHistory;
function fetchNodes() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/nodes')];
        });
    });
}
exports.fetchNodes = fetchNodes;
function fetchNetwork() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/network')];
        });
    });
}
exports.fetchNetwork = fetchNetwork;
function fetchActions() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/actions')];
        });
    });
}
exports.fetchActions = fetchActions;
function fetchMembers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/members')];
        });
    });
}
exports.fetchMembers = fetchMembers;
function fetchMemberDetails(address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI("/member/".concat(address))];
        });
    });
}
exports.fetchMemberDetails = fetchMemberDetails;
function fetchSaverDetails(address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI("/saver/".concat(address))];
        });
    });
}
exports.fetchSaverDetails = fetchSaverDetails;
function fetchTHORNameDetails(name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI("/thorname/lookup/".concat(name))];
        });
    });
}
exports.fetchTHORNameDetails = fetchTHORNameDetails;
function fetchStats() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/stats')];
        });
    });
}
exports.fetchStats = fetchStats;
function fetchBalance(address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI("/balance/".concat(address))];
        });
    });
}
exports.fetchBalance = fetchBalance;
function fetchLastBlock() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchFromAPI('/lastblock')];
        });
    });
}
exports.fetchLastBlock = fetchLastBlock;
exports.midgardAPI = {
    fetchHealth: fetchHealth,
    fetchChurns: fetchChurns,
    fetchKnownPools: fetchKnownPools,
    fetchPools: fetchPools,
    fetchPool: fetchPool,
    fetchPoolStats: fetchPoolStats,
    fetchDepthHistory: fetchDepthHistory,
    fetchSaversHistory: fetchSaversHistory,
    fetchRUNEPoolHistory: fetchRUNEPoolHistory,
    fetchEarningsHistory: fetchEarningsHistory,
    fetchSwapsHistory: fetchSwapsHistory,
    fetchTVLHistory: fetchTVLHistory,
    fetchLiquidityChangesHistory: fetchLiquidityChangesHistory,
    fetchNodes: fetchNodes,
    fetchNetwork: fetchNetwork,
    fetchActions: fetchActions,
    fetchMembers: fetchMembers,
    fetchMemberDetails: fetchMemberDetails,
    fetchSaverDetails: fetchSaverDetails,
    fetchTHORNameDetails: fetchTHORNameDetails,
    fetchStats: fetchStats,
    fetchBalance: fetchBalance,
    fetchLastBlock: fetchLastBlock
};
exports.default = exports.midgardAPI;
