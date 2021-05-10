"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('parser', () => {
    it('works', () => {
        console.log('XYZ!!');
        const res = _1.default('Hello World!');
        expect(res).toEqual('Hello World!');
    });
});
