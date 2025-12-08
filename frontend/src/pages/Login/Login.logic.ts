
import { useState } from "react";

const API_BASE_URL = "http://localhost:3001";

export function useLoginLogic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // controla sucesso

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

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      showMessage("Preencha e-mail e senha.", true);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.error || "Erro ao realizar login.", true);
        return;
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      if (data.user) {
        localStorage.setItem("authUser", JSON.stringify(data.user));
      }

      showMessage("Login realizado com sucesso!", false);
      setLoginSuccess(true); //avisa a tela que deu certo
    } catch (error) {
      console.error(error);
      showMessage("Erro ao conectar ao servidor.", true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    clearMessage();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    message,
    isError,
    isLoading,
    loginSuccess,   // 👈 exporta
    handleSubmit,
    handleClear
  };
}
