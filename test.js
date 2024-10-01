"use strict";
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
var api_1 = require("./src/utils/api");
var fs_1 = require("fs");
function testMidgardAPI() {
    return __awaiter(this, void 0, void 0, function () {
        var output, failedFunctions, functions, _i, functions_1, _a, name_1, fn, result, error_1, finalOutput;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    output = [];
                    failedFunctions = [];
                    functions = [
                        { name: "Health", fn: api_1.default.fetchHealth },
                        { name: "Churns", fn: api_1.default.fetchChurns },
                        { name: "Known Pools", fn: api_1.default.fetchKnownPools },
                        { name: "Pools", fn: api_1.default.fetchPools },
                        { name: "Specific Pool (BTC.BTC)", fn: function () { return api_1.default.fetchPool('BTC.BTC'); } },
                        { name: "Pool Stats (BTC.BTC)", fn: function () { return api_1.default.fetchPoolStats('BTC.BTC'); } },
                        { name: "Depth History (BTC.BTC)", fn: function () { return api_1.default.fetchDepthHistory('BTC.BTC'); } },
                        { name: "Savers History (BTC.BTC)", fn: function () { return api_1.default.fetchSaversHistory('BTC.BTC'); } },
                        { name: "RUNE Pool History", fn: api_1.default.fetchRUNEPoolHistory },
                        { name: "Earnings History", fn: api_1.default.fetchEarningsHistory },
                        { name: "Swaps History", fn: api_1.default.fetchSwapsHistory },
                        { name: "TVL History", fn: api_1.default.fetchTVLHistory },
                        { name: "Liquidity Changes History", fn: api_1.default.fetchLiquidityChangesHistory },
                        { name: "Nodes", fn: api_1.default.fetchNodes },
                        { name: "Network", fn: api_1.default.fetchNetwork },
                        { name: "Members", fn: api_1.default.fetchMembers },
                        { name: "Stats", fn: api_1.default.fetchStats },
                        { name: "Balance", fn: function () { return api_1.default.fetchBalance('thor1txxlq3fkv5xnwkgc6kvl7t0g2cg4m6d76y6u9m'); } },
                    ];
                    _i = 0, functions_1 = functions;
                    _b.label = 1;
                case 1:
                    if (!(_i < functions_1.length)) return [3 /*break*/, 6];
                    _a = functions_1[_i], name_1 = _a.name, fn = _a.fn;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    console.log("Testing: ".concat(name_1));
                    return [4 /*yield*/, fn()];
                case 3:
                    result = _b.sent();
                    output.push("\n".concat(name_1, ":"));
                    output.push(JSON.stringify(result, null, 2));
                    console.log("".concat(name_1, ": Success"));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.error("".concat(name_1, ": Failed - ").concat(error_1.message));
                    failedFunctions.push(name_1);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    output.push("\n\nFailed functions:");
                    output.push(failedFunctions.join(", "));
                    finalOutput = output.join('\n');
                    fs_1.default.writeFile('midgard_api_test_results.txt', finalOutput, function (err) {
                        if (err) {
                            console.error("Error writing to file:", err);
                        }
                        else {
                            console.log("\nTest results saved to midgard_api_test_results.txt");
                        }
                        console.log("Failed functions:", failedFunctions.join(", "));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
testMidgardAPI();
