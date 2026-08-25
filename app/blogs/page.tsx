import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TwitterEmbed from './[slug]/components/sections/mainLayout/embeds/Twitterembed'
import InertiaArrowCard from '@/components/pixel-perfect/inertia-arrow-card'
import CoinSpinAnimation from '@/components/pixel-perfect/coin-spin-animation'
import HeroCoverReveal from '@/components/pixel-perfect/hero-cover-reveal'
import LiquidPauseAnimation from '@/components/pixel-perfect/liquid-pause-animation'
import PerspectiveDeckCarousel from '@/components/pixel-perfect/perspective-deck-carousel'
import TextAlongPath from '@/components/pixel-perfect/text-along-path'
import FannedDeckCarousel from '@/components/pixel-perfect/fanned-deck-carousel'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-fg text-fg">
      <div className="relative h-screen z-10 w-full flex-1 flex flex-col items-center bg-bg rounded-b-[2.5rem] sm:rounded-b-[3.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] zpb-16">
        {/* <Navbar /> */}
        <div className="w-full zmax-w-4xl flex flex-col justify-between items-center gap-2 zp-5 zpt-10">
          {/* <InertiaArrowCard /> */}
          <div className='absolute top-0'>
              <CoinSpinAnimation />
          </div>
          {/* <HeroCoverReveal /> */}
          {/* <LiquidPauseAnimation /> */}
          {/* <div className='w-full h-full pt-[20vh]'>
            <PerspectiveDeckCarousel />
          </div> */}
          <div className='w-full h-full pt-[20vh] overflow-hidden rounded-b-[2.5rem] sm:rounded-b-[3.5rem]'>
            <FannedDeckCarousel />
          </div>
          {/* <TextAlongPath /> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default page
