const supertest = require('supertest');
const server = require('./server.js');

describe('server', () => {
  it('should set testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });
});
