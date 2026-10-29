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
            name: 'San Francisco'
      }])
      .pointAltitude('size')
      .pointColor('color')
      .pointRadius(0.5);

world.pointOfView({ lat: lat, lng: lon, altitude: 2.5 }, 0);
