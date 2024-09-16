import {DynamicNode} from "@lionweb/core";

export const interpret = (expr: DynamicNode): unknown => {
    switch (expr.classifier) {
        default: throw new Error(`don't know how to interpret an instance of ${expr.classifier.name}`);
    }
}
