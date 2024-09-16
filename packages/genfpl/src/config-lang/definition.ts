import {builtinPrimitives, Classifier, Concept, Language, lioncore, Property, Reference} from "@lionweb/core"


export const configLang = new Language("GenFPL Configuration Language", "0.0.0", "genfpl-config-language", "genfpl-config-language")

const configuration = new Concept(configLang, "GenFPLConfiguration", "genfpl-config", "genfpl-config", false)
const configuration_comments = new Property(configuration, "comments", "GenFPLConfiguration-comments", "GenFPLConfiguration-comments").ofType(builtinPrimitives.booleanDatatype)
const configuration_valueClassifierReference = new Reference(configuration, "valueClassifierReference", "genfpl-config-valueClassifierReference", "genfpl-config-valueClassifierReference")
    .ofType(lioncore.entities.find((entity) => entity.name === "Classifier")! as Classifier)
    .isOptional()
const configuration_ownValueInterface = new Property(configuration, "ownValueInterface", "genfpl-config-ownValueInterface", "genfpl-config-ownValueInterface")
    .ofType(builtinPrimitives.stringDatatype)
    .isOptional()
configuration.havingFeatures(configuration_comments, configuration_valueClassifierReference, configuration_ownValueInterface)

configLang.havingEntities(configuration)

