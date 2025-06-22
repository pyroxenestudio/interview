import { Outlet } from "react-router";
import Footer from "./partial/footer";
import Navbar from "./partial/navbar";

function Layout () {
  return (
    <>
    <Navbar />
      <section className="flex-auto flex flex-col relative m-2">
        <Outlet />
      </section>
    <Footer />
    </>
  )
}

export default Layout;