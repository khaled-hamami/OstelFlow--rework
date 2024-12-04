"use client"

import useGetHotels from "@/hooks/useGetHotels"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import HotelCard1 from "./HotelCard1"
import HotelCard2 from "./HotelCard2"
import { useSearchParams } from "next/navigation"

export default function Hotels() {
  const searchParams = useSearchParams()

  //* custom hook that fetches array of hotels using pagination via useInfiniteQuery
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetHotels()

  //*a function that loads more hotels when the user click on the more results button
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  //* shaping the fetched data to be an array of hotels
  let hotels = data?.pages.flatMap((page) => page?.hotels || [])

  if (isLoading)
    return <div className="flex flex-wrap items-center justify-evenly gap-4">{Skeletons}</div>

  //* to handle card type selection
  const selectedCardType = searchParams.get("cardType")

  return (
    <>
      <div className="flex flex-wrap items-center justify-evenly gap-4">
        {hotels?.map((hotel) =>
          selectedCardType === "2" ? (
            <HotelCard2 key={hotel.id} hotel={hotel} />
          ) : (
            <HotelCard1 key={hotel.id} hotel={hotel} />
          ),
        )}
      </div>
      <div className="my-8 flex w-full justify-center px-8">
        <Button
          onClick={loadMore}
          disabled={isLoading}
          className="w-full bg-foreground text-background hover:bg-accent-foreground"
        >
          {(hasNextPage && "Show more results") ||
            (!hasNextPage && data?.pages[0]?.hotels && "No more results") ||
            "Error loading results"}
        </Button>
      </div>
    </>
  )
}

const SkeletonCard = () => {
  return (
    <div className="m-1 my-8 w-[350px] ">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  )
}

const Skeletons = Array.from({ length: 15 }).map((_, index) => <SkeletonCard key={index} />)
