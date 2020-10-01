import { LogicRule } from '../logic';
export class RuleChain extends LogicRule {
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
    /**
     * Evaluates all the rules.
     */
    async evaluate(root, args, ctx, info, options) {
        return iterate(this.rules);
        async function iterate([rule, ...otherRules]) {
            if (rule === undefined)
                return [];
            return rule.resolve(root, args, ctx, info, options).then((res) => {
                if (res !== true)
                    return [{ status: 'fulfilled', value: res }];
                return iterate(otherRules).then((ress) => ress.concat([{ status: 'fulfilled', value: res }]));
            }, (err) => {
                return [{ status: 'rejected', reason: err }];
            });
        }
    }
}
//# sourceMappingURL=chain.js.map