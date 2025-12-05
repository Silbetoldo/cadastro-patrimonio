import { useEffect, useState } from "react";

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
  // agora sempre string (select trabalha com string)
  const [sectorId, setSectorId] = useState<string>("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
  };

  const clearMessage = () => {
    setMessage(null);
    setIsError(false);
  };

  const loadSectors = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sectors`);
      const data = await response.json();
      setSectors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      showMessage("Erro ao carregar setores.", true);
    }
  };

  const loadAssets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/assets`);
      const data = await response.json();
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
    const numericSectorId = parseInt(sectorId, 10); // converte aqui

    if (!trimmedName || !trimmedNumber || !numericSectorId || Number.isNaN(numericSectorId)) {
      showMessage("Preencha todos os campos.", true);
      return;
    }

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
        headers: { "Content-Type": "application/json" },
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
    // sectorId é string → converte
    setSectorId(String(asset.sectorId));
    showMessage(`Editando patrimônio ID ${asset.id}`, false);
  };

  const handleDeleteClick = async (id: number) => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este patrimônio?"
    );
    if (!confirmed) return;

    clearMessage();

    try {
      const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
        method: "DELETE"
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
