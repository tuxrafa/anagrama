/* Você Perdeu */
  //Configs
  var minusTime = 2;
  var maxTurns = 5;
  var maxTime = 25;
  var fieldFocus = "nome";

  // Globals
  var word;
  var counter;
  var usedQuotes = [];
  var gameTime;
  var turns = 0;
  var rightAnswers = 0;
  var wrongAnswers = 0;

  function randomQuote() {
    quotesCount = quotes.length;
    quoteId = Math.floor(Math.random() * (quotesCount - 1));
    quote = quotes[quoteId];
    if (usedQuotes.length < quotesCount-2) {
      if (usedQuotes.indexOf(quoteId) > -1) {
        randomQuote();
      }
    } else {
      usedQuotes = [];
    }
    usedQuotes.push(quoteId);
    return quote;
  }

  function getWord(quote) {
    word = quote.match(/\[(.*?)\]/);
    return word[1];
  }

  function getLetters(word) {
    letters = word.substring(1, (word.length - 1));
    return letters;
  }

  function hideWord(word, letters) {
    html = "";
    for (var i = 0; i < letters.length; i++) {
      html += '<span class="letterPlace"><span class="letter hide" id="letter' + i + '">' + letters.charAt(i) + '</span></span>';
    }
    hiddenWord = "<div class='hiddenWord'>" + word.replace(letters, html) + "</div>";
    return hiddenWord;
  }

  function showQuote(quote, hiddenWord, word) {
    document.getElementById("quote").innerHTML = quote.replace(word, hiddenWord).replace(/[\[\]']+/g, '');
  }

  function shuffleLetters(letters) {
    return letters.split('').sort(function() {
      return 0.5 - Math.random()
    }).join('');
  }

  function showLetters(letters) {
    document.getElementById("letters").innerHTML = letters;
  }


  function checkWord(key) {
    if ($(".letter.hide").text()[0] == key.value) {
      rightKey(key);
      if ($(".letter.hide").length == 0) {
        isRight();
        window.clearTimeout(counter);
        $(".hiddenWord").addClass("pulse");
        setTimeout(function(){ newTurn(); }, 3000);
      }
    } else {
      wrongKey(key);
    }
  }

  function rightKey(key) {
    letterId = $(".letter.hide").attr('id');
    $("#" + letterId).removeClass("hide").addClass("show");
    $(key).removeClass("active").prop("disabled", true);
  }

  function wrongKey(key) {
    showMinusTime(key);
    removeTime();
    console.log(key);
  }

  function showMinusTime(wrongKey) {
    $(wrongKey).append('<span class="minusTime">-' + minusTime + 's</span>');
    slideToUp($("#" + wrongKey.id + " .minusTime"));
    setTimeout(function(){
      $("#" + wrongKey.id + " .minusTime").fadeOut("slow", function() {
          $("#" + wrongKey.id + " .minusTime").remove()
      });
    }, 600);
  }

function slideToUp(obj) {
    var div = obj;

    var height = div.css({
        display: "inline-block"
    }).height();

    div.css({
        overflow: "hidden",
        marginTop: height,
        height: 0
    }).animate({
        marginTop: 0,
        height: height
    }, 300, function () {
        $(this).css({
            display: "",
            overflow: "",
            height: "",
            marginTop: ""
        });
    });
}

  function removeTime() {
    startCounter(gameTime - minusTime);
  }

  function showData(quote) {
    title.innerText = quote.game;
    producer.innerText = quote.producer;
  }

  function makeVisual(quote, hiddenWord, word, quoteObj, shuffledLetters) {
    showQuote(quote, hiddenWord, word);
    showData(quoteObj);
    makeKeyboard(shuffledLetters, "letterboard");
  }

  function prepareGame() {
    quoteObj = randomQuote();
    quote = quoteObj.quote;
    word = getWord(quote);
    letters = getLetters(word);
    shuffledLetters = shuffleLetters(letters);
    hiddenWord = hideWord(word, letters);
    makeVisual(quote, hiddenWord, word, quoteObj, shuffledLetters);
  }

  function startCounter(newTime) {
    gameTime = newTime;
    window.clearTimeout(counter);
    if ((gameTime - 1) >= 0) {
      gameTime = gameTime - 1;
      if (gameTime > 9)
        preNumber = '00:';
      else {
        preNumber = '00:0';
        $("#numberCountdown").addClass("pulse");
      }
      numberCountdown.innerText = preNumber + gameTime;
      counter = setTimeout(function(){startCounter(gameTime)}, 1000);
    } else {
      isWrong();
      $("#numberCountdown").removeClass("pulse");
      newTurn();
    }
  }

  function showLevel() {
    level.innerText = "Level "+turns;
  }

  function isWrong() {
    wrongAnswers++;
    wrongs.innerText = wrongAnswers;
  }

  function isRight() {
    rightAnswers++;
    rights.innerText = rightAnswers;
  }

  function newTurn() {
    $(".hiddenWord").removeClass("pulse");
    if (turns < maxTurns) {
      turns++;
      prepareGame();
      gameStart();
      showLevel();
    } else {
      gameOver();
    }
  }

  function gameOver() {
    $("#letterboard button").removeClass("active").prop("disabled", true);
    scrollToSection("result");
    $("body").removeClass("slide");
    switch (true) {
      case rightAnswers<3:
        $("#result .final.noob").removeClass("hide");
        break;
      case rightAnswers<5:
        $("#result .final.gamer").removeClass("hide");
        break;
      default:
        $("#result .final.hard").removeClass("hide");

    }
  }

  function gameStart() {
    $("#letterboard button").click(function(event) {
      checkWord(this);
    });
    var gameTime = maxTime;
    startCounter(gameTime);
  }
