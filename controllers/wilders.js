const WilderModel = require('../models/Wilder');

// ** create async funtion for create a new wilder
const create = async (req, res) => {
  WilderModel.init();
  const wilder = new WilderModel(req.body);

  // ** resolve the promise with await and save in database
  await wilder.save();
  console.log('succes', wilder);
  res.json({ succes: true, result: wilder });
  if (err === 11000) {
    res.status(400).json({ succes: false, message: 'name is already taken' });
  }
  throw err;
};
// ** create function for display all wilders
const findAll = async (req, res) => {
  const query = await WilderModel.find({});
  res.json({ succes: true, result: query });
  next(err);
};
// ** for find
const findOne = async (req, res) => {
  const { id } = req.params;
  const query = await WilderModel.findById(id);
  res.json({ succes: true, result: query });
  next(err);
};

// ** for update one wilder by id
const update = async (req, res) => {
  const { id } = req.params;
  await WilderModel.updateOne({ _id: id }, req.body);
  const updatedModel = await WilderModel.findById(id);
  res.json({ succes: true, result: updatedModel });
  next(err);
};

// ** for remove wilder by id
const remove = async (req, res) => {
  const { id } = req.params;
  await WilderModel.remove({ _id: id });
  res.json({ succes: true, message: 'your wilder has been removed' });
  next(err);
};

module.exports = { create, findAll, findOne, update, remove };
