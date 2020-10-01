import { ShieldCache, } from './interface';
export class BaseRule {
    constructor(options, func) {
        this.name = options.name || Math.random().toString();
        this.cache = options.cache || ShieldCache.NO_CACHE;
        this.func = func;
    }
    async resolve(root, args, ctx, info, options) {
        switch (this.cache) {
            case ShieldCache.STRICT: {
                const key = options.hashFunction({ root, args });
                return this.cacheable(`${this.name}-${key}`)(root, args, ctx, info);
            }
            case ShieldCache.CONTEXTUAL: {
                return this.cacheable(this.name)(root, args, ctx, info);
            }
            case ShieldCache.NO_CACHE: {
                return this.func(root, args, ctx, info);
            }
        }
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
//# sourceMappingURL=base.js.map