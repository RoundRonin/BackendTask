const request = require('supertest');
const app = require('../src/app');

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
    jest.restoreAllMocks();
});

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

const db = require('../src/models/index');
const esClient = require('../src/config/elasticsearch');
const data = require('./dbmocks.json'); // Update path to your JSON file

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