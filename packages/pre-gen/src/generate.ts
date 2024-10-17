import {serializeLanguages} from "@lionweb/core"
import {writeJsonAsFile, languageAsText, generatePlantUmlForLanguage} from "@lionweb/utilities"
import {writeFileSync} from "fs"
import {join} from "path"

import {configLang} from "./definition.js"


const genPath = "../genfpl/artifacts/"
const extlessFileName = "genfpl-config.language"

writeJsonAsFile(join(genPath, `${extlessFileName}.json`), serializeLanguages(configLang))
writeFileSync(join(genPath, `${extlessFileName}.txt`), languageAsText(configLang))
writeFileSync(join(genPath, `${extlessFileName}.puml`), generatePlantUmlForLanguage(configLang))

