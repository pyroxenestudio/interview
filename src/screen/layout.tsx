import { Outlet } from "react-router";
import Footer from "./partial/footer";
import Navbar from "./partial/navbar";

function Layout () {
  return (
    <>
    <Navbar />
      <section className="content flex-auto flex flex-col relative">
        <Outlet />
      </section>
    <Footer />
    </>
  )
}

export default Layout;