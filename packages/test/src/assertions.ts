import {assert} from "chai";

export const {deepEqual, equal, fail, throws} = assert;

export const isTrue = (value: unknown, message?: string): void =>
    assert.isTrue(value, message);

