// ==UserScript==
// @name        VOD Time
// @namespace   nope
// @include     http://www.twitch.tv/*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function() {

  var url = window.location.href;
  if(url.indexOf("/v/") == -1) return; 
  
  $("<menu/>", {
    type: "context",
    id: "vodmenu"
  }).append($("<menuitem/>", {
    label: "Copy video url at current time",
    id: "copybtn"
  })).appendTo("body");

  $("body").attr("contextmenu", "vodmenu");

  $("#copybtn").on("click", function(e) {
    var timeSplit = $(".js-seek-currenttime")[0].innerHTML.split(":");
    var vodSeconds = 0;
    
    if(timeSplit.length > 2) {
      vodSeconds += timeSplit[0] * 60 * 60;
      vodSeconds += timeSplit[1] * 60;
      vodSeconds += timeSplit[2] * 1;
    } else {
      vodSeconds += timeSplit[0] * 60;
      vodSeconds += timeSplit[1] * 1;
    }

    window.prompt("Timecode", url.split("?")[0] + "?t=" + vodSeconds);
  });
  
});

