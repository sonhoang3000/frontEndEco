import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import Navbar from '../../components/Navbar'
import './Chat.css'
import UserChat from './UserChat'
import PotentialChats from './PotentialChats'
import Chatbox from './Chatbox'

function Chat() {

	const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext)
	const storedUser = localStorage.getItem("user");
	const user = storedUser ? JSON.parse(storedUser) : null;

	return (
		<>
			<Navbar />
			<div className='chat-container'>
				<PotentialChats />
				{userChats?.length < 1 ? null : (
					<div direction="horizontal" gap={3} className='align-items-start'>
						<div className='messages-box flex-grow-0 pe-3'>
							{isUserChatsLoading && <p>Loading Chats ...</p>}
							{userChats?.map((chat, index) => {
								return (
									<div key={index} onClick={() => updateCurrentChat(chat)} >
										<UserChat chat={chat} user={user} />
									</div>
								)
							})}
						</div>
						<Chatbox />
					</div>
				)}

			</div>

		</>

	)
}


export default Chat
