import Result from './Result';

function Results({
	toggleModal,
	viewResultToggle,
	isLoading,
	results,
	setReRender,
}) {
	return (
		<div
			className={`modal-results white-border blur-10 ${
				viewResultToggle && 'modal-open-results'
			}`}
		>
			<div className='modal-btn'>
				<button type='button' className='btn-danger' onClick={toggleModal}>
					Close
				</button>
			</div>
			<div className='results'>
				{!isLoading &&
					results.map((result) => {
						return (
							<Result
								key={result.id}
								result={result}
								setReRender={setReRender}
								toggleModal={toggleModal}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default Results;
