/* Você Perdeu */
  //Globals
  var word;
  var counter;
  var usedQuotes = [];
  var turns = 0;
  var rightAnswers = 0;
  var wrongAnswers = 0;
  var maxTurns = 5;
  var maxTime = 15;
  var fieldFocus = "nome";

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
      html += ' <span class="letter hide" id="letter' + i + '">' + letters.charAt(i) + '</span>';
    }
    hiddenWord = word.replace(letters, html);
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
        newTurn();
      }
    }
  }

  function rightKey(key) {
    letterId = $(".letter.hide").attr('id');
    $("#" + letterId).removeClass("hide").addClass("show");
    $(key).removeClass("active").prop("disabled", true);
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

  function startCounter(gameTime) {
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
      marcaErro();
      $("#numberCountdown").removeClass("pulse");
      newTurn();
    }
  }

  function marcaErro() {
    wrongAnswers++;
    wrongs.innerText = wrongAnswers;
  }

  function isRight() {
    rightAnswers++;
    rights.innerText = rightAnswers;
  }

  function newTurn() {
    if (turns < maxTurns) {
      turns++;
      prepareGame();
      gameStart();
    } else {
      gameOver();
    }
  }

  function gameOver() {
    $("#letterboard button").removeClass("active").prop("disabled", true);
    scrollToSection("result");
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
