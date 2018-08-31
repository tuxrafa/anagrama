/* Você Perdeu */
  //Globals
  var word;
  var counter;
  var usedQuotes = [];
  var turns = 0;
  var rightAnswers = 0;
  var wrongAnswers = 0;
  var maxTurns = 5;
  var maxTime = 5;

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

  function makeKeyboard(letters, divid) {
    $('#' + divid).empty();
    for (var i = 0; i < letters.length; i++) {
      makeKey(letters.charAt(i), i, divid);
    }
  }

  function makeKey(key, counter, divid) {
    $('#' + divid).append('<button id="key-' + key + '" class="key active key' + counter + '" value="' + key + '" >' + key + '</button>');
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
    $("#" + letterId).removeClass("hide");
    $("#" + letterId).addClass("show");
    $(key).removeClass("active").prop("disabled", true);
  }

  function showData(quote) {
    title.innerText = quote.game;
    producer.innerText = quote.producer;
  }

  function makeVisual(quote, hiddenWord, word, quoteObj, shuffledLetters) {
    showQuote(quote, hiddenWord, word);
    showData(quoteObj);
    makeKeyboard(shuffledLetters, "keyboard");
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
      if (gameTime > 9) preNumber = '00:'; else preNumber = '00:0';
      numberCountdown.innerText = preNumber + gameTime;
      counter = setTimeout(function(){startCounter(gameTime)}, 1000);
    } else {
      marcaErro();
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
      iniciaJogo();
    } else {
      console.log("Game Over");
    }
  }

  function iniciaJogo() {
    $("#keyboard button").click(function(event) {
      checkWord(this);
    });
    var gameTime = maxTime;
    startCounter(gameTime);
  }

  function showrTecladoCompleto() {
    keyboard = "qwertyuiopasdfghjkl_-zxcvbnm.@";
    makeKeyboard(keyboard, "keyboard");
    keyboard = "1234567890+";
    makeKeyboard(keyboard, "keypad");
  }

  window.onload = function() {
    newTurn();
    //showrTecladoCompleto();
  }
