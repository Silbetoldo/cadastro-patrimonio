// src/pages/Login/Login.tsx

import React, { useEffect } from "react";
// Layout padrão da aplicação (Header + Conteúdo + Footer)
import Layout from "../../components/Layout";
// Hook com toda a lógica do login (validação, mensagem, requisição)
import { useLoginLogic } from "./Login.logic";
// Estilos organizados no objeto loginStyles
import { loginStyles as s } from "./Login.styles";
// Ícones usados nos botões
import { FaSignInAlt, FaBroom, FaUserPlus } from "react-icons/fa";
// Hook de navegação para trocar de tela
import { useNavigation } from "@react-navigation/native";

const LoginPage: React.FC = () => {
  // Desestrutura todos os estados e funções da lógica de login
  const {
    email,
    setEmail,
    password,
    setPassword,
    message,
    isError,
    isLoading,
    loginSuccess,     // indica se o login deu certo
    handleSubmit,     // função chamada ao enviar o formulário
    handleClear       // limpar campos
  } = useLoginLogic();

  // Hook de navegação para mudar de tela
  const navigation = useNavigation<any>();

  // Quando loginSuccess ficar true → navega automaticamente para Sectors
  useEffect(() => {
    if (loginSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Sectors" }] // define Sectors como nova tela inicial
      });
    }
  }, [loginSuccess, navigation]);

  // Função que navega para a tela de cadastro (Register)
  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <div className={s.page}>
      <main className={s.main}>
        <section className={s.card}>

          {/* Título da página */}
          <h1 className={s.title}>SENAI</h1>

          {/* Formulário de login */}
          <form onSubmit={handleSubmit} className={s.form}>

            {/* Campo: e-mail */}
            <div className={s.formGroup}>
              <label htmlFor="email" className={s.label}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={s.input}
                value={email}                     // valor vindo do hook
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o seu Email"
              />
            </div>

            {/* Campo: senha */}
            <div className={s.formGroup}>
              <label htmlFor="password" className={s.label}>
                Senha
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={s.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>

            {/* Botões de Entrar e Limpar */}
            <div className={s.buttonsRow}>
              <button
                type="submit"
                className={s.primaryButton}
                disabled={isLoading} // desativa enquanto API responde
              >
                <FaSignInAlt className="text-xs" />
                <span>{isLoading ? "Entrando..." : "Entrar"}</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className={s.secondaryButton}
              >
                <FaBroom className="text-xs" />
                <span>Limpar</span>
              </button>
            </div>

            {/* Exibe mensagens de erro ou sucesso */}
            {message && (
              <p className={isError ? s.messageError : s.messageSuccess}>
                {message}
              </p>
            )}
          </form>

          {/* Link para ir à tela de cadastro */}
          <p className={s.bottomText}>
            Ainda não possui cadastro?{" "}
            <button
              type="button"
              onClick={goToRegister}
              className={s.link}
            >
              <FaUserPlus className="inline-block mr-1 text-[10px]" />
              Criar conta
            </button>
          </p>

        </section>
      </main>
    </div>
  );
};

export default LoginPage;
