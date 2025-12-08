import { useState } from "react"; // Hook para gerenciar estados dentro do componente

// URL base da API
const API_BASE_URL = "http://localhost:3001";

// Hook personalizado que contém toda a lógica da tela de Login
export function useLoginLogic() {
  // Campos do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Controle de mensagens de erro ou sucesso
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Indicador de carregamento (ex: mostrar spinner)
  const [isLoading, setIsLoading] = useState(false);

  // Indica se o login foi bem-sucedido
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Função para exibir mensagens na tela
  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
  };

  // Limpa mensagens e erros
  const clearMessage = () => {
    setMessage(null);
    setIsError(false);
  };

  // =====================================
  // Função principal de Login (submit do formulário)
  // =====================================
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita reload da página
    clearMessage();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validação simples dos campos
    if (!trimmedEmail || !trimmedPassword) {
      showMessage("Preencha e-mail e senha.", true);
      return;
    }

    try {
      setIsLoading(true); // Ativa o indicador de carregamento

      // Faz a requisição para a API de login
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword
        })
      });

      const data = await response.json();

      // Se a API retornar erro, exibe mensagem
      if (!response.ok) {
        showMessage(data.error || "Erro ao realizar login.", true);
        return;
      }

      // Se deu certo, salva token e usuário no localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      if (data.user) {
        localStorage.setItem("authUser", JSON.stringify(data.user));
      }

      // Mensagem de sucesso
      showMessage("Login realizado com sucesso!", false);

      // Informa para a interface que o login foi feito
      setLoginSuccess(true);
    } catch (error) {
      console.error(error);
      showMessage("Erro ao conectar ao servidor.", true);
    } finally {
      setIsLoading(false); // Remove o estado de carregamento
    }
  };

  // Função para limpar campos e mensagens
  const handleClear = () => {
    setEmail("");
    setPassword("");
    clearMessage();
  };

  // Retorna tudo que a tela precisa acessar
  return {
    email,
    setEmail,
    password,
    setPassword,
    message,
    isError,
    isLoading,
    loginSuccess,   // usado para redirecionar após login
    handleSubmit,
    handleClear
  };
}
