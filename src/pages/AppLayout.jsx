import { Map } from "../components/Map";
import { Sidebar } from "../components/Sidebar";
import styles from "./AppLayout.module.css";

export const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};
