var upCaseChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var lowCaseChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                   "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var numChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

var specChars = ['!', '"', '#', '$', '%', '&', "'", '()', '*', '+', ',', '-', '.', '/', ':', 
                ';', '<', '=', '>', '?', '@', '[', ']', '`', '{', '|', '}', '~', '_', '^'];

function getPassOpt() {
  var length = parseInt(
    prompt("How many characters will your password contain?")
  );

  if (isNaN(length) === true) {
    alert("The password length must be a number!");
    return;
  }

  if (length < 8) {
    alert("The password length can't be less than 8 characters!");
    return;
  }

  if (length > 128) {
    alert("The password length can't be more than 129 characters!");
    return;
  }

  var addUpCaseChars = confirm("Click OK to add uppercase characters.");
  var addLowCaseChars = confirm("Click OK to add lowercase characters.");
  var addNumChars = confirm("Click OK to add numeric characters.");
  var addSpecChars = confirm("Click OK to add special characters.");

  if (
    addSpecChars === false && addNumChars === false &&
    addLowCaseChars === false && addUpCaseChars === false
  ){
    alert("You must select at least one character type!");
    return;
  }

  var passOpt = {
    addUpCaseChars: addUpCaseChars, addLowCaseChars: addLowCaseChars,
    addNumChars: addNumChars, addSpecChars: addSpecChars, length: length
  };
  return passOpt;
}

function getRandom(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomEl = array[randomIndex];
  return randomEl;
}

function genPass() {
  var options = getPassOpt();
  var possibleChars = [];
  var guarantChars = [];
  var result = [];

  if (options.addSpecChars) {
    possibleChars = possibleChars.concat(specChars);
    guarantChars.push(getRandom(specChars));
  }

  if (options.addNumChars) {
    possibleChars = possibleChars.concat(numChars);
    guarantChars.push(getRandom(numChars));
  }

  if (options.addLowCaseChars) {
    possibleChars = possibleChars.concat(lowCaseChars);
    guarantChars.push(getRandom(lowCaseChars));
  }

  if (options.addUpCaseChars) {
    possibleChars = possibleChars.concat(upCaseChars);
    guarantChars.push(getRandom(upCaseChars));
  }

  for (var i = 0; i < options.length; i++) {
    var possibleChar = getRandom(possibleChars);
    result.push(possibleChar);
  }

  for (var i = 0; i < guarantChars.length; i++) {
    result[i] = guarantChars[i];
  }

  return result.join('');
}

var genButton = document.querySelector('#generate');

function writePass() {
  var password = genPass();
  var passText = document.querySelector('#password');

  passText.value = password;
}

genButton.addEventListener('click', writePass);