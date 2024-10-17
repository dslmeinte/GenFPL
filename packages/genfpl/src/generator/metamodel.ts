import {GenFPLConfiguration} from "../config-lang/config-lang.types.js"
import {
    Annotation,
    builtinClassifiers,
    builtinPrimitives,
    Classifier,
    Concept,
    Containment,
    Datatype,
    Enumeration,
    EnumerationLiteral,
    Interface,
    Language,
    Property, Reference
} from "@lionweb/core"


/**
 * Makes the given concept-to-extend extend or implement the given classifier-to-inherit,
 * which should be either a {@link Concept} or an {@link Interface}.
 */
const inherit = (conceptToExtend: Concept, classifierToInherit?: Classifier) => {
    if (classifierToInherit) {
        if (classifierToInherit instanceof Concept) {
            conceptToExtend.extends = classifierToInherit
        } else if (classifierToInherit instanceof Interface) {
            conceptToExtend.implementing(classifierToInherit)
        }
    }
}


export const generateMetamodel = ({subLanguageIdentification, typeClassifier, valueClassifier, booleanArea, recordArea, comments}: GenFPLConfiguration): Language => {

    const {name, version, key, id} = subLanguageIdentification
    const subLanguage = new Language(name, version, key, id)

    const addAnnotation = (annotationName: string): Annotation => {
        const annotation = new Annotation(subLanguage, annotationName, `${key}-${annotationName}`, `${id}-${annotationName}`)
        subLanguage.havingEntities(annotation)
        return annotation
    }

    const addConcept = (conceptName: string): Concept => {
        const concept = new Concept(subLanguage, conceptName, `${key}-${conceptName}`, `${id}-${conceptName}`, false)
        subLanguage.havingEntities(concept)
        return concept
    }

    const addEnumeration = (enumerationName: string, literalNames: string[]): Enumeration => {
        const enumeration = new Enumeration(subLanguage, enumerationName, `${key}-${enumerationName}`, `${id}-${enumerationName}`)
        subLanguage.havingEntities(enumeration)
        literalNames.forEach((literalName) => {
            const enumerationLiteral = new EnumerationLiteral(enumeration, literalName, `${enumeration.key}-${literalName}`, `${enumeration.id}-${literalName}`)
            enumeration.havingLiterals(enumerationLiteral)
        })
        return enumeration
    }

    const addProperty = (classifier: Classifier, propertyName: string, type: Datatype) => {
        const property = new Property(classifier, propertyName, `${classifier.key}-${propertyName}`, `${classifier.id}-${propertyName}`).ofType(type)
        classifier.havingFeatures(property)
        return property
    }

    const addContainment = (classifier: Classifier, containmentName: string, type: Classifier) => {
        const containment = new Containment(classifier, containmentName, `${classifier.key}-${containmentName}`, `${classifier.id}-${containmentName}`).ofType(type)
        classifier.havingFeatures(containment)
        return containment
    }

    const addReference = (classifier: Classifier, referenceName: string, type: Classifier) => {
        const reference = new Reference(classifier, referenceName, `${classifier.key}-${referenceName}`, `${classifier.id}-${referenceName}`).ofType(type)
        classifier.havingFeatures(reference)
        return reference
    }

    if (booleanArea) {
        const type = addConcept("BooleanType")
        inherit(type, typeClassifier)

        const value = addConcept("BooleanValue")
        inherit(value, valueClassifier)

        const literal = addConcept("BooleanLiteral")
        addProperty(literal, "value", builtinPrimitives.booleanDatatype)
        inherit(literal, value)

        const binaryOperation = addConcept("BooleanBinaryOperation")
        inherit(binaryOperation, value)
        addProperty(binaryOperation, "operator", addEnumeration("BooleanBinaryOperators", ["and", "or"]))
        if (valueClassifier) {
            addContainment(binaryOperation, "left", valueClassifier)
            addContainment(binaryOperation, "right", valueClassifier)
        }

        const negation = addConcept("BooleanNegation")
        inherit(negation, value)
        if (valueClassifier) {
            addContainment(negation, "operand", valueClassifier)
        }
    }

    if (recordArea) {
        const dotExpression = addConcept("DotExpression")
        inherit(dotExpression, valueClassifier)
        if (valueClassifier) {
            addContainment(dotExpression, "instance", valueClassifier)
            addReference(dotExpression, "attribute", recordArea.definition.attributeConcept)

            const attributeValue = addConcept(recordArea.attributeValueName)
            addContainment(attributeValue, "value", valueClassifier)

            const recordInstance = addConcept(recordArea.recordLiteralName)
            inherit(recordInstance, valueClassifier)
            addContainment(recordInstance, "attributeValues", attributeValue).isMultiple()
        }
    }

    if (comments) {
        const comment = addAnnotation("comments")
        comment.annotates = builtinClassifiers.node
        subLanguage.havingEntities(comment)
        addProperty(comment, "comment", builtinPrimitives.stringDatatype)
    }

    return subLanguage
}

