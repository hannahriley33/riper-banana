const { getReviewer, getReviewers } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const chance = require('chance').Chance();

describe('reviewER routes', () => {
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Hannah',
        company: 'Alchemy Code Lab'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Hannah',
          company: 'Alchemy Code Lab',
          __v: 0
        });
      });
  });

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
        // expect(res.body).toHaveLength(3);
        // tweets.forEach(tweet => {
        //   expect(res.body).toContainEqual({
        //     ...tweet.toJSON(),
        //     _id: tweet.id
        //   });
        // });
      });
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send(
        { name: 'Riley' })
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          name: 'Riley',
          company: expect.any(String)
        });
      });
  });

});
