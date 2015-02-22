jQuery(document).ready(function($) {
	now = new Date();
	var times = getJoeyTime();
	$("#campustime").text(parseTime(times[0]));
	$("#davistime").text(parseTime(times[1]));
	$("#olintime").text(parseTime(times[2]));
	if(localStorage.getItem("hazIntro") == "true"){
		$('#intro').hide();
	}
});

function help(){
 	$('#intro').show();
}

// Andy - Preload images to prevent white flashes
// http://perishablepress.com/3-ways-preload-images-css-javascript-ajax/
	var images = new Array()
	preload (
		"assets/bg-academic.jpg",
		"assets/bg-bray.jpg",
		"assets/bg-dewick.jpg",
		"assets/bg-jumbo.jpg",
		"assets/bg-quad.jpg",
		"assets/bg-tisch.jpg",
		"assets/bg-fall.jpg",
		"assets/bg-water.jpg",
		"assets/bg-pattern-1-green.png",
		"assets/bg-pattern-1-blue.png"
	)
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			images[i] = new Image()
			images[i].src = preload.arguments[i]
		}
	}

/* BACKGROUND IMAGE SWITCHER
  - with a numbered filenaming scheme we could make this switcher simpler
  - bg-1.jpg, bg-2.jpg, bg-3.png, etc
-------------------------------------------------- */
$(document).ready(function() { 
    $("#bgswitch").click(function() {
        var src = $('html').css('background-image');
        console.log($('html').css('background-image'))
        if(src == 'url(http://tuftsdash.com/dev/assets/bg-pattern-1-green.png)') {
          $("html").css("background-image","url(assets/bg-pattern-1-blue.png)");
        } else if(src == "url(http://tuftsdash.com/dev/assets/bg-pattern-1-blue.png)") {
          $("html").css("background-image","url(assets/bg-academic.jpg)");
          $("html").css("background-repeat","none");
          $("html").css("background-size","cover");
        } else if(src == "url(http://tuftsdash.com/dev/assets/bg-academic.jpg)") {
          $("html").css("background-image","url(assets/bg-bray.jpg)");
        } else if(src == "url(http://tuftsdash.com/dev/assets/bg-bray.jpg)") {
          $("html").css("background-image","url(assets/bg-dewick.jpg)");
        } else if(src == "url(http://tuftsdash.com/dev/assets/bg-dewick.jpg)") {
          $("html").css("background-image","url(assets/bg-fall.jpg)");
        } else if(src == "url(http://tuftsdash.com/dev/assets/bg-fall.jpg)") {
          $("html").css("background-image","url(assets/bg-jumbo.jpg)");
        } else if(src == "url(http://tuftsdash.com/dev/assets/bg-jumbo.jpg)") {
          $("html").css("background-image","url(assets/bg-quad.jpg)");
        } else if(src == "url(http://tuftsdash.com/dev/assets/bg-quad.jpg)") {
          $("html").css("background-image","url(assets/bg-tisch.jpg)");
        } else if(src == "url(http://tuftsdash.com/dev/assets/bg-tisch.jpg)") {
          $("html").css("background-image","url(assets/bg-water.jpg)");
        } else {
          $("html").css("background-image","url(assets/bg-pattern-1-green.png)");
          $("html").css("background-repeat","repeat");
          $("html").css("background-size","initial");
        }
    }); 
});

function killIntro(){
	localStorage.setItem("hazIntro", "true");
	$('#intro').hide();
}

/* COLORS
-------------------------------------------------- */

/* Checks user settings on load and applies them */
$(document).ready(
function checkSettings() {
  colorsetting = localStorage.getItem("color");
  nightsetting = localStorage.getItem("night");
  if (colorsetting == null) {
    $('#colorswitcher').attr('onclick', "color2()");
    color1();
    localStorage.setItem("color", "color1");
  }
  if (colorsetting == "color1") { color1() }
  if (colorsetting == "color2") { color2() }
  if (colorsetting == "color3") { color3() }
  if (colorsetting == "color4") { color4() }
  if (colorsetting == "color5") { color5() }
  if (nightsetting == "night") { nightmodeon() }
}
);

