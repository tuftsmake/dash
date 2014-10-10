function populate(){
	now = new Date();
	var times = getJoeyTime();
	document.getElementById('campustime').innerHTML = parseTime(times[0]);
	document.getElementById('davistime').innerHTML = parseTime(times[1]);
	document.getElementById('olintime').innerHTML = parseTime(times[2]);

	//getstuff
}
 function help(){
 	console.log('help');
 	//help function
}

// Andy - makes background images preload to avoid white flashes, although I notice that the network indicator still spins
// http://perishablepress.com/3-ways-preload-images-css-javascript-ajax/
	var images = new Array()
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			images[i] = new Image()
			images[i].src = preload.arguments[i]
		}
	}
	preload(
		"assets/bg-academic.jpg",
		"assets/bg-bray.jpg",
		"assets/bg-dewick.jpg",
		"assets/bg-jumbo.jpg",
		"assets/bg-quad.jpg",
		"assets/bg-fall.jpg",
		"assets/bg-water.jpg"
	)

function expandJoey(){
	isolate('joey');
	joey = document.getElementsByClassName('joey')[0];
	joey.getElementsByTagName('h2')[0].innerHTML = 'NEXT STOPS';
	day = now.getDay();
	temp = document.createElement('div');
	temp.setAttribute('id', 'temporary');


	dayname = document.createElement('h2');
	dayname.innerHTML = parseDay(day).toUpperCase()+' SCHEDULE';
	temp.appendChild(dayname);

	document.getElementsByClassName('joey')[0].appendChild(temp);
		postSchedule(day);

	// change the background image
	document.getElementById("background").style.backgroundImage = 'url(assets/bg-quad.jpg)';
	// add location to the url
	window.location.hash = 'joey';
	// reveal the full bubble
	document.getElementById("joeyfull").style.display = 'block';
	document.getElementById("joeyfull").style.visibility = 'visible';
	document.getElementById("joeyfull").style.opacity = '100%';
	

	// Andy - reveals the Joey DoubleMap tracker
	document.getElementById("doublemap").style.display = "block";
	joey.setAttribute('onclick', null);
	
	// Andy - reveals the new map
	// document.getElementById("map").style.visibility = "visible";
	// Revealing maps as a block is a bag of hurt
	//document.getElementById("map").style.display = "block";
	//google.maps.event.trigger(map, 'resize');
}

function expandEvents(){
	isolate('events');
	// change the background image
	document.getElementById("background").style.backgroundImage = 'url(assets/bg-jumbo.jpg)';
	// add location to the url
	window.location.hash = 'events';
}

function expandDining(){
	isolate('dining');
	// change the background image
	document.getElementById("background").style.backgroundImage = 'url(assets/bg-dewick.jpg)';
	// add location to the url
	window.location.hash = 'dining';
}

function expandNews(){
	isolate('news');
	// Andy - the following two lines change the background
	// change the background image
	document.getElementById("background").style.backgroundImage = 'url(assets/bg-fall.jpg)';
	// add location to the url
	window.location.hash = 'news';
}

function expandPlaces(){
	isolate('places');
	// change the background image
	document.getElementById("background").style.backgroundImage = 'url(assets/bg-bray.jpg)';
	// add location to the url
	window.location.hash = 'places';
}

function expandSports(){
	isolate('sports')
	// change the background image
	document.getElementById("background").style.backgroundImage = 'url(assets/bg-water.jpg)';
	// add location to the url
	window.location.hash = 'sports';
}

function isolate(id){
	var elements = document.getElementsByClassName('bubble');
	var toExpand = document.getElementsByClassName(id);

	for(var i=0;i<elements.length;i++){
		if (elements[i] != toExpand[0]){
			elements[i].style.display='none';
		}
	}

	document.getElementById('buttonLeft').src = 'assets/ico-arrow.png';
	document.getElementById('buttonLeft').setAttribute('onclick', 'revert('+'\''+id+'\''+')')
	document.getElementById('title').innerHTML = toTitleCase(id);
}

