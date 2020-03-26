const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .then(studios => res.send(studios))
      .catch(next);
  });

  // .patch('/:id', (req, res, next) => {
  //   Blog
  //     .findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
  //     .then(blog => res.send(blog))
  //     .catch(next);
  // })

  // .delete('/:id', (req, res, next) => {
  //   Blog
  //     .findByIdAndDelete(req.params.id)
  //     .then(blog => res.send(blog))
  //     .catch(next);
  // });
