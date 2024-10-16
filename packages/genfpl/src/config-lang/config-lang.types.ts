import {Classifier} from "@lionweb/core"

type GenFPLConfiguration = {
    subLanguageIdentification: {
        name: string
        version: string
        key: string
        id: string
    }
    valueClassifier?: Classifier
    typeClassifier?: Classifier
    booleanArea?: boolean
    comments?: boolean
}

export type {
    GenFPLConfiguration
}

