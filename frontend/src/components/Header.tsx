// src/components/Header.tsx
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FaBoxOpen, FaHome, FaSignOutAlt, FaArchive } from "react-icons/fa";

const Header: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <header className="w-full bg-black text-white shadow-md">
      <div
        className="
          max-w-6xl mx-auto 
          px-3 sm:px-4 
          py-2 sm:py-3
          flex flex-col sm:flex-row
          gap-2
          sm:items-center sm:justify-between
        "
      >
        {/* Ícone + título */}
        <div className="flex items-center gap-2">
          <FaArchive className="text-2xl text-violet-400" />
          <h1 className="text-base sm:text-lg md:text-xl font-semibold leading-tight">
            Sistema de Patrimônio
          </h1>
        </div>

        {/* Menu */}
        <nav
          className="
            flex items-center 
            justify-center sm:justify-end 
            gap-4 
            text-xs sm:text-sm
          "
        >
          <button
            type="button"
            onClick={() => navigation.navigate("Sectors")}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md hover:bg-white/10 transition"
          >
            <FaHome className="text-[12px]" />
            <span>Setores</span>
          </button>

          <button
            type="button"
            onClick={() => navigation.navigate("Assets")}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md hover:bg-white/10 transition"
          >
            <FaBoxOpen className="text-[12px]" />
            <span>Patrimônio</span>
          </button>

          {/* Sair – só ícone no mobile, ícone + texto a partir de sm */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex items-center gap-1
              px-2 sm:px-3 py-1
              rounded-md
              text-red-400
              hover:bg-red-500/20
              transition
            "
          >
            <FaSignOutAlt className="text-[12px]" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
