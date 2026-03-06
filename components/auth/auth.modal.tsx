import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constants'
import {
    GoogleSignin
} from '@react-native-google-signin/google-signin'
import axios from 'axios'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { BlurView } from 'expo-blur'
import JWT from "expo-jwt"
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as WebBrowser from 'expo-web-browser'
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

    //? Github Auth
    const githubAuthEndpoints = {
        authorizationEndpoint: "https://github.com/login/oauth/authorize",
        tokenEndpoint: "https://github.com/login/oauth/access_token",
        revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
    };

    const [request, response] = useAuthRequest(
        {
        clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
        clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!,
        scopes: ["identity"],
        redirectUri: makeRedirectUri({
            scheme: "wissenmobile",
        }),
        },
        githubAuthEndpoints
    );    

    useEffect(() => {
        if (response && response.type === "success") {
            const { code } = response.params; 
            fetchAccessToken(code);
        }
    }, [response]);


    const fetchAccessToken = async (code: string) => {
        try {
            const clientId = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!;
            const clientSecret = process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!;

            const body = new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                code,
            }).toString();

            const tokenResponse = await fetch("https://github.com/login/oauth/access_token",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body,
                }
            )
            const tokenData = await tokenResponse.json() as { access_token?: string; error?: string; error_description?: string };
            if (!tokenData?.access_token) {
                console.log(tokenData);
                return;
            }
            await fetchUserInfo(tokenData.access_token);
        }
        catch (error) {
            console.log(error); 
        }
    }

    const fetchUserInfo = async (accessToken: string) => {
        try {
            const userResponse = await fetch("https://api.github.com/user", {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
            });

            const data = await userResponse.json() as
                | { name?: string | null; email?: string | null; avatar_url?: string | null; login?: string | null }
                | { message?: string; status?: string | number; documentation_url?: string };

            if (!userResponse.ok) {
                console.log("GitHub /user error:", data);
                return;
            }

            const login = ("login" in data ? (data.login ?? null) : null);
            let email = ("email" in data ? (data.email ?? null) : null);
            if (!email) {
                const emailsRes = await fetch("https://api.github.com/user/emails", {
                    headers: {
                        Authorization: `token ${accessToken}`,
                        Accept: "application/vnd.github+json",
                    },
                });

                const emailsJson = await emailsRes.json() as unknown;

                if (emailsRes.ok && Array.isArray(emailsJson)) {
                    const emails = emailsJson as Array<{ email: string; primary: boolean; verified: boolean; visibility?: string | null }>;
                    const primary =
                        emails.find((e) => e.primary && e.verified) ??
                        emails.find((e) => e.primary) ??
                        emails[0];
                    email = primary?.email ?? null;
                } else {
                    // Some token types (notably GitHub App integrations) can't access /user/emails and return:
                    // { message: "Resource not accessible by integration", status: "403" }
                    console.log("GitHub /user/emails blocked/unexpected:", emailsJson);
                }
            }

            if (!email) {
                // Last-resort fallback: derive a stable, unique email so our backend (which requires `email`) can proceed.
                if (login) {
                    email = `${login}@users.noreply.github.com`;
                } else {
                    console.log("GitHub account has no accessible email and no login to derive fallback email.");
                    return;
                }
            }

            const resolvedEmail = email;
            authHandler({
                name: (("name" in data ? (data.name ?? login) : null) ?? "GitHub User") as string,
                email: resolvedEmail,
                avatar: (("avatar_url" in data ? (data.avatar_url ?? "") : "") as string),
                githubUserName: login ?? undefined,
            })
            console.log(data)
        }
        catch (error) {
            console.log(error);
            return;
        }
    }

    const redirectUri = makeRedirectUri({
        scheme: "wissenmobile",
      });

    const githubLogin = async () => {

        const authUrl =
            `https://github.com/login/oauth/authorize` +
            `?client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=read:user user:email`;

        const result = await WebBrowser.openAuthSessionAsync(
            authUrl,
            redirectUri
        );
    
        if (result.type === "success" && result.url) {
          const urlParams = new URLSearchParams(result.url.split("?")[1]);  
          const code: any = urlParams.get("code");
          fetchAccessToken(code);
        }
      };
 
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
        avatar,
        githubUserName,
    }: {
        name: string;
        email: string;
        avatar: string;
        githubUserName?: string;
    }) => {
        try {
            const user = {
                name, email, avatar, githubUserName
            }
            const token = JWT.encode(
                {
                    ...user
                },
                process.env.EXPO_PUBLIC_JWT_SECRET!
            )
            // console.log(token)
            const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
                signedToken: token
            })

            await SecureStore.setItemAsync("accessToken", res.data.accessToken)

            router.push("/(tabs)")
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
                    <Pressable onPress={() => githubLogin()}>
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