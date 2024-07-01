async function getData(){
    const response = await fetch('/api')
    const data = await response.json()


    for (item of data){
        const root = document.createElement('div')
        const mood = document.createElement('div')
        const loc = document.createElement('div')
        const lastUpdated = document.createElement('div')
        const gap = document.createElement('br')
        const image = document.createElement('img')

        
        mood.textContent = `Mood: ${item.mood}`
        loc.textContent = `Latitude: ${item.latitude}, Longitude: ${item.longitude}`
        const dateString = new Date(item.lastUpdated).toLocaleString()
        lastUpdated.textContent = dateString
        image.src = item.image64
        
        root.append(mood, loc, lastUpdated, image, gap)
        document.body.append(root)
    }
    console.log(data)
}

getData()