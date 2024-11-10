import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Write from '../components/test/Write';
import Read from '../components/test/Read';
import "./App.scss";
import HeaderAdmin from './HeaderAdmin/HeaderAdmin';
import UserManage from './Users/UserManage';
import Vendor from './Vendors/Vendor'
import Restaurant from './Restaurants/Restaurant';
import Rider from './Riders/Rider';
import HomeAdmin from './Home/HomeAdmin';

import { path } from "../utils";

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

							{/* SuperAdmin */}
							<Route path={path.SUPERADMIN} element={<HeaderAdmin />} >
								{/* Home */}
								<Route path="home" element={<HomeAdmin />} />

								{/* General */}
								<Route path={path.VENDORS} element={<Vendor />} />
								<Route path={path.RESTAURANTS} element={<Restaurant />} />
								<Route path={path.USERS} element={<UserManage />} />
								<Route path={path.RIDERS} element={<Rider />} />
							</Route>

						</Routes>
					</div>
				</div>

			</Router>
		</div>

	)
}

export default App;
