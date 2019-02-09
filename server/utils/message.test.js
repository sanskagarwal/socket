const expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message.js");

describe("generate message",() => {
    it("should return correct message",()=> {
        var from = "Dk";
        var text = "How u doin'?";
        var res = generateMessage(from,text); 
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
    });
});

describe("generate Location message",() => {
    it("should return location object",()=> {
        var from = "Dev";
        var latitude = 15;
        var longitude = 19;
        var url = "https://www.google.com/maps?q=15,19";
        var res = generateLocationMessage(from,latitude,longitude); 
        expect(res.from).toBe(from);
        expect(res.url).toBe(url);
        expect(typeof res.createdAt).toBe('number');
    });
});