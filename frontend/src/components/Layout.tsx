import React from "react"; // Importa o React para usar JSX
import Header from "./Header"; // Importa o cabeçalho
import Footer from "./Footer"; // Importa o rodapé

// Define o tipo das propriedades que o Layout recebe.
// "children" representa o conteúdo das telas que ficarão dentro do layout.
type LayoutProps = {
  children: React.ReactNode;
};

// Componente Layout que envolve todas as páginas da aplicação
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Estrutura principal do layout:
    // min-h-screen = ocupa a tela inteira
    // flex flex-col = organiza tudo em coluna
    // bg-slate-100 = cor de fundo clara
    <div className="min-h-screen flex flex-col bg-slate-100">

      {/* Importa o Header no topo */}
      <Header />

      {/* Área principal onde o conteúdo de cada página será exibido */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 w-full">
          {/* Aqui entram os componentes filhos das páginas */}
          {children}
        </div>
      </main>

      {/* Rodapé fixado no final da página */}
      <Footer />
    </div>
  );
};

export default Layout; // Exporta o layout para ser usado nas páginas do app
