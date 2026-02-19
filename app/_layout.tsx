import { ThemeProvider } from '@/context/theme.context'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function _layout() {
  return (
    <View>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/onBoarding/index" />
        </Stack>
      </ThemeProvider>
    </View>

  )
}