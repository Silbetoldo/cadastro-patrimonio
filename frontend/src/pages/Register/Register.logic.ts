import { useState } from "react";

const API_BASE_URL = "http://localhost:3001";

export function useRegisterLogic() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessage();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirm) {
      showMessage("Preencha todos os campos.", true);
      return;
    }

    if (trimmedPassword.length < 6) {
      showMessage("A senha deve ter pelo menos 6 caracteres.", true);
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      showMessage("As senhas não conferem.", true);
      return;
    }

    try {
      setIsLoading(true);

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

      if (!response.ok) {
        showMessage(data.error || "Erro ao realizar cadastro.", true);
        return;
      }

      showMessage("Usuário cadastrado com sucesso! Faça login para continuar.", false);

      // limpa campos, mas mantém e-mail se quiser
      setName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      showMessage("Erro ao conectar ao servidor.", true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    clearMessage();
  };

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
