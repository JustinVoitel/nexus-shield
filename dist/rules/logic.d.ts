import { ArgsValue, GetGen, RootValue } from '@nexus/schema/dist/core';
import { GraphQLResolveInfo } from 'graphql';
import { ShieldPluginOptions } from '../config';
import { ShieldContext, ShieldRule, ShieldRuleResult } from './interface';
export declare class LogicRule<TypeName extends string, FieldName extends string> implements ShieldRule<TypeName, FieldName> {
    protected rules: ShieldRule<TypeName, FieldName>[];
    constructor(rules: ShieldRule<TypeName, FieldName>[]);
    /**
     * By default logic rule resolves to false.
     */
    resolve(_root: RootValue<TypeName>, _args: ArgsValue<TypeName, FieldName>, _ctx: GetGen<'context'> & ShieldContext, _info: GraphQLResolveInfo, _options: ShieldPluginOptions): Promise<ShieldRuleResult>;
    /**
     * Evaluates all the rules.
     */
    evaluate(root: RootValue<TypeName>, args: ArgsValue<TypeName, FieldName>, ctx: GetGen<'context'> & ShieldContext, info: GraphQLResolveInfo, options: ShieldPluginOptions): Promise<PromiseSettledResult<ShieldRuleResult>[]>;
}
