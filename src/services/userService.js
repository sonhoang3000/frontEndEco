import axios from "../axios";

const createNewUserService = (data) => {
      return axios.post('/api/create-new-user', data)
}

const getUserService = (userId) => {
      return axios.get(`/api/get-all-users/?id=${userId}`)
}

const deleteUserService = (userId) => {
      return axios.delete('/api/delete-user', {
            data: {
                  id: userId
            }
      })
}

const updateUser = (inputData) => {
      return axios.put("/api/update-user", inputData)
}

const getVendorService = (vendorId) => {
      return axios.get(`/api/get-all-vendors/?id=${vendorId}`)
}

export {
      createNewUserService, getUserService, deleteUserService, updateUser,
      getVendorService
}