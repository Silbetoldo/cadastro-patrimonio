import React from "react";
// Hook contendo toda a lógica da tela de setores (CRUD)
import { useSectorsLogic } from "./Sectors.logic";
// Estilos organizados em um objeto
import { sectorsStyles as s } from "./Sectors.styles";
// Componente de Layout padrão da aplicação
import Layout from "../../components/Layout";
// Ícones utilizados nos botões
import {
  FaSave,
  FaBroom,
  FaEdit,
  FaTrash
} from "react-icons/fa";

const SectorsPage: React.FC = () => {
  // Desestrutura todos os estados e funções vindos do hook de lógica
  const {
    sectors,           // lista de setores buscados no backend
    name,              // nome digitado no formulário
    setName,
    editingId,         // id do setor que está sendo editado
    message,           // mensagem de feedback ao usuário
    isError,           // se a mensagem é de erro ou não
    isLoading,         // controla carregamento da tabela
    handleSubmit,      // função executada ao salvar/atualizar
    handleEditClick,   // carregar dados de um setor para edição
    handleDeleteClick, // deletar setor
    handleClear        // limpar formulário
  } = useSectorsLogic();

  return (
    <Layout>
      <div className={s.page}>
        <main className={s.main}>

          {/* ======================== */}
          {/*   FORMULÁRIO DE SETORES   */}
          {/* ======================== */}
          <section className={s.card}>
            {/* Título muda conforme está criando ou editando */}
            <h2 className={s.cardTitle}>
              {editingId ? "Editar Setor" : "Cadastrar Setor"}
            </h2>

            {/* Formulário de criação/edição */}
            <form onSubmit={handleSubmit} className={s.form}>

              {/* Campo: Nome do setor */}
              <div className={s.formGroup}>
                <label htmlFor="sectorName" className={s.label}>
                  Nome do Setor
                </label>
                <input
                  id="sectorName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // atualiza estado
                  className={s.input}
                  placeholder="Ex: Almoxarifado"
                />
              </div>

              {/* Botões: Salvar e Limpar */}
              <div className={s.buttonsRow}>
                <button type="submit" className={s.primaryButton}>
                  <FaSave className="text-xs" />
                  <span>{editingId ? "Atualizar" : "Salvar"}</span>
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

              {/* Mensagens de erro ou sucesso */}
              {message && (
                <p className={isError ? s.messageError : s.messageSuccess}>
                  {message}
                </p>
              )}
            </form>
          </section>

          {/* ======================== */}
          {/*        TABELA            */}
          {/* ======================== */}
          <section className={s.card}>
            <h2 className={s.cardTitle}>Setores Cadastrados</h2>

            <table className={s.table}>
              <thead className={s.thead}>
                <tr>
                  <th className={s.th}>ID</th>
                  <th className={s.th}>Nome</th>
                  <th className={s.th}>Ações</th>
                </tr>
              </thead>

              <tbody>
                {/* Linha exibida enquanto os dados estão carregando */}
                {isLoading ? (
                  <tr>
                    <td className={s.td} colSpan={3}>
                      Carregando...
                    </td>
                  </tr>

                // Quando não há setores cadastrados
                ) : sectors.length === 0 ? (
                  <tr>
                    <td className={s.td} colSpan={3}>
                      Nenhum setor cadastrado.
                    </td>
                  </tr>

                // Renderização normal da lista de setores
                ) : (
                  sectors.map((sector) => (
                    <tr key={sector.id}>
                      <td className={s.td}>{sector.id}</td>
                      <td className={s.td}>{sector.name}</td>

                      {/* Ações editar/excluir */}
                      <td className={s.td}>
                        <div className={s.actionsCell}>

                          {/* Editar setor */}
                          <button
                            type="button"
                            onClick={() => handleEditClick(sector)}
                            className={s.actionEdit}
                          >
                            <FaEdit className="text-xs" />
                            <span>Editar</span>
                          </button>

                          {/* Excluir setor */}
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(sector.id)}
                            className={s.actionDelete}
                          >
                            <FaTrash className="text-xs" />
                            <span>Excluir</span>
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

        </main>
      </div>
    </Layout>
  );
};

export default SectorsPage;
