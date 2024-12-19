import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './HeaderVendor.css';

function HeaderVendor() {
      const navigate = useNavigate();

      const [vendor, setVendor] = useState(null);

      useEffect(() => {
            const storedVendor = localStorage.getItem("dataVendor");
            if (storedVendor) {
                  setVendor(JSON.parse(storedVendor)); // Cập nhật state từ localStorage
            }

      }, []);

      const handleLogout = () => {
            localStorage.removeItem("dataVendor");
            setVendor(null);
            navigate('/login-vendor');

      };

      return (
            <div className="page-layout">
                  <div className="container-admin">
                        <div className="title">
                              {vendor ? (
                                    <>
                                          <span> {vendor.name}</span>
                                    </>
                              ) : (
                                    <span>Xin hãy đăng nhập</span>
                              )}

                        </div>
                        <NavLink to="/vendor-admin/home"
                              className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
                        >
                              <i className="fas fa-house"></i>
                              Home
                        </NavLink>

                        <div className='container-general'>

                              <NavLink to="/vendor-admin/cuisine"
                                    className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
                              >
                                    <i className="fa-solid fa-burger"></i>
                                    Cuisines
                              </NavLink>

                              <NavLink to="/vendor-admin/side-dishes"
                                    className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
                              >
                                    <i className="fa-solid fa-utensils"></i>
                                    Side Dishes
                              </NavLink>

                              <NavLink to="/vendor-admin/order"
                                    className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
                              >
                                    <i className="fa-solid fa-box"></i>
                                    Orders
                              </NavLink>

                        </div>



                        <button onClick={handleLogout}>Đăng xuất</button>


                  </div>
                  <div className="container-right">
                        <Outlet />
                  </div>

            </div>
      );
}

export default HeaderVendor;
