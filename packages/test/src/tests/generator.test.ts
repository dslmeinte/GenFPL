
import {serializeLanguages} from "@lionweb/core"
import {writeJsonAsFile} from "@lionweb/utilities"
import {generateFPL, GenFPLConfiguration} from "genfpl"
import {writeFileSync} from "fs"
import {join} from "path"

import {validateM2} from "./validation-helper.js"


const testGenSrcPath = "../test-gen/src/gen"

describe("generator", () => {

    it("works for comments", () => {
        const config: GenFPLConfiguration = {
            subLanguageIdentification: {
                name: "with-comments",
                version: "0",
                key: "with-comments",
                id: "with-comments"
            },
            comments: true
        }
        const result = generateFPL(config)
            // TODO  [de-]serialize configuration to[/from] an actual LionWeb serialization chunk
        const mmSerializationChunk = serializeLanguages(result.metamodel)
        writeJsonAsFile(join(testGenSrcPath, "comments.languages.json"), mmSerializationChunk)
        validateM2(mmSerializationChunk)
        writeFileSync(join(testGenSrcPath, "comments.interpreter.ts"), result.interpreterScaffold)
    })

})

