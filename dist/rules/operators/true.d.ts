import { ShieldRuleResult } from '../interface';
import { LogicRule } from '../logic';
export declare class RuleTrue extends LogicRule<any, any> {
    constructor();
    /**
     *
     * Always true.
     *
     */
    resolve(): Promise<ShieldRuleResult>;
}
