import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Platform } from "react-native";
import React from "react";

// Importa tailwind do web (não afeta mobile)
if (Platform.OS === "web") {
  require("./global.css");
}

// Screen principal
import SectorManagementScreen from "./src/screens/SectorManagementScreen";
import AssetsPage from "./src/pages/Assets/Assets";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* StatusBar universal */}
      <StatusBar style="dark" />

      {/* Conteúdo da aplicação */}
   
      <AssetsPage />
    </SafeAreaView>
  );
}
