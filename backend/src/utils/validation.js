
// valida se o parâmetro é um ID inteiro positivo
function parseAndValidateId(paramId, res) {
  const id = Number(paramId);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id parameter." });
    return null;
  }
  return id;
}

module.exports = { parseAndValidateId };
