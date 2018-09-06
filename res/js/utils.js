function showTecladoCompleto() {
  keyboard = "qwertyuiopasdfghjkl_-zxcvbnm.@ ";
  makeKeyboard(keyboard, "keyboard");
  keyboard = "1234567890+";
  makeKeyboard(keyboard, "keypad");

  $(".keyboard button").click(function(event) {
    switch (this.value) {
      case "backspace":
        $("#" + fieldFocus).val($("#" + fieldFocus).val().substr(0, $("#" + fieldFocus).val().length - 1));
        break;
      case "space":
        $("#" + fieldFocus).val($("#" + fieldFocus).val() + " ");
        $("#" + fieldFocus).trigger('change');
        break;
      default:
        $("#" + fieldFocus).val($("#" + fieldFocus).val() + this.value);
        $("#" + fieldFocus).trigger('change');
    }
    $("#" + fieldFocus).focus();
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
  $("#" + divid + " #key-backspace").text(" ");
  $("#" + divid + " #key-space").text("Espaço");
}

function makeKey(key, counter, divid) {
  $('#' + divid).append('<button id="key-' + key + '" class="key active key' + counter + '" value="' + key + '" >' + key + '</button>');
}

function scrollToSection(sectionId) {
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#" + sectionId).offset().top
  }, 2000);
}

function showEmailDomains() {
  $("#emailDomains").removeClass("hide").addClass("show");
}

function hideEmailDomains() {
  $("#emailDomains").removeClass("show").addClass("hide");
}

function selectEmailDomain(domain) {
  $("#email").val($("#email").val() + domain);
  hideEmailDomains();
}

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i) {
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

function saveLead() {
  var data = getFormData($('#leadForm'));
  saveLeadRemote(data);
  saveLeadLocal(data);
}

function saveLeadRemote(data) {
  $.post("http://www.englishlivebrasil.com.br/games/bgs2018/api/", data, function(data) {
    console.log(data);
  });
}

function saveLeadLocal(data) {
  leads = getLocalLeads();
  if (leads == null){
    leads = JSON.stringify(data);
  } else {
    leads = leads + "," + JSON.stringify(data);
  }
  localStorage.setItem('leads', leads);
}

function getLocalLeads() {
  return localStorage.getItem('leads');
}
