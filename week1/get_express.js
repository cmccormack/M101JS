const app = require('express')()
const path = require('path')
const engines = require('consolidate')

app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

// Handler for internal server errors
function errorHandler(err, req, res, next) {
  console.error(err.message)
  console.error(err.stack)
  res.status(500).render('error_template', { error: err })
}

app.get('/:name', (req, res) => {
  console.log(req.query)
  res.status(200).render('gets', {name: req.params.name, foods: req.query})
})

app.use(errorHandler)

const server = app.listen(3000, 'localhost', ()=>{
  const {port, address} = server.address()
  console.log(`Connected to server on ${address}:${port}...`)
}) 