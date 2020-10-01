import { LogicRule } from '../logic';
export class RuleNot extends LogicRule {
    constructor(rule) {
        super([rule]);
    }
    /**
     *
     * @param parent
     * @param args
     * @param ctx
     * @param info
     *
     * Negates the result.
     *
     */
    async resolve(root, args, ctx, info, options) {
        const [res] = await this.evaluate(root, args, ctx, info, options);
        if (res.status === 'rejected') {
            throw res.reason;
        }
        else {
            return !res.value;
        }
    }
}
//# sourceMappingURL=not.js.map