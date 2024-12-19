import { createContext, useCallback, useEffect, useState } from "react";
import { findUserChats, createChatService } from "../services/chatService"
import { getUserService } from "../services/userService"
import { getMessage, createMessage } from "../services/messageService"
import { io } from 'socket.io-client';

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
	const [userChats, setUserChats] = useState(null)
	const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
	const [userChatsError, setUserChatsError] = useState(null)
	const [potentialChats, setPotentialChats] = useState([])
	const [currentChat, setCurrentChat] = useState(null)
	const [messages, setMessages] = useState(null)
	const [isMessagesLoading, setIsMessagesLoading] = useState(false)
	const [messagesError, setMessagesError] = useState(null)
	const [sendTextMessageError, setSendTextMessageError] = useState(null)
	const [newMessage, setNewMessage] = useState(null)

	const [socket, setSocket] = useState(null)
	const [onlineUsers, setOnlineUsers] = useState([])

	useEffect(() => {
		const newSocket = io("http://localhost:8080")
		setSocket(newSocket)

		return () => {
			newSocket.disconnect()
		}
	}, [user])

	//add online users
	useEffect(() => {
		if (socket === null) return;
		socket.emit("addNewUser", user?.id)
		socket.on("getOnlineUsers", (res) => {
			setOnlineUsers(res)
		})

		return () => {
			socket.off("getOnlineUsers")
		}
	}, [socket])

	//send message
	useEffect(() => {
		if (socket === null) return;

		const recipientId = currentChat?.members.find((id) => id !== user.id)

		socket.emit("sendMessage", { ...newMessage, recipientId })

	}, [newMessage])

	//receive message
	useEffect(() => {
		if (socket === null) return;

		socket.on("getMessage", res => {
			if (currentChat?._id !== res.chatId) return

			setMessages((prev) => [...prev, res])
		})

		return () => {
			socket.off("getMessage")
		}

	}, [socket, currentChat])

	useEffect(() => {
		const getUsers = async () => {
			const response = await getUserService("ALL")
			const res = response.users
			const pChats = res.filter((u) => {
				let isChatCreated = false
				if (user.id === u._id) return false;

				if (userChats) {
					isChatCreated = userChats.some((chat) => {
						return chat.members[0] === u.id || chat.members[1] === u.id
					})
				}
				return !isChatCreated
			})
			setPotentialChats(pChats)
		}
		getUsers()
	}, [userChats])

	useEffect(() => {
		const getUserChats = async () => {
			if (!user) {
				return null
			}
			else {
				setIsUserChatsLoading(true)
				setUserChatsError(null)
				const response = await findUserChats(user.id)
				setIsUserChatsLoading(false)

				if (!response) {
					return setUserChatsError("Error setUserChatsError")
				}
				setUserChats(response)
			}
		}
		getUserChats()
	}, [user])

	useEffect(() => {
		const getMessages = async () => {
			setIsMessagesLoading(true)
			setMessagesError(null)

			const response = await getMessage(currentChat?._id)
			setIsMessagesLoading(false)

			if (!response) {
				return setUserChatsError("Error setUserChatsError")
			}
			setMessages(response)

		}
		getMessages()
	}, [currentChat])

	const updateCurrentChat = useCallback((chat) => {
		setCurrentChat(chat)
	}, [])

	const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
		console.log('check textMessage', textMessage)
		const response = await createMessage(textMessage, sender?.id, currentChatId)

		setNewMessage(response)
		setMessages((prev) => [...prev, response])
		setTextMessage("")

	}, [])

	const createChat = useCallback(async (firstId, secondId) => {
		const response = await createChatService(firstId, secondId)
		console.log('check response', response)
		setUserChats((prev) => [...prev, response])

	}, [])

	return <ChatContext.Provider
		value={{
			userChats,
			isUserChatsLoading,
			userChatsError,
			potentialChats,
			createChat,
			updateCurrentChat,
			messages,
			isMessagesLoading,
			messagesError,
			currentChat,
			sendTextMessage,
			onlineUsers
		}}
	>
		{children}
	</ChatContext.Provider>
}