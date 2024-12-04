import request, { gql } from "graphql-request"
import { useInfiniteQuery } from "react-query"
import { HotelType } from "@/types/hotel"
import { ClientError } from "graphql-request"
import { toast } from "sonner"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type DataType = {
  allHotels: {
    edges: { node: HotelType }[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
  }
}

const getHotels = async ({ pageParam = "" }) => {
  const query = gql`
    query {
      allHotels(first: 2, after: "${pageParam}") {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            name
            description
            price
            location
            images
            rating
            type
            preference
          }
        }
      }
    }
  `
  try {
    const data: DataType = await request(`${BACKEND_URL}/graphql`, query)
    return {
      hotels: data.allHotels.edges.map((edge) => edge.node),
      nextPage: data.allHotels.pageInfo.hasNextPage ? data.allHotels.pageInfo.endCursor : undefined,
    }
  } catch (err: any) {
    console.error(err)
    if (err.response.errors) {
      toast.error(err.response.errors[0].message)
    } else {
      toast.error("Something went wrong, please try again later")
    }
  }
}

const useGetHotels = () => {
  return useInfiniteQuery("hotels", getHotels, {
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  })
}
export default useGetHotels
