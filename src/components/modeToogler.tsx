"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const handleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="border-gray-600 bg-black text-white hover:border-white hover:bg-black hover:text-white"
      onClick={handleTheme}
    >
      <Sun className=" h-[1.2rem] w-[1.2rem] rotate-0 scale-100 bg-black transition-all hover:text-white dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
