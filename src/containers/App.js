import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Write from '../components/test/Write';
import Read from '../components/test/Read';
import "./App.scss";
import { connect } from "react-redux";
import { history } from "../redux";

//Admin 
import HeaderAdmin from './SuperAdmin/HeaderAdmin/HeaderAdmin';
import UserManage from './SuperAdmin/Users/UserManage';
import Vendor from './SuperAdmin/Vendors/Vendor'
import Restaurant from './SuperAdmin/Restaurants/Restaurant';
import Rider from './SuperAdmin/Riders/Rider';
import Cuisine from './SuperAdmin/Cuisine/Cuisine'
import HomeAdmin from './SuperAdmin/HomeAdmin/HomeAdmin';

//Vendor
import HeaderVendor from './AdminVendors/HeaderVendor/HeaderVendor'

import { path } from "../utils";

function App() {

	return (
		<div className='App'>
			<Router history={history}>
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
								<Route path={path.CUISINES} element={<Cuisine />} />
							</Route>

							{/* Vendor */}
							<Route path={path.VENDORADMIN} element={<HeaderVendor />}>
								{/* <Route path="home" element={<HeaderVendor />} /> */}

							</Route>

						</Routes>
					</div>
				</div>

			</Router>
		</div>

	)
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
