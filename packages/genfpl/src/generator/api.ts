import {Language} from "@lionweb/core"
import {generateMetamodel} from "./metamodel.js"
import {GenFPLConfiguration} from "../config-lang/config-lang.types.js"
import {generateInterpreter} from "./interpreter.js"
import {generateTypeDeriver} from "./type-system.js";


export type GenerationResult = {
    metamodel: Language[]
    interpreter: string
    typeDeriver: string
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateFPL = (configuration: GenFPLConfiguration, hostLanguages: Language[]): GenerationResult => {
    return {
        metamodel: generateMetamodel(configuration),
        interpreter: generateInterpreter(configuration),
        typeDeriver: generateTypeDeriver(configuration)
    }
}

