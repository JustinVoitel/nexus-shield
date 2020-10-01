import { LogicRule } from '../logic';
export class RuleRace extends LogicRule {
    constructor(rules) {
        super(rules);
    }
    /**
     * Makes sure that at least one of them resolved to true.
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
    /**
     * Evaluates all the rules.
     */
    async evaluate(root, args, ctx, info, options) {
        return iterate(this.rules);
        async function iterate([rule, ...otherRules]) {
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
        }
    }
}
//# sourceMappingURL=race.js.map