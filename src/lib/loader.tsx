"use client"
import RingLoader from "react-spinners/RingLoader"

export default function Loader() {
  return (
    <div className="h-[90vh] w-full bg-transparent ">
      <RingLoader
        color=""
        className="loader"
        loading={true}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
