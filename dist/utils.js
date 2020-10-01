"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isShieldRule = void 0;
const rules_1 = require("./rules");
/**
 *
 * @param x
 *
 * Makes sure that a certain field is a shield rule.
 *
 */
exports.isShieldRule = (x) => {
    return (x instanceof rules_1.BaseRule ||
        (x &&
            x.constructor &&
            (x.constructor.name === 'BaseRule' ||
                x.constructor.name === 'RuleAnd' ||
                x.constructor.name === 'RuleChain' ||
                x.constructor.name === 'RuleFalse' ||
                x.constructor.name === 'RuleNot' ||
                x.constructor.name === 'RuleOr' ||
                x.constructor.name === 'RuleRace' ||
                x.constructor.name === 'RuleTrue')));
};
//# sourceMappingURL=utils.js.map