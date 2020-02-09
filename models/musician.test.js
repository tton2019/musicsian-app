const store = require('../store/datastore');
const initialStoreData = require('../store/data');
const Musician = require('./musician');

beforeAll(done => {
  // initialize store
  musician = new Musician(store);
  musician.initStore(initialStoreData);
  done();
});

describe('Test suite for Musician model', () => {

  test('Verify that store is initialized', () => {
    expect(musician).not.toBeNull();
    expect(musician).toBeInstanceOf(Musician);
  });

  test('Verify model get success case', () => {
    musician.getMusician('hendrix', (err, musician) => {
      expect(err).toBeNull();
      expect(musician).not.toBeNull();
      expect(musician).toHaveProperty('firstName');
      expect(musician).toHaveProperty('lastName');
      expect(musician).toHaveProperty('genre');
    });
  });

  test('Verify model get error case - musician does not exist', () => {
    musician.getMusician('xxx', (err, musician) => {
      expect(err).not.toBeNull();
      expect(err).toBe('Musician does not exist');
      expect(musician).toBeUndefined();
    });
  });

  test('Verify model put success case - NEW', () => {
    const newMusician = {
      firstName: "Ash",
      lastName: "Bowie",
      genre: "ROCK"
    };
    musician.putMusician("ash", newMusician, (err, id) => {
      expect(err).toBeNull();
      expect(id).not.toBeNull();
    });
  });

  test('Verify model put success case - EXISTING', () => {
    const existingMusician = {
      firstName: 'Paul',
      lastName: 'McCartney',
      genre: 'POP'
    };
    musician.putMusician("paul", existingMusician, (err, id) => {
      expect(err).toBeNull();
      expect(id).not.toBeNull();
    });
  });

  test('Verify model put error case - EXISTING', () => {
    const existingMusician = {
      firstName: 'Sir Paul',
      lastName: 'McCartney',
      genre: 'ROCK'
    };
    musician.putMusician("paul", existingMusician, (err, id) => {
      expect(err).not.toBeNull();
      expect(err).toBe("Musician id in request path and body do not match.");
      expect(id).toBeUndefined();
    });
  });

  test('Verify model put error case', () => {
    const newMusician = {
      firstName: "Ashley",
      lastName: "Bowie",
      genre: "ROCK"
    };
    musician.putMusician("ash", newMusician, (err, id) => {
      expect(err).not.toBeNull();
      expect(err).toBe("Musician id in request path and body do not match.");
      expect(id).toBeUndefined();
    });
  });

});

