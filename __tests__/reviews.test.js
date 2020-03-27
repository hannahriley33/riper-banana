const { getReview, getReviews, getFilm, getReviewer } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const chance = require('chance').Chance();

describe('review routes', () => {
  it('creates a review', async() => {
    const film = await getFilm();
    const reviewer = await getReviewer();
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 9,
        reviewer: reviewer._id,
        content: 'this movie is awesome!',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: expect.any(Number),
          reviewer: reviewer._id,
          content: expect.any(String),
          film: film._id,
          __v: 0
        });
      });
  });

  it('gets a review by id', async() => {
    const review = await getReview();

    return request(app)
      .get(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...review
        });
      });
  });

  it('gets all reviews', async() => {
    const reviews = await getReviews();

    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toEqual(reviews);
      
      });
  });

});
