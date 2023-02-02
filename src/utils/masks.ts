export const normalizeValue = (value: string, type: string) => {
  switch (type) {
    case "cellphone":
      return normalizeCellphone(value);
    case "cpf":
      return normalizeCpf(value);
    default:
      return value;
  }
};

export const normalizeCpf = (value: string) =>
  value
    .replace(/\s/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2");

export const normalizeCellphone = (value: string) =>
  value
    .replace(/\s/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2");
