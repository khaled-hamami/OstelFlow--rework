import { HotelType } from "@/types/hotel"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"

export default function HotelCard1({ hotel }: { hotel: HotelType }) {
  return (
    <Card key={hotel.id} className="h-[400px] w-[250px] border-none shadow-none">
      <img
        alt="Hotel"
        className="h-3/5 rounded-2xl object-cover"
        height="200"
        src={"/carousel1.png"}
        style={{
          aspectRatio: "300/200",
          objectFit: "cover",
        }}
        width="300"
      />
      <CardContent className="mt-1 w-full px-0">
        <h5 className="text-lg font-semibold">{hotel.name}</h5>
        <p className="text-sm text-gray-600">{hotel.location}</p>
        <div className="flex justify-between">
          <span className="mt-2 text-lg font-semibold">Starting from</span>
          <span className="mt-2 text-2xl font-semibold text-primary">{hotel.price} DT</span>
        </div>
        <Button className=" w-full  rounded-sm  bg-[#FFF6C9] p-0 text-sm font-semibold ">
          <Link
            href={`/hotels/${hotel.id}`}
            className="flex h-full w-full items-center justify-center"
          >
            View Place
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
