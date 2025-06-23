import { Slot, Tabs } from "expo-router";
import { House, ShoppingCart } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // For web, use Slot to allow dashboard routing with sidebar
  if (process.env.EXPO_OS === "web") return <Slot />;

  // For mobile, use tabs navigation
  return (
    <Tabs
      screenOptions={{
        lazy: false,
        tabBarButton: HapticTab,
        headerShown: false,
        tabBarActiveTintColor: "rgb(15, 23, 42)",
        tabBarStyle: {
          position: "absolute",
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: (props) => <House {...props} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: (props) => <House {...props} />,
        }}
      />
      <Tabs.Screen
        name="(auth)"
        options={{
          title: "Auth",
          tabBarIcon: (props) => <ShoppingCart {...props} />,
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
