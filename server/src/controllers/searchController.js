const esClient = require('../config/elasticsearch');

const search = async (req, res) => {
    const query = req.query.querystring;

    if (!query) {
        return res.status(400).json({ error: 'Querystring is required' });
    }

    try {
        const esResponse = await esClient.search({
            index: 'documents', // Your ES index
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ['title^2', 'content'], // Boost title field
                        fuzziness: 'AUTO'
                    }
                }
            }
        });

        const documents = esResponse.hits.hits.map(hit => ({
            id: hit._id,
            fieldName: hit._source.title.includes(query) ? 'title' : 'content',
            fieldContent: hit._source.title.includes(query) ? hit._source.title : hit._source.content
        }));

        res.json({ documents });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports = { search };