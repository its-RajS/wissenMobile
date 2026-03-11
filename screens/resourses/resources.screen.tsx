import { useTheme } from "@/context/theme.context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import {
    ScrollView,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
  
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
            
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  