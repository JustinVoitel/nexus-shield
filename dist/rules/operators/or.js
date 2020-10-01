import { LogicRule } from '../logic';
export class RuleOr extends LogicRule {
    constructor(rules) {
        super(rules);
    }
    /**
     * Makes sure that at least one of them has evaluated to true.
     */
    async resolve(root, args, ctx, info, options) {
        const result = await this.evaluate(root, args, ctx, info, options);
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
    }
}
//# sourceMappingURL=or.js.map