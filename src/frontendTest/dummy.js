describe('When adding numbers', function() {
    it('should compare numbers', function() {
        expect(5).toEqual(5);
        expect(15).toEqual(15);
    });
    it('should compare strings', function() {
        expect("abc").toEqual("abc");
        expect("15").toEqual("18");
    });
});
