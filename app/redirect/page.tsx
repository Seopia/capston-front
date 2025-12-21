"use client"

import RedirectPage from "@/components/pages/redirect-page"
import { Suspense } from "react"


export default function Redirect() {
  return (
    <Suspense>
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <RedirectPage/>
    </main>
    </Suspense>
  )
}
