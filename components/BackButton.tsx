"use client";

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const BackButton = () => {
  const router = useRouter()
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm"
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  )
}
