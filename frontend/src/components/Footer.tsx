import React from "react"; // Importa o React para poder criar o componente

// Componente de rodapé da aplicação
const Footer: React.FC = () => {
  return (
    // Tag <footer> usada para o rodapé da página
    // w-full = largura total
    // bg-black = fundo preto
    // py-2 = espaçamento vertical (padding)
    <footer className="w-full bg-black py-2">
      
      {/* Texto centralizado e estilizado com fonte pequena */}
      <p className="text-center text-[10px] text-gray-300">
        desenvolvido por:{" "}
        {/* Destaque no nome com fonte mais forte */}
        <span className="font-semibold">@SilvanaBetoldo</span>
      </p>
    </footer>
  );
};

export default Footer; // Exporta o componente para ser usado em outras telas
