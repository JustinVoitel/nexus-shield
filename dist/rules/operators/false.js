import { LogicRule } from '../logic';
export class RuleFalse extends LogicRule {
    constructor() {
        super([]);
    }
    /**
     *
     * Always false.
     *
     */
    async resolve() {
        return false;
    }
}
//# sourceMappingURL=false.js.map