import React from "react"; // Importa o React para poder usar JSX
import { Platform, SafeAreaView } from "react-native"; // Platform identifica se é web ou mobile, SafeAreaView organiza o layout em áreas seguras
import { NavigationContainer } from "@react-navigation/native"; // Container principal de navegação
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Navegação em pilha (Stack Navigator)
import { StatusBar } from "expo-status-bar"; // Componente para controlar a barra de status

// Se estiver rodando na plataforma web, importa o CSS global
if (Platform.OS === "web") {
  require("./global.css");
}

// ============================
// Importação das páginas (telas)
// ============================
import LoginPage from "./src/pages/Login/Login";
import RegisterPage from "./src/pages/Register/Register";
import SectorsPage from "./src/pages/Sectors/Sectors";
import AssetsPage from "./src/pages/Assets/Assets";

// Criação do Stack Navigator (pilha de telas)
const Stack = createNativeStackNavigator();

// Componente principal do aplicativo
export default function App() {
  return (
    // SafeAreaView evita que conteúdo fique atrás da barra de status (iOS principalmente)
    <SafeAreaView className="flex-1 bg-slate-100">
      
      {/* Define cor e estilo da barra de status */}
      <StatusBar style="dark" />

      {/* Container de navegação, obrigatório para qualquer navegação funcionar */}
      <NavigationContainer>
        
        {/* Declaração das rotas usando stack navigator */}
        <Stack.Navigator
          initialRouteName="Login" // Tela inicial será Login
          screenOptions={{ headerShown: false }} // Esconde o cabeçalho padrão do React Navigation
        >
          {/* Cada Stack.Screen representa uma tela acessível no app */}
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Sectors" component={SectorsPage} />
          <Stack.Screen name="Assets" component={AssetsPage} />
        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaView>
  );
}
