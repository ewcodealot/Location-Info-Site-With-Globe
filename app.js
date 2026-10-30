//Variables
const lat = parseFloat(document.body.getAttribute('lat'));
const lon = parseFloat(document.body.getAttribute('lon'));

//Globe Config
const world = new Globe(document.getElementById('globeViz'))
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
      .backgroundColor('rgba(21, 31, 73, 0.19)')
      .pointsData([{
            lat: lat,
            lng: lon,
            size: 0.075,
            color: 'white',
            name: ''
      }])
      .pointAltitude('size')
      .pointColor('color')
      .pointRadius(0.5);

world.pointOfView({ lat: lat, lng: lon, altitude: 2.5 }, 0);

//Fetch city info
const cityName = document.getElementById('cityInfo');

if (!navigator.geolocation) {
      cityName.textContent = "Geolocation is not supported by your browser.";
      console.log("No Location Support On This Browser");
}

cityName.textContent = "Locating...";

navigator.geolocation.getCurrentPosition(
      async (position) => {
      const { latitude, longitude } = position.coords;

      try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client`);
            const data = await response.json();

            const city = data.city || data.locality || data.principalSubdivision || "Unknown City";
            cityName.textContent = `${city}`;
      } catch (error) {
            cityName.textContent = "Error fetching city name.";
            console.error(error);
      }
      },
      (error) => {
      cityName.textContent = "Permission denied or location unavailable.";
      }
);