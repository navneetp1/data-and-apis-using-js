function setup(){
    noCanvas()
    
    
    const lat = document.querySelector('#lat')
    const lon = document.querySelector('#lon')
    const geolocate = document.querySelector('#geolocate')
    const box = document.querySelector('#mood')
    
    const video = createCapture(VIDEO)
    video.size(320, 240)

    const map = L.map('map').setView([0, 0], 1);
    
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    const tiles = L.tileLayer(tileURL, {
        maxZoom: 19,
        attribution: attribution
    }).addTo(map);
    
    
    
    const marker = L.marker([0, 0]).addTo(map);
    
    //p5.js
    
    
    let initial = true;
    if("geolocation" in navigator){
        console.log("yes")
        geolocate.addEventListener("click", () => {
            navigator.geolocation.getCurrentPosition(async position => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude
                const mood = box.value
                video.loadPixels()
                const image64 = video.canvas.toDataURL()
    
    
                const data = {
                    latitude, longitude, mood, image64
                }
                // sending data to /api using post request
                const options = {
                    method : 'POST',
                    headers: {
                      "Content-Type": "application/json"  
                    },
                    body: JSON.stringify(data)
                };
    
                const response = await fetch('/api', options);
                const response_data = await response.json()
                console.log(response_data)
                
                
                lat.textContent = latitude
                lon.textContent = longitude
    
                marker.setLatLng([latitude, longitude])
                if(initial){
                    map.setView([latitude, longitude], 4)
                    initial = false
                }
        
                // console.log(position)
            })
        })
    }else{
        console.log("geolocation unavailable")
    }

   

}

