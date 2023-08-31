const { describe } = require('node:test');
const agent = require('supertest');

describe('Tests', () => {
  test('should be listening', async () => {
    const response = await agent('http://localhost:8080').get('/').expect(200);
    expect(response.text).toEqual('Hello from App Engine!');
  });
});
