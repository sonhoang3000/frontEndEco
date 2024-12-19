import axios from '../axios'

const createChatService = (firstId, secondId) => {
      console.log('check firstId', firstId)
      console.log('check firstId', firstId)
      return axios.post("/api/chats", {
            firstId: firstId,
            secondId: secondId,
      })
}

const findUserChats = (userId) => {
      return axios.get(`/api/chats/${userId}`)
}

const findChat = (firstId, secondId) => {
      return axios.get(`/api/chats/find/${firstId}/${secondId}`)
}

export {
      createChatService, findUserChats, findChat
}

