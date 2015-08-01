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

	it('makes and array of more than word at more than one syllable count', function() {
		var lines = ['AGRICULTURALLY  AE2 G R IH0 K AH1 L CH ER0 AH0 L IY0', 'AGRICULTURALIST  AE2 G R AH0 K AH1 L CH ER0 AH0 L AH0 S T', 'ZUBER  Z UW1 B ER0'];
		expect(parseDict(lines)).toEqual({'6': ['AGRICULTURALLY', 'AGRICULTURALIST'],
										'2': ['ZUBER']});
	});
	it('ignores the words that have (num) at the end', function() {
		var lines = ['HELLOTHERE(1)  AE2 G R IH0'];
		var lines2 = ['HELLOTHERE(1)  AE2 G R IH0', 'AGRICULTURALIST  AE2 G R AH0 K AH1 L CH ER0 AH0 L AH0 S T'];
		expect(parseDict(lines)).toEqual({});
		expect(parseDict(lines2)).toEqual({'6': ['AGRICULTURALIST']});
	});

});

describe("randomWord returns a word from an array of words", function() {
	it("returns a string", function() {
		var wordArray = ['hello', 'how', 'are', 'you'];
		expect(typeof randomWord(wordArray)).toEqual("string");
	});

	it("it\'s possible for each index to be used", function() {
		var wordArray = ['hello', 'how', 'are', 'you'];
		expect(randomWordTest(wordArray)).toEqual(true);
	});

});

describe("random pattern generator", function() {

	it('returns an array of 3 arrays', function() {
		expect(type(randomPatternGenerator())).toEqual('Array');
		for(var x=0; x<3; x++) {
			expect(type(randomPatternGenerator()[x])).toEqual('Array');
		}
	});

	it("returns the proper number of syllables in each line", function() {
		var pattern = randomPatternGenerator();
		var sum = function(a, b) {return a+b;};
		var expect1 = 5, expect2 = 7, expect3 = 5;
		var sum1 = pattern[0].reduce(sum), sum2 = pattern[1].reduce(sum), sum3 = pattern[2].reduce(sum);
		expect(sum1).toEqual(expect1);
		expect(sum2).toEqual(expect2);
		expect(sum3).toEqual(expect3);
	});
});



