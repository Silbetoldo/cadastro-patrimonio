import React from "react";
// Hook que concentra toda a lógica da página (carregar, criar, editar e excluir patrimônio)
import { useAssetsLogic } from "./Assets.logic";
// Importa os estilos já organizados no objeto "assetsStyles"
import { assetsStyles as s } from "./Assets.styles";
// Layout padrão (Header + Conteúdo + Footer)
import Layout from "../../components/Layout";
// Ícones usados nos botões
import { FaSave, FaBroom, FaEdit, FaTrash } from "react-icons/fa";

const AssetsPage: React.FC = () => {
  // Desestrutura todos os estados e funções vindos da lógica
  const {
    assets,           // lista de patrimônios
    sectors,          // lista de setores para o select
    name,             // nome do patrimônio
    setName,
    assetNumber,      // número do patrimônio
    setAssetNumber,
    sectorId,         // setor selecionado
    setSectorId,
    editingId,        // id do item que está sendo editado
    message,          // mensagem de sucesso/erro
    isError,          // indica se a mensagem é erro
    isLoading,        // controla "Carregando..."
    handleSubmit,     // submit do formulário
    handleEditClick,  // editar item da tabela
    handleDeleteClick,// excluir item
    handleClear       // limpar formulário
  } = useAssetsLogic();

  return (
    <Layout>
      {/* container da página */}
      <div className={s.page}>
        {/* área principal com layout responsivo */}
        <main className={s.main}>

          {/* ======================== */}
          {/*    FORMULÁRIO DE CADASTRO */}
          {/* ======================== */}
          <section className={s.formCard}>
            {/* Título muda se está editando ou criando */}
            <h2 className={s.cardTitle}>
              {editingId ? "Editar Patrimônio" : "Cadastrar Patrimônio"}
            </h2>

            <form onSubmit={handleSubmit} className={s.form}>

              {/* Campo: nome do patrimônio */}
              <div className={s.formGroup}>
                <label htmlFor="assetName" className={s.label}>
                  Nome do Patrimônio
                </label>
                <input
                  id="assetName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={s.input}
                  placeholder="Ex: Computador Dell"
                />
              </div>

              {/* Campo: número de patrimônio */}
              <div className={s.formGroup}>
                <label htmlFor="assetNumber" className={s.label}>
                  Número de Patrimônio
                </label>
                <input
                  id="assetNumber"
                  type="text"
                  value={assetNumber}
                  onChange={(e) => setAssetNumber(e.target.value)}
                  className={s.input}
                  placeholder="Ex: PAT-001"
                />
              </div>

              {/* Select: setor do patrimônio */}
              <div className={s.formGroup}>
                <label htmlFor="assetSector" className={s.label}>
                  Setor
                </label>
                <select
                  id="assetSector"
                  value={sectorId}
                  onChange={(e) => setSectorId(e.target.value)}
                  className={s.select}
                >
                  <option value="">Selecione um setor</option>
                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botões do formulário */}
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
          {/*        TABELA */}
          {/* ======================== */}
          <section className={s.tableCard}>
            <h2 className={s.cardTitle}>Patrimônios Cadastrados</h2>

            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead className={s.thead}>
                  <tr>
                    <th className={s.th}>ID</th>
                    <th className={s.th}>Nome</th>
                    <th className={s.th}>Nº Patrimônio</th>
                    <th className={s.th}>Setor</th>
                    <th className={s.th}>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Mostra "Carregando..." enquanto busca dados */}
                  {isLoading ? (
                    <tr>
                      <td className={s.td} colSpan={5}>
                        Carregando...
                      </td>
                    </tr>

                  // Mostra mensagem se não existir patrimônio cadastrado
                  ) : assets.length === 0 ? (
                    <tr>
                      <td className={s.td} colSpan={5}>
                        Nenhum patrimônio cadastrado.
                      </td>
                    </tr>

                  // Renderiza lista de patrimônios
                  ) : (
                    assets.map((asset) => (
                      <tr key={asset.id}>
                        <td className={s.td}>{asset.id}</td>
                        <td className={s.td}>{asset.name}</td>
                        <td className={s.td}>{asset.assetNumber}</td>
                        <td className={s.td}>{asset.sectorName || "-"}</td>

                        <td className={s.td}>
                          {/* Botões de ação (Editar / Excluir) */}
                          <div className={s.actionsCell}>
                            <button
                              type="button"
                              onClick={() => handleEditClick(asset)}
                              className={s.actionEdit}
                            >
                              <FaEdit className="text-xs" />
                              <span>Editar</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteClick(asset.id)}
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
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default AssetsPage;
