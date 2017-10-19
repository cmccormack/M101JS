const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

MongoClient.connect('mongodb://localhost:27017/video', (err, db)=>{
  
  assert.equal(null, err)
  console.log("Connected to Server")

  db.collection('movies').find().toArray((err, docs)=>{
    docs.forEach((doc)=>{
      console.log(doc.title)
    })
    db.close()
  })

  console.log('Called find()')
})