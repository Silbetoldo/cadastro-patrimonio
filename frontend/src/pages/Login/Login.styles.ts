// src/pages/Login/Login.styles.ts
export const loginStyles = {
  page: "min-h-screen flex flex-col bg-slate-50",

  main: "flex-1 flex items-center justify-center px-4 py-8",

  card:
    "w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8",

  title: "text-xl md:text-2xl font-semibold mb-2 text-slate-900 text-center",

  subtitle: "text-sm text-slate-600 mb-6 text-center",

  form: "space-y-4",

  formGroup: "flex flex-col gap-1",

  label: "text-sm font-medium text-slate-700",

  input:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 transition",

  buttonsRow: "flex flex-col md:flex-row gap-3 mt-2",

  primaryButton:
    "inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium bg-violet-600 hover:bg-violet-700 active:bg-violet-800 shadow-sm transition",

  secondaryButton:
    "inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition",

  messageSuccess: "text-sm text-emerald-700 mt-2 text-center",

  messageError: "text-sm text-red-700 mt-2 text-center",

  bottomText: "mt-4 text-xs text-slate-600 text-center",

  link:
    "font-medium text-violet-600 hover:text-violet-700 hover:underline cursor-pointer"
};
