import React, { useState } from 'react'
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import moment from 'moment';
import InputEmoji from "react-input-emoji"

function Chatbox() {

	const storedUser = localStorage.getItem("user");
	const user = storedUser ? JSON.parse(storedUser) : null;
	const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext)
	const { recipientUser } = useFetchRecipient(currentChat, user)

	const [textMessage, setTextMessage] = useState("")

	if (!recipientUser) return (
		<p style={{ textAlign: "center", width: "100%" }}>
			No conversation selected yet...
		</p>
	)

	if (isMessagesLoading) return (
		<p style={{ textAlign: "center", width: "100%" }}>
			Loading Chat...
		</p>
	)

	const handleInputChange = (e) => {
		setTextMessage(e.target.value);
	};


	return (
		<div gap={4} className='chat-box'>
			<div className='chat-header'>
				<strong>{recipientUser?.name}</strong>
			</div>
			<div gap={3} className='messages'>
				{messages && messages.map((message, index) => {
					return (
						<div key={index} className={`${message?.senderId === user?.id
							? "message self align-self-end flex-grow-0"
							: "message align-self-start flex-grow-0"
							}`}
						>
							<span>{message.text}</span>
							<span className='message-footer' >{moment(message.createdAt).calendar()}</span>
						</div>
					)

				})}
			</div>

			<InputEmoji
				value={textMessage}
				onChange={setTextMessage}
			/>
			<input
				type="text"
				value={textMessage}
				onChange={handleInputChange}
			/>

			<button className='send-btn' onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
				<i className="fa-solid fa-paper-plane"></i>
			</button>
		</div>
	)
}


export default Chatbox
