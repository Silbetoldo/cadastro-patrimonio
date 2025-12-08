export const assetsStyles = {

  // Container geral da página (dentro do Layout)
  page: "w-full",

  // Layout responsivo:
  // - Mobile: elementos exibidos em coluna
  // - Desktop (lg+): formulário à esquerda e tabela à direita
  main:
    "flex-1 w-full max-w-6xl mx-auto px-3 py-4 flex flex-col gap-4 lg:flex-row lg:items-start",

  // Card onde fica o formulário de cadastro/edição de patrimônio
  formCard:
    "bg-white rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 lg:p-5 w-full lg:w-2/5",

  // Card onde fica a tabela de listagem de patrimônios
  tableCard:
    "bg-white rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 lg:p-5 w-full lg:w-3/5",

  // Título interno dos cards
  cardTitle:
    "text-sm md:text-base lg:text-lg font-semibold mb-3 md:mb-4 text-slate-800",

  // Estilização do formulário em si
  form: "space-y-3 md:space-y-4",

  // Agrupamento de label + input
  formGroup: "flex flex-col gap-1",

  // Estilo do label acima do input
  label: "text-xs md:text-sm font-medium text-slate-700",

  // Campo de texto do formulário
  input:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 transition",

  // Campo <select> usado para escolher setor
  select:
    "border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition",

  // Container onde ficam os botões (Salvar / Limpar)
  buttonsRow: "flex flex-wrap gap-2 md:gap-3 mt-1 md:mt-2",

  // Botão principal (Salvar)
  primaryButton:
    "inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 shadow-sm transition",

  // Botão secundário (Limpar)
  secondaryButton:
    "inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition",

  // Mensagem de sucesso exibida abaixo do formulário
  messageSuccess: "text-xs md:text-sm text-emerald-700 mt-1 md:mt-2",

  // Mensagem de erro
  messageError: "text-xs md:text-sm text-red-700 mt-1 md:mt-2",

  // Wrapper com rolagem horizontal para tabela em telas pequenas
  tableWrapper: "w-full overflow-x-auto mt-2",

  // Estilo geral da tabela
  table: "min-w-full border-collapse text-xs md:text-sm",

  // Cabeçalho da tabela (fundo escuro)
  thead: "bg-slate-900 text-white",

  // Estilos das células do cabeçalho
  th: "px-2 md:px-3 py-1.5 md:py-2 border border-slate-700 text-left text-[10px] md:text-xs font-semibold uppercase tracking-wide whitespace-nowrap",

  // Estilos das células do corpo da tabela
  td: "px-2 md:px-3 py-1.5 md:py-2 border border-slate-200 bg-white whitespace-nowrap align-middle",

  // Célula onde ficam os botões de Editar e Excluir
  actionsCell: "flex flex-wrap gap-1 md:gap-2 justify-center",

  // Botão de editar patrimônio
  actionEdit:
    "inline-flex items-center justify-center gap-1 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 transition shadow-sm",

  // Botão de excluir patrimônio
  actionDelete:
    "inline-flex items-center justify-center gap-1 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium text-white bg-red-500 hover:bg-red-600 transition shadow-sm"
};
