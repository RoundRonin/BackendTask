const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const rootRoute = require('./routes/root');
const documentRoute = require('./routes/api/document');
const searchRoute = require('./routes/api/search');

app.use('/', rootRoute);
app.use('/document', documentRoute);
app.use('/search', searchRoute);


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

module.exports = app;