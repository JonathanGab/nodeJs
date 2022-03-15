const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WilderModel = require('./models/Wilder');
const wilderController = require('./controllers/wilders');
const app = express();
const PORT = 5000;
const { CORS_ALLOWED_ORIGINS } = require('./env');

// connect to database
mongoose
  .connect('mongodb://localhost:27017/wilder_db', { autoIndex: true })
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(err));

app.use(express.json());
// create wilder

const allowedOrigins = CORS_ALLOWED_ORIGINS.split(',');
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

const expressAsyncHandler = (handler) => {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

app.post('/api/wilders', expressAsyncHandler(wilderController.create));
// for get all wilders
app.get('/api/wilders', expressAsyncHandler(wilderController.findAll));
// for get wilder by id
app.get('/api/wilders/:id', expressAsyncHandler(wilderController.findOne));
// for update
app.patch('/api/wilders/:id', expressAsyncHandler(wilderController.update));
//for delete
app.delete('/api/wilders/:id', expressAsyncHandler(wilderController.remove));

app.use((err, req, res, next) => {
  res.status(500).json({ succes: false, message: 'Error occured' });
  next(err);
});

app.use((req, res, next) => {
  res.status(404).json({ succes: false, message: 'Route not found' });
});

app.listen(`${PORT}`, () => console.log(`Server running on port ${PORT}`));
