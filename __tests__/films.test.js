const { getFilm, getFilms, getActor, getStudio } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const chance = require('chance').Chance();

describe('film routes', () => {
  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'test film',
        studioId: studio._id,
        released: '2012',
        cast: {
          role: 'supporting actress',
          actorId: actor._id
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: expect.any(String),
          studioId: expect.any(String),
          released: expect.any(Number),
          cast: [{
            _id: expect.any(String),
            role: expect.any(String),
            actorId: expect.any(String)
          }],
          __v: 0
        });
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...film
        });
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      
      });
  });



});
