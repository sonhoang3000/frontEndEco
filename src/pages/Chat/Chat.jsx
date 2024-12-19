import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { Container, Stack } from 'react-bootstrap'
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
				<Container>
					<PotentialChats />
					{userChats?.length < 1 ? null : (
						<Stack direction="horizontal" gap={3} className='align-items-start'>
							<Stack className='messages-box flex-grow-0 pe-3'>
								{isUserChatsLoading && <p>Loading Chats ...</p>}
								{userChats?.map((chat, index) => {
									return (
										<div key={index} onClick={() => updateCurrentChat(chat)} >
											<UserChat chat={chat} user={user} />
										</div>
									)
								})}
							</Stack>
							<Chatbox />
						</Stack>
					)}
				</Container>

			</div>

		</>

	)
}


export default Chat
