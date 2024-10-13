import React, { useState, useEffect } from 'react'
import "./UserManage.scss";
import { createNewUserService, getUserService, deleteUserService, updateUser } from '../../../services/userService'

function UserManage() {

	const [dataUser, setDataUser] = useState({
		idEditUser: '',
		email: '',
		password: '',
		name: '',
		address: ''
	});

	const [actionEdit, setActionEdit] = useState(false)

	const [fetchUserData, setFetchUserData] = useState([])

	useEffect(() => {
		// console.log('check fail')
		const fetchUser = async () => {
			try {
				const response = await getUserService("ALL");
				setFetchUserData(response.users); // Lưu dữ liệu vào state
			} catch (error) {
				console.log('fetch User error', error)
			}

		}

		fetchUser();

	}, [])

	let onChangeInput = (event, id) => {
		let copyState = { ...dataUser };
		copyState[id] = event.target.value;
		setDataUser({
			...copyState
		})
	}

	let checkValidateInput = () => {
		let isValid = true;
		let arrCheck = ['email', 'password', 'name', 'address']
		for (let i = 0; i < arrCheck.length; i++) {
			if (!dataUser[arrCheck[i]]) {
				isValid = false;
				alert('This input is required: ' + arrCheck[i])
				break;
			}
		}

		return isValid;
	}

	let handleSaveUserAndEdit = async () => {
		console.log('check actionEdit', actionEdit)
		if (actionEdit === false) {
			let userValid = checkValidateInput();

			if (userValid === false) return;
			try {
				const response = await createNewUserService(dataUser);
				console.log('check response', response)
				if (response && response.errCode === 0) {
					const getALLUser = await getUserService("ALL");
					setFetchUserData([...fetchUserData, getALLUser.user]);
					setDataUser({
						email: '',
						password: '',
						name: '',
						address: ''
					});
				}

			} catch (error) {
				console.error('Error adding user:', error);
			}
		} else {
			try {
				const response = await updateUser(dataUser);
				console.log('check response', response)

				setDataUser({
					email: '',
					password: '',
					name: '',
					address: ''
				});
				setActionEdit(false);
			} catch (error) {
				console.error('Error saving user:', error);
			}
		}

	}

	let handleDeleteUser = (id) => {
		const deleteUser = deleteUserService(id);
		if (deleteUser) {
			console.log('check ok')
			setFetchUserData(dataUser => dataUser.filter(user => user.id !== id));
		}
	}

	let handleUpdateUser = async (item) => {
		console.log('check item', item)
		setDataUser({
			idEditUser: item.id,
			email: item.email,
			name: item.name,
			address: item.address,
		})
	}

	return (
		<>
			<div className='content-container'>
				<div className='title' style={{ margin: "10px" }}>
					Thêm mới người dùng
				</div>

				<div className="user-body" style={{ margin: "10px 120px" }}>
					<div className="container">
						<div className="row">
							<div className="col-3 ">
								<label> Email</label>
								<input className='form-control' type="email"
									value={dataUser.email}
									onChange={(event) => { onChangeInput(event, 'email') }}
								/>
							</div>
							<div className="col-3">
								<label> Mật khẩu</label>
								<input className='form-control' type="text"
									onChange={(event) => { onChangeInput(event, 'password') }}
								/>
							</div>
							<div className="col-3">
								<label>Tên</label>
								<input className='form-control' type="text"
									value={dataUser.name}
									onChange={(event) => { onChangeInput(event, 'name') }}
								/>
							</div>
							<div className="col-3">
								<label>Address</label>
								<input className='form-control' type="text"
									value={dataUser.address}
									onChange={(event) => { onChangeInput(event, 'address') }}
								/>
							</div>
							<div className="col-12 my-3">
								<button
									className={actionEdit === true ? "btn btn-warning" : "btn btn-primary"}
									onClick={() => handleSaveUserAndEdit()}
								>Lưu user</button>
							</div>
						</div>
					</div>
				</div>


			</div>

			<table id="TableManageUser" >
				<tbody>
					<tr>
						<th>Email</th>
						<th>Name</th>
						<th>Address</th>
						<th>Actions</th>
					</tr>
					{fetchUserData && fetchUserData.length > 0 &&
						fetchUserData.map((item, index) => {
							if (!item || !item.email || !item.name || !item.address) {
								return null; // Bỏ qua nếu item không hợp lệ
							}
							return (
								<tr key={index}>
									<td>{item.email}</td>
									<td>{item.name}</td>
									<td>{item.address}</td>
									<td>
										<button
											onClick={() => {
												handleUpdateUser(item);
												setActionEdit(true)
											}}
											className="btn-edit" > <i className="fas fa-edit"></i> </button>
										<button
											onClick={() => handleDeleteUser(item.id)}
											className="btn-delete" > <i className="fas fa-trash"></i> </button>
									</td>
								</tr>
							)
						})

					}

				</tbody>
			</table >
		</>


	)
}


export default UserManage
