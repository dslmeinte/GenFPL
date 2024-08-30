import {Language} from "@lionweb/core"


export type GenerationResult = {
    metamodel: Language[]
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateFPL = (hostLanguages: Language[], configuration: unknown): GenerationResult => {
    return {
        metamodel: []   // TODO  implement
    }
}

