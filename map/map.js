var myOptions = {
			zoom: 14,
			draggable: false,
			disableDefaultUI: true,
			scrollwheel: false,
			center: new google.maps.LatLng(42.4029363,-71.1224503),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};
var map;
var bus;
var latlng=[];
var stops=[["Campus Center Front",42.405804,-71.11956],
			["Davis Square",42.396786,-71.12262],
			["T.A.B",42.401134,-71.126076],
			["Campus Center Back",42.405323,-71.120407],
			["Carmichael Hall",42.409435,-71.12252],
			["Olin Hall",42.407639,-71.121262]];
var routes = [42.405303,-71.120566,42.40533,-71.1206,42.40538,-71.12073,42.40541,-71.12082,42.40566,-71.12064,42.4058,-71.12055,42.40582,-71.12053,42.4059,-71.12048,42.40614,-71.12032,42.40636,-71.12089,42.40639,-71.12097,42.40655,-71.1214,42.40674,-71.12193,42.40678,-71.12203,42.40702,-71.12268,42.40718,-71.12308,42.40743,-71.12374,42.40766,-71.12437,42.40797,-71.12416,42.4083,-71.12394,42.40834,-71.12391,42.40847,-71.12383,42.40894,-71.12351,42.40937,-71.12322,42.4096,-71.12308,42.40968,-71.12303,42.408427,-71.120763,42.40834,-71.12083,42.40807,-71.12101,42.40798,-71.12108,42.40769,-71.12127,42.40754,-71.12138,42.40742,-71.12146,42.40734,-71.12151,42.40697,-71.12176,42.40678,-71.1219,42.40674,-71.12193,42.40655,-71.1214,42.40636,-71.12089,42.40614,-71.12032,42.40611,-71.12023,42.40589,-71.11964,42.40587,-71.11958,42.40572,-71.11918,42.4057,-71.11911,42.40567,-71.11904,42.40565,-71.11896,42.40563,-71.11888,42.40562,-71.11879,42.4056,-71.11869,42.40559,-71.11859,42.40558,-71.11844,42.40558,-71.11834,42.40558,-71.11829,42.40558,-71.11821,42.40559,-71.11815,42.4056,-71.11806,42.40562,-71.11792,42.40563,-71.11782,42.40564,-71.11774,42.40565,-71.11765,42.40565,-71.11758,42.40566,-71.11744,42.40541,-71.11741,42.40533,-71.1174,42.40487,-71.11733,42.40456,-71.11728,42.40401,-71.1172,42.40277,-71.11702,42.40212,-71.11693,42.40169,-71.11685,42.40162,-71.11686,42.40157,-71.11686,42.40152,-71.11687,42.40147,-71.11686,42.40134,-71.11685,42.40134,-71.11688,42.40133,-71.11691,42.40132,-71.11693,42.40131,-71.11696,42.4013,-71.11699,42.40128,-71.11701,42.40127,-71.11703,42.40126,-71.11706,42.40124,-71.11707,42.40123,-71.11707,42.40122,-71.11708,42.4012,-71.11709,42.40119,-71.1171,42.40118,-71.1171,42.40116,-71.11711,42.40115,-71.11711,42.40113,-71.11712,42.40111,-71.11712,42.40109,-71.11713,42.40098,-71.11712,42.40097,-71.11712,42.40097,-71.11711,42.40096,-71.11711,42.40096,-71.1171,42.40095,-71.1171,42.40095,-71.11709,42.40094,-71.11709,42.40094,-71.11708,42.40094,-71.11707,42.40093,-71.11706,42.40093,-71.11705,42.40093,-71.11703,42.40081,-71.11711,42.40077,-71.11713,42.40072,-71.11715,42.40066,-71.11714,42.40058,-71.11724,42.40023,-71.11772,42.40023,-71.11773,42.40013,-71.11786,42.39989,-71.1182,42.39977,-71.11836,42.39968,-71.1185,42.3996,-71.11863,42.39952,-71.11876,42.39944,-71.1189,42.39939,-71.11899,42.39934,-71.1191,42.39928,-71.11923,42.39923,-71.11933,42.39906,-71.11973,42.3987,-71.12057,42.39862,-71.12073,42.39854,-71.12088,42.3985,-71.12094,42.39846,-71.121,42.39839,-71.12107,42.39836,-71.12111,42.3983,-71.12117,42.39824,-71.12123,42.3982,-71.12126,42.39814,-71.12131,42.39794,-71.12143,42.39756,-71.12165,42.39749,-71.1217,42.39704,-71.12196,42.39685,-71.12207,42.39677,-71.12211,42.39669,-71.12216,42.39647,-71.1223,42.39658,-71.12249,42.39663,-71.12258,42.39669,-71.12264,42.39671,-71.12267,42.39673,-71.12272,42.39703,-71.12295,42.39747,-71.12331,42.39755,-71.12337,42.39772,-71.12351,42.39789,-71.12365,42.39822,-71.12391,42.39853,-71.12416,42.3986,-71.12422,42.39905,-71.12458,42.39918,-71.12469,42.39985,-71.12524,42.40043,-71.12571,42.40078,-71.12598,42.40105,-71.12618,42.40113,-71.12622,42.40131,-71.12631,42.40141,-71.12635,42.40142,-71.12636,42.40156,-71.12642,42.40177,-71.12651,42.40226,-71.12672,42.40242,-71.12679,42.40267,-71.1269,42.40288,-71.12699,42.40295,-71.12693,42.40296,-71.12691,42.40298,-71.12689,42.403,-71.12686,42.40301,-71.12682,42.40302,-71.12678,42.40304,-71.12669,42.40296,-71.12651,42.40262,-71.12574,42.40229,-71.12495,42.40224,-71.12484,42.40203,-71.1243,42.40197,-71.12413,42.40192,-71.12399,42.40184,-71.12372,42.40164,-71.12295,42.40156,-71.12263,42.40146,-71.12222,42.40134,-71.12174,42.40127,-71.12146,42.4011,-71.12075,42.40092,-71.11997,42.4009,-71.11991,42.40087,-71.11974,42.40086,-71.11964,42.40084,-71.11954,42.40083,-71.11941,42.40082,-71.11934,42.40081,-71.11918,42.40081,-71.1191,42.4008,-71.11903,42.4008,-71.11877,42.40081,-71.11849,42.40082,-71.11826,42.40083,-71.11805,42.40086,-71.11737,42.40084,-71.11731,42.40084,-71.11728,42.40084,-71.11725,42.40084,-71.11723,42.40085,-71.11721,42.40086,-71.11718,42.40087,-71.11714,42.40089,-71.11712,42.4009,-71.1171,42.40094,-71.11707,42.40093,-71.11706,42.40093,-71.11705,42.40093,-71.11703,42.4009,-71.11691,42.4009,-71.11688,42.40089,-71.11685,42.40089,-71.11683,42.4009,-71.11678,42.4009,-71.11673,42.40092,-71.11668,42.40093,-71.11663,42.40095,-71.11659,42.40097,-71.11655,42.401,-71.11651,42.40103,-71.11648,42.40104,-71.11646,42.40106,-71.11645,42.40107,-71.11643,42.40109,-71.11641,42.4011,-71.1164,42.40115,-71.11636,42.40116,-71.11635,42.40117,-71.11635,42.40117,-71.11634,42.40118,-71.11634,42.40119,-71.11634,42.4012,-71.11634,42.40121,-71.11634,42.40122,-71.11634,42.40123,-71.11634,42.40123,-71.11635,42.40124,-71.11635,42.40125,-71.11636,42.40126,-71.11636,42.40126,-71.11637,42.40127,-71.11637,42.40127,-71.11638,42.40127,-71.11639,42.40128,-71.11639,42.4013,-71.11643,42.40131,-71.11646,42.40132,-71.11649,42.40133,-71.11652,42.40134,-71.11655,42.40135,-71.11658,42.40135,-71.11661,42.40148,-71.11672,42.40153,-71.11676,42.40158,-71.11679,42.40162,-71.11682,42.40169,-71.11685,42.40212,-71.11693,42.40277,-71.11702,42.40401,-71.1172,42.40456,-71.11728,42.40487,-71.11733,42.40486,-71.11746,42.40482,-71.11772,42.40479,-71.11793,42.40478,-71.11802,42.40477,-71.11816,42.40477,-71.11829,42.40477,-71.11845,42.40477,-71.1186,42.40478,-71.11873,42.40479,-71.11883,42.40481,-71.11895,42.40482,-71.11906,42.40485,-71.11918,42.40486,-71.11925,42.40488,-71.11931,42.4049,-71.11942,42.40492,-71.11948,42.40494,-71.11954,42.40496,-71.1196,42.40497,-71.11965,42.405,-71.11972,42.40502,-71.11979,42.40507,-71.1199,42.40513,-71.12007,42.4053,-71.12052];

