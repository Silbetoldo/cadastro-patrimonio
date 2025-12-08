import React from "react"; // Importa o React para poder usar JSX
import { useNavigation } from "@react-navigation/native"; // Hook para navegar entre telas
import { FaBoxOpen, FaHome, FaSignOutAlt, FaArchive } from "react-icons/fa"; // Ícones do React Icons

// Componente de cabeçalho da aplicação
const Header: React.FC = () => {
  const navigation = useNavigation<any>(); // Controle de navegação dentro do app

  // Função de logout: remove o token salvo e redireciona para Login
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove o token do usuário
    localStorage.removeItem("authUser");  // Remove os dados do usuário

    // Reseta a navegação para garantir que o usuário volte para a tela de Login
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    // header principal com fundo preto e texto branco
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
        {/* Ícone + título do sistema */}
        <div className="flex items-center gap-2">
          <FaArchive className="text-2xl text-violet-400" /> {/* Ícone principal */}
          <h1 className="text-base sm:text-lg md:text-xl font-semibold leading-tight">
            Sistema de Patrimônio
          </h1>
        </div>

        {/* Menu de navegação */}
        <nav
          className="
            flex items-center 
            justify-center sm:justify-end 
            gap-4 
            text-xs sm:text-sm
          "
        >
          {/* Botão para ir para a tela de setores */}
          <button
            type="button"
            onClick={() => navigation.navigate("Sectors")}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md hover:bg-white/10 transition"
          >
            <FaHome className="text-[12px]" /> {/* Ícone */}
            <span>Setores</span> {/* Texto */}
          </button>

          {/* Botão para ir para a tela de patrimônio */}
          <button
            type="button"
            onClick={() => navigation.navigate("Assets")}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md hover:bg-white/10 transition"
          >
            <FaBoxOpen className="text-[12px]" /> {/* Ícone */}
            <span>Patrimônio</span> {/* Texto */}
          </button>

          {/* Botão de sair: no mobile aparece só o ícone, no desktop aparece o texto também */}
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
            <FaSignOutAlt className="text-[12px]" /> {/* Ícone de logout */}
            <span className="hidden sm:inline">Sair</span> {/* Texto aparece só em telas maiores */}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header; // Exporta o componente para ser usado nas telas
