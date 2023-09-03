const request = require('supertest');
const { app, server } = require('../index.js');

let _server;

beforeAll(() => {
  if (server) {
    _server = server;
  }
});

afterAll(async () => {
  await _server.close();
});

test('It should response the GET method', (done) => {
  request(app)
    .get('/')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
});

test('It should response the GET method for /test', (done) => {
  request(app)
    .get('/test')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
});
