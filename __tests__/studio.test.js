const { getStudio, getStudios, getFilms } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('studio routes', () => {
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Hannah',
        address: {
          city:  'Palo Alto',
          state: 'CA',
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Hannah',
          address: {
            city:  'Palo Alto',
            state: 'CA',
            country: 'USA'
          },
          __v: 0
        });
      });
  });

  it('gets a studio by id', async() => {
    const studio = await getStudio();
    const films = await getFilms({ 'studio': studio._id });

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...studio,
          films
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
        // expect(res.body).toHaveLength(3);
        // tweets.forEach(tweet => {
        //   expect(res.body).toContainEqual({
        //     ...tweet.toJSON(),
        //     _id: tweet.id
        //   });
        // });
      });
  });

});
