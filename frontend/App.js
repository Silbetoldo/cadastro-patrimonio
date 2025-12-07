import React from "react";
import { Platform, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

if (Platform.OS === "web") {
  require("./global.css");
}

// Telas
import LoginPage from "./src/pages/Login/Login";
import RegisterPage from "./src/pages/Register/Register";
import SectorsPage from "./src/pages/Sectors/Sectors";
import AssetsPage from "./src/pages/Assets/Assets";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"          // 👈 agora abre no Login
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Sectors" component={SectorsPage} />
          <Stack.Screen name="Assets" component={AssetsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
