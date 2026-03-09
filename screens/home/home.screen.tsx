import HomeBanner from '@/components/home/home.banner';
import WelcomeHeader from '@/components/home/welcome.header';
import { useTheme } from '@/context/theme.context';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView } from 'react-native';

export default function HomeScreen() {

    const { theme } = useTheme();
  return (
    <>
        <LinearGradient
        colors={
          theme.dark ? ["#180D41", "#2A2D32", "#131313"] : ["#fff", "#f7f7f7"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          flex: 1,
          backgroundColor: theme.dark ? "#101010" : "#fff",
        }}
      >
        <WelcomeHeader/>
        <ScrollView showsVerticalScrollIndicator={false} >
            <HomeBanner/>
        </ScrollView>
        </LinearGradient>
    </>
  )
}