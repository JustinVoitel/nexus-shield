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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleAnd = void 0;
const logic_1 = require("../logic");
class RuleAnd extends logic_1.LogicRule {
    constructor(rules) {
        super(rules);
    }
    /**
     * Makes sure that all of them have resolved to true.
     */
    resolve(root, args, ctx, info, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.evaluate(root, args, ctx, info, options);
            for (const res of result) {
                if (res.status === 'rejected') {
                    throw res.reason;
                }
                else if (res.value === false) {
                    return false;
                }
            }
            return true;
        });
    }
}
exports.RuleAnd = RuleAnd;
//# sourceMappingURL=and.js.map