import { ArgsValue, GetGen, RootValue } from '@nexus/schema/dist/core';
import { GraphQLResolveInfo } from 'graphql';
import { ShieldPluginOptions } from '../config';
export declare type ShieldRuleResult = boolean;
export declare type ShieldContext = {
    _shield: {
        cache: {
            [key: string]: ShieldRuleResult | Promise<ShieldRuleResult>;
        };
    };
};
export declare enum ShieldCache {
    STRICT = "strict",
    CONTEXTUAL = "contextual",
    NO_CACHE = "no_cache"
}
export interface ShieldRuleOptions {
    name?: string;
    cache?: ShieldCache;
}
export interface ShieldRule<TypeName extends string, FieldName extends string> {
    resolve(root: RootValue<TypeName>, args: ArgsValue<TypeName, FieldName>, ctx: GetGen<'context'> & ShieldContext, info: GraphQLResolveInfo, options: ShieldPluginOptions): Promise<ShieldRuleResult>;
}
export declare type ShieldRuleFunction<TypeName extends string, FieldName extends string> = (root: RootValue<TypeName>, args: ArgsValue<TypeName, FieldName>, ctx: GetGen<'context'>, info: GraphQLResolveInfo) => ShieldRuleResult | Promise<ShieldRuleResult>;
