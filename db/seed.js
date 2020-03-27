const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

const chance = require('chance').Chance();


module.exports = async({ studiosToCreate = 10, actorsToCreate = 10, reviewersToCreate = 10, filmsToCreate = 10, reviewsToCreate = 10 } = {}) => {


  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.name(),
    address: chance.sentence()
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.date({ string: true }),
    pob: chance.city()
  })));

  const reviewers = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  const films = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: chance.name(),
    studioId: chance.pickone(studios)._id,
    released: chance.integer(),
    cast: [{
      role: chance.profession(),
      actorId: chance.pickone(actors)._id
    }]
  })));

  const reviews = await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer({ min: 0, max: 10 }),
    reviewer: chance.pickone(reviewers)._id,
    content: chance.paragraph({ sentences: 1 }),
    film: chance.pickone(films)._id

  })));
};
