import {generateFPL} from "genfpl"

import {serializeLanguages} from "@lionweb/core"
import {writeJsonAsFile} from "@lionweb/utilities"
import {writeFileSync} from "fs"
import {join} from "path"
import {testHostLanguages} from "../languages/test-host-languages.js"
import {validateM2} from "./validation-helper.js"

const testGenSrcPath = "../test-gen/src/gen"

describe("generator", () => {

    it("works for comments", () => {
        const result = generateFPL({ comments: true }, testHostLanguages)
            // TODO  [de-]serialize configuration to[/from] an actual LionWeb serialization chunk
        const mmSerializationChunk = serializeLanguages(...result.metamodel)
        writeJsonAsFile(join(testGenSrcPath, "comments.languages.json"), mmSerializationChunk)
        validateM2(mmSerializationChunk)
        writeFileSync(join(testGenSrcPath, "comments.interpreter.ts"), result.interpreter)
    })

})

