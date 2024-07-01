import express from "express"
import Datastore from "nedb"

const app = express()

app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const database = new Datastore('database.db')
database.loadDatabase()


app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.end()
            return;
        }
        response.json(data)
    })
})

app.post('/api', (request, response) => {
    // console.log(request.body)
    const data = request.body

    const lastUpdated = Date.now()
    data.lastUpdated = lastUpdated

    database.insert(data)

    response.json(data);
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})

