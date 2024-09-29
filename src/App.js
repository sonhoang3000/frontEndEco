import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Write from './components/test/Write';
import Read from './components/test/Read';

function App() {
	return (
		<div className='App'>

			<Router>
				<Routes>
					<Route path="/" element={<Write />} />
					<Route path="/write" element={<Write />} />
					<Route path="/read" element={<Read />} />
				</Routes>
			</Router>
		</div>

	)
}

export default App;
