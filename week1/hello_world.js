
// Used express as I already had some experience with it and wanted to 
//   stay familiar
const app = require('express')()

app.get('/', (req, res)=>{
	res.type('text')
	res.status(200)
	res.send("Hello, World!")
})

app.use((req, res)=>{
	res.sendStatus(404)
})

var server = app.listen(3000, ()=>{
	const port = server.address().port
	console.log('Express server listening on port %s', port)
})