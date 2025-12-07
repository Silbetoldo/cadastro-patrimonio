import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FaBoxOpen, FaHome, FaSignOutAlt } from "react-icons/fa";

const Header: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    // limpa token e dados do usuário
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    // redireciona para login e bloqueia voltar
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }]
    });
  };

  return (
    <header className="w-full bg-black text-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Título do sistema */}
        <div>
          <h1 className="text-lg font-semibold">SENAI - Sistema de Patrimônio</h1>
        </div>

        {/* Menu */}
        <nav className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => navigation.navigate("Sectors")}
            className="flex items-center gap-1 px-3 py-1 rounded-md border border-transparent hover:border-white transition"
          >
            <FaHome className="text-[10px]" />
            <span>Setores</span>
          </button>

          <button
            type="button"
            onClick={() => navigation.navigate("Assets")}
            className="flex items-center gap-1 px-3 py-1 rounded-md border border-transparent hover:border-white transition"
          >
            <FaBoxOpen className="text-[10px]" />
            <span>Patrimônio</span>
          </button>

          {/* BOTÃO SAIR */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1 rounded-md border border-transparent hover:border-red-400 text-red-400 transition"
          >
            <FaSignOutAlt className="text-[10px]" />
            <span>Sair</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