$(document).ready(getBus);

function getBus(){
	// $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://tufts.doublemap.com/map/v2/buses') + '&callback=?', function(data){
	// 	bus = JSON.parse(data.contents)[3];
	// });
	$.getJSON('http://anyorigin.com/dev/get?url=http%3A//tufts.doublemap.com/map/v2/buses&callback=?', function(data){
		bus = JSON.parse(data.contents)[3];
	});
	console.log(bus);
}

function drawMap() {
	if(bus != undefined){
		mapdiv = document.createElement('div');
		mapdiv.setAttribute('id', 'map_canvas');
		map = new google.maps.Map(mapdiv, myOptions);
		fillRoutes();
		createMarker();
		$('#temporary').prepend(mapdiv);
		setInterval(function(){
			getBus();
			marker.setPosition(new google.maps.LatLng(bus.lat,bus.lon));
			// shadow.setPosition(new google.maps.LatLng(bus.lat-0.00003,bus.lon+0.0003));
		},3000);
	}
	//getMe();
}

function fillRoutes(){
	for (i = 0; i<routes.length;i+=2){
		latlng.push(new google.maps.LatLng(routes[i], routes[i+1]));
	}
	drawLine();
}

function createMarker(){
	marker = new google.maps.Marker({
		map: map,
		position:new google.maps.LatLng(bus.lat,bus.lon),
		icon: "assets/icon-bus.svg",
	});
	/*
	shadow = new google.maps.Marker({
		map: map,
		position:new google.maps.LatLng(bus.lat-0.00003, bus.lon+0.0003),
		icon: "map/shadow.png"
	});
	*/
}
	
function drawLine(){
	redline=new google.maps.Polyline({
		clickable:false,
		map:map,
		path:latlng,
		strokeColor:"#6699cc",
		strokeWeight: 3
	});
}

// function getMe()
// {
// 	if (navigator.geolocation){
// 		navigator.geolocation.getCurrentPosition(function(position){
// 			myLat = position.coords.latitude;
// 			myLng = position.coords.longitude;
// 			drawMe();
// 		});
// 	}
// 	else {
// 		alert("Geolocation is not supported by your web browser.");
// 	}
// }

// function drawMe(){
// 	me=new google.maps.LatLng(myLat,myLng);
// 	memarker=new google.maps.Marker({
// 		position: me,
// 		title: "You are here",
// 		map: map,
// 	});
// }
