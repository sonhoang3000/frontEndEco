import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Write from '../components/test/Write';
import Read from '../components/test/Read';
import UserManage from './SystemAdmin/UserManage';
import "./App.scss";


function App() {



	return (
		<div className='App'>
			<Router>
				<div className="main-container">
					<div className="content-container">
						<Routes>
							<Route path="/" element={<Write />} />
							<Route path="/write" element={<Write />} />
							<Route path="/read" element={<Read />} />
							<Route path="/admin" element={<UserManage />} />
						</Routes>
					</div>
				</div>

			</Router>
		</div>

	)
}

export default App;
