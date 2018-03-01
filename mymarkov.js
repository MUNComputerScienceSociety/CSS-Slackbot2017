// Initialize an empty dictionary
function Markov() {
    this.dict = {};
}

// Add a phrase to the Markov chain
Markov.prototype.add = function(phrase) {

   // Strip all non alphanumeric pieces
   // normalize case, and convert to array
   phrase = phrase.replace(/[^a-zA-Z0-9\'\`\’.]+/g, " ");
   var words = phrase.split(" ");

   // Build the dictionary
   for(var i=0; i<words.length-2; i++) {
       
       // Establish the prefix and suffix
       var prefix = words[i] + " " + words[i+1];
       var suffix = words[i+2];
       
       // If the prefix isn't in the dictionary,
       // then add it
       if(!(prefix in this.dict)) {
           this.dict[prefix] = {}; 
           this.dict[prefix].total = 1;
           this.dict[prefix][suffix] = 1;
       } else {
           
           // Otherwise increase the running total
           this.dict[prefix].total += 1;
           
           // Add the suffix if it doesn't already exists
           if(!(suffix in this.dict[prefix])) {
               this.dict[prefix][suffix] = 1;
           } else {
               // If it exists, just make a note that it
               // occurs an extra time
               this.dict[prefix][suffix] += 1;
           }
       }
   }   
};

// Get a weighted random choice of the next
// word, given a prefix
Markov.prototype.getNextWord = function(prefix) {

   var i = 0;
   var suffixArray = [];

   for(var suffix in this.dict[prefix]) {
       i++;

       if(suffix != 'total') {
           for(var j=0; j<this.dict[prefix][suffix]; j++) {
               suffixArray.push(suffix);
           }
       }

   }

   var randomIndex = Math.floor(Math.random() * suffixArray.length);
   var randomSuffix = suffixArray[randomIndex];
   return randomSuffix;
}

// Generate a sentence given a starting prefix
// and a target for the number of words in the sentence
Markov.prototype.generateSentence = function(startPrefix, numberOfWords) {
   var sentence = startPrefix.split(" ");
   
   for(var i=2; i<numberOfWords; i++) {
       var prefix = [sentence[i-2], sentence[i-1]].join(" ");
       var nextWord = this.getNextWord(prefix);
       
       // If we've reached the end of the chain
       // then use this sentence
       if(nextWord === undefined) {
         break;
       } else {
           // Otherwise keep going
           sentence.push(nextWord);
       }
   }

   return this.normalize(sentence.join(" "));
};

// Generate a sentence that is somewhat related to a word pair in a given
// input sentence
Markov.prototype.generateTopicSentence = function(topic) {
 // String extraneous symbols
 topic = topic.replace(/[^a-zA-Z0-9\'\’\`.]+/g, " ");
 
 // Remove last character if it's a space because split will give it
 // an extra empty element in that case
 if(topic[topic.length-1] == " ")
     topic = topic.slice(0,-1);

 // Split the sentence up into keywords
 var keywords = topic.split(" ");
 var sentences = [];
 
 for(var i=0; i<keywords.length-1; i++) {
   sentences.push(this.generateSentence(keywords[i] + " " + keywords[i+1],50));
 }

 console.log("Candidates are: " + sentences);
 
 // Choose the largest sentence
 var biggestSentenceIndex = 0;
 for(var i=0; i<sentences.length; i++) {
     // If this one is bigger than the current largest
     // then remember the index.
     if(sentences[i].length > sentences[biggestSentenceIndex].length) {
         biggestSentenceIndex = i;
     }
     // If it's the same size as the current largest, choose it randomly over
     // the current largest.
     if(sentences[i].length == sentences[biggestSentenceIndex].length) {
           biggestSentenceIndex = (Math.random()*100<50) ? i : biggestSentenceIndex;
     }
 }
 return sentences[biggestSentenceIndex];
}

// Capitalize a string
Markov.prototype.capitalize = function(sentence) {
   return sentence[0].toUpperCase() + sentence.slice(1);
}

// Capitalize and add a period.
Markov.prototype.normalize = function(sentence) {
 return this.capitalize(sentence) + ".";
}

module.exports = Markov;
