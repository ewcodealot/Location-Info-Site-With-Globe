//Variables
const lat = parseFloat(document.body.getAttribute('lat'));
const lon = parseFloat(document.body.getAttribute('lon'));

//Globe Config
var globePoint = [{
            lat: lat,
            lng: lon,
            size: 0.075,
            color: 'white',
            name: ''
      }];

const world = new Globe(document.getElementById('globeViz'))
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
      .backgroundColor('rgba(21, 31, 73, 0.19)')
      .pointsData("")
      .pointAltitude('size')
      .pointColor('color')
      .pointRadius(0.5);

world.pointOfView({ lat: lat, lng: lon, altitude: 2.5 }, 0);

window.addEventListener('resize', () => {
      world.width(window.innerWidth).height(window.innerHeight);
});



//Fetch city info
const cityName = document.getElementById('cityName');
const coordinates = document.getElementById('coordinates');

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
            cityName.innerHTML = `${city}`;
            coordinates.innerHTML = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            globePoint = [{
                  lat: latitude,
                  lng: longitude,
                  size: 0.075,
                  color: 'white',
                  name: city
            }];
            world.pointsData(globePoint);
            world.pointOfView({ lat: latitude, lng: longitude, altitude: 2.5 }, 1000);
      } catch (error) {
            cityName.textContent = "Error fetching city name.";
            console.error(error);
      }
      },
      (error) => {
      cityName.textContent = "Permission denied";
      }
);
