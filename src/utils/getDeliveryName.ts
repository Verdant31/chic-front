export const getDeliveryName = (serviceCode: string) => {
  switch (serviceCode) {
    case "04014":
      return "Sedex";
    case "04510":
      return "PAC";
    default:
      return "Não encontrado";
  }
};
