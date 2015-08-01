
var fs = require("fs");
// open the cmu dictionary file for "reading" (the little r)
// cmudict_file = File.open('cmudict.txt', 'r')
fs.readFile('cmudict.txt', function(err, data) {
  if(err) {
    return console.log(err);
  }
  var lines = data.toString().split("\n");
  dictObj = parseDict(lines);
  
  console.log(randomWord(dictObj['5']));
  console.log(randomWord(dictObj['7']));
  console.log(randomWord(dictObj['5']));

  
});

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

function randomWord(wordArray) {
	if(wordArray.length>0) {
		var index = Math.floor(Math.random()*wordArray.length);
		return wordArray[index];
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

