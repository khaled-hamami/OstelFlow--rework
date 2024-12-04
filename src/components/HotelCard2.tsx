import { HotelType } from "@/types/hotel"
import React from "react"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Separator } from "./ui/separator"
import Link from "next/link"
export default function HotelCard2({ hotel }: { hotel: HotelType }) {
  const images = JSON.parse(hotel?.images)
  console.log(images)
  return (
    <Card className=" my-2 flex h-[300px] w-full rounded-lg border-none shadow-sm">
      <div className="relative w-2/6">
        <img
          alt="Hotel el mouradi"
          className="h-full w-full rounded-l-lg object-cover"
          height="160"
          src={"/carousel1.png"}
          style={{
            aspectRatio: "160/160",
            objectFit: "cover",
          }}
          width="160"
        />
        <div className="absolute left-2 top-2 flex items-center space-x-1 bg-white px-2 py-1 text-xs font-semibold">
          <CameraIcon className="h-4 w-4" />
          <span>{images.length} images</span>
        </div>
      </div>
      <CardContent className="flex w-4/6 flex-col justify-between p-4">
        <div className="flex w-full justify-between">
          <div>
            <h3 className="text-2xl font-bold ">{hotel.name}</h3>
            <div className="text-sm">
              <div className="flex gap-2">
                <LocationIcon className="h-5 w-5 fill-primary" />
                {hotel.location}
              </div>
            </div>
            <div className="flex gap-8">
              <div className="mt-1 flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-2 text-xs font-medium">{hotel.rating} Star Hotel</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CoffeIcon className="h-4 w-4 text-blue-500" />
                <span>20+ Amenities</span>
              </div>
            </div>
            <div className="mt-1 flex items-center space-x-1 text-sm">
              <span className="rounded-sm border border-primary p-2 font-medium">4.2</span>
              <span className="text-gray-500">Very Good 371 reviews</span>
            </div>
          </div>
          <div>
            <p className="text-right text-xs text-gray-400">starting from</p>
            <p className="text-right text-lg font-semibold text-primary">
              {hotel.price}&nbsp; DT/night
            </p>
          </div>
        </div>
        <Separator />
        <div className="mt-4 flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-4 space-x-1">
            <div className="rounded-sm bg-primary p-2">
              <HeartIcon className="h-6 w-6 border-none fill-white" />
            </div>
            <Button className="flex w-full rounded-sm bg-[#FFF6C9] p-0">
              <Link
                href={`/hotels/${hotel.id}`}
                className="flex h-full w-full items-center justify-center px-4 py-2"
              >
                View Place
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
function BadgeCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="#000000"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 395.71 395.71"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>{" "}
        </g>
      </g>
    </svg>
  )
}

function CoffeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="#000000"
      height="200px"
      width="200px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 351.766 351.766"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M313.397,28.204h-59.649c-0.967,0-1.922,0.048-2.871,0.119H53.14c-13.425,0-24.347,10.922-24.347,24.346v193.495 c0,13.424,10.922,24.346,24.347,24.346h6.265v13.559c0,0.979,0.002,2.373,0.124,3.965H10.435C4.682,288.034,0,292.715,0,298.468 v14.659c0,5.753,4.682,10.434,10.435,10.434h295.264c5.753,0,10.435-4.681,10.435-10.434v-14.659 c0-5.753-4.682-10.434-10.435-10.434h-49.093c0.122-1.591,0.124-2.985,0.124-3.965V270.51h6.265 c13.425,0,24.347-10.922,24.347-24.346v-72.276h26.058c21.156,0,38.368-17.212,38.368-38.368V66.573 C351.766,45.416,334.554,28.204,313.397,28.204z M316.766,135.519c0,1.826-1.542,3.368-3.368,3.368H287.34V63.204h26.058 c1.826,0,3.368,1.542,3.368,3.368V135.519z"></path>{" "}
      </g>
    </svg>
  )
}
