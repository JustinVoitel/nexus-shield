import { ArgsValue, GetGen, RootValue } from '@nexus/schema/dist/core';
import { GraphQLResolveInfo } from 'graphql';
import { ShieldPluginOptions } from '../../config';
import { ShieldContext, ShieldRule, ShieldRuleResult } from '../interface';
import { LogicRule } from '../logic';
export declare class RuleOr<TypeName extends string, FieldName extends string> extends LogicRule<TypeName, FieldName> {
    constructor(rules: ShieldRule<TypeName, FieldName>[]);
    /**
     * Makes sure that at least one of them has evaluated to true.
     */
    resolve(root: RootValue<TypeName>, args: ArgsValue<TypeName, FieldName>, ctx: GetGen<'context'> & ShieldContext, info: GraphQLResolveInfo, options: ShieldPluginOptions): Promise<ShieldRuleResult>;
}