function color1() {
  $('#colorswitcher').attr('onclick', "color2()");
  $(".bubbletitle").removeClass("color5");
  $(".bubbletitle").addClass("color1");
  $("#header").removeClass("color5");
  $("#header").addClass("color1");
  localStorage.setItem("color", "color1");
}
function color2() {
  $('#colorswitcher').attr('onclick', "color3()");
  $(".bubbletitle").removeClass("color1");
  $(".bubbletitle").addClass("color2");
  $("#header").removeClass("color1");
  $("#header").addClass("color2");
  localStorage.setItem("color", "color2");
}
function color3() {
  $('#colorswitcher').attr('onclick', "color4()");
  $(".bubbletitle").removeClass("color2");
  $(".bubbletitle").addClass("color3");
  $("#header").removeClass("color2");
  $("#header").addClass("color3");
  localStorage.setItem("color", "color3");
}
function color4() {
  $('#colorswitcher').attr('onclick', "color5()");
  $(".bubbletitle").removeClass("color3");
  $(".bubbletitle").addClass("color4");
  $("#header").removeClass("color3");
  $("#header").addClass("color4");
  localStorage.setItem("color", "color4");
}
function color5() {
  $('#colorswitcher').attr('onclick', "color1()");
  $(".bubbletitle").removeClass("color4");
  $(".bubbletitle").addClass("color5");
  $("#header").removeClass("color4");
  $("#header").addClass("color5");
  localStorage.setItem("color", "color5");
}

/* NIGHT MODE
-------------------------------------------------- */
function nightmodeon() {
  $('#nightswitcher').attr('onclick', "nightmodeoff()");
  $(".bubbletitle").addClass("night");
  $(".bubblecontent").addClass("night");
  $("html").addClass("night");
  $("#header").addClass("night");
  localStorage.setItem("night", "night");
}
function nightmodeoff() {
  $('#nightswitcher').attr('onclick', "nightmodeon()");
  $(".bubbletitle").removeClass("night");
  $(".bubblecontent").removeClass("night");
  $("html").removeClass("night");
  $("#header").removeClass("night");
  localStorage.setItem("night", "day");
}






/* WMFO Radio JSONP data collection
http://stackoverflow.com/questions/14305128/how-to-use-jsonp
-------------------------------------------------- */

$(document).ready(function updateRadio(){
  jQuery.ajax({
  "async": true,
  "dataType": 'jsonp',
  "url": "http://spinitron.com/public/newestsong.php?station=wmfo&callback=whatever",
  "method": "GET",
  "error": function (jqXHR, textStatus, errorThrown) {
      //included so you can see any errors
      console.log(textStatus + ': ' + errorThrown);
  },
  "success": function (data, textStatus, jqXHR) {
      data = jQuery.parseHTML(data);
      songname = $(data).find(".songpart").text();
      artist = $(data).find(".artistpart").text();
      album = $(data).find(".diskpart").text();
      dj = $(data).find(".djpart").text();
      songurl = ("https://www.google.com/?gws_rd=ssl#q=" + songname + " " + artist).replace(/\s/g,"+");;
      $("#songname").text(songname);
      $("#artist").text(artist);
      $("#album").text(album);
      $("#dj").text(dj);
      $("#songurl").attr('href', songurl);
  }
  });
setTimeout(updateRadio, 15000);
});


function radioOn() {
  document.getElementById('player').play();
  $("#radiobutton").attr('src', 'assets/ico-pause.png');
  $('#radiobutton').attr('onclick', "radioOff()");
}

function radioOff() {
  document.getElementById('player').pause();
  $("#radiobutton").attr('src', 'assets/ico-play.png');
  $('#radiobutton').attr('onclick', "radioOn()");
}

/* Expand Bubbles
-------------------------------------------------- */
function expandJoey(){
	isolate('#joey');
	$('#joey').children('#bubbletitle').children('h3').text('NEXT STOPS')
	day = now.getDay();
	temp = document.createElement('div');
	temp.setAttribute('id', 'temporary');	
	temp.setAttribute('class', 'bubblecontent');
	$('#joey').append(temp);
	$('#temporary').hide();
	dayname = document.createElement('h3');
	dayname.innerHTML = parseDay(day).toUpperCase()+' SCHEDULE';
	$('#temporary').append(dayname);
	drawMap();
	var currCenter = map.getCenter();
	postSchedule(day);

	// change the background image
	//$("#background").css('background-image', 'url(assets/bg-quad.jpg)');
	google.maps.event.trigger(map, 'resize');
	map.setCenter(currCenter);
	$('#joey').attr('onclick', null);
	
}

