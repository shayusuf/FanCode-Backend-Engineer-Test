const request = require('supertest');
const { app } = require('../../index');

describe('Integration Tests', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return a 200 OK status code for GET request to /news/match', async () => {
    const response = await request(server).get('/news/match').query({'id': 1});
    expect(response.status).toBe(200);
  });

  it('should return a 500 Internal Server Error status code for GET request to /news/match without passing params', async () => {
    const response = await request(server).get('/news/match');
    expect(response.status).toBe(500);
  });

  it('should return the expected output for GET request to /news/match', async () => {
    const response = await request(server).get('/news/match').query({'id': 1});
    expect(response.body).toEqual(
        [
            {
              "id": 1,
              "title": "Rohit Hitman",
              "description": "50 runs in 12 balls",
              "sportId": 1,
              "tourId": 1,
              "matchId": 1,
            }
        ]
    )
  });

  it('should return the expected output for GET request to /news/tour', async () => {
    const response = await request(server).get('/news/tour').query({'id': 1});
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        [
            {
              "id": 1,
              "title": "Rohit Hitman",
              "description": "50 runs in 12 balls",
              "sportId": 1,
              "tourId": 1,
              "matchId": 1,
            },
            {
              "id": 3,
              "title": "Hardik Pandya Disasspoints !",
              "description": "Hardik Pandya rushed to hospital due to minor finger injury. Audience frustrated.",
              "sportId": 1,
              "tourId": 1,
              "matchId": null,
            }
        ]
    )
  });


  it('should return the expected output for GET request to /news/sport', async () => {
    const response = await request(server).get('/news/sport').query({'id': 1});
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        [
            {
              "id": 1,
              "title": "Rohit Hitman",
              "description": "50 runs in 12 balls",
              "sportId": 1,
              "tourId": 1,
              "matchId": 1,
            },
            {
              "id": 2,
              "title": "Virat Victorious",
              "description": "100 th Century for Virat",
              "sportId": 1,
              "tourId": 3,
              "matchId": null,
            },
            {
              "id": 3,
              "title": "Hardik Pandya Disasspoints !",
              "description": "Hardik Pandya rushed to hospital due to minor finger injury. Audience frustrated.",
              "sportId": 1,
              "tourId": 1,
              "matchId": null,
            }
        ]   
    )
  });

});


/**
 * Test output
app_1  | PASS test/integration/news.test.js
app_1  |   Integration Tests
app_1  |     ✓ should return a 200 OK status code for GET request to /news/match (46 ms)
app_1  |     ✓ should return a 500 Internal Server Error status code for GET request to /news/match without passing params (9 ms)
app_1  |     ✓ should return the expected output for GET request to /news/match (3 ms)
app_1  |     ✓ should return the expected output for GET request to /news/tour (3 ms)
app_1  |     ✓ should return the expected output for GET request to /news/sport (2 ms)
app_1  | 
app_1  | Test Suites: 1 passed, 1 total
app_1  | Tests:       5 passed, 5 total
app_1  | Snapshots:   0 total
app_1  | Time:        0.591 s
app_1  | Ran all test suites.
 */