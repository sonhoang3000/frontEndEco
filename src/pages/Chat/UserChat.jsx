import React, { useContext } from 'react'
import { useFetchRecipient } from '../../hooks/useFetchRecipient'
import { ChatContext } from '../../context/ChatContext'

function UserChat({ chat, user }) {
	const { recipientUser } = useFetchRecipient(chat, user)

	const { onlineUsers } = useContext(ChatContext)

	const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

	return (
		<div
			direction="horizontal"
			gap={3}
			className='user-card align-items-center p-2 justify-content-between'
		>
			<div className='d-flex'>
				<div className='me-2'>A</div>
				<div className='text-context'>
					<div className='name'>{recipientUser?.name}</div>
					<div className='text'>Text Message</div>
				</div>
			</div>
			<div className='d-flex flex-column align-items-end'>
				<div className='this-user-notifications'>3</div>
				<span className={isOnline ? "user-online" : ""} ></span>
			</div>

		</div>
	)
}


export default UserChat
