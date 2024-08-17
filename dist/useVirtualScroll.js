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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * useVirtualScroll: A custom React hook for implementing virtual scrolling
 *
 * This hook manages the loading and display of items in a scrollable container,
 * fetching new items as the user scrolls and approaching the end of the current content.
 *
 * @template T - The type of items being scrolled, must extend the Item interface
 * @param {UseVirtualScrollProps<T>} props - Configuration options for the virtual scroll
 * @param {function} props.fetchItems - Function to fetch more items. It should accept a page number and items per page, and return a Promise resolving to an array of items.
 * @param {T[]} [props.initialItems=[]] - Initial items to populate the list. Use this if you have items to display immediately.
 * @param {number} [props.itemsPerPage=10] - Number of items to fetch in each batch. Adjust this based on your UI and performance needs.
 * @param {number} [props.threshold=200] - Distance from bottom of the container (in pixels) at which to trigger loading more items.
 * @returns {UseVirtualScrollResult<T>} An object containing the scroll state and ref
 */
function useVirtualScroll(_a) {
    var _this = this;
    var fetchItems = _a.fetchItems, _b = _a.initialItems, initialItems = _b === void 0 ? [] : _b, _c = _a.itemsPerPage, itemsPerPage = _c === void 0 ? 10 : _c, _d = _a.threshold, threshold = _d === void 0 ? 200 : _d;
    var _e = (0, react_1.useState)(initialItems), allItems = _e[0], setAllItems = _e[1];
    var _f = (0, react_1.useState)([]), newLoadedItems = _f[0], setNewLoadedItems = _f[1];
    var _g = (0, react_1.useState)(false), isLoading = _g[0], setIsLoading = _g[1];
    var _h = (0, react_1.useState)(1), page = _h[0], setPage = _h[1];
    var containerRef = (0, react_1.useRef)(null);
    var loadMoreItems = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var newItems_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isLoading)
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetchItems(page, itemsPerPage)];
                case 2:
                    newItems_1 = _a.sent();
                    setAllItems(function (prevItems) { return __spreadArray(__spreadArray([], prevItems, true), newItems_1, true); });
                    setNewLoadedItems(newItems_1);
                    setPage(function (prevPage) { return prevPage + 1; });
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching items:", error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [fetchItems, page, isLoading, itemsPerPage]);
    var handleScroll = (0, react_1.useCallback)(function () {
        if (!containerRef.current)
            return;
        var _a = containerRef.current, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - threshold && !isLoading) {
            loadMoreItems();
        }
    }, [isLoading, loadMoreItems, threshold]);
    (0, react_1.useEffect)(function () {
        var container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return function () { return container.removeEventListener("scroll", handleScroll); };
        }
    }, [handleScroll]);
    (0, react_1.useEffect)(function () {
        if (initialItems.length === 0) {
            loadMoreItems();
        }
    }, []);
    return {
        allItems: allItems,
        newLoadedItems: newLoadedItems,
        isLoading: isLoading,
        containerRef: containerRef,
    };
}
exports.default = useVirtualScroll;
