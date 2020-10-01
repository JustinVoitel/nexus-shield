import { plugin } from '@nexus/schema';
import { printedGenTyping, printedGenTypingImport, } from '@nexus/schema/dist/utils';
import * as hash from 'object-hash';
import { allow } from './builders';
import { isShieldRule } from './utils';
const FieldShieldImport = printedGenTypingImport({
    module: 'nexus-shield',
    bindings: ['FieldShieldResolver'],
});
const FieldShieldType = printedGenTyping({
    optional: true,
    name: 'shield',
    description: `
    Authorization rule to execute for this field
  `,
    type: 'FieldShieldResolver<TypeName, FieldName>',
    imports: [FieldShieldImport],
});
const ObjectTypeShieldImport = printedGenTypingImport({
    module: 'nexus-shield',
    bindings: ['ObjectTypeShieldResolver'],
});
const ObjectTypeFieldShieldType = printedGenTyping({
    optional: true,
    name: 'shield',
    description: `
    Default authorization rule to execute on all fields of this object
  `,
    type: 'ObjectTypeShieldResolver<TypeName>',
    imports: [ObjectTypeShieldImport],
});
export const nexusShield = (settings) => {
    const options = {
        defaultRule: settings.defaultRule || allow,
        defaultError: settings.defaultError || new Error('Not Authorised!'),
        hashFunction: settings.hashFunction || hash,
    };
    return plugin({
        name: 'Nexus Shield Plugin',
        description: 'Ease the creation of the authorization layer',
        fieldDefTypes: FieldShieldType,
        objectTypeDefTypes: ObjectTypeFieldShieldType,
        onCreateFieldResolver(config) {
            var _a, _b, _c, _d;
            // Find the field rule
            const objectRule = (_b = (_a = config.parentTypeConfig.extensions) === null || _a === void 0 ? void 0 : _a.nexus) === null || _b === void 0 ? void 0 : _b.config.shield;
            const fieldRule = (_d = (_c = config.fieldConfig.extensions) === null || _c === void 0 ? void 0 : _c.nexus) === null || _d === void 0 ? void 0 : _d.config.shield;
            let rule;
            if (isShieldRule(fieldRule)) {
                rule = fieldRule;
            }
            else if (isShieldRule(objectRule)) {
                rule = objectRule;
            }
            else if (options.defaultRule) {
                rule = options.defaultRule;
            }
            return async (root, args, ctx, info, next) => {
                // Cache
                const shieldCtx = ctx;
                if (!shieldCtx._shield) {
                    shieldCtx._shield = {
                        cache: {},
                    };
                }
                // Rule
                const allowed = rule
                    ? await rule.resolve(root, args, ctx, info, options)
                    : true;
                if (!allowed) {
                    throw options.defaultError;
                }
                // Resolver
                return next(root, args, ctx, info);
            };
        },
    });
};
//# sourceMappingURL=plugin.js.map