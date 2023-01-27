export const bestSellersMock = [
  {
    name: "Gold Ring",
    price: 200,
    img: `${
      process.env.NEXT_PUBLIC_URL
        ? process.env.NEXT_PUBLIC_URL
        : "http://localhost:3000"
    }/bracelet.png`,
    rating: 4,
  },
  {
    name: "Diamond Necklace",
    price: 3000,
    img: `${
      process.env.NEXT_PUBLIC_URL
        ? process.env.NEXT_PUBLIC_URL
        : "http://localhost:3000"
    }/earrings.png`,
    rating: 5,
  },
  {
    name: "Pearl Earrings",
    price: 150,
    img: `${
      process.env.NEXT_PUBLIC_URL
        ? process.env.NEXT_PUBLIC_URL
        : "http://localhost:3000"
    }/ring.png`,
    rating: 3,
  },
  {
    name: "Sapphire Bracelet",
    price: 800,
    img: `${
      process.env.NEXT_PUBLIC_URL
        ? process.env.NEXT_PUBLIC_URL
        : "http://localhost:3000"
    }/necklace.png`,
    rating: 4,
  },
];
