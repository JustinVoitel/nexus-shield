import { LogicRule } from '../logic';
export class RuleAnd extends LogicRule {
    constructor(rules) {
        super(rules);
    }
    /**
     * Makes sure that all of them have resolved to true.
     */
    async resolve(root, args, ctx, info, options) {
        const result = await this.evaluate(root, args, ctx, info, options);
        for (const res of result) {
            if (res.status === 'rejected') {
                throw res.reason;
            }
            else if (res.value === false) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=and.js.map