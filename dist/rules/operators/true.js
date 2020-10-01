import { LogicRule } from '../logic';
export class RuleTrue extends LogicRule {
    constructor() {
        super([]);
    }
    /**
     *
     * Always true.
     *
     */
    async resolve() {
        return true;
    }
}
//# sourceMappingURL=true.js.map