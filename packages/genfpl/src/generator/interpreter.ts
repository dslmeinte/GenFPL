import {asString} from "littoral-templates"

import {GenFPLConfiguration} from "../config-lang/index.js"
import {cond, indent} from "./textgen-utils.js"


// TODO  part of the generated code could be refactored into a generic AbstractInterpreter class

export const generateDefaultInterpreter = ({subLanguageIdentification, recordArea, booleanArea}: GenFPLConfiguration): string => {
    const {name, key} = subLanguageIdentification
    return asString([
`import {
    allFeaturesOf,
    Classifier,
    Concept,
    Enumeration,
    ExtractionFacade,
    Feature,
    Node,
    Property
} from "@lionweb/core";


export abstract class ${name}DefaultInterpreter<NT extends Node> {

    constructor(private readonly extractionFacade: ExtractionFacade<NT>) {}

    private lookupFeature(classifier: Classifier, featureKey: string): Feature {
        return allFeaturesOf(classifier).find((feature) => feature.key === featureKey)!;
    }

    private valueOfFeature(node: NT, classifier: Classifier, featureKey: string) {
        return this.extractionFacade.getFeatureValue(node, this.lookupFeature(classifier, featureKey));
    }

`,
        cond(
            booleanArea,
`    protected interpretBooleanValue(expression: NT) {
        const classifier = this.extractionFacade.classifierOf(expression);
        switch (classifier.key) {
            case "${key}-BooleanLiteral": return this.valueOfFeature(expression, classifier, "${key}-BooleanLiteral-value");
            case "${key}-BooleanBinaryOperation": {
                const operatorFeature = this.lookupFeature(classifier, "${key}-BooleanBinaryOperation-operator") as Property;
                const operator = this.extractionFacade.enumerationLiteralFrom(this.extractionFacade.getFeatureValue(expression, operatorFeature), operatorFeature.type! as Enumeration);
                const left = this.valueOfFeature(expression, classifier, "${key}-BooleanBinaryOperation-left");
                const evalLeft = this.interpret(left as NT);
                const right = this.valueOfFeature(expression, classifier, "${key}-BooleanBinaryOperation-right");
                const evalRight = this.interpret(right as NT);
                switch (operator!.key) {
                    case "${key}-BooleanBinaryOperators-and": return evalLeft && evalRight;
                    case "${key}-BooleanBinaryOperators-or": return evalLeft || evalRight;
                    default:
                        throw new Error(\`don't know how to handle binary operator "\${operator!.key}"\`);
                }
            }
            case "${key}-BooleanNegation": {
                const operand = this.valueOfFeature(expression, classifier, "${key}-BooleanNegation-operand");
                const evalOperand = this.interpret(operand as NT);
                return !evalOperand;
            }
            default:
                throw new Error(\`don't know how to interpret an instance of \${classifier.name}\`);
        }
    }
`
        ),
        cond(
            !!recordArea,
            [
`
    protected interpretDotExpression(expression: NT) {
        const classifier = this.extractionFacade.classifierOf(expression);
        const left = this.valueOfFeature(expression, classifier, "${key}-DotExpression-left") as NT;
        if (this.extractionFacade.classifierOf(left).key !== "${key}-${recordArea!.recordLiteralName}") {
            throw new Error(\`left-hand side of . expression is not a ${recordArea!.recordLiteralName}\`);
        }
        const right = this.valueOfFeature(expression, classifier, "${key}-DotExpression-right") as NT;
        if (this.extractionFacade.classifierOf(right).key !== "${recordArea!.definition!.attributeConcept.key}") {
            throw new Error(\`right-hand side of . expression is not (a reference to) an ${recordArea!.definition!.attributeConcept.name}\`);
        }
        throw new Error(\`fail - gave up here...\`);
    }
`
            ]
        ),
        ``,
        indent([
            `interpret(expression: NT): unknown {`,
            indent([
                `const classifier = this.extractionFacade.classifierOf(expression);`,
                cond(
                    booleanArea,
                    [
                        `if ((classifier as Concept).extends?.key === "${key}-BooleanValue") {`,
                        indent([`return this.interpretBooleanValue(expression);`]),
                        `}`
                    ]
                ),
                "throw new Error(`don't know how to interpret an instance of ${classifier.name}`);"
            ]),
            `}`
        ]),
        ``,
        `}`,
        ``
    ])
}

