import React from "react";
import { useSectorsLogic } from "./Sectors.logic";
import { sectorsStyles as s } from "./Sectors.styles";
import { useNavigation } from "@react-navigation/native";

const SectorsPage: React.FC = () => {
  const navigation = useNavigation<any>();

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
    <div className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>Cadastro de Setores</h1>

        <nav className={s.nav}>
          <button
            type="button"
            className={s.navLink}
            onClick={() => navigation.navigate("Assets")}
          >
            Tela de Patrimônio
          </button>

          <button
            type="button"
            className={s.navLink}
            onClick={() => navigation.navigate("Sectors")}
          >
            Início
          </button>
        </nav>
      </header>

      <main className={s.main}>
        {/* Formulário */}
        <section className={s.card}>
          <h2 className={s.cardTitle}>
            {editingId ? "Editar Setor" : "Novo Setor"}
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
                {editingId ? "Atualizar" : "Salvar"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className={s.secondaryButton}
              >
                Limpar
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
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(sector.id)}
                          className={s.actionDelete}
                        >
                          Excluir
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

      <footer className={s.footer}>
        Cadastro de Patrimônio e Setores – SENAI
      </footer>
    </div>
  );
};

export default SectorsPage;
