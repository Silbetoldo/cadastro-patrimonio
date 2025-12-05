import React from "react";
import { Platform, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

if (Platform.OS === "web") {
  require("./global.css"); // Tailwind para web
}

// Importa suas telas
import SectorsPage from "./src/pages/Sectors/Sectors";
import AssetsPage from "./src/pages/Assets/Assets";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Sectors">
          <Stack.Screen
            name="Sectors"
            component={SectorsPage}
            options={{ title: "Gerenciar Setores" }}
          />

          <Stack.Screen
            name="Assets"
            component={AssetsPage}
            options={{ title: "Gerenciar Patrimônios" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
