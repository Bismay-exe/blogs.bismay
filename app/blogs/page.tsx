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
    <div className="min-h-screen bg-fg text-fg">
      <Footer />
    </div>
  )
}

export default page
