import { HotelType } from "@/types/hotel"
import request, { ClientError, gql } from "graphql-request"
import { useQuery } from "react-query"
import { toast } from "sonner"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const getHotelDetail = async (id: string) => {
  id = decodeURIComponent(id)
  const query = gql`
      query {
          hotel(id: "${id}") {
            id
            name
            description
            price
            location
            rating
            type
            preference
            images

          }
       }
   `
  try {
    const data: { hotel: HotelType } = await request(`${BACKEND_URL}/graphql`, query)
    return data
  } catch (err: any) {
    console.error(err)
    if (err.response.errors) {
      toast.error(err.response.errors[0].message)
    } else {
      toast.error("Something went wrong, please try again later")
    }
  }
}

const useGetHotelDetail = (id: string) => {
  return useQuery(["hotel", id => getHote], ()lDetail(id), {
    staleTime: Infinity,
  })
}

export default useGetHotelDetail
