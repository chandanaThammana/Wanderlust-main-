
//   mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbmRhbmFrcmlzaG5hIiwiYSI6ImNseGNldTlndjNrNWEyaXB2YXV2cjBvc2wifQ.EhjD1zW-ZLHfEjSH8bh2ZQ'; 
    mapboxgl.accessToken = mapToken
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12',
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });


    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({ color: "red"})
        .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking!</p>`))
        .addTo(map);