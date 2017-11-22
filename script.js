var guessedLetters = [];
var fruits = ["orange", "mango", "strawberry"];
var animals = ["cat", "monkey", "elephant"];
var countries = ["usa", "Mexico"];
var word = "";
var guessesLeft = 20;
var slots = [];
var allLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var trueFalse = [];

function addLetters(){
    var result = "<option value='" + 0 + "'>" + "choose a letter" + "</option>";
    for(var i = 0; i < 26; i++){
        if(guessedLetters.indexOf(allLetters[i]) == -1){
            result += "<option value='" + (i + 1) + "'>" + allLetters[i] + "</option>";
        }
        document.getElementById("letter").innerHTML = result;
    }
}

function startGame(categories){
    document.getElementById("guessedLetters").innerHTML = "";
    document.getElementById("categories").value = 0;
    word = "";
    document.getElementById("wonLost").innerHTML = "";
    guessedLetters = [];
    guessesLeft = 20;
    addLetters();
    document.getElementById("howManyLeft").innerHTML = "Guesses Left: " + guessesLeft;
    document.getElementById("guess").innerHTML = "";
    // var categories = parseInt(categories);
    document.getElementById("categories").value = categories;
    var randFruit = fruits[Math.floor(Math.random() * fruits.length)];
    var randAnimal = animals[Math.floor(Math.random() * animals.length)];
    var randCountry = countries[Math.floor(Math.random() * countries.length)];
    var pick = [0, randFruit, randAnimal, randCountry];
    word = pick[categories];
    console.log(word);
    slots.length = 0;
    if(categories >= 0){
        var temp = "";
        for(var i = 0; i < word.length; i++){
            slots[i] = " _";
            temp += slots[i];
            trueFalse[i] = false;
        }
        document.getElementById("guess").innerHTML = temp;
        document.getElementById("howManyLeft").innerHTML = "Guesses Left: " + guessesLeft;
    }
    console.log(temp);
}


function guessLetter(){
    if(guessesLeft == 0){
        return;
    }
    var letter = document.getElementById("letter").value;
    letter = parseInt(letter) -1;
    var findLetter = allLetters[letter];
    guessedLetters.push(findLetter);
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
    console.log(findLetter);
    if(word.indexOf(findLetter) == -1){
        guessesLeft --;
        if(guessesLeft == 0){
            document.getElementById("wonLost").innerHTML = "You lost";
        }
        document.getElementById("howManyLeft").innerHTML = "Guesses Left: " + guessesLeft;
    } else {
        var line = word;
        var x;
        var y = 0;
        while((x = line.indexOf(findLetter)) > -1){
            slots[x + y] = findLetter;
            trueFalse[x + y] = true;
            line = line.substring(x + 1);
            y += x + 1;
        }
        var temp = slots[0];
        for(var i = 1; i < slots.length; i++){
            temp += slots[i];
        }

        var found = true;
        for(var i = 0; i < word.length && found; i++){
            if(trueFalse[i] == false){
                found = false;
            }
        }
        if(found == true){
            document.getElementById("wonLost").innerHTML = "You won!";
        }


        document.getElementById("guess").innerHTML = temp;
        console.log(temp);
    }
    addLetters();
    document.getElementById("letter").value = 0;
}