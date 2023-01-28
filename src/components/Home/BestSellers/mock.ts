import { getBaseUrl } from "../../../utils/api";

export const bestSellersMock = [
  {
    name: "Gold Ring",
    price: 200,
    img: `${
      process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : getBaseUrl()
    }/bracelet.png`,
    rating: 4,
  },
  {
    name: "Diamond Necklace",
    price: 3000,
    img: `${
      process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : getBaseUrl()
    }/earrings.png`,
    rating: 5,
  },
  {
    name: "Pearl Earrings",
    price: 150,
    img: `${
      process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : getBaseUrl()
    }/ring.png`,
    rating: 3,
  },
  {
    name: "Sapphire Bracelet",
    price: 800,
    img: `${
      process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : getBaseUrl()
    }/necklace.png`,
    rating: 4,
  },
];
