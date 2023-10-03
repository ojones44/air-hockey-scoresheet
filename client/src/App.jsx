import { useState, useEffect } from 'react';
import francesImg from './assets/frances.jpg';
import oliImg from './assets/oli.jpg';
import urlStrings from './utils/urlStrings';

import Results from './components/Results';
import AddNewResult from './components/AddNewResult';

function App() {
	const [viewResultToggle, setViewResultToggle] = useState(false);
	const [addResultToggle, setAddResultToggle] = useState(false);

	const [reRender, setReRender] = useState(false);
	const [newResult, setNewResult] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [francesTotal, setFrancesTotal] = useState(0);
	const [oliTotal, setOliTotal] = useState(0);
	const [message, setMessage] = useState(null);

	async function getResults() {
		const response = await fetch(`${urlStrings.render}/api/results/`);
		const data = await response.json();

		const francesTotal = data.reduce((total, result) => {
			total += result.frances;
			console.log(results);
			return total;
		}, 0);

		const oliTotal = data.reduce((total, result) => {
			total += result.oli;
			console.log(results);
			return total;
		}, 0);

		if (francesTotal > oliTotal) {
			setMessage('How is it possible? Frances is winning 🤔');
		} else if (francesTotal < oliTotal) {
			setMessage('The rightful leader 😎');
		} else {
			setMessage("Banana colada! It's even stevens!");
		}

		setFrancesTotal(francesTotal);
		setOliTotal(oliTotal);
		setResults(data);
		setIsLoading(false);
		setReRender(false);
	}

	useEffect(() => {
		getResults();
	}, [newResult, reRender]);

	const date = new Date().getFullYear();

	function toggleViewResultModal() {
		setViewResultToggle(!viewResultToggle);
	}

	function toggleAddResultModal() {
		setAddResultToggle(!addResultToggle);
	}

	return (
		<main className=''>
			<section className='header-section white-border blur-10'>
				<h1 className='heading'>{`AIR HOCKEY CHAMPIONSHIP ${date}`}</h1>
				<h3 className='message'>{`${
					isLoading ? 'WHO IS WINNING? 🤔' : message
				}`}</h3>
			</section>
			<section className='scorecard'>
				<div className='score white-border blur-3 frances'>
					<div id='frances'>
						<img src={francesImg} alt='frances' />
						<div className='score-value'>
							<h1>{isLoading ? '...' : francesTotal}</h1>
						</div>
					</div>
				</div>
				<div className='centre-section'>
					<button type='button' onClick={toggleViewResultModal}>
						View Results
					</button>
					<h1>Vs.</h1>
					<button type='button' onClick={toggleAddResultModal}>
						Add New Result
					</button>
				</div>
				<div className='score white-border blur-3 oli'>
					<div id='oli'>
						<div className='score-value'>
							<h1>{isLoading ? '...' : oliTotal}</h1>
						</div>
						<img src={oliImg} alt='oli' />
					</div>
				</div>
			</section>

			<Results
				toggleModal={toggleViewResultModal}
				viewResultToggle={viewResultToggle}
				isLoading={isLoading}
				results={results}
				oliTotal={oliTotal}
				francesTotal={francesTotal}
				setReRender={setReRender}
			/>
			{addResultToggle && (
				<AddNewResult
					toggleModal={toggleAddResultModal}
					addResultToggle={addResultToggle}
					newResult={newResult}
					setNewResult={setNewResult}
				/>
			)}
		</main>
	);
}

export default App;
