import SourceCodeCard from "@/components/cards/sourceCode";
import { videoLessonsData } from "@/config/constants";
import { useTheme } from "@/context/theme.context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  FlatList,
  ScrollView,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalScale } from "react-native-size-matters";
  
  export default function ResourcesScreen() {
    const { theme } = useTheme();
    const bottomTabBarHeight = useBottomTabBarHeight();
  
    return (
      <SafeAreaView
        style={{
          backgroundColor: theme.dark ? "#131313" : "#fff",
          flex: 1,
        }}
      >
        <ScrollView>

          <View style={{ paddingBottom: bottomTabBarHeight - 20 }}>
          <FlatList
            data={videoLessonsData}
            renderItem={({ item }) => <SourceCodeCard item={item} />}
            showsVerticalScrollIndicator={false}
            style={{
              paddingTop: verticalScale(10),
            }}
          />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  