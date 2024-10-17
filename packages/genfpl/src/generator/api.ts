import {Language} from "@lionweb/core"

import {GenFPLConfiguration} from "../config-lang/config-lang.types.js"
import {generateMetamodel} from "./metamodel.js"
import {generateDefaultInterpreter} from "./interpreter.js"


export type GenerationResult = {
    metamodel: Language
    defaultInterpreter: string
}


export const generateFPL = (configuration: GenFPLConfiguration): GenerationResult => {
    // TODO  validate configuration
    return {
        metamodel: generateMetamodel(configuration),
        defaultInterpreter: generateDefaultInterpreter(configuration)
    }
}

