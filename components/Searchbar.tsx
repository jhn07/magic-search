"use client";

import { Loader2, SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Suspense, useRef, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation";

export const Searchbar = () => {
  const serchParams = useSearchParams()
  const defaultQuery = serchParams.get("query") || ""
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSearching, startTransition] = useTransition()
  const router = useRouter()

  const [query, setQuery] = useState<string>(defaultQuery)

  const search = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`)
    })
  }

  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          placeholder="e.g Dark Parka"
          disabled={isSearching}
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search()
            }

            if (e.key === "Escape") {
              inputRef?.current?.blur()
            }
          }}
          className="absolute inset-0 h-full"
        />
        <Button disabled={isSearching} onClick={search} size="sm" className="absolute right-0 inset-y-0 h-full rounded-l-none">
          {isSearching ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <SearchIcon className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <Searchbar />
    </Suspense>
  )
}