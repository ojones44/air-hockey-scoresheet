const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./connect/db');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.json({
		message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
	});
});

app.use('/api/results', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
