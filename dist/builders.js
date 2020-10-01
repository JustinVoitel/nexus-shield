import { BaseRule, RuleAnd, RuleChain, RuleFalse, RuleNot, RuleOr, RuleRace, RuleTrue, } from './rules';
/**
 *
 * @param options
 *
 * Wraps a function into a BaseRule class.
 *
 * 1.
 * const auth = rule()(async (parent, args, ctx, info) => {
 *  return true
 * })
 *
 * 2.
 * const auth = rule({
 *  name: 'name',
 *  cache: ShieldCache.NO_CACHE,
 * })(async (parent, args, ctx, info) => {
 *  return true
 * })
 *
 */
export const rule = (options) => (func) => {
    options = options || {};
    return new BaseRule(options, func);
};
export const ruleType = (config) => {
    return new BaseRule(config, config.resolve);
};
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for the and operation.
 *
 */
export const and = (...rules) => {
    return new RuleAnd(rules);
};
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for the chain operation.
 *
 */
export const chain = (...rules) => {
    return new RuleChain(rules);
};
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for the race operation.
 *
 */
export const race = (...rules) => {
    return new RuleRace(rules);
};
/**
 *
 * @param rules
 *
 * Logical operator or serves as a wrapper for the or operation.
 *
 */
export const or = (...rules) => {
    return new RuleOr(rules);
};
/**
 *
 * @param rule
 *
 * Logical operator not serves as a wrapper for the not operation.
 *
 */
export const not = (rule) => {
    return new RuleNot(rule);
};
/**
 *
 * Allow queries.
 *
 */
export const allow = new RuleTrue();
/**
 *
 * Deny queries.
 *
 */
export const deny = new RuleFalse();
/**
 *
 * Helper for generic rules
 *
 */
export const generic = (rule) => () => rule;
/**
 *
 * Helper for partial rules
 *
 */
export const partial = (rule) => () => rule;
//# sourceMappingURL=builders.js.map