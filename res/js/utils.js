function showTecladoCompleto() {
  keyboard = "qwertyuiopasdfghjkl_-zxcvbnm.@ ";
  makeKeyboard(keyboard, "keyboard");
  keyboard = "1234567890+";
  makeKeyboard(keyboard, "keypad");

  $(".keyboard button").click(function(event) {
    switch (this.value) {
      case "backspace":
        $("#"+fieldFocus).val($("#"+fieldFocus).val().substr(0, $("#"+fieldFocus).val().length-1));
        break;
      case "space":
        $("#"+fieldFocus).val(  $("#"+fieldFocus).val() + " " );
        break;
      default:
        $("#"+fieldFocus).val(  $("#"+fieldFocus).val() + this.value );
    }
    $("#"+fieldFocus).focus();
  });
}

function makeKeyboard(letters, divid) {
  $('#' + divid).empty();
  for (var i = 0; i < letters.length; i++) {
    switch (letters.charAt(i)) {
      case "+":
        makeKey("backspace", i, divid);
        break;
      case " ":
        makeKey("space", i, divid);
        break;
      default:
        makeKey(letters.charAt(i), i, divid);
    }
  }
}

function makeKey(key, counter, divid) {
  $('#' + divid).append('<button id="key-' + key + '" class="key active key' + counter + '" value="' + key + '" >' + key + '</button>');
}

function scrollToSection(sectionId) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#"+sectionId).offset().top
    }, 2000);
}
