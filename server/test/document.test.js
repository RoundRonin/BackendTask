const request = require('supertest');
const app = require('../src/app');

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
    jest.restoreAllMocks();
});

const db = require('../src/models/index');
const esClient = require('../src/config/elasticsearch');
const data = require('./dbmocks.json');

test('This is a test that always passes', () => {
    expect(true).toBe(true);
});

describe('POST /document', () => {
    it('should create a new document', async () => {
        const mockDocument = {
            document: {
                title: 'Test Title',
                content: 'Test Content'
            }
        };

        const response = await request(app)
            .post('/document')
            .send(mockDocument)
            .expect(200);

        expect(response.body.document).toHaveProperty('id');
        expect(response.body.document.title).toBe('Test Title');
        expect(response.body.document.content).toBe('Test Content');
    });
})


// jest.mock('../src/models/index');
// jest.mock('../src/config/elasticsearch');

// describe('POST /document', () => {
//     // beforeEach(() => {
//     //     jest.clearAllMocks();
//     // });

//     it('should insert all documents from JSON', async () => {
//         // db.Document.create.mockImplementation((doc) => Promise.resolve({ ...doc, id: Date.now() }));
//         // esClient.index.mockResolvedValue({});

//         for (const doc of data) {
//             const response = await request(app)
//                 .post('/document')
//                 .send({ document: doc });

//             expect(response.status).toBe(200);
//             expect(response.body.document.title).toBe(doc.title);
//             expect(response.body.document.content).toBe(doc.content);
//             // expect(db.Document.create).toHaveBeenCalledWith(expect.objectContaining(doc));
//             // expect(esClient.index).toHaveBeenCalledWith(expect.objectContaining({
//             //     body: expect.objectContaining(doc)
//             // }));
//         }
//     });
// });


jest.mock('../src/config/elasticsearch');

describe('GET /search', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return search results', async () => {
        esClient.search.mockResolvedValue({
            hits: {
                hits: [
                    { _id: 1, _source: { title: 'Codex', content: 'We are international developers team' } },
                    { _id: 3, _source: { title: 'Codex Workflow', content: 'Here you can see work progress of the codex team' } },
                    { _id: 2, _source: { title: 'Our projects', content: 'Codex team developed several big projects like Editor.js, Hawk, Notex' } }
                ]
            }
        });

        const response = await request(app).get('/search?querystring=Codex');

        expect(response.status).toBe(200);
        expect(response.body.documents).toHaveLength(3);
        expect(response.body.documents[0].fieldName).toBe('title');
        expect(response.body.documents[1].fieldName).toBe('title');
        expect(response.body.documents[2].fieldName).toBe('content');
    });
});


const bodyParser = require('body-parser');

app.use(bodyParser.json());

jest.mock('../src/models/index');
jest.mock('../src/config/elasticsearch');

app.patch('/document', async (req, res) => updateDocument(req, res));

describe('PATCH /document', () => {
    it('should update document in both database and Elasticsearch', async () => {
        const documentId = 1;
        const document = { title: 'New Title', content: 'New Content' };

        db.Document.update.mockResolvedValue([1, { id: documentId, title: document.title, content: document.content }]);
        esClient.update.mockResolvedValue({});

        const response = await request(app)
            .patch('/document')
            .send({ documentId, document });

        expect(response.status).toBe(200);
        expect(response.body.document).toEqual({ id: documentId, title: document.title, content: document.content });
        expect(db.Document.update).toHaveBeenCalledWith(
            { title: document.title, content: document.content },
            { where: { id: documentId }, returning: true, plain: true }
        );
        expect(esClient.update).toHaveBeenCalledWith({
            index: 'documents',
            id: documentId.toString(),
            body: {
                doc: { title: document.title, content: document.content }
            }
        });
    });

    it('should return 404 if document is not found', async () => {
        db.Document.update.mockResolvedValue([0]);

        const response = await request(app)
            .patch('/document')
            .send({ documentId: 999, document: { title: 'Aloha', content: 'Banditos!' } });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Document not found');
    });
});
