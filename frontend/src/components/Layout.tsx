// src/components/Layout.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 w-full">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
