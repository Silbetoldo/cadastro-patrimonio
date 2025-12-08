export const assetsStyles = {
  // container da página dentro do Layout
  page: "w-full",

  // layout responsivo:
  // - mobile: tudo em coluna
  // - desktop (lg+): formulário à esquerda, tabela à direita
  main:
    "flex-1 w-full max-w-6xl mx-auto px-3 py-4 flex flex-col gap-4 lg:flex-row lg:items-start",

  // card do formulário (um pouco menor)
  formCard:
    "bg-white rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 lg:p-5 w-full lg:w-2/5",

  // card da tabela (um pouco maior)
  tableCard:
    "bg-white rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 lg:p-5 w-full lg:w-3/5",

  cardTitle:
    "text-sm md:text-base lg:text-lg font-semibold mb-3 md:mb-4 text-slate-800",

  form: "space-y-3 md:space-y-4",

  formGroup: "flex flex-col gap-1",

  label: "text-xs md:text-sm font-medium text-slate-700",

  input:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 transition",

  select:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition",

  buttonsRow: "flex flex-wrap gap-2 md:gap-3 mt-1 md:mt-2",

  primaryButton:
    "inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 shadow-sm transition",

  secondaryButton:
    "inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition",

  messageSuccess: "text-xs md:text-sm text-emerald-700 mt-1 md:mt-2",

  messageError: "text-xs md:text-sm text-red-700 mt-1 md:mt-2",

  // wrapper da tabela para rolagem
  tableWrapper: "w-full overflow-x-auto mt-2",

  // tabela responsiva
  table: "min-w-full border-collapse text-xs md:text-sm",

  thead: "bg-slate-900 text-white",

  th: "px-2 md:px-3 py-1.5 md:py-2 border border-slate-700 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wide whitespace-nowrap",

  td: "px-2 md:px-3 py-1.5 md:py-2 border border-slate-200 bg-white whitespace-nowrap align-middle",

  actionsCell: "flex flex-wrap gap-1 md:gap-2 justify-center",

  actionEdit:
    "inline-flex items-center justify-center gap-1 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 transition shadow-sm",

  actionDelete:
    "inline-flex items-center justify-center gap-1 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium text-white bg-red-500 hover:bg-red-600 transition shadow-sm"
};
