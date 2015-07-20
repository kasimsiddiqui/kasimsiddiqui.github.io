function readURL(guess) {
 var urlSearch = window.location.search;
 var input = urlSearch.split(guess + "=");
 return input[1];
};

function Game (answer, guess, wrong) {
    this.answer = answer;
    this.guess = guess;
    this.wrong = wrong;

    this.attempt = function() {
      if (guess == answer) {
        var el = document.getElementById("game");
        var goodJob = document.createElement('p');
        goodJob.textContent = "You are right!";
        el.appendChild(goodJob);
        wrong=false;
      }

      else if (guess > answer) {
        var el = document.getElementById("game");
        el.innerHTML = "I'm not that old! Press ok and try again!";
        wrong = true;
      }

      else if (guess < answer) {
        var el = document.getElementById("game");
        el.innerHTML = "I'm not that young! Press ok and try again!";
        wrong = true;
      }

      if(wrong) {
      this.attempt();
      }
    };
  }

var getInput = readURL("guess");
var kasim = new Game (26, getInput);
kasim.attempt();
