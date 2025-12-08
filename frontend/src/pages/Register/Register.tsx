import React from "react";
// Layout padrão da aplicação (Header + Conteúdo + Footer)
import Layout from "../../components/Layout";
// Hook que contém toda a lógica do cadastro
import { useRegisterLogic } from "./Register.logic";
// Estilos organizados no objeto registerStyles
import { registerStyles as s } from "./Register.styles";
// Ícones usados nos botões
import { FaSave, FaBroom, FaSignInAlt, FaUserPlus } from "react-icons/fa";
// Hook de navegação para mudar entre telas
import { useNavigation } from "@react-navigation/native";

const RegisterPage: React.FC = () => {
  // Desestrutura todos os estados e funções vindos do hook de cadastro
  const {
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
    handleSubmit,     // função executada ao clicar no botão "Cadastrar"
    handleClear       // limpa todos os campos do formulário
  } = useRegisterLogic();

  // Hook para navegar entre telas
  const navigation = useNavigation<any>();

  // Função para ir para a tela de login
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <div className={s.page}>
      <main className={s.main}>
        <section className={s.card}>

          {/* Título da tela */}
          <h1 className={s.title}>Criar Conta</h1>

          {/* Formulário de cadastro */}
          <form onSubmit={handleSubmit} className={s.form}>

            {/* Campo: Nome completo */}
            <div className={s.formGroup}>
              <label htmlFor="name" className={s.label}>
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                className={s.input}
                value={name}
                onChange={(e) => setName(e.target.value)} // atualiza estado
                placeholder="Seu nome"
              />
            </div>

            {/* Campo: E-mail */}
            <div className={s.formGroup}>
              <label htmlFor="email" className={s.label}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className={s.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
            </div>

            {/* Senha e Confirmar Senha - lado a lado no desktop */}
            <div className={s.gridTwoCols}>
              
              {/* Campo: Senha */}
              <div className={s.formGroup}>
                <label htmlFor="password" className={s.label}>
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  className={s.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              {/* Campo: Confirmar senha */}
              <div className={s.formGroup}>
                <label htmlFor="confirmPassword" className={s.label}>
                  Confirmar senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={s.input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            {/* Botões de ação: Cadastrar e Limpar */}
            <div className={s.buttonsRow}>
              <button
                type="submit"
                className={s.primaryButton}
                disabled={isLoading} // desativa enquanto faz requisição
              >
                <FaUserPlus className="text-xs" />
                <span>{isLoading ? "Cadastrando..." : "Cadastrar"}</span>
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

          {/* Link para ir ao login */}
          <p className={s.bottomText}>
            Já possui conta?{" "}
            <button
              type="button"
              onClick={goToLogin}
              className={s.link}
            >
              <FaSignInAlt className="inline-block mr-1 text-[10px]" />
              Fazer login
            </button>
          </p>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;
