import {serializeLanguages} from "@lionweb/core"
import {writeJsonAsFile, tsTypesForLanguage, languageAsText} from "@lionweb/utilities"
import {writeFileSync} from "fs"
import {join} from "path"

import {configLang} from "./definition.js"


const genPath = "../genfpl/src/config-lang/"

writeJsonAsFile(join(genPath, "genfpl-config-lang.definition.json"), serializeLanguages(configLang))

writeFileSync(join(genPath, "genfpl-config-lang.definition.txt"), languageAsText(configLang))

writeFileSync(join(genPath, "config-lang.types.ts"), tsTypesForLanguage(configLang))

