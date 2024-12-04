"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator"
import { Slider } from "./ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

export default function Filters() {
  const [priceRange, setPriceRange] = useState([250, 750])
  const [DepartureTime, setDepartureTime] = useState([10, 14])
  const [typeCollapsible, setTypeCollapsible] = useState(false)
  const [starRating, setStarRating] = useState([0, 0, 0, 0, 0])
  const [tripsCollapsible, setTripsCollapsible] = useState(false)
  const [starRatingCollapsible, setStarRatingCollapsible] = useState(false)

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  useEffect(() => {
    console.log(starRating)
  }, [starRating])

  const handleCheckboxChange = (event: any) => {
    const newStarRating = [...starRating]
    newStarRating[event.target.value - 1] = event.target.checked ? 1 : 0
    setStarRating(newStarRating)
  }

  const handlePriceChange = (newPrice: number[]) => {
    setPriceRange(newPrice)
  }

  const handleDepartureTimeChange = (newPrice: number[]) => {
    setDepartureTime(newPrice)
  }

  return (
    <div className="col-span-1">
      <Button className="w-full rounded-lg bg-[#FFA500] py-3 text-lg font-bold text-white">
        Where we go?
      </Button>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="destination">
          Where do you want to go?
        </label>
        <Input className="mt-1" id="destination" />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="date">
          Select Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* <div className="my-4 flex items-center justify-between ">
        <div className="flex flex-col items-center justify-center rounded-md bg-background p-4">
          <div className="w-full text-center">Adults</div>
          <div className="flex">
            <button
              className="rounded-md px-2  py-1 text-foreground shadow"
              onClick={() => {
                adultCounts <= 0 ? setAdultadultCount(0) : setAdultadultCount(adultCounts - 1)
              }}
            >
              -
            </button>
            <div className="mx-4 text-lg">{adultCounts}</div>
            <button
              className="rounded-md px-2  py-1 text-foreground shadow"
              onClick={() => setAdultadultCount(adultCounts + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-md bg-background p-4">
          <div className="w-full text-center">Child</div>
          <div className="flex">
            <button
              className="rounded-md px-2  py-1 text-foreground shadow"
              onClick={() => {
                childsCount <= 0 ? setChildsCount(0) : setChildsCount(childsCount - 1)
              }}
            >
              -
            </button>
            <div className="mx-4 text-lg">{childsCount}</div>
            <button
              className="rounded-md px-2  py-1 text-foreground shadow"
              onClick={() => setChildsCount(childsCount + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div> */}
      <div className="w-ull flex justify-center">
        <Button className="mt-4 rounded-lg bg-[#FFA500] px-4 py-6 text-lg font-semibold text-white">
          SEARCH
        </Button>
      </div>
      <Separator orientation="horizontal" className="mx-auto my-8 bg-black" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Separator orientation="horizontal" className="mx-auto my-8 bg-black" />
        <h4 className="text-lg font-bold">Star Rating</h4>
        <div className="mt-2">
          <div className="mt-1">
            <input
              className="accent-primary"
              type="checkbox"
              id="5-star"
              value={5}
              onChange={handleCheckboxChange}
            />
            <label className="ml-2 text-sm" htmlFor="5-star">
              ★★★★★ 5 Star
            </label>
          </div>
          <div className="mt-1">
            <input
              className="accent-primary"
              type="checkbox"
              id="4-star"
              value={4}
              onChange={handleCheckboxChange}
            />
            <label className="ml-2 text-sm" htmlFor="4-star">
              ★★★★☆ 4 Star
            </label>
          </div>
          <div className="mt-1">
            <input
              className="accent-primary"
              type="checkbox"
              id="3-star"
              value={3}
              onChange={handleCheckboxChange}
            />
            <label className="ml-2 text-sm" htmlFor="3-star">
              ★★★☆☆ 3 Star
            </label>
          </div>
          <div className="mt-1">
            <input
              className="accent-primary"
              type="checkbox"
              id="2-star"
              value={2}
              onChange={handleCheckboxChange}
            />
            <label className="ml-2 text-sm" htmlFor="2-star">
              ★★☆☆☆ 2 Star
            </label>
          </div>
          <div className="mt-1">
            <input
              className="accent-primary"
              type="checkbox"
              id="1-star"
              value={1}
              onChange={handleCheckboxChange}
            />
            <label className="ml-2 text-sm" htmlFor="1-star">
              ★☆☆☆☆ 1 Star
            </label>
          </div>
          <Separator orientation="horizontal" className="mx-auto my-8 bg-black" />
          <h4 className="text-lg font-bold">Price Range</h4>
          <div className="flex w-full justify-between">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>
          <Slider
            min={0}
            max={1000}
            step={1}
            defaultValue={[250, 750]}
            minStepsBetweenThumbs={20}
            onValueChange={handlePriceChange}
          />
          <Separator orientation="horizontal" className="mx-auto my-8 bg-black" />
          {/* <h4 className="text-lg font-bold">Departure Time</h4>
          <div className="flex w-full justify-between">
            <span>{DepartureTime[0]}:00 h</span>
            <span>{DepartureTime[1]}:00 h</span>
          </div>
          <Slider
            min={1}
            max={23}
            step={1}
            defaultValue={[10, 14]}
            onValueChange={handleDepartureTimeChange}
          /> 
          <Separator orientation="horizontal" className="mx-auto my-8 bg-black" />
          */}
          <Collapsible
            open={typeCollapsible}
            onOpenChange={setTypeCollapsible}
            className="w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-lg font-bold">Type</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex flex-col  space-y-2">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>Houses</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>Appartement</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>Villa</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>Bungalow</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>Resorts</label>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Separator orientation="horizontal" className="mx-auto my-8 bg-black" />
          <Collapsible
            open={starRatingCollapsible}
            onOpenChange={setStarRatingCollapsible}
            className="w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-lg font-bold">Star Rating</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex flex-col  space-y-2">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>All</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>Hotel</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>Bed & Breakfast</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" />
                <label>Apartment</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" />
                <label>Condo</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" />
                <label>All Inclusive</label>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Separator orientation="horizontal" className="mx-auto my-8 bg-black" />
          <Collapsible
            open={tripsCollapsible}
            onOpenChange={setTripsCollapsible}
            className="w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-lg font-bold">Trips</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex flex-col  space-y-2">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" />{" "}
                <label>High-speed Internet</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>Air conditioning</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" /> <label>Swimming pool</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" />
                <label>Fitness equipment </label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" />
                <label>Free parking </label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" />
                <label>Room service</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-primary" />
                <label>Restaurant in hotel </label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}
