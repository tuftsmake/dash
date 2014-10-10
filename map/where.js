var myLat = 42.4029363;
var myLng = -71.1224503;
var me;
var wrequest = new XMLHttpRequest();
var trequest = new XMLHttpRequest();
var myOptions = {
			zoom: 14,
			draggable: false,
			disableDefaultUI: true,
			scrollwheel: false,
			center: new google.maps.LatLng(42.4029363,-71.1224503),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};
var map;
var memarker;
var cmarker;
var clat=0;
var clng=0;
var wlat=0;
var wlng=0;
var wmarker;
var infowindow= new google.maps.InfoWindow();
var mewindow= new google.maps.InfoWindow();
var times;
var alatlng=new Array();
var blatlng=new Array();
var stops=[["Campus Center Front",42.405804,-71.11956],
			["Davis Square",42.396786,-71.12262],
			["T.A.B",42.401134,-71.126076],
			["Campus Center Back",42.405323,-71.120407],
			["Carmichael Hall",42.409435,-71.12252],
			["Olin Hall",42.407639,-71.121262]];


function drawMap()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	drawJ();
	drawCW();
	getMe();
}


function drawJ (){
	
	for(i=0;i<stops.length;i++){
		if(i<=16){
			alatlng.push(new google.maps.LatLng(stops[i][1],stops[i][2]));
		}
		if(i==12||i>16){
			blatlng.push(new google.maps.LatLng(stops[i][1],stops[i][2]));
		}
	}
	drawStops();
	drawLine();
}
function drawStops(){
	for(i=0;i<stops.length;i++){
		createMarker(i);
	}
}

function createMarker(i){
	var marker = new google.maps.Marker({
		map: map,
		position:new google.maps.LatLng(stops[i][1],stops[i][2]),
		title:stops[i][0],
		icon: "dot-green.png",
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(stops[i][0]);
		infowindow.open(map, this);
	});
}

	
function drawLine(){
	redline=new google.maps.Polyline({
		clickable:false,
		map:map,
		path:alatlng,
		strokeColor:"blue",
		strokeWeight: 8
	});
}

function drawCW (){
	wrequest.open("GET","http://tufts.doublemap.com/map/v2/buses?jsoncallback=?",true);
	wrequest.send();
	
	wrequest.onreadystatechange=function(){
		if(wrequest.readyState==4 && wrequest.status==200){
			str=wrequest.responseText;
			locations = JSON.parse(str);
			if(locations[0].name=="Waldo"){
				wlat=locations[0].loc.latitude;
				wlng=locations[0].loc.longitude;
				drawW();
				
				if(locations[1].name=="Carmen Sandiego"){
					clat=locations[1].loc.latitude;
					clng=locations[1].loc.longitude;
					drawC();
				}
			}
			else if(locations[0].name=="Carmen Sandiego"){
				clat=locations[0].loc.latitude;
				clng=locations[0].loc.longitude;
				drawC();
			}	
		}
	}
}

function drawC(){
	cmarker=new google.maps.Marker({
		position:new google.maps.LatLng(clat,clng),
		title:"Carmen Sandiego",
		icon: "dot-red.png",
		map: map,
	});
}

function drawW(){
	wmarker=new google.maps.Marker({
		position: new google.maps.LatLng(wlat,wlng),
		title:"Waldo",
		icon:"dot-blue.png",
		map:map,
	});
}


function getMe()
{
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			drawMe();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}

function drawMe(){
	me=new google.maps.LatLng(myLat,myLng);
	memarker=new google.maps.Marker({
		position: me,
		title: "You are here",
		map: map,
	});
	dtoW= getDistance(myLat,myLng,wlat,wlng);
	dtoC= getDistance(myLat,myLng,clat,clng);
	
	windowstring=checkLocations();
	
	google.maps.event.addListener(memarker, 'click', function() {
		mewindow.close();
		mewindow.setContent(windowstring);
		mewindow.open(map, this);
	});
}

function checkLocations(){
	curstring="";
	if(dtoC != -1){
		curstring=curstring+"Distance to Carmen: "+String(dtoC)+"<br/>";
	}
	if(dtoW != -1){
		curstring=curstring+"Distance to Waldo: "+String(dtoW)+"<br/>";
	}
	curmin=1000000000;
	closest=-1;
	for(i=0;i<stops.length;i++){
		curdist=getDistance(myLat,myLng,stops[i][1],stops[i][2]);
		if(curdist<curmin){
			curmin=curdist;
			closest=i;
		}
	}
	curstring=curstring+"Distance to " +stops[closest][0]+": "+String(curmin);
	return curstring;
};

function getDistance(x1,y1,x2,y2){
	if(x2!=0 && y2!=0){
		var R = 6371;
		var dLat = toRad(x2-x1);  
		var dLon = toRad(y2-y1);  
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
					Math.cos(toRad(x1)) * Math.cos(toRad(x2)) * 
					Math.sin(dLon/2) * Math.sin(dLon/2);  
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; 
		return d;
	}
	else{
		return -1;
	}
}

function toRad(x) {
   return x * Math.PI / 180;
}
