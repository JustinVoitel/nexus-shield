import { RuleFalse, RuleTrue, ShieldCache, ShieldRule, ShieldRuleFunction, ShieldRuleOptions } from './rules';
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
export declare const rule: (options?: ShieldRuleOptions | undefined) => <TypeName extends string, FieldName extends string>(func: ShieldRuleFunction<TypeName, FieldName>) => ShieldRule<TypeName, FieldName>;
/**
 *
 * @param config
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
declare type ShieldRuleConfig<TypeName extends string, FieldName extends string> = {
    type?: TypeName;
    name?: string;
    cache?: ShieldCache;
    resolve: ShieldRuleFunction<TypeName, FieldName>;
};
export declare const ruleType: <TypeName extends string, FieldName extends string>(config: ShieldRuleConfig<TypeName, FieldName>) => ShieldRule<TypeName, FieldName>;
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for the and operation.
 *
 */
export declare const and: <TypeName extends string, FieldName extends string>(...rules: ShieldRule<TypeName, FieldName>[]) => ShieldRule<TypeName, FieldName>;
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for the chain operation.
 *
 */
export declare const chain: <TypeName extends string, FieldName extends string>(...rules: ShieldRule<TypeName, FieldName>[]) => ShieldRule<TypeName, FieldName>;
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for the race operation.
 *
 */
export declare const race: <TypeName extends string, FieldName extends string>(...rules: ShieldRule<TypeName, FieldName>[]) => ShieldRule<TypeName, FieldName>;
/**
 *
 * @param rules
 *
 * Logical operator or serves as a wrapper for the or operation.
 *
 */
export declare const or: <TypeName extends string, FieldName extends string>(...rules: ShieldRule<TypeName, FieldName>[]) => ShieldRule<TypeName, FieldName>;
/**
 *
 * @param rule
 *
 * Logical operator not serves as a wrapper for the not operation.
 *
 */
export declare const not: <TypeName extends string, FieldName extends string>(rule: ShieldRule<TypeName, FieldName>) => ShieldRule<TypeName, FieldName>;
/**
 *
 * Allow queries.
 *
 */
export declare const allow: RuleTrue;
/**
 *
 * Deny queries.
 *
 */
export declare const deny: RuleFalse;
/**
 *
 * Helper for generic rules
 *
 */
export declare const generic: (rule: ShieldRule<any, any>) => <TypeName extends string, FieldName extends string>() => ShieldRule<TypeName, FieldName>;
/**
 *
 * Helper for partial rules
 *
 */
export declare const partial: <TypeName extends string>(rule: ShieldRule<TypeName, any>) => <T extends TypeName, FieldName extends string>() => ShieldRule<TypeName, FieldName>;
export {};
