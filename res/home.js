var days = [5,12,11,23,8,15,3,21,9,18,1,22,6,13,20,19,7,10,2,14,24,17,4,16];
var month = 12;
var year = 2016;

var storageVal = "calendarviewed-" + month + "-" + year;

function getViewed() {
  var viewed = localStorage.getItem(storageVal);
  if(viewed != null) {
    viewed = viewed.split(",");
    for(var i in viewed) viewed[i] = parseInt(viewed[i]);
  } else {
    viewed = [];
  }
  return viewed;
}

function appendViewed(day) {
  var viewed = getViewed();
  if(viewed.indexOf(day) == -1) {
    viewed.push(day);
  }
  localStorage.setItem(storageVal, viewed.join(","));
}

$(document).ready(function(){
  var veilDiv = document.createElement("div");
  veilDiv.setAttribute("id", "veil");
  veilDiv.style.display = "none";
  $("body").append(veilDiv);

  var instructionDiv = document.createElement("div");
  instructionDiv.setAttribute("id", "instruction");
  instructionDiv.style.display = "none";
  var close = document.createElement("button");
  close.setAttribute("type", "button");
  close.setAttribute("class", "close");
  close.setAttribute("aria-label", "close");
  var closeSpan = document.createElement("span");
  closeSpan.setAttribute("aria-hidden", "true");
  closeSpan.appendChild(document.createTextNode("\u00D7"));
  close.appendChild(closeSpan);
  instructionDiv.appendChild(close);
  var instructions = document.createElement("div");
  instructions.setAttribute("class", "container");
  instructionDiv.appendChild(instructions);
  $("body").append(instructionDiv);
});

$(document).ready(function(){
  var calendar = $("#calendar");
  var today = new Date();
  for (var day in days) {
    var available = today.getFullYear() > year || (year == today.getFullYear() && today.getMonth() + 1 > month) || (year == today.getFullYear() && month == today.getMonth() + 1 && today.getDate() >= days[day]);
    var div = document.createElement("div");
    div.setAttribute("id", "day-" + days[day]);
    var classes = "col-lg-2 col-md-2 col-sm-3 col-xs-4 text-center day";
    var today = new Date();
    if(available) classes += " available";
    div.setAttribute("class", classes);
    div.setAttribute("data-day", days[day]);
    div.appendChild(document.createTextNode(days[day]));
    if(available) $(div).click(function(){
      veil(true);
      instructions($(this).attr("data-day"), null, function(){veil(false);});
      $(this).addClass("viewed");
      appendViewed(parseInt($(this).attr("data-day")));
    });
    calendar.append(div);
  }

  var viewed = getViewed();
  for(var i in viewed) {
    $("#day-" + viewed[i]).addClass("viewed");
  }

  var path = window.location.href.split("/");
  if(path[path.length - 1] != "") {
    var day = parseInt(path[path.length - 1]);
    $("#day-" + day).click();
  } else {
    window.history.replaceState(null, document.title, "./#/");
  }
});

function setupFeatures(selector) {
  if(selector == undefined) selector = document;

  $(selector).find(".infobox").each(function(){
    $(this).find(".infobox-details").hide();
    $(this).find(".infobox-opener").click(function(){
      $(this).parent().find(".infobox-details").slideToggle(300);
    });
  });

  $(selector).find("a").each(function(){
    if(location.hostname !== this.hostname && this.hostname.length) {
      $(this).attr("target", "_blank");
    }
  });

  $(selector).find(".sample").click(function(){
    window.open("day/" + $(this).attr("data-view") + ".html", "sampleWindow", "chrome=yes,centerscreen=yes,status=no,personalbar=no,location=yes,toolbar=no,menubar=no");
  });

  $(selector).find(".download").click(function(){
    var downloader = document.createElement("a");
    downloader.setAttribute("id", "hiddenDl");
    downloader.setAttribute("href", "day/" + $(this).attr("data-view") + "." + $(this).attr("data-download"));
    downloader.setAttribute("download", $(this).attr("data-view") + "." + $(this).attr("data-download"));
    $("body").append(downloader);
    downloader.click();
    downloader.remove();
  });
}

$(document).ready(setupFeatures);

function veil(show, complete) {
  if(show == undefined) show = !($("#veil").css("display") == "block");
  if(complete == undefined) complete = null;

  if(show) {
    $("#veil").fadeIn(500, complete);
  } else {
    $("#veil").fadeOut(500, complete);
  }
}

function instructions(day, complete, close) {
  $("#instruction .close").one("click", function(){
    $("#instruction").fadeOut(500);
    window.history.pushState(null, document.title, "./#/");
  });
  $("#instruction .close").one("click", close);
  $("#instruction .container").load("day/" + day + ".part", function() {
    setupFeatures(this);
    $("#instruction").fadeIn(500, complete);
    window.history.pushState({"day":day}, "Advent Day " + day, "./#/" + day);
  });
}

window.addEventListener("popstate", function(event) {
  if(event.state == null) {
    $("#instruction .close").click();
  } else if(event.state.day) {
    $("#day-" + event.state.day).click();
  }
});
