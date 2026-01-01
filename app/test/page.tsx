"use client"

import TestPage from "@/components/pages/test-page"
import { Suspense } from "react"


export default function Test() {
  return (
    <Suspense>
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4 bg-black">
      <TestPage/>
    </main>
    </Suspense>
  )
}
