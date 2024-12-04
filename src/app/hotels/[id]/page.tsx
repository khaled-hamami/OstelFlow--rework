"use client"

import useGetHotelDetail from "@/hooks/useGetHotelDestails"

type pageProps = {
  params: { id: string }
}
export default function HotelDetail({ params }: pageProps) {
  const { data, isLoading } = useGetHotelDetail(params.id)

  return (
    <div className="mx-auto my-20 mt-96  min-h-screen max-w-screen-2xl  px-4 lg:my-20">
      <div>{data?.hotel.name}</div>
      <div>{data?.hotel.description}</div>
      <div>{data?.hotel.price}</div>
      <div>{data?.hotel.rating}</div>
      <div>{data?.hotel.price}</div>
    </div>
  )
}
