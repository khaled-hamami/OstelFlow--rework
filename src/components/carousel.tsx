"use client"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"
import { useRef } from "react"

export function HomeCarousel() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseLeave={plugin.current.reset}
      className="mx-auto flex w-full justify-center"
    >
      <CarouselContent>
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="relative">
                <CardContent
                  className={`z-10 flex aspect-square h-[300px] w-full items-center justify-center `}
                >
                  <Image
                    src={`/carousel${index + 1}.png`}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={`Carousel ${index + 1}`}
                    className="rounded-xl"
                  />
                  <div className="z-10 flex h-full items-end text-lg font-bold text-white md:text-2xl">
                    Bali, Indonesia
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
