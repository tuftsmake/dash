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
		"assets/bg-fall.jpg",
		"assets/bg-water.jpg",
		"assets/bg-pattern-1.jpg",
		"assets/bg-pattern-2.jpg",
		"assets/bg-pattern-1-green.png",
		"assets/bg-pattern-1-green.png"
	)
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			images[i] = new Image()
			images[i].src = preload.arguments[i]
		}
	}

$(document).ready(function() { 
    $("img#more").click(function() {
        var src = $('html').css('background-image');
        console.log($('html').css('background-image'))
        if(src == 'url(http://tuftsmake.com/dash/assets/bg-pattern-1-green.png)') {
          $("html").css("background","url(assets/bg-pattern-1-blue.png) repeat");
        } else if(src == "url(http://tuftsmake.com/dash/assets/bg-pattern-1-blue.png)") {
          $("html").css("background-image","url(assets/bg-academic.jpg)");
        } else if(src == "url(http://tuftsmake.com/dash/assets/bg-academic.jpg)") {
          $("html").css("background-image","url(assets/bg-bray.jpg)");
        } else if(src == "url(http://tuftsmake.com/dash/assets/bg-bray.jpg)") {
          $("html").css("background-image","url(assets/bg-dewick.jpg)");
        } else if(src == "url(http://tuftsmake.com/dash/assets/bg-dewick.jpg)") {
          $("html").css("background-image","url(assets/bg-fall.jpg)");
        } else if(src == "url(http://tuftsmake.com/dash/assets/bg-fall.jpg)") {
          $("html").css("background-image","url(assets/bg-jumbo.jpg)");
        } else if(src == "url(http://tuftsmake.com/dash/assets/bg-jumbo.jpg)") {
          $("html").css("background-image","url(assets/bg-quad.jpg)");
        } else if(src == "url(http://tuftsmake.com/dash/assets/bg-quad.jpg)") {
          $("html").css("background-image","url(assets/bg-tisch.jpg)");
        } else if(src == "url(http://tuftsmake.com/dash/assets/bg-tisch.jpg)") {
          $("html").css("background-image","url(assets/bg-water.jpg)");
        } else {
          $("html").css("background-image","url(assets/bg-pattern-1-green.png)");
        }
    }); 
});


function expandJoey(){
	isolate('#joey');
	$('#joey').children('#titlebar').children('h2').text('NEXT STOPS')
	// joey = document.getElementsByClassName('joey')[0];
	// joey.getElementsByTagName('h2')[0].innerHTML = 'NEXT STOPS';
	day = now.getDay();
	temp = document.createElement('div');
	temp.setAttribute('id', 'temporary');	
	$('#joey').append(temp);
	$('#temporary').hide();
	dayname = document.createElement('h2');
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

function killIntro(){
	localStorage.setItem("hazIntro", "true");
	$('#intro').hide();
	// add location to the url
	// window.location.hash = 'places';
}

function expandEvents(){
	isolate('#events');
	// change the background image
	$("#background").css('background-image', 'url(assets/bg-jumbo.jpg)');
	// add location to the url
	// window.location.hash = 'events';
}

function expandDining(){
	isolate('#dining');
	// change the background image
	$("#background").css('background-image', 'url(assets/bg-dewick.jpg)');
	// add location to the url
	// window.location.hash = 'dining';
}

function expandNews(){
	isolate('#news');
	// Andy - the following two lines change the background
	// change the background image
	$("#background").css('background-image', 'url(assets/bg-fall.jpg)');
	// add location to the url
	// window.location.hash = 'news';
}

function expandPlaces(){
	isolate('#places');
	// change the background image
	$("#background").css('background-image', 'url(assets/bg-bray.jpg)');
	// add location to the url
	// window.location.hash = 'places';
}

function expandSports(){
	isolate("#sports")
	// change the background image
	$("#background").css('background-image', 'url(assets/bg-water.jpg)');
	// add location to the url
	// window.location.hash = 'sports';
}

function isolate(id){
	$(".bubble").not(id).hide();

	// var elements = document.getElementsByClassName('bubble');
	// var toExpand = document.getElementsByClassName(id);

	// for(var i=0;i<elements.length;i++){
	// 	if (elements[i] != toExpand[0]){
	// 		elements[i].css('display', 'none');
	// 	}
	// }

	$("#buttonLeft").attr('src', 'assets/ico-arrow.png');
	$("#buttonLeft").attr('onclick', 'revert('+'\''+id+'\''+')');
	var name = id.split('#')[1];
	$("#title").text(toTitleCase(name));
}

function revert(id){
	
	$('.bubble').not('#intro').show();
	// change the background image
	$("#background").css('backgroundImage','url(assets/bg-academic.jpg)');
	var name = id.split('#')[1];
	$(id).attr('onclick', 'expand'+toTitleCase(name)+'()');
	$(id).children('#titlebar').children('h2').text(name.toUpperCase());
	


	// The following two lines previously made the help icon extra small on iPhones after returning to the home screen
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