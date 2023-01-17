import { type NextPage } from "next";
import Categories from "../components/Home/Categories";
import DayProduct from "../components/Home/DayProduct";
import Header from "../components/Home/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <DayProduct />
      <Categories />
    </div>
  );
};

export default Home;
