import type { ReactNode } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <Sidebar />
      <main id="main">
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default AppLayout;
