var fs = require("fs");
// open the cmu dictionary file for "reading" (the little r)
// cmudict_file = File.open('cmudict.txt', 'r')
fs.readFile('cmudict.txt', function(err, data) {
  if(err) {
    return console.log(err);
  }
  var lines = data.toString().split("\n");
  sylObj = parseDict(lines);

  
});

function parseDict(lines) {
	/*I want an object with each syllable count, and at that count, an array of 
	the words. So I can find the syllble count I want, then choose a random word using the index
	{
		'1': [...],
		'2': [...],
		'3': [...]
	}

	lines.forEach(function(line) {
	    line_split = line.split("  ");

	    
  	});
	*/

}


function countSyllables(syllables) {
	var count = 0;
	syllables.forEach(function(syl) {
		if(syl.match(/\d/)) count++;
	})
	return count;
}