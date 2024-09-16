import {asString, indentWith} from "littoral-templates"

import {GenFPLConfiguration} from "../config-lang/index.js"
import {indent} from "./textgen-utils.js"


export const generateInterpreter = (config: GenFPLConfiguration): string =>
    asString([
        `import {DynamicNode} from "@lionweb/core";`,
        ``,
        `export const interpret = (expr: DynamicNode): unknown => {`,
        indent(1)([
            `switch (expr.classifier) {`,
            indent(1)([
                `default: throw new Error(\`don't know how to interpret an instance of \${expr.classifier.name}\`);`
            ]),
            `}`
        ]),
        `}`
    ])

