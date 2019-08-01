// program
var num_of_letters = 0;
var num_of_words = 0;
var original_word = "";
var jumbled_word = "";
var user_input = "";
var word_list = [""];

// initial setup
getWordFile();

// functions
function getWordFile(){
    // read file from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://ishajagadish.github.io/wordjumble/words.txt', true);
    request.send();
    request.onload = function () {
        if (request.status == 200) {
		// get contents of the word file
                var contents = request.responseText;
		// read it line by line and store it in word_list
		word_list = contents.split("\n");
		document.getElementById("num_of_letters").focus();
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
  num_of_letters = parseInt(document.getElementById("num_of_letters").value);
  console.log("NUM OF LETTERS: " + num_of_letters);
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
  document.getElementById("user_input").value = "";  
  document.getElementById("user_input").style.display = "block";
  document.getElementById("user_input").focus();
  document.getElementById("submit").style.display = "block";
  // Simulate clicking submit button when the user releases a key on the keyboard
  document.getElementById("user_input").addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submit").click();
    }
  }); 
}

function submit() {
  user_input = document.getElementById("user_input").value;
  if (user_input.toLowerCase() === original_word.toLowerCase()) {
    document.getElementById("message").innerHTML = "You got it!";    
  } else {
    document.getElementById("message").innerHTML = "Sorry! The correct answer is: " + original_word.toUpperCase() + ".";
  }
}


