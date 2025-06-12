"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Crown, TrendingUp, Rocket, BellIcon as BrandTelegram, Twitter, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "The Next Generation Football Legend Meme Coin - Launching Soon!"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-yellow-900 to-red-900 relative overflow-hidden">
      {/* Ronaldo Image with opacity covering whole page */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/ronaldo.png"
          alt="Cristiano Ronaldo"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Animated logo/icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full"
            />
            <Crown className="absolute inset-0 m-auto w-8 h-8 text-yellow-400" />
          </div>
        </motion.div>

        {/* Main animated title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-400 via-yellow-400 to-white bg-clip-text text-transparent mb-6"
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 20px rgba(239, 68, 68, 0.5)",
                "0 0 40px rgba(251, 191, 36, 0.5)",
                "0 0 20px rgba(239, 68, 68, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            CR7BABY
          </motion.span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 h-16 flex items-center"
        >
          <span className="font-mono">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="text-red-400"
            >
              |
            </motion.span>
          </span>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: Rocket, text: "Launching June 14th" },
            { icon: Crown, text: "Baby GOAT Status" },
            { icon: TrendingUp, text: "1000x Potential" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20"
            >
              <feature.icon className="w-5 h-5 text-red-400" />
              <span className="text-gray-200">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore button and social media buttons */}
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl border-0 group"
              >
                <span className="mr-2">Join Presale Whitelist</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button
              onClick={() => window.open("https://t.me/Babyronald", "_blank")}
              variant="outline"
              size="sm"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white rounded-full"
            >
              <BrandTelegram className="w-4 h-4 mr-1.5" />
              Telegram
            </Button>
            <Button
              onClick={() => window.open("https://x.com/cr7thegoat23?s=11", "_blank")}
              variant="outline"
              size="sm"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white rounded-full"
            >
              <Twitter className="w-4 h-4 mr-1.5" />X
            </Button>
            <Button
              onClick={() =>
                window.open("https://discord.com/channels/1382798781883482134/13827987829405778340", "_blank")
              }
              variant="outline"
              size="sm"
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white rounded-full"
            >
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Discord
            </Button>
          </motion.div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full"
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
