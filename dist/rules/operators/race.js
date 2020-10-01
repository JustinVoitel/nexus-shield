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
exports.RuleRace = void 0;
const logic_1 = require("../logic");
class RuleRace extends logic_1.LogicRule {
    constructor(rules) {
        super(rules);
    }
    /**
     * Makes sure that at least one of them resolved to true.
     */
    resolve(root, args, ctx, info, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.evaluate(root, args, ctx, info, options);
            let error;
            for (const res of result) {
                if (res.status === 'rejected') {
                    error = error || res.reason;
                }
                else if (res.value === true) {
                    return true;
                }
            }
            if (error)
                throw error;
            return false;
        });
    }
    /**
     * Evaluates all the rules.
     */
    evaluate(root, args, ctx, info, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return iterate(this.rules);
            function iterate([rule, ...otherRules]) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (rule === undefined)
                        return [];
                    return rule.resolve(root, args, ctx, info, options).then((res) => {
                        if (res === true)
                            return [{ status: 'fulfilled', value: res }];
                        return iterate(otherRules).then((ress) => [
                            { status: 'fulfilled', value: res },
                            ...ress,
                        ]);
                    }, (err) => {
                        return iterate(otherRules).then((ress) => [
                            { status: 'rejected', reason: err },
                            ...ress,
                        ]);
                    });
                });
            }
        });
    }
}
exports.RuleRace = RuleRace;
//# sourceMappingURL=race.js.map