// valida se o parâmetro é um ID inteiro positivo
function parseAndValidateId(paramId, res) {
   // Converte o ID recebido (string) para número
  const id = Number(paramId);
  // Verifica se o ID é um número inteiro e maior que zero.
  // Caso contrário, já retorna um erro para o usuário.
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id parameter." });
    return null; // Retorna null indicando que o ID não é válido
  }
  // Se estiver tudo certo, devolve o ID convertido e válido
  return id;
}
// Exporta a função para ser usada em outros arquivos
module.exports = { parseAndValidateId };
