// src/pages/Register/Register.styles.ts

// Objeto contendo todas as classes de estilo usadas na página de Cadastro.
// Isso ajuda a deixar o código mais organizado e fácil de manter.
export const registerStyles = {

  // Estilo base da página: ocupa a tela inteira, em coluna, com fundo claro
  page: "min-h-screen flex flex-col bg-slate-50",

  // Área central onde o formulário é exibido
  main: "flex-1 flex items-center justify-center px-4 py-8",

  // Card onde fica o formulário de cadastro
  card:
    "w-full max-w-xl bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8",

  // Título principal da tela
  title: "text-xl md:text-2xl font-semibold mb-2 text-slate-900 text-center",

  // Subtítulo com explicação ou instrução
  subtitle: "text-sm text-slate-600 mb-6 text-center",

  // Estilo geral do formulário
  form: "space-y-4",

  // Cada grupo de formulário (label + input)
  formGroup: "flex flex-col gap-1",

  // Estilo das labels acima dos inputs
  label: "text-sm font-medium text-slate-700",

  // Estilo dos inputs do formulário
  input:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 transition",

  // Grid que divide inputs em duas colunas no desktop
  gridTwoCols: "grid grid-cols-1 md:grid-cols-2 gap-4",

  // Área dos botões (Cadastrar / Limpar)
  buttonsRow: "flex flex-col md:flex-row gap-3 mt-2",

  // Botão principal (Cadastrar)
  primaryButton:
    "inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium bg-violet-600 hover:bg-violet-700 active:bg-violet-800 shadow-sm transition",

  // Botão secundário (Limpar)
  secondaryButton:
    "inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition",

  // Mensagem de sucesso (exibe após cadastro correto)
  messageSuccess: "text-sm text-emerald-700 mt-2 text-center",

  // Mensagem de erro (exibe quando algo deu errado)
  messageError: "text-sm text-red-700 mt-2 text-center",

  // Texto abaixo do formulário (ex: "Já possui conta?")
  bottomText: "mt-4 text-xs text-slate-600 text-center",

  // Estilo para o link "Fazer login" abaixo do formulário
  link:
    "font-medium text-violet-600 hover:text-violet-700 hover:underline cursor-pointer"
};
