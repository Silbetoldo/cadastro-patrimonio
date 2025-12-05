import { useEffect, useState } from "react";

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

  const loadSectors = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/sectors`);
      const data = await response.json();
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
  }, []);

  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
  };

  const clearMessage = () => {
    setMessage(null);
    setIsError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessage();

    const trimmedName = name.trim();
    if (!trimmedName) {
      showMessage("O nome do setor é obrigatório.", true);
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE_URL}/sectors/${editingId}`
        : `${API_BASE_URL}/sectors`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName })
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || "Erro ao salvar setor.", true);
        return;
      }

      showMessage(
        editingId ? "Setor atualizado com sucesso!" : "Setor criado com sucesso!",
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

    try {
      const response = await fetch(`${API_BASE_URL}/sectors/${id}`, {
        method: "DELETE"
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
    handleClear
  };
}
