import HomePage from "@Pages/home";
import type { NextPage } from "next";
import styles from "@Styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <HomePage />
    </div>
  );
};

export default Home;
