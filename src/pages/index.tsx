import { type NextPage } from "next";
import BestSellers from "../components/Home/BestSellers";
import Categories from "../components/Home/Categories";
import DayProduct from "../components/Home/DayProduct";
import Header from "../components/Home/Header";
import Advertising from "../components/Home/Advertising";
import Footer from "../components/Home/Footer";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <DayProduct />
      <Categories />
      <BestSellers />
      <Advertising />
      <Footer />
    </div>
  );
};

export default Home;
