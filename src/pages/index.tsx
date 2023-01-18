import { type NextPage } from "next";
import BestSellers from "../components/Home/BestSellers";
import Categories from "../components/Home/Categories";
import DayProduct from "../components/Home/DayProduct";
import Header from "../components/Home/Header";

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
