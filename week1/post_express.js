const app = require('express')()
const cons = require('consolidate')
const path = require('path')
const bodyParser = require('body-parser')

app.engine('html', cons.nunjucks)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const errorHandler = (err, req, res, next) => {
  console.log(typeof err)
  console.error(err.message)
  console.error(err.stack)
  res.status(500)
  res.render('error', {error: err.message})
}


app.get('/', (req, res)=>{
  res.render('puts', {title: 'Fruit Picker', fruits: ['Apple', 'Banana', 'Orange', 'Pineapple']})
})

app.post('/favorite_fruit', (req, res, next)=>{
  const fav = req.body.fruit
  if (!fav){
    next(Error('Please pick a favorite fruit!'))
  } else {
    res.send(`Your favorite fruit is ${fav}!`)
  }
})

app.use(errorHandler)

const server = app.listen(3000, 'localhost', ()=>{
  const {port, address} = server.address()
  console.log(`Server started [${address}:${port}]...`)
})