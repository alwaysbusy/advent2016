var days = [5,12,11,23,8,15,3,21,9,18,1,22,6,13,20,19,7,10,2,14,24,17,4,16];
var month = 12;
var year = 2016;

$(document).ready(function(){
  var veilDiv = document.createElement("div");
  veilDiv.setAttribute("id", "veil");
  veilDiv.style.display = "none";
  $("body").append(veilDiv);
});

$(document).ready(function(){
  var calendar = $("#calendar");
  for (var day in days) {
    //var available = today.getFullYear() > year || (year == today.getFullYear() && today.getMonth() + 1 > month) || (year == today.getFullYear() && month == today.getMonth() + 1 && today.getDate() >= days[day]);
    var available = true;
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
    });
    calendar.append(div);
  }
});

function veil(show, complete) {
  if(show == undefined) show = !($("#veil").css("display") == "block");
  if(complete == undefined) complete = null;

  if(show) {
    $("#veil").fadeIn(500, complete);
  } else {
    $("#veil").fadeOut(500, complete);
  }
}
