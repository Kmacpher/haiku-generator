var fs = require("fs");
// open the cmu dictionary file for "reading" (the little r)
// cmudict_file = File.open('cmudict.txt', 'r')
//runDictHaiku();
runTextHaiku('./Dorian-Grey.txt');



function runTextHaiku(file) {
  fs.readFile(file, function(err, data) {
	if(err) {
		return console.error(err.message);
	}
	var words = data.toString().match(/(\b\w+\b)/g);
	var startIndex = randomWord(words, true);
	fs.readFile('cmudict.txt', function(err, data) {
        if(err) {
          return console.log(err);
        }
        var lines = data.toString().split("\n");
        var dictObj = parseDict(lines);
        var startWord = words[startIndex].toUpperCase();
        console.log(dictObj[startWord]);
        
	});
  });
}

function randomWord(wordArray, giveIndex) {
	if(wordArray.length>0) {
		var index = Math.floor(Math.random()*wordArray.length);
		if(giveIndex===true) return index;
		else return wordArray[index];
	}
	throw new Error('no words in this array');
}

function parseDict(lines) {
	/*I want the word: numsyllables. 
	{
		'hello': 2,
		'goodbye': 2,
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

			dictObj[word] = count;
			
		}
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






