const expect = require("expect");
var {isRealString} = require("./validation.js");

describe("Is Real String",() => {
    it("should reject non-string value",()=> {
        var testStr = 21;
        var res = isRealString(testStr); 
        expect(res).toBe(false);
    });
    it("should reject string with only space",()=> {
        var testStr = "     ";
        var res = isRealString(testStr); 
        expect(res).toBe(false);
    });
    it("should allow string with non-space chars",()=> {
        var testStr = "@8374823421@*&!764";
        var res = isRealString(testStr); 
        expect(res).toBe(true);
    });
});