import {builtinPrimitives, Classifier, Concept, Language, lioncore, Property, Reference} from "@lionweb/core"


export const configLang = new Language("GenFPL Configuration Language", "0.0.0", "genfpl-config-language", "genfpl-config-language")

const configuration = new Concept(configLang, "GenFPLConfiguration", "genfpl-config", "genfpl-config", false)
const configuration_comments = new Property(configuration, "comments", "GenFPLConfiguration-comments", "GenFPLConfiguration-comments").ofType(builtinPrimitives.booleanDatatype)
const configuration_valueClassifier = new Reference(configuration, "valueClassifier", "GenFPLConfiguration-valueClassifier", "GenFPLConfiguration-valueClassifier")
    .ofType(lioncore.entities.find((entity) => entity.name === "Classifier")! as Classifier)
    .isOptional()
configuration.havingFeatures(configuration_comments, configuration_valueClassifier)

configLang.havingEntities(configuration)

