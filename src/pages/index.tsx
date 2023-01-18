import { type NextPage } from "next";
import Categories from "../components/Home/Categories";
import DayProduct from "../components/Home/DayProduct";
import Header from "../components/Home/Header";
import BestSellers from "../components/Home/BestSellers";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <DayProduct />
      <Categories />
      <BestSellers />
    </div>
  );
};

export default Home;
