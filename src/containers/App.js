import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.scss";
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
import LoginVendor from './AdminVendors/Auth/LoginVendor';
import RegisterVendor from './AdminVendors/Auth/RegisterVendor';
import VerifyEmail from './AdminVendors/Auth/VerifyEmail';
import HomeVendor from './AdminVendors/HomeVendor/HomeVendor';
import CuisineVendor from './AdminVendors/CuisineVendor/CuisineVendor';
import OrderVendor from './AdminVendors/OrderVendor/OrderVendor';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { path } from "../utils";

function App() {

	return (
		<div className='App'>
			<Router >
				<div className="main-container">
					<div className="content-container">
						<Routes>
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

							<Route path={path.LOGIN} element={<LoginVendor />} />
							<Route path={path.REGISTER} element={<RegisterVendor />} />
							<Route path={path.VERIFY_EMAIL} element={<VerifyEmail />} />

							{/* Vendor */}
							<Route path={path.VENDORADMIN} element={<HeaderVendor />}>								{/* <Route path="home" element={<HeaderVendor />} /> */}
								<Route path="home" element={<HomeVendor />} />
								<Route path="cuisine" element={<CuisineVendor />} />
								<Route path="order" element={<OrderVendor />} />

							</Route>

						</Routes>

						<ToastContainer />

					</div>
				</div>

			</Router>
		</div>

	)
}

export default App;
