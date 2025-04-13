"use client"
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'

export function HeroSection() {
  const imageRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (imageRef.current) {
        imageRef.current.classList.toggle('scrolled', scrollPosition > 100)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className='w-full pt-32 md:pt-44 pb-20 relative z-10'>
      <div className='space-y-8 text-center max-w-7xl mx-auto px-4'>
        <div className='space-y-6'>
          <h1 className='text-4xl font-bold md:text-5xl lg:text-6xl bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent'>
            Smart Career Growth Platform
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-gray-300'>
            AI-powered tools for resume building, interview prep, and career guidance
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href='/dashboard' className="w-full sm:w-auto">
            <Button size='lg' className='w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white'>
              Get Started Free
            </Button>
          </Link>
          <Link href='/demo' className="w-full sm:w-auto">
            <Button size='lg' variant='outline' className='w-full border-gray-500 text-gray-200 hover:bg-gray-700/30'>
              Watch Demo
            </Button>
          </Link>
        </div>

        <div className='mt-16 relative'>
          <div ref={imageRef} className='relative rounded-xl overflow-hidden shadow-xl border border-gray-700/50 transform transition-transform duration-500 hover:scale-[1.01]'>
            <Image 
              src='/banner.jpeg'
              width={1280}
              height={720}
              alt="Platform Preview"
              className='rounded-lg'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900/40 to-gray-900/10' />
          </div>
        </div>
      </div>
    </section>
  )
}