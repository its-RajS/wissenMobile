import { ThemeProvider } from '@/context/theme.context'
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { SplashScreen, Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

SplashScreen.preventAutoHideAsync()

export default function _layout() {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })


  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/onBoarding/index" />
        </Stack>
      </ThemeProvider>
    </View>
  )
}