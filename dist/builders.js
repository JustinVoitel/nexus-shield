"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partial = exports.generic = exports.deny = exports.allow = exports.not = exports.or = exports.race = exports.chain = exports.and = exports.ruleType = exports.rule = void 0;
const rules_1 = require("./rules");
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
exports.rule = (options) => (func) => {
    options = options || {};
    return new rules_1.BaseRule(options, func);
};
exports.ruleType = (config) => {
    return new rules_1.BaseRule(config, config.resolve);
};
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for the and operation.
 *
 */
exports.and = (...rules) => {
    return new rules_1.RuleAnd(rules);
};
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for the chain operation.
 *
 */
exports.chain = (...rules) => {
    return new rules_1.RuleChain(rules);
};
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for the race operation.
 *
 */
exports.race = (...rules) => {
    return new rules_1.RuleRace(rules);
};
/**
 *
 * @param rules
 *
 * Logical operator or serves as a wrapper for the or operation.
 *
 */
exports.or = (...rules) => {
    return new rules_1.RuleOr(rules);
};
/**
 *
 * @param rule
 *
 * Logical operator not serves as a wrapper for the not operation.
 *
 */
exports.not = (rule) => {
    return new rules_1.RuleNot(rule);
};
/**
 *
 * Allow queries.
 *
 */
exports.allow = new rules_1.RuleTrue();
/**
 *
 * Deny queries.
 *
 */
exports.deny = new rules_1.RuleFalse();
/**
 *
 * Helper for generic rules
 *
 */
exports.generic = (rule) => () => rule;
/**
 *
 * Helper for partial rules
 *
 */
exports.partial = (rule) => () => rule;
//# sourceMappingURL=builders.js.map