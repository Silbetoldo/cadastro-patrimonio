// src/pages/Assets/Assets.styles.ts
export const assetsStyles = {
  // container da página dentro do Layout
  page: "w-full",

  // 1 coluna no mobile, 2 colunas a partir de lg (1024px)
  main: "grid gap-4 w-full lg:grid-cols-2",

  card:
    "bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5",

  cardTitle: "text-base sm:text-lg font-semibold mb-4 text-slate-800",

  form: "space-y-4",

  formGroup: "flex flex-col gap-1",

  label: "text-sm font-medium text-slate-700",

  input:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 transition",

  select:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition",

  buttonsRow: "flex flex-wrap gap-3 mt-2",

  primaryButton:
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-medium bg-violet-600 hover:bg-violet-700 active:bg-violet-800 shadow-sm transition",

  secondaryButton:
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition",

  messageSuccess: "text-sm text-emerald-700 mt-2",

  messageError: "text-sm text-red-700 mt-2",

  // 👉 Wrapper da tabela para rolar horizontalmente no mobile
  tableWrapper: "w-full overflow-x-auto mt-2",

  // tabela ocupa a largura mínima e rola se precisar
  table: "min-w-full border-collapse text-sm",

  thead: "bg-slate-900 text-white",

  th: "px-3 py-2 border border-slate-700 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap",

  td: "px-3 py-2 border border-slate-200 bg-white whitespace-nowrap",

  actionsCell: "flex flex-wrap gap-2",

  actionEdit:
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 transition shadow-sm",

  actionDelete:
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white bg-red-500 hover:bg-red-600 transition shadow-sm"
};
