
import React from "react";
import Layout from "../../components/Layout";
import { useRegisterLogic } from "./Register.logic";
import { registerStyles as s } from "./Register.styles";
import { FaSave, FaBroom, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigation } from "@react-navigation/native";

const RegisterPage: React.FC = () => {
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
    handleSubmit,
    handleClear
  } = useRegisterLogic();

  const navigation = useNavigation<any>();

  const goToLogin = () => {
    navigation.navigate("Login"); //volta para Login pela navegação
  };

  return (
   
      <div className={s.page}>
        <main className={s.main}>
          <section className={s.card}>
            <h1 className={s.title}>Criar Conta</h1>
            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.formGroup}>
                <label htmlFor="name" className={s.label}>
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  className={s.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                />
              </div>

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

              <div className={s.gridTwoCols}>
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

              <div className={s.buttonsRow}>
                <button
                  type="submit"
                  className={s.primaryButton}
                  disabled={isLoading}
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

              {message && (
                <p className={isError ? s.messageError : s.messageSuccess}>
                  {message}
                </p>
              )}
            </form>

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
