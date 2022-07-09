import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [waiting, setWaiting] = useState<boolean>(false);

  return (
    <header className="border-b flex items-center h-14 px-4 space-x-4">
      <h1>
        <Link href="/">
          <a className="text-2xl font-logo">雀魂データ分析</a>
        </Link>
      </h1>
      <span className="flex-1"></span>
    </header>
  )
}
export default Header;