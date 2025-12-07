// src/pages/Login/Login.tsx
import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useLoginLogic } from "./Login.logic";
import { loginStyles as s } from "./Login.styles";
import { FaSignInAlt, FaBroom, FaUserPlus } from "react-icons/fa";
import { useNavigation } from "@react-navigation/native";

const LoginPage: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    message,
    isError,
    isLoading,
    loginSuccess,   // 👈 veio do hook
    handleSubmit,
    handleClear
  } = useLoginLogic();

  const navigation = useNavigation<any>();

  // quando logar com sucesso, manda para Sectors
  useEffect(() => {
    if (loginSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Sectors" }]
      });
    }
  }, [loginSuccess, navigation]);

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    
      <div className={s.page}>
        <main className={s.main}>
          <section className={s.card}>
            <h1 className={s.title}>SENAI</h1>
           

            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.formGroup}>
                <label htmlFor="email" className={s.label}>
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={s.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite o seu Email"
                />
              </div>

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

              <div className={s.buttonsRow}>
                <button type="submit" className={s.primaryButton} disabled={isLoading}>
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

              {message && (
                <p className={isError ? s.messageError : s.messageSuccess}>
                  {message}
                </p>
              )}
            </form>

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
