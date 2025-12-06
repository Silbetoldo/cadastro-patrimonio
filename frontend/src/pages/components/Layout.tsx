// src/pages/components/Layout.tsx
import React from "react";
import Header from "./Header";
import Footer from "../../components/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Header preto com menu */}
      <Header />

      {/* Conteúdo rolável */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Footer preto colado embaixo */}
      <Footer />
    </div>
  );
};

export default Layout;
