import { calcularPrecoPrazo } from "correios-brasil";
import { NextApiResponse, NextApiRequest } from "next";
import { getDeliveryName } from "../../utils/getDeliveryName";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cep } = req.body;
  try {
    const formattedFreights = await calcularPrecoPrazo({
      sCepOrigem: "79823380",
      sCepDestino: cep,
      nVlPeso: "0.1",
      nCdFormato: "1",
      nVlComprimento: "16",
      nVlAltura: "16",
      nVlLargura: "16",
      nCdServico: ["04014", "04510"],
      nVlDiametro: "13",
    }).then((freights) => {
      return freights.map((obj) => ({
        price: obj.Valor,
        deadline: obj.PrazoEntrega,
        serviceCode: obj.Codigo,
        serviceName: getDeliveryName(obj.Codigo),
        error: obj.Erro,
      }));
    });

    const hasErrror = formattedFreights.every((obj) => obj.error === "");

    if (hasErrror) {
      res.status(500).json({ message: "Erro ao calcular frete" });
    }
    res.status(200).json({ freights: formattedFreights });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
