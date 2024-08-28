import {writeJsonAsFile} from "@lionweb/utilities"
import {serializeLanguages} from "@lionweb/core"

import {configLang} from "./definition.js"


writeJsonAsFile("genfpl-config-lang.definition.json", serializeLanguages(configLang))

