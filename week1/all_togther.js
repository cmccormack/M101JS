const app = require('express')()
const path = require('path')
const assert = require('assert')
const engines = require('consolidate')
const MongoClient = require('mongodb').MongoClient

app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

MongoClient.connect('mongodb://localhost:27017/video', (err, db)=>{
  assert.equal(null, err)
  console.log('Successfully connected to MongoDB')
  
  app.get('/', (req, res)=>{
    db.collection('movies').find({}).toArray((err, docs)=>{
      res.render('movies', { 'movies': docs })
    })
  })

})




const server = app.listen(3000, 'localhost', ()=>{
  const {port, address} = server.address()
  console.log(`Server started on ${address}:${port}...`)
})