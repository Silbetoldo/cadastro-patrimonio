// src/pages/Assets/Assets.logic.ts
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export interface SectorOption {
  id: number;
  name: string;
}

export interface Asset {
  id: number;
  name: string;
  assetNumber: string;
  sectorId: number;
  sectorName?: string | null;
}

const API_BASE_URL = "http://localhost:3001";

export function useAssetsLogic() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [sectors, setSectors] = useState<SectorOption[]>([]);

  const [name, setName] = useState("");
  const [assetNumber, setAssetNumber] = useState("");
  // select trabalha com string
  const [sectorId, setSectorId] = useState<string>("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<any>();

  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
  };

  const clearMessage = () => {
    setMessage(null);
    setIsError(false);
  };

  // pega o token; se não tiver, volta pro login
  const getTokenOrRedirect = (): string | null => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      showMessage("Sessão expirada. Faça login novamente.", true);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      });
      return null;
    }

    return token;
  };

  const loadSectors = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    try {
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

  useEffect(() => {
    loadSectors();
    loadAssets();
   
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessage();

    const trimmedName = name.trim();
    const trimmedNumber = assetNumber.trim();
    const numericSectorId = parseInt(sectorId, 10);

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
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || "Erro ao salvar patrimônio.", true);
        return;
      }

      showMessage(
        editingId
          ? "Patrimônio atualizado com sucesso!"
          : "Patrimônio criado com sucesso!",
        false
      );

      setName("");
      setAssetNumber("");
      setSectorId("");
      setEditingId(null);

      loadAssets();
    } catch (error) {
      console.error(error);
      showMessage("Erro ao salvar patrimônio.", true);
    }
  };

  const handleEditClick = (asset: Asset) => {
    setEditingId(asset.id);
    setName(asset.name);
    setAssetNumber(asset.assetNumber);
    setSectorId(String(asset.sectorId));
    showMessage(`Editando patrimônio ID ${asset.id}`, false);
  };

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

  const handleClear = () => {
    setEditingId(null);
    setName("");
    setAssetNumber("");
    setSectorId("");
    clearMessage();
  };

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
