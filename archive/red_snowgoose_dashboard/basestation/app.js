//ROS STUFF
// Connecting to ROS
// -----------------

var ros = new ROSLIB.Ros({
url : 'ws://localhost:9090'
});

ros.on('connection', function() {
console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
console.log('Connection to websocket server closed.');
});
///LEAFLET STUFF
//var map = L.map('map').setView({lon: -121.768210, lat: 36.983130}, 18);
var map = L.map('map').setView({lon: -121.953153913, lat: 37.3159121733}, 18);

// add the OpenStreetMap tiles
L.tileLayer('http://localhost:8080/styles/klokantech-basic/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale().addTo(map);

// show a marker on the map
var mower = L.marker({lon: -121.768210, lat: 36.983130}).bindPopup('The center of the world').addTo(map);

var polygon = {}
var path_list = []
var should_update = true 

// Subscribing to a Topic
// ----------------------

var listener = new ROSLIB.Topic({
	ros : ros,
	name : '/fix',
	messageType : 'sensor_msgs/NavSatFix'
});

function updateMap(){
	should_update = true;
	console.log("UPDATED");
}

var updatePlz = setInterval(updateMap, 500);

listener.subscribe(function(message) {
	if(should_update){
		console.log("Lets do this");
		console.log(message["latitude"]);
		var mow_lat = message["latitude"];
		var mow_lon = message["longitude"];
		map.removeLayer(mower);
		mower = L.marker({lon: mow_lon, lat: mow_lat}).addTo(map);
		var coords = [mow_lat, mow_lon];
		path_list.push(coords);
		map.removeLayer(polygon)
		polygon = L.polygon(path_list).addTo(map);
		should_update = false
	} 
});


console.log("SUBSCRIBED");
