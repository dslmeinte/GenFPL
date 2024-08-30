import {assert} from "chai"
const {deepEqual} = assert

import {generateFPL} from "genfpl"

import {testHostLanguages} from "../languages/test-host-languages.js"


describe("generator", () => {

    it("seems to work", () => {
        const result = generateFPL(testHostLanguages, {})
        deepEqual(result.metamodel, [])
    })

})

