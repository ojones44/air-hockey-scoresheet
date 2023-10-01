import { useState, useRef } from 'react';

function AddNewResult({
	toggleModal,
	addResultToggle,
	newResult,
	setNewResult,
}) {
	const initialState = {
		date: 'DD/MM/YYYY',
		frances: '',
		oli: '',
	};

	const dateRef = useRef();
	const [inputs, setInputs] = useState(initialState);

	function handleChange(e) {
		let formattedDate;

		if (e.target.name === 'date') {
			const newFormat = e.target.value.split('-');
			formattedDate = `${newFormat[2]}/${newFormat[1]}/${newFormat[0]}`;
		}

		e.preventDefault();
		setInputs((prevValues) => ({
			...prevValues,
			[e.target.name]:
				e.target.name === 'date' ? formattedDate : e.target.value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();

		await fetch('https://airhockey-api.onrender.com/api/results/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(inputs),
		});

		setNewResult(initialState);
		toggleModal();
	}

	return (
		<div
			className={`modal white-border blur-10 ${
				addResultToggle && 'modal-open'
			}`}
		>
			<div className='modal-btn'>
				<button type='button' className='btn-danger' onClick={toggleModal}>
					Close
				</button>
			</div>
			<form className='add-result-form' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='date'>Date:</label>
					<div className='date-container'>
						<input
							type='date'
							id='date'
							name='date'
							ref={dateRef}
							value={inputs.date}
							onChange={handleChange}
						/>
						<p>{inputs.date}</p>
						<p onClick={() => dateRef.current.showPicker()}>🗓️</p>
					</div>
				</div>

				<div>
					<label htmlFor='frances'>Frances Score:</label>
					<input
						type='number'
						id='frances'
						name='frances'
						value={inputs.frances}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor='oli'>Oli Score:</label>
					<input
						type='number'
						id='oli'
						name='oli'
						value={inputs.oli}
						onChange={handleChange}
					/>
				</div>

				<button className='submit-button' type='submit'>
					Submit Result
				</button>
			</form>
		</div>
	);
}

export default AddNewResult;
