import axios from '../axios'

const createMessage = (textMessage, sender, currentChatId) => {
      return axios.post("/api/messages", {
            chatId: currentChatId,
            senderId: sender,
            text: textMessage
      })
}

const getMessage = (currentChat) => {
      return axios.get(`/api/messages/${currentChat}`)
}



export {
      createMessage, getMessage
}

