// src/pages/Assets/Assets.tsx
import React from "react";
import { useAssetsLogic } from "./Assets.logic";
import { assetsStyles as s } from "./Assets.styles";
import Layout from "../../components/Layout";
import {
  FaSave,
  FaBroom,
  FaEdit,
  FaTrash
} from "react-icons/fa";

const AssetsPage: React.FC = () => {
  const {
    assets,
    sectors,
    name,
    setName,
    assetNumber,
    setAssetNumber,
    sectorId,
    setSectorId,
    editingId,
    message,
    isError,
    isLoading,
    handleSubmit,
    handleEditClick,
    handleDeleteClick,
    handleClear
  } = useAssetsLogic();

  return (
    <Layout>
      <div className={s.page}>
        <main className={s.main}>
          {/* Formulário */}
          <section className={s.card}>
            <h2 className={s.cardTitle}>
              {editingId ? "Editar Patrimônio" : "Novo Patrimônio"}
            </h2>

            <form onSubmit={handleSubmit} className={s.form}>
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
                  {isLoading ? (
                    <tr>
                      <td className={s.td} colSpan={5}>
                        Carregando...
                      </td>
                    </tr>
                  ) : assets.length === 0 ? (
                    <tr>
                      <td className={s.td} colSpan={5}>
                        Nenhum patrimônio cadastrado.
                      </td>
                    </tr>
                  ) : (
                    assets.map((asset) => (
                      <tr key={asset.id}>
                        <td className={s.td}>{asset.id}</td>
                        <td className={s.td}>{asset.name}</td>
                        <td className={s.td}>{asset.assetNumber}</td>
                        <td className={s.td}>{asset.sectorName || "-"}</td>

                        <td className={s.td}>
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
