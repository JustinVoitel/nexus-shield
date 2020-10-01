export class LogicRule {
    constructor(rules) {
        this.rules = rules;
    }
    /**
     * By default logic rule resolves to false.
     */
    async resolve(_root, _args, _ctx, _info, _options) {
        return false;
    }
    /**
     * Evaluates all the rules.
     */
    async evaluate(root, args, ctx, info, options) {
        const tasks = this.rules.map((rule) => rule.resolve(root, args, ctx, info, options));
        return Promise.allSettled(tasks);
    }
}
//# sourceMappingURL=logic.js.map