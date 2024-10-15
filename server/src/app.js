const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const esClient = require('./config/elasticsearch');

const app = express();
app.use(bodyParser.json());

db.sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))

// Sync all models with the database
db.sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Failed to synchronize database:', err);
});

app.get('/', async (req, res) => {
    res.json('Hello');
});

// POST /document
app.post('/document', async (req, res) => {
    try {
        const { title, content } = req.body?.document;
        // Save to PostgreSQL
        const document = await db.Document.create({ title, content });

        // Index to Elasticsearch
        await esClient.index({
            index: 'documents',
            id: document.id.toString(),
            body: { title, content }
        });

        res.json({ document });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
