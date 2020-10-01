import { ShieldRuleResult } from '../interface';
import { LogicRule } from '../logic';
export declare class RuleFalse extends LogicRule<any, any> {
    constructor();
    /**
     *
     * Always false.
     *
     */
    resolve(): Promise<ShieldRuleResult>;
}
