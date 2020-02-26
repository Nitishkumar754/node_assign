

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(cors({origin: ['http://localhost:4200','http://localhost:5000']}));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connect = require('./server/connect')

app.get('/', (req, res) => res.send('Hello World!!'))

app.use('/api', require('./server/routes'))


const port = process.env.NODE_ENV === 'production' ? 80 : 8000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
   
});
