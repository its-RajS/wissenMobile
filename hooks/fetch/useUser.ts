import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { useCallback, useEffect, useState } from 'react'

export const setAutharizationHeader = async () => {
    try {
        const token = await SecureStore.getItemAsync("accessToken")
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
    } catch (error) {
        console.error(error)
    }
}  

export default function useUser() {
    const [user, setUser] = useState<UserProps | null>()
    const [loading, setLoading] = useState(true)
    const [shouldRefetch, setShouldRefetch] = useState(false)

    const fetchUserData = useCallback(async ()=> {
        setLoading(true)
        try {
            await setAutharizationHeader()
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/me`)
            await SecureStore.setItemAsync("name", response.data.user.name)
            await SecureStore.setItemAsync("email", response.data.user.email)
            await SecureStore.setItemAsync("avatar", response.data.user.avatar)
            setUser(response.data.user)
            } catch (error) {
                console.error(error)
                setUser(null)
            } finally {
                setLoading(false)
            }
    },[])

    useEffect(() => {
        fetchUserData()
        return () => setShouldRefetch(true)
    }, [fetchUserData])

    const refetch = () => {
        setShouldRefetch(true)
    }

    return { user, loading, refetch }
}