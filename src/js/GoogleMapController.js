let MapDOM = document.querySelector('#map');
let BranchListDOM = document.querySelector('.dealer-locator-list .list');
let map,
	infoWindow,
	markers = [];
let locationsInput = locationsInput || [];
let google = google || {};
let mapOption = {
	gestureHandling: 'cooperative',
	zoom: 12,
	styles: [
		{
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#f5f5f5"
			}
		  ]
		},
		{
		  "elementType": "labels.icon",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#616161"
			}
		  ]
		},
		{
		  "elementType": "labels.text.stroke",
		  "stylers": [
			{
			  "color": "#f5f5f5"
			}
		  ]
		},
		{
		  "featureType": "administrative.land_parcel",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#bdbdbd"
			}
		  ]
		},
		{
		  "featureType": "poi",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#eeeeee"
			}
		  ]
		},
		{
		  "featureType": "poi",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "featureType": "poi.park",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#e5e5e5"
			}
		  ]
		},
		{
		  "featureType": "poi.park",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		},
		{
		  "featureType": "road",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#ffffff"
			}
		  ]
		},
		{
		  "featureType": "road.arterial",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "featureType": "road.highway",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#dadada"
			}
		  ]
		},
		{
		  "featureType": "road.highway",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#616161"
			}
		  ]
		},
		{
		  "featureType": "road.local",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		},
		{
		  "featureType": "transit.line",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#e5e5e5"
			}
		  ]
		},
		{
		  "featureType": "transit.station",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#eeeeee"
			}
		  ]
		},
		{
		  "featureType": "water",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#c9c9c9"
			}
		  ]
		},
		{
		  "featureType": "water",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		}
	  ],
};

const addMarkers = () => {
	markers = [];
	const bounds = new google.maps.LatLngBounds();
	locationsInput.forEach((location, index) => {
		let locationLatLng = new google.maps.LatLng(location.lat, location.lng);
		let marker = new google.maps.Marker({
			map: map,
			title: location.title,
			position: locationLatLng,
			icon: location.icon,
		});
		bounds.extend(marker.position);
		markers.push(marker);
		showInfoMarkerOnMap(marker, index);
	});

	map.fitBounds(bounds);
};

const showInfoMarkerOnMap = (marker, index) => {
	infoWindow.setContent(`
			<h3>${locationsInput[index].title}</h3>
		`);
	infoWindow.open(map, marker);
	map.panTo(marker.getPosition());
	map.setZoom(18);
	google.maps.event.addListener(map, 'click', function () {
		infoWindow.close();
	});
};

const getLocationList = () => {
	if (BranchListDOM) {
		BranchListDOM.innerHTML = '';
		markers.forEach((marker, index) => {
			const newMarker = document.createElement('div');
			newMarker.classList.add('dealer-locator-item');
			newMarker.innerHTML = `
				<h3>${locationsInput[index].title}</h3>
				<p>${locationsInput[index].address}</p>
				<p>${locationsInput[index].phone}</p>
			`;
			newMarker.setAttribute('marker-id', `${index}`);
			newMarker.addEventListener('click', () => {
				const markerIndex = newMarker.getAttribute('marker-id');
				google.maps.event.trigger(markers[markerIndex], 'click');
			});
			BranchListDOM.appendChild(newMarker);
		});
	}
};

const initialize = () => {
	infoWindow = new google.maps.InfoWindow();
	map = new google.maps.Map(MapDOM, mapOption);
	addMarkers();
	let listener = google.maps.event.addListener(map, 'idle', () => {
		if (map.getZoom() > 12) {
			map.setZoom(18);
		}
		google.maps.event.removeListener(listener);
	});
	google.maps.event.addListener(map, 'bounds_changed', getLocationList);
};

if (MapDOM) {
	google.maps.event.addDomListener(window, 'load', initialize);
	if (BranchListDOM) {
		getLocationList();
	}
}
