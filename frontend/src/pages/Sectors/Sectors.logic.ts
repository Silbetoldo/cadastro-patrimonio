import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export interface Sector {
  id: number;
  name: string;
}

const API_BASE_URL = "http://localhost:3001";

export function useSectorsLogic() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [name, setName] = useState("");
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
      setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessage();

    const trimmedName = name.trim();
    if (!trimmedName) {
      showMessage("O nome do setor é obrigatório.", true);
      return;
    }

    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE_URL}/sectors/${editingId}`
        : `${API_BASE_URL}/sectors`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: trimmedName })
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || "Erro ao salvar setor.", true);
        return;
      }

      showMessage(
        editingId
          ? "Setor atualizado com sucesso!"
          : "Setor criado com sucesso!",
        false
      );

      setName("");
      setEditingId(null);
      loadSectors();
    } catch (error) {
      console.error(error);
      showMessage("Erro ao salvar setor.", true);
    }
  };

  const handleEditClick = (sector: Sector) => {
    setEditingId(sector.id);
    setName(sector.name);
    showMessage(`Editando setor ID ${sector.id}`, false);
  };

  const handleDeleteClick = async (id: number) => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este setor? (Não pode ter patrimônio vinculado)"
    );
    if (!confirmed) return;

    clearMessage();

    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/sectors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || "Erro ao excluir setor.", true);
        return;
      }

      showMessage("Setor excluído com sucesso!", false);
      loadSectors();
    } catch (error) {
      console.error(error);
      showMessage("Erro ao excluir setor.", true);
    }
  };

  const handleClear = () => {
    setName("");
    setEditingId(null);
    clearMessage();
  };

  const handleGoToAssets = () => {
    navigation.navigate("Assets");
  };

  return {
    sectors,
    name,
    setName,
    editingId,
    message,
    isError,
    isLoading,
    handleSubmit,
    handleEditClick,
    handleDeleteClick,
    handleClear,
    handleGoToAssets
  };
}
