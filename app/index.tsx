import { Redirect } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

export default function index() {
    const [loggedInUser, setLoggedInUser] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const subscription = async () => {
            const accessToken = await SecureStore.getItemAsync("accessToken")
            setLoggedInUser(accessToken ? true : false)
            console.log("accessToken", accessToken)
            setIsLoading(false)
        }
        subscription()
    }, [])

    return (
        <>
            {
                isLoading ? (
                    <>
                        <Text>Loading...</Text>
                    </>
                ) : (
                    <Redirect href={!loggedInUser ? '/(routes)/onBoarding' : '/(tabs)'} />
                )
            }
        </>
    )
} 