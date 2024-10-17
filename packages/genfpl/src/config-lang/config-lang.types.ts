import {Classifier, Concept} from "@lionweb/core"



type SubLanguageIdentification = {
    name: string
    version: string
    key: string
    id: string
}

type RecordArea = {
    definition: {
        recordConcept: Concept,
        attributeConcept: Concept
    }
    recordLiteralName: string
    attributeValueName: string
}

type GenFPLConfiguration = {
    subLanguageIdentification: SubLanguageIdentification
    valueClassifier?: Classifier
    typeClassifier?: Classifier
    booleanArea?: boolean
    recordArea?: RecordArea
    comments?: boolean
}

export type {
    GenFPLConfiguration,
    SubLanguageIdentification
}

