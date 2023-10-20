let map;
let ref;
let centerMarker;
let activeWindow;

let markers = []

function createMap() {

	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat:  -17.824858, lng: 31.053028 },
		zoom: 8,
  	});

	getTrackers();
}

function setMarker(state){
	for(let i=0; markers.length > i; i++){
		markers[i].setMap(map)
	}
}

function createMarkers(trackerID, info){
	setMarker(null)

	let lat = info["currentTrackerData"]["lat"]
	let lon = info["currentTrackerData"]["lon"]
	let fire = parseInt(info["currentTrackerData"]["ir"])
	let orientX = parseFloat(info["currentTrackerData"]["x"])

	let fireWarningMessage = (fire == 1) ? "Fire Detected" : "[NORMAL]";
	let accidentWarningMessage = (orientX > 3) ? "Accident Alert": "[NORMAL]";
	let icon = (orientX > 3) || (fire == 1) ? "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png": null;

	const trackerInfo = new google.maps.InfoWindow({
		content: `<p style='font-size:16px'> <b>Tracker ID: </b>${trackerID} <br> <b>FIRE WARNING:</b> ${fireWarningMessage}<br><b>ACCIDENT WARNING:</b> ${accidentWarningMessage}</p>`
	});

	let marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat,lon),
		title: trackerID,
		icon: icon,
		map:map
	});

	markers.push(marker)

	marker.addListener("click",()=>{

		if(!activeWindow){
			trackerInfo.open(map,marker);
			activeWindow = trackerInfo
		}else{
			trackerInfo.close()
			activeWindow = null
		}
	});
}


function getTrackers(){

	ref = firebase.database().ref("/");

	ref.on("value",function(snapshot){
                if(snapshot.val()){
                        let obj = snapshot.val()
                        let keys = Object.keys(snapshot.val());
                        keys.forEach((key)=>{
                                delete obj[key].tracking
                                createMarkers(key, obj[key])
                        });
                }
        });


	ref.on("child_added",function(snapshot){
		if(snapshot.val()){
			let obj = snapshot.val()
			let keys = Object.keys(snapshot.val());
			keys.forEach((key)=>{
				delete obj[key].tracking
				createMarkers(key, obj[key])
			});
		}
	});
}

