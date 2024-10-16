import {indentWith, NestedString} from "littoral-templates"

export const indent = indentWith("    ")(1)

export const cond = (include: boolean | undefined, contents: NestedString): NestedString =>
    !include ? [] : contents

