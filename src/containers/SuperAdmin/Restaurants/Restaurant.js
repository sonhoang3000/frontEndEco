
import React, { useState, useEffect } from 'react'
import "./Restaurant.scss"


function Restaurant() {

      // const [fetchRestaurant, setFetchRestaurant] = useState([])

      useEffect(() => {
            // const fetchAllVendor = async () => {
            // 	try {
            // 		const responseVendor = await getVendorService("ALL")
            // 		setFetchRestaurant(responseVendor.vendors)

            // 	} catch (error) {
            // 		console.log('fetch Vendor error', error)
            // 	}
            // }
            // fetchAllVendor()
      })


      return (
            <>
                  <div className='container-restaurant'>
                        <div className='bg-restaurant'>
                        </div>
                  </div>

                  <table id="TableRestaurants">
                        <tbody>
                              <tr>
                                    <th>Image</th>
                                    <th>Email Vendor</th>
                                    <th>Name Restaurant</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                              </tr>
                              {/* {fetchVendor && fetchVendor.length > 0 &&
						fetchVendor.map((item, index) => {
							if (!item || !item.email || !item.totalRestaurants || !item.phoneNumber) {
								return null; // Bỏ qua nếu item không hợp lệ
							}
							return (
								<tr key={index}>
									<td>{item.email}</td>
									<td>{item.totalRestaurants}</td>
									<td>{item.phoneNumber}</td>
									<td>
										<button
											className="btn-edit" > <i className="fas fa-edit"></i> </button>
										<button
											className="btn-delete" > <i className="fas fa-trash"></i> </button>
									</td>
								</tr>
							)
						})

					} */}
                        </tbody>
                  </table>
            </>

      )
}


export default Restaurant
