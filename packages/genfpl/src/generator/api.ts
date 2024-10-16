import {Language} from "@lionweb/core"

import {GenFPLConfiguration} from "../config-lang/config-lang.types.js"
import {generateMetamodel} from "./metamodel.js"
import {generateInterpreterScaffold} from "./interpreter.js"


export type GenerationResult = {
    metamodel: Language
    interpreterScaffold: string
}


export const generateFPL = (configuration: GenFPLConfiguration): GenerationResult => {
    return {
        metamodel: generateMetamodel(configuration),
        interpreterScaffold: generateInterpreterScaffold(configuration)
    }
}

