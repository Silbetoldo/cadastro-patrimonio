
import React from "react";
import { useSectorsLogic } from "./Sectors.logic";
import { sectorsStyles as s } from "./Sectors.styles";
import Layout from "../../components/Layout";
import {
  FaSave,
  FaBroom,
  FaEdit,
  FaTrash
} from "react-icons/fa";

const SectorsPage: React.FC = () => {
  const {
    sectors,
    name,
    setName,
    editingId,
    message,
    isError,
    isLoading,
    handleSubmit,
    handleEditClick,
    handleDeleteClick,
    handleClear
  } = useSectorsLogic();

  return (
    <Layout>
      <div className={s.page}>
        <main className={s.main}>
          {/* Formulário */}
          <section className={s.card}>
            <h2 className={s.cardTitle}>
              {editingId ? "Editar Setor" : "Cadastrar Setor"}
            </h2>

            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.formGroup}>
                <label htmlFor="sectorName" className={s.label}>
                  Nome do Setor
                </label>
                <input
                  id="sectorName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={s.input}
                  placeholder="Ex: Almoxarifado"
                />
              </div>

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

              {message && (
                <p className={isError ? s.messageError : s.messageSuccess}>
                  {message}
                </p>
              )}
            </form>
          </section>

          {/* Tabela */}
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
                {isLoading ? (
                  <tr>
                    <td className={s.td} colSpan={3}>
                      Carregando...
                    </td>
                  </tr>
                ) : sectors.length === 0 ? (
                  <tr>
                    <td className={s.td} colSpan={3}>
                      Nenhum setor cadastrado.
                    </td>
                  </tr>
                ) : (
                  sectors.map((sector) => (
                    <tr key={sector.id}>
                      <td className={s.td}>{sector.id}</td>
                      <td className={s.td}>{sector.name}</td>
                      <td className={s.td}>
                        <div className={s.actionsCell}>
                          <button
                            type="button"
                            onClick={() => handleEditClick(sector)}
                            className={s.actionEdit}
                          >
                            <FaEdit className="text-xs" />
                            <span>Editar</span>
                          </button>
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
