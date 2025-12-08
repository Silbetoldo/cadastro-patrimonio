import { useEffect, useState } from "react"; // Hooks do React para estado e efeitos colaterais
import { useNavigation } from "@react-navigation/native"; // Hook para navegar entre telas

// Interface representando um setor vindo da API
export interface Sector {
  id: number;
  name: string;
}

// URL base da API
const API_BASE_URL = "http://localhost:3001";

// Hook personalizado contendo toda a lógica da página de setores
export function useSectorsLogic() {
  // Lista de setores carregados do backend
  const [sectors, setSectors] = useState<Sector[]>([]);

  // Campo do formulário
  const [name, setName] = useState("");

  // ID do setor em edição; se for null, estamos criando um novo
  const [editingId, setEditingId] = useState<number | null>(null);

  // Controle de mensagens de feedback ao usuário
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Indicador de carregamento para exibir spinner
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<any>();

  // Exibe mensagem de erro ou sucesso
  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
  };

  // Limpa qualquer mensagem atual
  const clearMessage = () => {
    setMessage(null);
    setIsError(false);
  };

  // =====================================================
  // Função que obtém o token; se não existir, redireciona para Login
  // =====================================================
  const getTokenOrRedirect = (): string | null => {
    const token = localStorage.getItem("authToken");

    // Se o token não existe, a sessão expirou
    if (!token) {
      showMessage("Sessão expirada. Faça login novamente.", true);

      // Reset na navegação leva o usuário para login
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      });

      return null;
    }

    return token;
  };

  // =====================================================
  // Carrega todos os setores da API
  // =====================================================
  const loadSectors = async () => {
    const token = getTokenOrRedirect();
    if (!token) return; // Sem token, não continua

    try {
      setIsLoading(true);

      // Requisição GET para /sectors
      const response = await fetch(`${API_BASE_URL}/sectors`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      // Se der erro na API, exibe mensagem
      if (!response.ok) {
        showMessage(data.error || "Erro ao carregar setores.", true);
        setSectors([]);
        return;
      }

      // Atualiza a lista de setores
      setSectors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      showMessage("Erro ao carregar setores.", true);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega setores quando a tela é aberta
  useEffect(() => {
    loadSectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================================
  // Função para criar ou atualizar um setor
  // =====================================================
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita reload da página
    clearMessage();

    const trimmedName = name.trim();
    if (!trimmedName) {
      showMessage("O nome do setor é obrigatório.", true);
      return;
    }

    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      // Define se é PUT (editar) ou POST (criar)
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE_URL}/sectors/${editingId}`
        : `${API_BASE_URL}/sectors`;

      // Envia os dados para a API
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

      // Mensagem variando conforme edição ou criação
      showMessage(
        editingId
          ? "Setor atualizado com sucesso!"
          : "Setor criado com sucesso!",
        false
      );

      // Limpa campos e recarrega lista
      setName("");
      setEditingId(null);
      loadSectors();
    } catch (error) {
      console.error(error);
      showMessage("Erro ao salvar setor.", true);
    }
  };

  // Preenche o formulário com os dados do setor selecionado para edição
  const handleEditClick = (sector: Sector) => {
    setEditingId(sector.id);
    setName(sector.name);
    showMessage(`Editando setor ID ${sector.id}`, false);
  };

  // =====================================================
  // Excluir setor
  // =====================================================
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

  // Limpa formulário e mensagens
  const handleClear = () => {
    setName("");
    setEditingId(null);
    clearMessage();
  };

  // Navega para a tela de Patrimônios
  const handleGoToAssets = () => {
    navigation.navigate("Assets");
  };

  // Retorna tudo o que a tela precisa acessar
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
