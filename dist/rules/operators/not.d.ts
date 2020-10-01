import { ArgsValue, GetGen, RootValue } from '@nexus/schema/dist/core';
import { GraphQLResolveInfo } from 'graphql';
import { ShieldPluginOptions } from '../../config';
import { ShieldContext, ShieldRule, ShieldRuleResult } from '../interface';
import { LogicRule } from '../logic';
export declare class RuleNot<TypeName extends string, FieldName extends string> extends LogicRule<TypeName, FieldName> {
    constructor(rule: ShieldRule<TypeName, FieldName>);
    /**
     *
     * @param parent
     * @param args
     * @param ctx
     * @param info
     *
     * Negates the result.
     *
     */
    resolve(root: RootValue<TypeName>, args: ArgsValue<TypeName, FieldName>, ctx: GetGen<'context'> & ShieldContext, info: GraphQLResolveInfo, options: ShieldPluginOptions): Promise<ShieldRuleResult>;
}
