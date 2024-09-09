import {assert} from "chai"
const {equal} = assert

import {generateFPL, GenFPLConfiguration} from "genfpl"

import {testHostLanguages} from "../languages/test-host-languages.js"


describe("generator", () => {

    it("seems to work", () => {
        const result = generateFPL(testHostLanguages, { settings: { comments: true } } as GenFPLConfiguration)
        equal(result.metamodel.length, 1)
    })

})

