const app = require('express')()
const engines = require('consolidate')
const path = require('path')

// Map the nunjucks template engine to ".html" files
app.engine('html', engines.nunjucks)

// The default engine extension to use when omitted
app.set('view engine', 'html')

// A directory or an array of directories for the application's views.
// If an array, the views are looked up in the order they occur in the array.
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
	res.render('hello', {'name': 'World Templates!'})
})

app.use((req, res)=>{
	res.sendStatus(404)
})

var server = app.listen(3000, ()=>{
	const port = server.address().port
	console.log('Express server listening on port %s', port)
})