import { ArgsValue, GetGen, RootValue } from '@nexus/schema/dist/core';
import { GraphQLResolveInfo } from 'graphql';
import { ShieldPluginOptions } from '../config';
import { ShieldContext, ShieldRule, ShieldRuleFunction, ShieldRuleOptions, ShieldRuleResult } from './interface';
export declare class BaseRule<TypeName extends string, FieldName extends string> implements ShieldRule<TypeName, FieldName> {
    readonly name: string;
    private cache;
    private func;
    constructor(options: ShieldRuleOptions, func: ShieldRuleFunction<TypeName, FieldName>);
    resolve(root: RootValue<TypeName>, args: ArgsValue<TypeName, FieldName>, ctx: GetGen<'context'> & ShieldContext, info: GraphQLResolveInfo, options: ShieldPluginOptions): Promise<ShieldRuleResult>;
    /**
     * Writes or reads result from cache.
     *
     * @param key
     */
    private cacheable;
}
