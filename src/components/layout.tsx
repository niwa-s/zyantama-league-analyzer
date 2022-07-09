import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = { children: ReactNode }

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <main className="flex-1 relative overflow-y-auto focus:outline-none mb-auto">{children}</main>
      <Footer />
    </div>
  )
}
export default Layout;