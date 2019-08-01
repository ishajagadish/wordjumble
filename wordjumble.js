// functions
function getWordFile(){
    // read file from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'words.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return request.responseText;
            }
        }
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function pickWord() {
  var i = getRandomInt(word_list.length);
  return word_list[i];
}

function jumbleWord(word) {
  var letterArray = word.split("");
  for (var i = 0; i < letterArray.length; i++) {
    var j = getRandomInt(letterArray.length);
    var temp = letterArray[i];
    letterArray[i] = letterArray[j];  
	  letterArray[j] = temp;
  }
  return letterArray.join("");
}

function play() {
  num_of_letters = document.getElementById("num_of_letters").value.parseInt();
  original_word = pickWord();
  while (original_word.length != num_of_letters) {
    original_word = pickWord();
  }
  jumbled_word = jumbleWord(original_word);
  while (jumbled_word === original_word) {
    jumbled_word = jumbleWord(jumbled_word);
  }
  document.getElementById("jumbled_word").innerHTML = jumbled_word;
  document.getElementById("message").innerHTML = "Here is the jumbled word. Go!";
  document.getElementById("user_input").show();
  document.getElementById("submit").show();
}

function submit() {
  user_input = document.getElementById("user_input").value;
  if (user_input === original_word) {
    document.getElementById("message").innerHTML = "You got it!";    
  } else {
    document.getElementById("message").innerHTML = "Sorry! The correct answer is: " + original_word + ".";
  }
}

// program
var num_of_letters = 0;
var num_of_words = 0;
var original_word = "";
var jumbled_word = "";
var user_input = "";

// get contents of the word file
var contents = getWordFile();

// read it line by line and store it in word_list
var word_list = contents.split("\n");
