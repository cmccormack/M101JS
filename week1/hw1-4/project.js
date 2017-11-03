const app = require('express')()
const assert = require('assert')
const engines = require('consolidate')
const path = require('path')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  console.error(err.stack)
  res.status(500)
  res.render('error_template', {
    error: err.message
  })
}

MongoClient.connect('mongodb://chris:8NssLr4XMiBAgwNmGhrH99sf@ds044689.mlab.com:44689/m101js', (err, db) => {

  assert.equal(null, err);
  console.log("Successfully connected to MongoDB.");

  app.get('/', (req, res) => {
    res.render('movie', {
      title: 'Add Movie!'
    })
  })

  app.post('/movie_added', (req, res, next) => {
    const {
      title,
      year,
      imdb
    } = req.body
    if (!(title && year && imdb)) {
      next(Error('Please complete all fields'))
    } else {
      db.collection('movies').insertOne({
        title,
        year: Number(year),
        imdb
      }, (err, result) => {
        assert.equal(null, err)
        res.send(`${title}, ${year}, ${imdb} added to database!`)

        db.close()
      })
    }
  })

  app.use(errorHandler)

  const server = app.listen(3000, 'localhost', () => {
    const {
      port,
      address
    } = server.address()
    console.log(`Connected to server [${address}:${port}]...`)
  })

})