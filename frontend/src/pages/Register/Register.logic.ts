import { useState } from "react"; // Hook para gerenciar estados

// URL base da API onde o backend está rodando
const API_BASE_URL = "http://localhost:3001";

// Hook personalizado que concentra toda a lógica da tela de Registro
export function useRegisterLogic() {
  // Campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Controle de mensagens e erros
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Controle de carregamento para exibir loading/spinner
  const [isLoading, setIsLoading] = useState(false);

  // Função para exibir mensagens na tela
  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
  };

  // Limpa mensagens
  const clearMessage = () => {
    setMessage(null);
    setIsError(false);
  };

  // =========================================
  // SUBMIT DO FORMULÁRIO DE REGISTRO
  // =========================================
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita recarregar a página
    clearMessage();

    // Remove espaços antes/depois do texto
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    // Validação dos campos obrigatórios
    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirm) {
      showMessage("Preencha todos os campos.", true);
      return;
    }

    // Validação da senha
    if (trimmedPassword.length < 6) {
      showMessage("A senha deve ter pelo menos 6 caracteres.", true);
      return;
    }

    // Verifica se as senhas são iguais
    if (trimmedPassword !== trimmedConfirm) {
      showMessage("As senhas não conferem.", true);
      return;
    }

    try {
      setIsLoading(true); // Ativa o estado de loading

      // Faz a requisição ao backend para criar o usuário
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword
        })
      });

      const data = await response.json();

      // Se der erro no backend, mostra a mensagem retornada
      if (!response.ok) {
        showMessage(data.error || "Erro ao realizar cadastro.", true);
        return;
      }

      // Mensagem de sucesso para o usuário
      showMessage("Usuário cadastrado com sucesso! Faça login para continuar.", false);

      // Limpa campos — mantém o e-mail se preferir
      setName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      showMessage("Erro ao conectar ao servidor.", true);
    } finally {
      setIsLoading(false); // Desativa loading
    }
  };

  // Limpa todos os campos do formulário
  const handleClear = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    clearMessage();
  };

  // Retorna tudo que a tela precisa acessar
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    isError,
    isLoading,
    handleSubmit,
    handleClear
  };
}
