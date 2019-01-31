const expect = require("expect");
var {generateMessage} = require("./message.js");

describe("Check for message",() => {
    it("should return correct message",()=> {
        var from = "Dk";
        var text = "How u doin'?";
        var res = generateMessage(from,text); 
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
    });
});
