import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constants'
import {
    GoogleSignin
} from '@react-native-google-signin/google-signin'
import { BlurView } from 'expo-blur'
import JWT from "expo-jwt"
import React, { useEffect } from 'react'
import { Image, Platform, Pressable, Text, View } from 'react-native'



export default function AuthModal({ setModalVisible }: { setModalVisible: (val: boolean) => void }) {

    const configureGoogleSignIn = () => {
        try {
            if (Platform.OS === 'ios') {
                GoogleSignin.configure({
                    iosClientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY,
                });
            } else {
                GoogleSignin.configure({
                    webClientId: process.env.EXPO_PUBLIC_WEB_GOOGLE_API_KEY,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        configureGoogleSignIn()
    }, [])


    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            authHandler({
                name: user.data?.user.name!,
                email: user.data?.user.email!,
                avatar: user.data?.user.photo!
            })
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    const authHandler = async ({
        name,
        email,
        avatar
    }: {
        name: string;
        email: string;
        avatar: string;
    }) => {
        try {
            const user = {
                name, email, avatar
            }
            const token = JWT.encode(
                {
                    ...user
                },
                process.env.EXPO_PUBLIC_JWT_SECRET!
            )
            console.log(token)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <BlurView intensity={10} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Pressable style={{
                width: windowWidth(420),
                height: windowHeight(250),
                backgroundColor: "white",
                borderRadius: windowWidth(20),
                marginHorizontal: windowWidth(50),
                alignItems: "center",
                justifyContent: "center",
            }}
                onPress={e => e.stopPropagation()}
            >
                <Text
                    style={{
                        fontSize: fontSizes.FONT35,
                        fontFamily: "Poppins_600SemiBold",
                        color: "#05030D",
                    }}
                >
                    Join Wissen
                </Text>
                <Text
                    style={{
                        fontSize: fontSizes.FONT17,
                        fontFamily: "Poppins_300Light",
                        color: "#3E3B54",
                        paddingTop: windowHeight(5)
                    }}
                >
                    It's easier than your imagination
                </Text>
                <View
                    style={{
                        paddingVertical: windowHeight(10),
                        flexDirection: "row",
                        gap: windowWidth(20),
                    }}
                >
                    <Pressable
                        onPress={() => googleSignIn()}
                    >
                        <Image
                            source={require("@/assets/images/onboarding/google.png")}
                            style={{
                                width: windowWidth(40),
                                height: windowHeight(40),
                                resizeMode: "contain"
                            }}
                        />
                    </Pressable>
                    <Pressable>
                        <Image
                            source={require("@/assets/images/onboarding/github.png")}
                            style={{
                                width: windowWidth(40),
                                height: windowHeight(40),
                                resizeMode: "contain"
                            }}
                        />
                    </Pressable>
                    <Pressable>
                        <Image
                            source={require("@/assets/images/onboarding/apple.png")}
                            style={{
                                width: windowWidth(40),
                                height: windowHeight(40),
                                resizeMode: "contain"
                            }}
                        />
                    </Pressable>
                </View>
            </Pressable>

        </BlurView>
    )
}