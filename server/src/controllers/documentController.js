const db = require('../models');
const esClient = require('../config/elasticsearch');

const addDocument = async (req, res) => {
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
}

const updateDocument = (req, res) => {
    res.send("Updated");
}


module.exports = { addDocument, updateDocument };