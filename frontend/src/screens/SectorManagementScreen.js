import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const API_URL = "http://localhost:3001"; // sua API de setores

export default function SectorManagementScreen() {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newSectorName, setNewSectorName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadSectors = useCallback(async () => {
    try {
      if (!refreshing) setLoading(true);

      const response = await fetch(`${API_URL}/sectors`);

      if (!response.ok) {
        throw new Error("Erro ao buscar setores");
      }

      const data = await response.json();
      setSectors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading sectors:", error);
      Alert.alert("Erro", "Não foi possível carregar os setores.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [refreshing]);

  useEffect(() => {
    loadSectors();
  }, [loadSectors]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadSectors();
  }, [loadSectors]);

  async function handleAddSector() {
    const name = newSectorName.trim();
    if (!name) return;

    try {
      setSubmitting(true);

      const response = await fetch(`${API_URL}/sectors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        console.log("Error creating sector:", await response.text());
        Alert.alert("Erro", "Não foi possível criar o setor.");
        return;
      }

      setNewSectorName("");
      await loadSectors();
    } catch (error) {
      console.error("Error creating sector:", error);
      Alert.alert("Erro", "Não foi possível criar o setor.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-100"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Container centralizado tipo página web */}
      <View className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
        {/* Cabeçalho */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-slate-900">
            Cadastro de Patrimônio – Setores
          </Text>
          <Text className="text-sm text-slate-500 mt-1">
            Página desenvolvida em React Native + Expo Web + NativeWind,
            consumindo API em Node.js / PostgreSQL.
          </Text>
        </View>

        {/* Layout responsivo: coluna no mobile, lado a lado em telas grandes */}
        <View className="flex-1 flex-col gap-6 lg:flex-row">
          {/* Card de formulário */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <Text className="text-lg font-semibold text-slate-800 mb-3">
              Cadastrar novo setor
            </Text>

            <Text className="text-sm text-slate-600 mb-2">
              Informe o nome do setor para cadastrar na base de dados.
            </Text>

            <TextInput
              className="border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 mb-3"
              placeholder="Ex: Almoxarifado, TI, Administração"
              value={newSectorName}
              onChangeText={setNewSectorName}
            />

            <TouchableOpacity
              onPress={handleAddSector}
              disabled={submitting || !newSectorName.trim()}
              className={`rounded-lg px-4 py-3 items-center ${
                submitting || !newSectorName.trim()
                  ? "bg-blue-300"
                  : "bg-blue-600"
              }`}
            >
              <Text className="text-white font-semibold">
                {submitting ? "Salvando..." : "Salvar setor"}
              </Text>
            </TouchableOpacity>

            <Text className="text-xs text-slate-400 mt-3">
              Ao salvar, o setor será persistido na API ({API_URL}/sectors) e
              aparecerá automaticamente na lista ao lado.
            </Text>
          </View>

          {/* Card de listagem */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-semibold text-slate-800">
                Setores cadastrados
              </Text>
              <TouchableOpacity
                onPress={onRefresh}
                className="px-3 py-1 rounded-full bg-slate-100"
              >
                <Text className="text-xs text-slate-600">Atualizar</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <View className="flex-1 items-center justify-center py-6">
                <ActivityIndicator />
                <Text className="mt-2 text-slate-500 text-sm">
                  Carregando setores...
                </Text>
              </View>
            ) : (
              <FlatList
                data={sectors}
                keyExtractor={(item) => String(item.id)}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListEmptyComponent={
                  <Text className="text-center text-slate-500 mt-4 text-sm">
                    Nenhum setor cadastrado ainda.
                  </Text>
                }
                renderItem={({ item }) => (
                  <View className="bg-slate-50 border border-slate-200 p-3 mb-2 rounded-xl flex-row justify-between items-center">
                    <View>
                      <Text className="text-slate-800 font-medium">
                        {item.name}
                      </Text>
                      <Text className="text-slate-400 text-xs mt-0.5">
                        ID: {item.id}
                      </Text>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
