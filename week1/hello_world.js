
// Used express as I already had some experience with it and wanted to 
//   stay familiar
const app = require('express')()

app.get('/', (req, res)=>{
	res.type('text')
	res.status(200)
	res.send("Hello, World!")
})

app.listen(8000)