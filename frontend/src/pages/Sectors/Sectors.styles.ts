export const sectorsStyles = {
  page: "min-h-screen flex flex-col bg-slate-50",

  header:
    "bg-violet-700 text-white px-4 md:px-8 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between shadow",

  title: "text-base md:text-xl font-semibold tracking-tight",

  nav: "flex gap-2 md:gap-3 text-xs md:text-sm",

  navLink:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-300/60 bg-violet-600 hover:bg-violet-500 hover:border-violet-100 transition text-xs md:text-sm shadow-sm",

  main:
  "flex-1 w-full max-w-5xl mx-auto px-3 py-4 flex flex-col md:flex-row md:items-start md:gap-6 gap-4",

card:
  "bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-5 w-full md:w-1/2",


  cardTitle: "text-sm md:text-lg font-semibold mb-3 md:mb-4 text-slate-800",

  form: "space-y-3 md:space-y-4",

  formGroup: "flex flex-col gap-1",

  label: "text-xs md:text-sm font-medium text-slate-700",

  input:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 transition",

  buttonsRow: "flex flex-wrap gap-2 md:gap-3 mt-1 md:mt-2",

  primaryButton:
    "inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 shadow-sm transition",

  secondaryButton:
    "inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition",

  messageSuccess: "text-xs md:text-sm text-emerald-700 mt-1 md:mt-2",

  messageError: "text-xs md:text-sm text-red-700 mt-1 md:mt-2",

  table: "w-full border-collapse text-xs md:text-sm mt-2",

  thead: "bg-slate-900 text-white",

  th: "px-2 md:px-3 py-1.5 md:py-2 border border-slate-700 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wide",

  td: "px-2 md:px-3 py-1.5 md:py-2 border border-slate-200 bg-white align-middle",

  // aqui é o principal: botões menores e centralizados em tela pequena
  actionsCell: "flex flex-wrap gap-1 md:gap-2 justify-center",

  actionEdit:
    "inline-flex items-center justify-center gap-1 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 transition shadow-sm",

  actionDelete:
    "inline-flex items-center justify-center gap-1 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium text-white bg-red-500 hover:bg-red-600 transition shadow-sm",

  footer:
    "mt-auto w-full border-t border-slate-200 bg-slate-100 py-3 text-center text-[10px] md:text-xs text-slate-500"
};
