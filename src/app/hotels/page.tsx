import Search from "@/components/search"
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select"
import Filters from "@/components/Filters"
import Hotels from "@/components/hotels"
import { ListBulletIcon, TableIcon } from "@radix-ui/react-icons"

import Link from "next/link"
import { Button } from "@/components/ui/button"

type SearchParamsProps = { [key: string]: string } | undefined

export default function page({ searchParams }: { searchParams: SearchParamsProps }) {
  const selectedCardType = (searchParams?.cardType || "1") as string

  return (
    <div className="min-h-screen">
      <div className="flex h-[50svh] w-full items-center justify-center bg-[url('/hotels-background.jpg')] bg-cover bg-no-repeat">
        <Search />
      </div>

      <div className="mx-auto my-20  mt-96 max-w-screen-2xl  px-4 lg:my-20">
        <div className="grid grid-cols-4 gap-2 md:gap-8">
          <Filters />
          <div className="col-span-3">
            <div className="flex justify-between pb-8">
              <h3 className="text-3xl font-bold">Search results</h3>
              <div className="flex gap-4">
                <Button
                  className={`border-2 border-primary p-0 text-primary hover:text-black ${selectedCardType === "1" ? "bg-[#FFF6C9]" : "bg-transparent"}`}
                >
                  <Link
                    scroll={false}
                    href={`?${new URLSearchParams({
                      cardType: "1",
                    })}`}
                    replace
                    className="p-2"
                  >
                    <ListBulletIcon className="size-6" />
                  </Link>
                </Button>
                <Button
                  className={`border-2 border-primary p-0 text-primary hover:text-black ${selectedCardType === "2" ? "bg-[#FFF6C9]" : "bg-transparent"}`}
                >
                  <Link
                    scroll={false}
                    href={`?${new URLSearchParams({
                      cardType: "2",
                    })}`}
                    replace
                    className="p-2"
                  >
                    <TableIcon className="size-6" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 pb-4">
              <p className="text-nowrap text-sm text-gray-600">Showing 4 of 257 places</p>
              <Select>
                <SelectTrigger id="sort" className="w-[300px] ">
                  <SelectValue placeholder="Sort by Recommended" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Hotels />
          </div>
        </div>
      </div>
    </div>
  )
}
