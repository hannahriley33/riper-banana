const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');

const chance = require('chance').Chance();


module.exports = async({ studiosToCreate = 10, actorsToCreate = 10, reviewersToCreate = 10 } = {}) => {


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


};
