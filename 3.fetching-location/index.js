const iss_api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
let lat = document.querySelector('#lat')
let lon = document.querySelector('#lon')

// leaflet stuff
const map = L.map('map').setView([0, 0], 1);

// making a tile
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileURL, {
    maxZoom: 19,
    attribution: attribution
}).addTo(map);

//making a marker with custom icon
const myIcon = L.icon({
    iconUrl: 'image.png',
    iconSize: [80, 42],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], {icon: myIcon}).addTo(map);


let initial = true;
async function getData(){
    const response = await fetch(iss_api_url)
    const data = await response.json()

    const { latitude, longitude } = data
 
    marker.setLatLng([latitude, longitude])
    if(initial){
        map.setView([latitude, longitude], 4)
        initial = false
    }
    lat.textContent = latitude.toFixed(4)
    lon.textContent = longitude.toFixed(4)
}

const time = setInterval(() => {
    getData().catch(error => {
        console.log(error)
    })
    
}, 1000)

// clearInterval(time)
// getData().catch(error => {
//     console.log(error)
// })

