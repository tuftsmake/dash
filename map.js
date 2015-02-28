var myLat =42.4029363;
var myLng =-71.1224503;
var me;
var memarker;
var myOptions = {
			zoom: 14,
			draggable: false,
			disableDefaultUI: true,
			scrollwheel: false,
			center: new google.maps.LatLng(42.4029363,-71.1224503),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};
var center = new google.maps.LatLng(42.4029363,-71.1224503);
var map;
var buses;
var markers=[];
var latlng=[];
var stops=[["Campus Center Front",42.405804,-71.11956],
      		 ["Davis Square",42.396786,-71.12262],
      		 ["T.A.B",42.401134,-71.126076],
      		 ["Campus Center Back",42.405323,-71.120407],
      		 ["Carmichael Hall",42.409435,-71.12252],
      		 ["Olin Hall",42.407639,-71.121262]];

$(document).ready(getBuses);

function getBuses(){
	$.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('http://tufts.doublemap.com/map/v2/buses') + '&callback=?', function(data){
		buses = JSON.parse(data.contents);
		//console.log(data.contents);
	});
}

function drawMap(){
	if(buses !== undefined){
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		fillRoutes();
		drawBuses();
		drawMe();
		var currCenter = map.getCenter();
		google.maps.event.trigger(map, 'resize');
		map.setCenter(currCenter);
		setInterval(function(){
			getBuses();
			getMe();
			memarker.setPosition(new google.maps.LatLng(myLat, myLng));
			for(i=0;i<markers.length;i++){
				markers[i].setPosition(new google.maps.LatLng(buses[i].lat,buses[i].lon));
			}
		},1000);
	}
}

function fillRoutes(){
	for (i = 0; i<routes.length;i+=2){
		latlng.push(new google.maps.LatLng(routes[i], routes[i+1]));
	}
	drawLine();
}

function drawBuses(){
	for(i=0;i<buses.length;i++){
		// if(buses[i].route == 1){
			createMarker(i); 
			/* 0 blue
			   1 yellow
			   2 red
			   3 purple
			   4 green
			   5 cyan*/
		//}
	}

}

function createMarker(i){
	markers[i] = new google.maps.Marker({
		map: map,
		position:new google.maps.LatLng(buses[i].lat,buses[i].lon),
		icon: 'assets/ico-bus'+i+'.svg',
	});
}

function drawLine(){
	redline=new google.maps.Polyline({
		clickable:false,
		map:map,
		path:latlng,
		strokeColor:'#6699cc',
		strokeWeight: 3
	});
}

function getMe()
{
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}

function drawMe() {
		me=new google.maps.LatLng(myLat,myLng);
		memarker=new google.maps.Marker({
		map: map,
		position: me,
		icon: 'assets/locationmarker.svg',
	});
}
