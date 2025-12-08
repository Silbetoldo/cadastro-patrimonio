// src/pages/Assets/Assets.logic.ts

import { useEffect, useState } from "react"; // Hooks do React para estado e ciclo de vida
import { useNavigation } from "@react-navigation/native"; // Hook para navegar entre telas

// Interface que representa um setor no dropdown
export interface SectorOption {
  id: number;
  name: string;
}

// Interface que representa um patrimônio
export interface Asset {
  id: number;
  name: string;
  assetNumber: string;
  sectorId: number;
  sectorName?: string | null; // Nome do setor pode ser opcional
}

// URL base da API
const API_BASE_URL = "http://localhost:3001";

// Hook personalizado que concentra toda a lógica da página de Patrimônios
export function useAssetsLogic() {
  // Lista de patrimônios e setores carregados da API
  const [assets, setAssets] = useState<Asset[]>([]);
  const [sectors, setSectors] = useState<SectorOption[]>([]);

  // Estados do formulário
  const [name, setName] = useState("");
  const [assetNumber, setAssetNumber] = useState("");

  // sectorId vem do <select>, então é string
  const [sectorId, setSectorId] = useState<string>("");

  // ID do item sendo editado; null significa modo de criação
  const [editingId, setEditingId] = useState<number | null>(null);

  // Controle de mensagens
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Controle de carregamento para exibir spinner caso necessário
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<any>();

  // Exibe uma mensagem na tela
  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
  };

  // Limpa mensagens
  const clearMessage = () => {
    setMessage(null);
    setIsError(false);
  };

  // =====================================
  // Função que pega o token; se não achar, redireciona para Login
  // =====================================
  const getTokenOrRedirect = (): string | null => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      showMessage("Sessão expirada. Faça login novamente.", true);

      // Reseta a navegação para obrigar o usuário a logar novamente
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      });

      return null;
    }

    return token;
  };

  // =====================================
  // Carrega os setores da API
  // =====================================
  const loadSectors = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      // Requisição GET para /sectors
      const response = await fetch(`${API_BASE_URL}/sectors`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || "Erro ao carregar setores.", true);
        setSectors([]);
        return;
      }

      setSectors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      showMessage("Erro ao carregar setores.", true);
    }
  };

  // =====================================
  // Carrega os patrimônios da API
  // =====================================
  const loadAssets = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/assets`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || "Erro ao carregar patrimônios.", true);
        setAssets([]);
        return;
      }

      setAssets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      showMessage("Erro ao carregar patrimônios.", true);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega setores e patrimônios assim que a tela abre
  useEffect(() => {
    loadSectors();
    loadAssets();
  }, []);

  // =====================================
  // SUBMIT DO FORMULÁRIO (criação e edição)
  // =====================================
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessage();

    const trimmedName = name.trim();
    const trimmedNumber = assetNumber.trim();
    const numericSectorId = parseInt(sectorId, 10); // converte para número

    // Validação simples
    if (
      !trimmedName ||
      !trimmedNumber ||
      !numericSectorId ||
      Number.isNaN(numericSectorId)
    ) {
      showMessage("Preencha todos os campos.", true);
      return;
    }

    const token = getTokenOrRedirect();
    if (!token) return;

    const payload = {
      name: trimmedName,
      assetNumber: trimmedNumber,
      sectorId: numericSectorId
    };

    try {
      // Define se a requisição será POST (criar) ou PUT (editar)
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE_URL}/assets/${editingId}`
        : `${API_BASE_URL}/assets`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload) // manda dados do formulário
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || "Erro ao salvar patrimônio.", true);
        return;
      }

      // Mensagem diferente para criar ou editar
      showMessage(
        editingId
          ? "Patrimônio atualizado com sucesso!"
          : "Patrimônio criado com sucesso!",
        false
      );

      // Limpa o formulário
      setName("");
      setAssetNumber("");
      setSectorId("");
      setEditingId(null);

      // Recarrega a lista
      loadAssets();
    } catch (error) {
      console.error(error);
      showMessage("Erro ao salvar patrimônio.", true);
    }
  };

  // =====================================
  // Seleciona um patrimônio para edição
  // =====================================
  const handleEditClick = (asset: Asset) => {
    setEditingId(asset.id);
    setName(asset.name);
    setAssetNumber(asset.assetNumber);
    setSectorId(String(asset.sectorId)); // transforma número em string
    showMessage(`Editando patrimônio ID ${asset.id}`, false);
  };

  // =====================================
  // Excluir patrimônio
  // =====================================
  const handleDeleteClick = async (id: number) => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este patrimônio?"
    );
    if (!confirmed) return;

    clearMessage();

    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || "Erro ao excluir patrimônio.", true);
        return;
      }

      showMessage("Patrimônio excluído com sucesso!", false);
      loadAssets();
    } catch (error) {
      console.error(error);
      showMessage("Erro ao excluir patrimônio.", true);
    }
  };

  // =====================================
  // Limpa formulário e mensagens
  // =====================================
  const handleClear = () => {
    setEditingId(null);
    setName("");
    setAssetNumber("");
    setSectorId("");
    clearMessage();
  };

  // =====================================
  // Retorna tudo que a tela precisa
  // =====================================
  return {
    assets,
    sectors,
    name,
    setName,
    assetNumber,
    setAssetNumber,
    sectorId,
    setSectorId,
    editingId,
    message,
    isError,
    isLoading,
    handleSubmit,
    handleEditClick,
    handleDeleteClick,
    handleClear
  };
}
