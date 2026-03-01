import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constants'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Image, Platform, Pressable, Text, View } from 'react-native'


export default function AuthModal({ setModalVisible }: { setModalVisible: (val: boolean) => void }) {

    const configureGoogleSignIn = () => {
        try {
            if (Platform.OS === 'ios') {
                GoogleSignin.configure({
                    iosClientId: process.env.EXPO_PUBLIC_IOS__GOOGLE_API_KEY,
                });
            } else {
                GoogleSignin.configure({
                    webClientId: "YOUR_WEB_CLIENT_ID",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const googleSignIn = async () => {
        console.log("Google Sign In");
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