"use client"
import ProfileBackground from "@/../public/ProfileBackground.jpg"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile, useUser } from "@clerk/nextjs"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { TabsContent } from "@radix-ui/react-tabs"
import Image from "next/image"
import React, { useState } from "react"

export default function Profile() {
  const { user } = useUser()
  return (
    <div className="mb-32">
      <div className="relative -z-10 h-[30svw] min-h-[220px] w-full">
        <Image src={ProfileBackground} alt="" fill />
      </div>
      <div className="flex w-full flex-col items-center">
        <div>
          <Avatar className="h-16 w-16 -translate-y-8 border-2 border-primary sm:h-28 sm:w-28 sm:-translate-y-14 md:h-36 md:w-36 md:-translate-y-20">
            <AvatarImage src={user?.imageUrl} alt="" />
          </Avatar>
          <div className="my-4 flex w-full justify-center sm:my-0 sm:justify-end">
            <Button className="w-full -translate-y-8  rounded-xl sm:w-auto sm:-translate-y-20 sm:rounded-full md:-translate-y-28">
              <span className="hidden sm:block">
                <Pencil1Icon />
              </span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </div>
        </div>

        <h1 className="-translate-y-8 text-2xl font-semibold">
          {user?.firstName} {user?.lastName}
        </h1>
        <h1 className="my-2 -translate-y-8 text-xl text-muted-foreground">
          {user?.emailAddresses[0].emailAddress}
        </h1>
      </div>
      <Tabs defaultValue="account" className="mx-auto w-4/5">
        <TabsList className="grid w-full grid-cols-3 bg-transparent">
          <TabsTrigger
            className="rounded-none border-primary text-xl shadow-md focus:border-b-4 "
            value="flights"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none border-primary text-xl shadow-md focus:border-b-4"
            value="hotels"
          >
            History
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none border-primary text-xl shadow-md focus:border-b-4"
            value="rents"
          >
            My accommodations
          </TabsTrigger>
        </TabsList>
        <TabsContent className="my-4" value="flights">
          <div className="mb-16 mt-8 flex w-full justify-center">
            <UserProfile />
          </div>
        </TabsContent>
        <TabsContent className="my-4" value="hotels">
          <h3 className="my-12 font-bold">Flights/Bookings</h3>
          <Tabs defaultValue="account" className="mx-auto w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent">
              <TabsTrigger
                className="rounded-none border-primary text-sm font-bold shadow-md focus:border-b-4 "
                value="flights"
              >
                <PlaneIcon className="mx-4 h-4 w-4 fill-black" /> Flights
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none border-primary text-sm font-bold shadow-md focus:border-b-4"
                value="hotels"
              >
                <HotelIcon className="mx-4 h-4 w-4 fill-black" />
                Hotels
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none border-primary text-sm font-bold shadow-md focus:border-b-4"
                value="rents"
              >
                <CarIcon className="mx-4 h-4 w-4" />
                Rents
              </TabsTrigger>
            </TabsList>
            <TabsContent className="my-4" value="flights">
              Flights
            </TabsContent>
            <TabsContent className="my-4" value="hotels">
              Hotels
            </TabsContent>
            <TabsContent className="my-4" value="rents">
              Rents
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent className="my-4" value="rents"></TabsContent>
      </Tabs>
    </div>
  )
}

function PlaneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g clipPath="url(#clip0_15_44)">
          <rect width="24" height="24" fill="white"></rect>
          <path
            d="M19.3074 7.63582C19.3074 7.63582 20.4246 5.92462 19.364 4.86396C18.3033 3.8033 16.5921 4.92053 16.5921 4.92053L13.0566 8.45606L5.45753 6.04247L3.57191 7.92809L9.75674 11.7559L7.87112 13.6415L4.40158 13.9432L3.69448 14.6503L7.34315 16.8848L9.60589 20.5617L10.313 19.8546L10.5864 16.3568L12.472 14.4712L16.2998 20.656L18.1854 18.7704L15.7719 11.1714L19.3074 7.63582Z"
            stroke="#000000"
            strokeLinejoin="round"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_15_44">
            <rect width="24" height="24" fill="white"></rect>
          </clipPath>
        </defs>
      </g>
    </svg>
  )
}

function HotelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="#000000"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M12.691406 0L11.564453 2.3320312L9 2.6386719L10.949219 4.3613281L10.435547 7L12.691406 5.6816406L14.949219 7L14.435547 4.3613281L16.384766 2.6386719L13.820312 2.3320312L12.691406 0 z M 14.949219 7L10.435547 7L9.3007812 7C6.3307812 7 4 9.3307812 4 12.300781L4 45C4 45.55 4.45 46 5 46L22 46L22 36L28 36L28 46L45 46C45.55 46 46 45.55 46 45L46 12.300781C46 9.3307812 43.669219 7 40.699219 7L39.564453 7L35.050781 7L31.359375 7L26.845703 7L23.154297 7L18.640625 7L14.949219 7 z M 18.640625 7L20.896484 5.6816406L23.154297 7L22.640625 4.3613281L24.589844 2.6386719L22.025391 2.3320312L20.896484 0L19.769531 2.3320312L17.205078 2.6386719L19.154297 4.3613281L18.640625 7 z M 26.845703 7L29.103516 5.6816406L31.359375 7L30.845703 4.3613281L32.794922 2.6386719L30.230469 2.3320312L29.103516 0L27.974609 2.3320312L25.410156 2.6386719L27.359375 4.3613281L26.845703 7 z M 35.050781 7L37.308594 5.6816406L39.564453 7L39.050781 4.3613281L41 2.6386719L38.435547 2.3320312L37.308594 0L36.179688 2.3320312L33.615234 2.6386719L35.564453 4.3613281L35.050781 7 z M 10 12L16 12L16 16L10 16L10 12 z M 22 12L28 12L28 16L22 16L22 12 z M 34 12L40 12L40 16L34 16L34 12 z M 10 20L16 20L16 24L10 24L10 20 z M 22 20L28 20L28 24L22 24L22 20 z M 34 20L40 20L40 24L34 24L34 20 z M 10 28L16 28L16 32L10 32L10 28 z M 22 28L28 28L28 32L22 32L22 28 z M 34 28L40 28L40 32L34 32L34 28 z M 10 36L16 36L16 40L10 40L10 36 z M 34 36L40 36L40 40L34 40L34 36 z"></path>
      </g>
    </svg>
  )
}

function CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  )
}
