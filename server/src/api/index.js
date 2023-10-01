const express = require('express');
const Result = require('../models/resultsModel');

const router = express.Router();

router.get('/', async (req, res) => {
	const results = await Result.find();
	res.json(results);
});

router.post('/add', async (req, res) => {
	const { date, frances, oli } = req.body;

	console.log(req.body);

	const newResult = await Result.create({
		date,
		frances,
		oli,
	});

	res.status(200).json(newResult);
});

router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;

	const result = await Result.findById(id);

	await Result.findByIdAndDelete(id);

	res.status(200).json(`Result with id ${result.id} has been deleted`);
});

module.exports = router;
