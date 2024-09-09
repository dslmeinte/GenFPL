import {builtinPrimitives, Concept, Language, Property} from "@lionweb/core"


export const configLang = new Language("GenFPL Configuration Language", "0.0.0", "genfpl-config-language", "genfpl-config-language")

const configuration = new Concept(configLang, "GenFPLConfiguration", "genfpl-config", "genfpl-config", false)
const configuration_comments = new Property(configuration, "comments", "GenFPLConfiguration-comments", "GenFPLConfiguration-comments").ofType(builtinPrimitives.stringDatatype)
configuration.havingFeatures(configuration_comments)

configLang.havingEntities(configuration)

