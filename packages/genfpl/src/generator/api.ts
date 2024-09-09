import {Language} from "@lionweb/core"
import {generateMetamodel} from "./metamodel.js"
import {GenFPLConfiguration} from "../config-lang/config-lang.types.js"


export type GenerationResult = {
    metamodel: Language[]
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateFPL = (hostLanguages: Language[], configuration: GenFPLConfiguration): GenerationResult => {
    return {
        metamodel: generateMetamodel(configuration)
    }
}

