import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-fg text-fg">
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center bg-bg rounded-b-[2.5rem] sm:rounded-b-[3.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] py-32 px-6">
        <Navbar />
        <main className="text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-fg">Blogs by Bismay</h1>
          <p className="text-sec text-base sm:text-lg max-w-md mx-auto">
            Personal tech blog & reading experience. Scroll down to see the footer reveal effect.
          </p>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default page
