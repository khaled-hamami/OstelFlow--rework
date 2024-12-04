import Link from "next/link"
import Logo from "./logo"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { currentUser } from "@clerk/nextjs"

export default async function Sidebar() {
  const user = await currentUser()
  return (
    <Sheet>
      <SheetTrigger asChild className="border-background">
        <button className="p-4 animate-in hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="15"
            viewBox="0 0 22 15"
            fill="none"
          >
            <rect
              x="0.171875"
              y="0.0488281"
              width="20.8843"
              height="2.92683"
              className="fill-[#333] hover:fill-black "
            />
            <rect
              x="0.171875"
              y="5.90259"
              width="20.8843"
              height="2.92683"
              className="fill-[#333] hover:fill-black "
            />
            <rect
              x="0.171875"
              y="11.7561"
              width="20.8843"
              height="2.92683"
              className="fill-[#333] hover:fill-black "
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="h-1/2 w-full border-none sm:h-full sm:w-1/2 ">
        <Link href="/" className="w-full">
          <SheetClose className="flex w-full justify-center">
            <Logo />
          </SheetClose>
        </Link>
        <div className="mt-16 grid gap-4 py-4 text-xl">
          <Link href="/" className="flex w-full justify-center">
            <SheetClose className="w-full rounded-sm hover:scale-110 hover:bg-[#64646433] hover:animate-in">
              Home
            </SheetClose>
          </Link>
          <Separator />
          <Link href="/hotels" className="flex w-full justify-center">
            <SheetClose className="w-full rounded-sm hover:scale-110 hover:bg-[#64646433] hover:animate-in">
              Hotels
            </SheetClose>
          </Link>
          {user && (
            <>
              <Separator />
              <Link href="/profile" className="flex w-full justify-center">
                <SheetClose className="w-full rounded-sm hover:scale-110 hover:bg-[#64646433] hover:animate-in">
                  Profile
                </SheetClose>
              </Link>
            </>
          )}
          {!user && (
            <>
              <Separator />
              <Link href="/signin" className="flex w-full justify-center">
                <SheetClose className="w-full rounded-sm hover:scale-110 hover:bg-[#64646433] hover:animate-in">
                  Login
                </SheetClose>
              </Link>
              <Separator />
              <Link href="/signup" className="flex w-full justify-center">
                <SheetClose className="w-full rounded-sm hover:scale-110 hover:bg-[#64646433] hover:animate-in">
                  Register
                </SheetClose>
              </Link>
            </>
          )}
          <Separator />
          <Link href="/contact" className="flex w-full justify-center">
            <SheetClose className="w-full rounded-sm hover:scale-110 hover:bg-[#64646433] hover:animate-in">
              Contact
            </SheetClose>
          </Link>
          <Separator />
          <Link href="/faq" className="flex w-full justify-center">
            <SheetClose className="w-full rounded-sm hover:scale-110 hover:bg-[#64646433] hover:animate-in">
              FAQ
            </SheetClose>
          </Link>
          <Separator />
          <Link href="/blog" className="flex w-full justify-center">
            <SheetClose className="w-full rounded-sm hover:scale-110 hover:bg-[#64646433] hover:animate-in">
              Blog
            </SheetClose>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
