import { ShieldPluginSettings } from './config';
import { ShieldRule } from './rules';
export declare type FieldShieldResolver<TypeName extends string, FieldName extends string> = ShieldRule<TypeName, FieldName>;
export declare type ObjectTypeShieldResolver<TypeName extends string> = ShieldRule<TypeName, never>;
export declare const nexusShield: (settings: ShieldPluginSettings) => import("@nexus/schema/dist/plugin").NexusPlugin;
