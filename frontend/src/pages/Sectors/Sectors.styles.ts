export const sectorsStyles = {
  page: "min-h-screen flex flex-col bg-slate-50",

  header:
    "bg-violet-700 text-white px-4 md:px-8 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between shadow",

  title: "text-lg md:text-xl font-semibold tracking-tight",

  nav: "flex gap-2 md:gap-3 text-sm",

  navLink:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-300/60 bg-violet-600 hover:bg-violet-500 hover:border-violet-100 transition text-xs md:text-sm shadow-sm",

  main:
    "flex-1 w-full max-w-6xl mx-auto px-4 py-6 grid gap-4 md:grid-cols-2",

  card:
    "bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-5",

  cardTitle: "text-base md:text-lg font-semibold mb-4 text-slate-800",

  form: "space-y-4",

  formGroup: "flex flex-col gap-1",

  label: "text-sm font-medium text-slate-700",

  input:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 transition",

  buttonsRow: "flex flex-wrap gap-3 mt-2",

  primaryButton:
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-medium bg-violet-600 hover:bg-violet-700 active:bg-violet-800 shadow-sm transition",

  secondaryButton:
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition",

  messageSuccess: "text-sm text-emerald-700 mt-2",

  messageError: "text-sm text-red-700 mt-2",

  table: "w-full border-collapse text-sm mt-2",

  thead: "bg-slate-900 text-white",

  th: "px-3 py-2 border border-slate-700 text-left text-xs font-semibold uppercase tracking-wide",

  td: "px-3 py-2 border border-slate-200 bg-white",

  actionsCell: "flex flex-wrap gap-2",

  actionEdit:
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 transition shadow-sm",

  actionDelete:
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white bg-red-500 hover:bg-red-600 transition shadow-sm",

  footer:
    "mt-auto w-full border-t border-slate-200 bg-slate-100 py-3 text-center text-xs text-slate-500"
};
