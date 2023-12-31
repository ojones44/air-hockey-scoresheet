import urlStrings from '../utils/urlStrings';

function Result({
	result: { _id, date, frances, oli },
	setReRender,
	toggleModal,
}) {
	async function deleteData() {
		await fetch(`${urlStrings.render}/api/results/delete/${_id}`, {
			method: 'DELETE',
		});

		setReRender(true);
		toggleModal();
	}

	return (
		<div className='result white-border'>
			<p>{date}</p>
			<p>{`Frances ${frances} - ${oli} Oli`}</p>
			<button className='btn-danger' onClick={deleteData}>
				Delete
			</button>
		</div>
	);
}

export default Result;
