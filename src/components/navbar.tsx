import Link from "next/link"
import Logo from "./logo"

import Sidebar from "./sidebar"
export default function Navbar() {
  return (
    <header className="absolute flex w-full  flex-col flex-wrap items-center justify-between gap-4 bg-[#ffffff33] px-4 py-4 text-sm sm:flex-row sm:px-8 sm:text-lg  md:px-16 lg:px-32 lg:text-xl">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex w-full items-center justify-evenly gap-2 text-[#333] sm:w-1/2 sm:gap-2 md:gap-4 lg:gap-4">
        <Link
          href="/"
          className="font-bold text-inherit hover:scale-105 hover:text-black hover:animate-in"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="font-bold text-inherit hover:scale-105 hover:text-black hover:animate-in"
        >
          Blog
        </Link>
        <Link
          href="/faq"
          className="font-bold text-inherit hover:scale-105 hover:text-black hover:animate-in"
        >
          FAQ
        </Link>
        <Link
          href="/contact"
          className="font-bold text-inherit hover:scale-105 hover:text-black hover:animate-in"
        >
          Contact
        </Link>
        <Sidebar />
      </div>
    </header>
  )
}
