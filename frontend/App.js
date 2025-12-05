import "./global.css"; // importa o tailwind pro web

import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import SectorManagementScreen from "./src/screens/SectorManagementScreen";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar barStyle="dark-content" />
      <SectorManagementScreen />
    </SafeAreaView>
  );
}
