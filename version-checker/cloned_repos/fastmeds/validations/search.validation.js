const Joi = require('joi');

const searchItem = {
  body: Joi.object().keys({
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    item: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
};

const searchBed = {
  body: Joi.object().keys({
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    item: Joi.string().required(),
  }),
};

const addMedicine = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  searchItem,
  addMedicine,
  searchBed
};
