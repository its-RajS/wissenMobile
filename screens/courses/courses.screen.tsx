import GradiantText from '@/components/common/gradientText'
import { useTheme } from '@/context/theme.context'
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constants'
import SkeltonLoader from '@/utils/skeletonLoader'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import React, { useState } from 'react'
import { ScrollView, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale, verticalScale } from 'react-native-size-matters'

export default function CoursesScreen() {
    const {theme} = useTheme()
    const bottomTabBarHeight = useBottomTabBarHeight()
    const [isLoading, setIsLoading] = useState(true)


  return (
    <SafeAreaView
        style={{
            flex:1,
            backgroundColor: theme.dark ? "#131313" : "#fff"
        }}
    >
        <ScrollView showsVerticalScrollIndicator={false} style={{
            marginTop: verticalScale(-30),
            marginBottom: verticalScale(30)
        }} >
            <StatusBar barStyle={theme.dark ? "light-content": "dark-content"} />
            <View style={{
                marginHorizontal: windowWidth(20)
            }} >
                <View style={{
                    flexDirection: "row", marginTop: windowHeight(8)
                }}>
                    <Text style={{
                        fontSize: fontSizes.FONT35,
                        fontFamily: "Poppins_500Medium",
                        color: theme.dark ? "#fff" : "#000"
                    }} >
                        Popular
                    </Text>
                    <GradiantText
                        text="Courses"
                        styles={{
                            fontSize: fontSizes.FONT35,
                            fontFamily: "Poppins_500Medium",
                            paddingLeft: scale(5)
                        }}
                    />
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: "#12BB70",
                        width: windowWidth(15),
                        height: windowWidth(15),
                        borderRadius: 100,
                    }}/>
                    <Text
                        style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: fontSizes.FONT18,
                        paddingLeft: windowWidth(8),
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
                        <SkeltonLoader/>
                        </>
                    ): 
                    <View></View>
                }
        </ScrollView>
    </SafeAreaView>
  )
}