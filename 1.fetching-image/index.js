console.log("fetching a rainbow about")
const img = document.querySelector('#rainbow')
const img2 = document.querySelector('#blasp')
const poemBody = document.querySelector('#poem')
// note that blob is just a format of data fetched, in this case it's for an image
// steps
//1. fetch the image locally
//2. a promise is returned, captured by .then()
//3. the response.blob() returns another promise, captured by .then()
//4. convert the blob into a object url for it to become readable by the src attribute
//5. also handle errors

fetch('image.png').then(response => {
    console.log(response)
    return response.blob()
}).then(blob => {
    console.log(blob)
    imageUrl = URL.createObjectURL(blob)
    img.src = imageUrl
}).catch(error => {
    console.log(error)
})


// now doing the same fetching but with async-await
const getImage = async () => {
    const response = await fetch('image2.png')
    const blob = await response.blob()
    const imageUrl = URL.createObjectURL(blob)

    img2.src = imageUrl
}
getImage().catch(error => {
    console.log(error)
})


//fetching a text file now(.txt)
async function getText (){
    const response = await fetch('poem.txt')
    const poem = await response.text()
    return poem
}   

getText().then(poem => {
    poemBody.textContent = poem
}).catch(error => {
    console.log(error)
})
