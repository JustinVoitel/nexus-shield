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
exports.LogicRule = void 0;
class LogicRule {
    constructor(rules) {
        this.rules = rules;
    }
    /**
     * By default logic rule resolves to false.
     */
    resolve(_root, _args, _ctx, _info, _options) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    /**
     * Evaluates all the rules.
     */
    evaluate(root, args, ctx, info, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = this.rules.map((rule) => rule.resolve(root, args, ctx, info, options));
            return Promise.allSettled(tasks);
        });
    }
}
exports.LogicRule = LogicRule;
//# sourceMappingURL=logic.js.map