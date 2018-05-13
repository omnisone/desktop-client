const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/publishfiles', (req, res) => {
	console.log(req.body)
	res.sendStatus(200)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

