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
exports.BaseRule = void 0;
const interface_1 = require("./interface");
class BaseRule {
    constructor(options, func) {
        this.name = options.name || Math.random().toString();
        this.cache = options.cache || interface_1.ShieldCache.NO_CACHE;
        this.func = func;
    }
    resolve(root, args, ctx, info, options) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.cache) {
                case interface_1.ShieldCache.STRICT: {
                    const key = options.hashFunction({ root, args });
                    return this.cacheable(`${this.name}-${key}`)(root, args, ctx, info);
                }
                case interface_1.ShieldCache.CONTEXTUAL: {
                    return this.cacheable(this.name)(root, args, ctx, info);
                }
                case interface_1.ShieldCache.NO_CACHE: {
                    return this.func(root, args, ctx, info);
                }
            }
        });
    }
    /**
     * Writes or reads result from cache.
     *
     * @param key
     */
    cacheable(key) {
        return (root, args, ctx, info) => {
            if (!ctx._shield.cache[key]) {
                ctx._shield.cache[key] = this.func(root, args, ctx, info);
            }
            return ctx._shield.cache[key];
        };
    }
}
exports.BaseRule = BaseRule;
//# sourceMappingURL=base.js.map