const {assert} = require('chai');
const QueryHandler = require('./QueryHandler');


describe('QueryHandler', () => {
  describe('#create', () => {
    it('should create query for new table', () => {
       let actualQuery = QueryHandler.create("student");
       let expectedQuery = "CREATE TABLE student"
       assert.equal(expectedQuery, actualQuery);
      });
  });
})
