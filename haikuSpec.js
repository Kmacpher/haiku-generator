describe('Counts Syllables!', function() {

	it("Counts the syllables from the cmudict", function() {
		var syllables = ['EY1', 'F', 'AO1', 'R', 'T', 'UW1', 'W', 'AH1', 'N', 'T', 'UW1', 'EY1', 'T'];
		expect(countSyllables(syllables)).toEqual(6);
	});
	it("returns 0 if there isn\'t valid input (no numbers in syllables)", function() {
		var syllables = ['sl', 'kd', 'jfls', 'djfl', 'sj'];
		expect(countSyllables(syllables)).toEqual(0);
	});
	
});


describe('parsing the lines from the dictionary file', function() {

	it("Returns an object (empty array)", function() {
		expect(parseDict([])).toEqual({});
	});

	it('makes an array of one word at the right syllable count', function() {
		var lines = ['AGRICULTURALIST  AE2 G R AH0 K AH1 L CH ER0 AH0 L AH0 S T'];
		expect(parseDict(lines)).toEqual({'6': ['AGRICULTURALIST']});
	});

	it('makes and array of more than word at one syllable count', function() {
		var lines = ['AGRICULTURALLY  AE2 G R IH0 K AH1 L CH ER0 AH0 L IY0', 'AGRICULTURALIST  AE2 G R AH0 K AH1 L CH ER0 AH0 L AH0 S T'];
		expect(parseDict(lines)).toEqual({'6': ['AGRICULTURALLY', 'AGRICULTURALIST']});
	});



});