import { useEffect, useState } from "react";
import { getUserService } from "../services/userService"

export const useFetchRecipient = (chat, user) => {
      const [recipientUser, setRecipientUser] = useState(null)

      const recipientId = chat?.members.find((id) => id !== user.id)

      useEffect(() => {
            const getUser = async () => {
                  if (!recipientId) return null
                  const response = await getUserService(recipientId)

                  setRecipientUser(response.users)
            };

            getUser()
      }, [recipientId])

      return { recipientUser }
}