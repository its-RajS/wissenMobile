import GradiantText from '@/components/common/gradientText';
import HomeBanner from '@/components/home/home.banner';
import WelcomeHeader from '@/components/home/welcome.header';
import { useTheme } from '@/context/theme.context';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constants';
import SkeltonLoader from '@/utils/skeletonLoader';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export default function HomeScreen() {
    const [isLoading, setIsLoading] = useState(true)
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
            <View
                style={{
                marginHorizontal: windowWidth(20),
                marginTop: verticalScale(-25),
                }}>
                    <View
                        style={{
                          flexDirection: "row",
                          marginTop: windowHeight(5),
                        }}
                      >
                        <Text
                          style={{
                            fontSize: fontSizes.FONT35,
                            fontFamily: "Poppins_500Medium",
                            color: theme.dark ? "#fff" : "#000",
                          }}
                        >
                          Popular
                        </Text>
                        <GradiantText
                          text="Courses"
                          styles={{
                            fontSize: fontSizes.FONT35,
                            fontFamily: "Poppins_500Medium",
                            paddingLeft: scale(5),
                          }}
                        />
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            backgroundColor: "#12BB70",
                            width: windowWidth(15),
                            height: windowWidth(15),
                            borderRadius: 100,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: fontSizes.FONT18,
                            paddingLeft: windowWidth(5),
                            color: theme.dark ? "#fff" : "#000",
                          }}
                        >
                          our comprehensive project based courses
                        </Text>
                      </View>
                </View>
                {
                    isLoading ? (
                        <>
                        <SkeltonLoader/>
                        <SkeltonLoader/>
                        </>
                    ): 
                    <View></View>
                }
        </ScrollView>

        </LinearGradient>
    </>
  )
}