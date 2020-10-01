"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nexusShield = void 0;
const schema_1 = require("@nexus/schema");
const utils_1 = require("@nexus/schema/dist/utils");
const hash = require("object-hash");
const builders_1 = require("./builders");
const utils_2 = require("./utils");
const FieldShieldImport = utils_1.printedGenTypingImport({
    module: 'nexus-shield',
    bindings: ['FieldShieldResolver'],
});
const FieldShieldType = utils_1.printedGenTyping({
    optional: true,
    name: 'shield',
    description: `
    Authorization rule to execute for this field
  `,
    type: 'FieldShieldResolver<TypeName, FieldName>',
    imports: [FieldShieldImport],
});
const ObjectTypeShieldImport = utils_1.printedGenTypingImport({
    module: 'nexus-shield',
    bindings: ['ObjectTypeShieldResolver'],
});
const ObjectTypeFieldShieldType = utils_1.printedGenTyping({
    optional: true,
    name: 'shield',
    description: `
    Default authorization rule to execute on all fields of this object
  `,
    type: 'ObjectTypeShieldResolver<TypeName>',
    imports: [ObjectTypeShieldImport],
});
exports.nexusShield = (settings) => {
    const options = {
        defaultRule: settings.defaultRule || builders_1.allow,
        defaultError: settings.defaultError || new Error('Not Authorised!'),
        hashFunction: settings.hashFunction || hash,
    };
    return schema_1.plugin({
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
            if (utils_2.isShieldRule(fieldRule)) {
                rule = fieldRule;
            }
            else if (utils_2.isShieldRule(objectRule)) {
                rule = objectRule;
            }
            else if (options.defaultRule) {
                rule = options.defaultRule;
            }
            return (root, args, ctx, info, next) => __awaiter(this, void 0, void 0, function* () {
                // Cache
                const shieldCtx = ctx;
                if (!shieldCtx._shield) {
                    shieldCtx._shield = {
                        cache: {},
                    };
                }
                // Rule
                const allowed = rule
                    ? yield rule.resolve(root, args, ctx, info, options)
                    : true;
                if (!allowed) {
                    throw options.defaultError;
                }
                // Resolver
                return next(root, args, ctx, info);
            });
        },
    });
};
//# sourceMappingURL=plugin.js.map