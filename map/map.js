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
		mapdiv = document.createElement('div');
		mapdiv.setAttribute('id', 'map_canvas');
		map = new google.maps.Map(mapdiv, myOptions);
		fillRoutes();
		drawBuses();
		$('#temporary').prepend(mapdiv);
		setInterval(function(){
			getBuses();
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