function expandEvents(){
	isolate('#events');
}

function expandDining(){
  isolate('#dining');
}

function newexpandDining(){
	document.getElementById('dining').style.display='none';
	document.getElementById('diningfull').style.display='block';
	document.getElementById('diningfull').addClass('fadeoutleft').removeClass('fadeinright');
}

function contractDining() {
  
}

function expandNews(){
	isolate('#news');
}

function expandPlaces(){
	isolate('#places');
}

function expandSports(){
	isolate("#sports")
}

function expandLaundry(){
    isolate("#laundry")
}

function isolate(id){
	$(".bubble").not(id).hide();
	$("#buttonLeft").attr('src', 'assets/ico-arrow.png');
	$("#buttonLeft").attr('onclick', 'revert('+'\''+id+'\''+')');
	var name = id.split('#')[1];
	$("#title").text(toTitleCase(name));
}

function revert(id){
	$('.bubble').not('#intro').show();
	var name = id.split('#')[1];
	$(id).attr('onclick', 'expand'+toTitleCase(name)+'()');
	$(id).children('#bubbletitle').children('h3').text(name.toUpperCase());
	$("#buttonLeft").attr('src', 'assets/ico-help.png');
	$("#buttonLeft").attr('onclick', 'help()');
	$("#title").text('Tufts Dash');
	$('#temporary').slideUp(500, function(){
		$('#temporary').remove();
	});
}

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function parseTime(time){
	var meridiem = ' AM';
	hours=parseInt(time.substring(0,2));
	if(hours > 12){
		hours-=12;
		meridiem = ' PM';
	}
	else if(hours == 0){
		hours=12;
	}
	return String(hours) + ':' + time.substring(2) + meridiem;
}

function getJoeyTime(){
	var toDisplay = [-1,-1,-1];
	var minute = now.getMinutes()
	if(minute<=9){
		var time = String(now.getHours())+'0'+String(minute);
	}
	else{
		var time = String(now.getHours())+String(minute);
	}
	var day = now.getDay();
	for(i=0;i<joeyTimes[day].length;i++){
		if(time<=joeyTimes[day][i][2]){
			toDisplay[2]=joeyTimes[day][i][2];
			if(time<=joeyTimes[day][i][1]){
				toDisplay[1]=joeyTimes[day][i][1];
				if(time<=joeyTimes[day][i][0]){
					toDisplay[0]=joeyTimes[day][i][0];
				}
				else{
					toDisplay[0]=joeyTimes[day][i+1][0];
				}
			}
			else{
				toDisplay[1]=joeyTimes[day][i+1][1];
				if(time<=joeyTimes[day][i][0]){
					toDisplay[0]=joeyTimes[day][i][0];
				}
				else{
					toDisplay[0]=joeyTimes[day][i+1][0];
				}
			}
			break;
		}
	}
	return toDisplay;
}

function postSchedule(day){
  var t  = document.createElement('table');
  var tb = document.createElement('tbody');
  for(i=0;i<joeyTimes[day].length;i++){
  	var tr = document.createElement('tr');
  	for(j=0;j<joeyTimes[day][i].length;j++){
  		var td = document.createElement('td');
   		td.appendChild(document.createTextNode(parseTime(joeyTimes[day][i][j]))); 
   		tr.appendChild(td);
  	}
  	tb.appendChild(tr);
  }
  var th = document.createElement('thead');
     	var tr = document.createElement('tr');
  	for(j=0;j<3;j++){
  		var td = document.createElement('td');
  		var place;
  		switch (j){
  			case 0:
  				place = 'CAMPUS';
  				break;
			case 1:
				place = 'DAVIS';
				break;
			case 2:
				place = 'OLIN';
				break;
  		}
  		td.appendChild(document.createTextNode(place));
   		tr.appendChild(td);
  	}
  	th.appendChild(tr);
  t.appendChild(th);
  t.appendChild(tb);
  $("#temporary").append(t);
  $('#temporary').slideDown(500);
}

function parseDay(day){
	var today;
	switch (day){
		case 0:
		  today='sunday';
		  break;
		case 1:
		  today='monday';
		  break;
		case 2:
		  today='tuesday';
		  break;
		case 3:
		  today='wednesday';
		  break;
		case 4:
		  today='thursday';
		  break;
		case 5:
		  today='friday';
		  break;
		case 6:
		  today='saturday';
		  break;
	}
	return today;
}