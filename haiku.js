
var fs = require("fs");
// open the cmu dictionary file for "reading" (the little r)
// cmudict_file = File.open('cmudict.txt', 'r')
//runDictHaiku();
runTextHaiku('./Dorian-Grey.txt');

function runDictHaiku() {
  fs.readFile('cmudict.txt', function(err, data) {
    if(err) {
      return console.log(err);
    }
    var lines = data.toString().split("\n");

    console.log(makeHaiku(lines));

});

}

function runTextHaiku(file) {
  fs.readFile(file, function(err, data) {
	if(err) {
		return console.error(err.message);
	}
	var words = data.toString().match(/(\b\w+\b)/g);
	var startIndex = randomWord(words, true);
	
	
  });
}

function parseDict(lines) {
	/*I want an object with each syllable count, and at that count, an array of 
	the words. So I can find the syllble count I want, then choose a random word using the index
	{
		'1': [...],
		'2': [...],
		'3': [...]
	}
	*/
	var dictObj = {};
	lines.forEach(function(line) {
		if(line) {
			line_split = line.split("  ");
			var word = line_split[0];
			if (/\(\d\)/.test(word)) return;
			var syllables = line_split[1].split(" ");
			var count = countSyllables(syllables);

			if(dictObj[count]) dictObj[count].push(word);
			else {
				dictObj[count] = [word];
			}
		}
		//what is syllable count of line?
		//if obj['syll'] exists, push word onto the array
		//if not, add that syll property and assign to it an array     
	});
	return dictObj;
}


function countSyllables(syllables) {
	var count = 0;
	syllables.forEach(function(syl) {
		if(syl.match(/\d/)) count++;
	});
	return count;
}

function randomWord(wordArray, giveIndex) {
	if(wordArray.length>0) {
		var index = Math.floor(Math.random()*wordArray.length);
		if(giveIndex===true) return index;
		else return wordArray[index];
	}
	throw new Error('no words in this array');
}

function randomWordTest(wordArray) {
	//Goes through a (short) array and keeps calling until 
	//every word has been reached randomly at least once
	var wordCalled;
	wordArray.forEach(function(word) {
		wordWaiting = true;
		while(wordWaiting) {
			if(randomWord(wordArray)===word) wordWaiting = false;
		}
	});
	return true;
}

function randomPatternGenerator() {
	var sylls = [5,7,5]; //default haiku pattern
	var pattern = [[],[],[]];

	for(var i=0; i<3; i++)  {
		var num = sylls[i];
		while(num>0) {
			var random = Math.ceil(Math.random()*num);
			pattern[i].push(random);
			num -= random;
		}
	}
	return pattern;
}

function makeHaiku(lines) {
	dictObj = parseDict(lines);
  
	var haikuPattern = randomPatternGenerator();

	var haiku = "";
	haikuPattern.forEach(function(line) {
		line.forEach(function(syl) {
			haiku += randomWord(dictObj[syl])+" ";
		});

	haiku += '\n';

	});

	return haiku;

}

function type(input) {
	return Object.prototype.toString.call(input).slice(8, -1);
}



