//building a unmber guessing game
var randomNumber = Math.floor(Math.random() * 100) + 1;
var prompt = require('prompt');

function guessMe() {
    prompt.get("Number?", function(err, userInput) {
        if (err) {
            console.log('there was an error');
        }
        else {
            var guess = userInput['Number?'];
                if (guess > randomNumber) {
                    console.log('Too high! Go down');
                    guessMe();

                }
                else if (guess < randomNumber) {
                    console.log('Too low! Go up');
                    guessMe();
                }
                else {
                    console.log('Well done! The number is:', randomNumber);
                }
            }
    });
    
}
guessMe();
