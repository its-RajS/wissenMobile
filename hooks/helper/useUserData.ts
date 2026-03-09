import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from 'react'

export default function useUserData() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
        const getUserSessionData = async () => {
            const name  = SecureStore.getItem("name")
            const email  = SecureStore.getItem("email")
            const avatar  = SecureStore.getItem("avatar")

            setName(name!)
            setEmail(email!)
            setAvatar(avatar!)
        }
        getUserSessionData()
    }, [])
    

  return {name, email, avatar}
}