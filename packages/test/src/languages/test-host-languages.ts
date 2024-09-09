import {Concept, Language} from "@lionweb/core"


const language = new Language("Test Host Language", "0", "test-host-language", "test-host-language")

const valueConcept = new Concept(language, "Value", "Value", "Value", true)

language.havingEntities(valueConcept)


export const testHostLanguages = [language]

