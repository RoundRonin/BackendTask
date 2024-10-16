const db = require('../models');
const esClient = require('../config/elasticsearch');

const addDocument = async (req, res) => {
    try {
        const { title, content } = req.body?.document;
        const document = await db.Document.create({ title, content });

        // Index to Elasticsearch
        // TODO ? issue: if es creation fails, db has untracked entry
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

const updateDocument = async (req, res) => {
    try {
        const { documentId, document } = req.body;
        const { title, content } = document;

        if (!documentId || !title || !content) {
            return res.status(400).send({ error: 'Request is invalid' });
        }

        const updatedDocument = await db.Document.update(
            { title, content },
            {
                where: { id: documentId },
                returning: true,
                plain: true
            }
        );

        if (!updatedDocument[1]) {
            return res.status(404).send({ error: 'Document not found' });
        }

        await esClient.update({
            index: 'documents',
            id: documentId.toString(),
            body: {
                doc: { title, content }
            }
        });

        res.json({ document: updatedDocument[1] });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};



module.exports = { addDocument, updateDocument };