import { GraphQLResolveInfo } from 'graphql';
import { ShieldContext, ShieldRule } from './rules';
declare type HashFunction = (arg: {
    root: any;
    args: any;
}) => string;
declare type ErrorMapper = (err: Error, parent: any, args: any, ctx: ShieldContext, info: GraphQLResolveInfo) => Promise<Error> | Error;
declare type DefaultError = Error | ErrorMapper;
export interface ShieldPluginOptions {
    defaultRule: ShieldRule<any, any>;
    defaultError: DefaultError;
    hashFunction: HashFunction;
}
export interface ShieldPluginSettings {
    defaultRule?: ShieldRule<any, any>;
    defaultError?: DefaultError;
    hashFunction?: HashFunction;
}
export {};
