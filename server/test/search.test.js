const request = require('supertest');
const app = require('../src/app');
const esClient = require('../src/config/elasticsearch');

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
    jest.restoreAllMocks();
});

// jest.mock('../src/config/elasticsearch');

describe('GET /search', () => {
    // beforeEach(() => {
    //     jest.clearAllMocks();
    // });

    it('should return search results', async () => {
        // esClient.search.mockResolvedValue({
        //     hits: {
        //         hits: [
        //             { _id: 1, _source: { title: 'Codex', content: 'We are international developers team' } },
        //             { _id: 3, _source: { title: 'Codex Workflow', content: 'Here you can see work progress of the codex team' } },
        //             { _id: 2, _source: { title: 'Our projects', content: 'Codex team developed several big projects like Editor.js, Hawk, Notex' } }
        //         ]
        //     }
        // });

        const response = await request(app).get('/search?querystring=Codex');

        expect(response.status).toBe(200);
        expect(response.body.documents).toHaveLength(3);
        expect(response.body.documents[0].fieldName).toBe('title');
        expect(response.body.documents[1].fieldName).toBe('title');
        expect(response.body.documents[2].fieldName).toBe('content');
    });
});