function revert(id){
	var elements = document.getElementsByClassName('bubble');

	for(var i=0;i<elements.length;i++){
		elements[i].style.display='block';
	}

	// change the background image
	document.getElementById("background").style.backgroundImage = 'url(assets/bg-academic.jpg)';
	// add location to the url
	//window.location.hash = '';
	window.history.replaceState('Object', 'Title', '/dash/');

	// Andy - hide the Joey DoubleMap tracker
	document.getElementById("doublemap").style.display = "none";

	document.getElementsByClassName(id)[0].getElementsByTagName('h2')[0].innerHTML = id.toUpperCase();
	document.getElementsByClassName(id)[0].setAttribute('onclick', 'expand'+toTitleCase(id)+'()');
	// The following two lines previously made the help icon extra small on iPhones after returning to the home screen
	document.getElementById('buttonLeft').src = 'assets/ico-help.png';
	document.getElementById('buttonLeft').setAttribute('onclick', 'help()')
	document.getElementById('title').innerHTML = 'Tufts Dash';
	var toRemove = document.getElementById('temporary');
	toRemove.parentNode.removeChild(toRemove);
}

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function parseTime(time){
	var meridiem = ' AM';
	console.log(time);
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
    		if(j==0){
    			place = 'CAMPUS';
    		}
    		else if(j==1){
    			place = 'DAVIS';
    		}
    		else if(j==2){
    			place = 'OLIN';
    		}
    		td.appendChild(document.createTextNode(place));
	   		tr.appendChild(td);
    	}
    	th.appendChild(tr);
    t.appendChild(th);
    t.appendChild(tb);
    document.getElementById('temporary').appendChild(t);
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

function setMap(day, time) {
	var map = document.getElementById(doublemapiframe);

		switch (day) {
	    case 6:
	        if()
	        break; 
	    case 0:
	        text = "Today is Sunday";
	        break; 
	    default: 
	        text = "Looking forward to the Weekend";
	}
}

// DOUBLEMAP IFRAME SRC SWITCHER
// The src url of our iframe needs to change based on the current day and the time of day
// Ideally we would use this OpenStreetMap-powered map which is a constant URL: http://tufts.doublemap.com/map/
// But the mobile version of the site is broken: http://tufts.doublemap.com/map/mobile
// So we have to use the following set of 7 URLs and adjust according to time and day

// Mon-Fri from 7:10am to 5:50pm: http://m.tufts.edu/transit/fullscreen?type=route&id=doublemap__1
// Unknown: http://m.tufts.edu/transit/fullscreen?type=route&id=doublemap__2
// Saturday from 10am to 1:50am: http://m.tufts.edu/transit/fullscreen?type=route&id=doublemap__3
// Sunday from 10am-12:20am: http://m.tufts.edu/transit/fullscreen?type=route&id=doublemap__4
// Unknown: http://m.tufts.edu/transit/fullscreen?type=route&id=doublemap__5
// Mon-Wed from 6pm to 12:20am: http://m.tufts.edu/transit/fullscreen?type=route&id=doublemap__6
// Thurs-Fri from 6pm to 1:50am: http://m.tufts.edu/transit/fullscreen?type=route&id=doublemap__7

// Here are a few potentially useful links:

// http://stackoverflow.com/questions/4358155/changing-background-based-on-time-of-day-using-javascript

// http://en.kioskea.net/faq/27175-javascript-change-greeting-based-on-time-of-day

// http://stackoverflow.com/questions/12223286/load-a-different-link-based-on-time-of-the-day

/*
var done = true,
    fading_div = document.getElementById('fading_div'),
    fade_in_button = document.getElementById('fade_in'),
    fade_out_button = document.getElementById('fade_out');

function function_opacity(opacity_value) {
    fading_div.style.opacity = opacity_value / 100;
    fading_div.style.filter = 'alpha(opacity=' + opacity_value + ')';
}

function function_fade_out(opacity_value) {
    function_opacity(opacity_value);
    if (opacity_value == 1) {
        fading_div.style.display = 'none';
        done = true;
    }
}

function function_fade_in(opacity_value) {
    function_opacity(opacity_value);
    if (opacity_value == 1) {
        fading_div.style.display = 'block';
    }
    if (opacity_value == 100) {
        done = true;
    }
}
// fade in button
fade_in_button.onclick = function () {
    if (done && fading_div.style.opacity !== '1') {
        done = false;
        for (var i = 1; i <= 100; i++) {
            setTimeout((function (x) {
                return function () {
                    function_fade_in(x)
                };
            })(i), i * 10);
        }
    }
};
// fade out button
fade_out_button.onclick = function () {
    if (done && fading_div.style.opacity !== '0') {
        done = false;
        for (var i = 1; i <= 100; i++) {
            setTimeout((function (x) {
                return function () {
                    function_fade_out(x)
                };
            })(100 - i), i * 10);
        }
    }
};
*/
