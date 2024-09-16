import {deepEqual} from "../assertions.js"

import {lioncore, lioncoreBuiltins, SerializationChunk, serializeLanguages} from "@lionweb/core"
import {LanguageRegistry, LionWebValidator} from "@lionweb/validation"
import {LionWebLanguageWrapper} from "@lionweb/validation/dist/languages/LionWebLanguageWrapper.js"

const registry = new LanguageRegistry()
registry.addLanguage(new LionWebLanguageWrapper(serializeLanguages(lioncore)))
registry.addLanguage(new LionWebLanguageWrapper(serializeLanguages(lioncoreBuiltins)))


export const validateM2 = (serializationChunk: SerializationChunk): (void | never) => {
    const validator = new LionWebValidator(serializationChunk, registry)
    validator.validateAll()
    deepEqual(validator.validationResult.issues, [])
}

