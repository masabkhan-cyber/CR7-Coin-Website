"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Users,
  Zap,
  MessageCircle,
  Mail,
  DollarSign,
  Target,
  TrendingUp,
  Star,
  Rocket,
  Calendar,
  Clock,
  Baby,
} from "lucide-react"
import TradingChart from "@/components/trading-chart"

const generateProjectedData = () => {
  const data = []
  const launchPrice = 0.000007 // Projected launch price for CR7BABY
  let currentPrice = launchPrice

  for (let i = 0; i < 30; i++) {
    // Simulate strong growth after launch
    const change = (Math.random() - 0.2) * 0.000001 // Strong upward bias
    currentPrice = Math.max(currentPrice + change, 0.000001)
    data.push({
      time: `Day ${i + 1}`,
      price: Number(currentPrice.toFixed(9)),
      volume: Math.floor(Math.random() * 500000),
    })
  }
  return data
}

const launchMilestones = [
  {
    id: 1,
    type: "PRESALE",
    milestone: "Whitelist Opens",
    description: "Early supporters get priority access to CR7BABY",
    timestamp: "August 15, 2025",
    icon: Star,
  },
  {
    id: 2,
    type: "LAUNCH",
    milestone: "PancakeSwap Listing",
    description: "CR7BABY goes live for trading",
    timestamp: "September 7, 2025",
    icon: Rocket,
  },
  {
    id: 3,
    type: "MARKETING",
    milestone: "Global Campaign",
    description: "Massive marketing push across social media",
    timestamp: "September 10, 2025",
    icon: Target,
  },
]

export default function Dashboard() {
  const [chartData, setChartData] = useState(generateProjectedData())
  const [currentMilestones, setCurrentMilestones] = useState(launchMilestones)
  const [isWhitelistOpen, setIsWhitelistOpen] = useState(false)
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set launch date to September 7, 2025
  useEffect(() => {
    const launchDate = new Date("September 7, 2025 12:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate - now

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleWhitelist = () => {
    setIsWhitelistOpen(true)
    setTimeout(() => {
      alert("You've been added to the CR7BABY whitelist! You'll receive email notifications when the presale begins.")
      setIsWhitelistOpen(false)
    }, 2000)
  }

  const scrollToTokenomics = () => {
    const tokenomicsSection = document.getElementById("tokenomics")
    if (tokenomicsSection) {
      tokenomicsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleRoadmap = () => {
    setIsRoadmapOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-yellow-900 to-red-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/10 backdrop-blur-sm bg-black/20 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                  "0 0 40px rgba(251, 191, 36, 0.5)",
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent"
            >
              CR7BABY
            </motion.h1>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <Button
                onClick={() => window.open("https://t.me/CR7BABY_Official", "_blank")}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-xs px-2 py-1 md:text-sm md:px-4 md:py-2 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Join </span>Telegram
              </Button>
              <Button
                onClick={handleWhitelist}
                size="sm"
                className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-xs px-2 py-1 md:text-sm md:px-4 md:py-2 whitespace-nowrap"
              >
                Whitelist<span className="hidden sm:inline"> Now</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-6 md:py-8 space-y-12 md:space-y-16">
        {/* Hero Section */}
        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-yellow-400 to-white bg-clip-text text-transparent mb-4 md:mb-6"
            >
              CR7BABY - The Next Football Legend
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-4 md:mb-6 px-4"
            >
              The newest and most exciting meme coin celebrating the future of football greatness. Join early and be
              part of the next 1000x gem! SIUUUU! 🚀
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 md:mb-8"
            >
              <h3 className="text-white text-lg md:text-xl mb-4">Launching In:</h3>
              <div className="flex justify-center gap-2 md:gap-4">
                <div className="bg-black/30 rounded-lg p-2 md:p-3 w-16 md:w-20">
                  <div className="text-xl md:text-3xl font-bold text-yellow-400">{countdown.days}</div>
                  <div className="text-gray-400 text-xs md:text-sm">Days</div>
                </div>
                <div className="bg-black/30 rounded-lg p-2 md:p-3 w-16 md:w-20">
                  <div className="text-xl md:text-3xl font-bold text-yellow-400">{countdown.hours}</div>
                  <div className="text-gray-400 text-xs md:text-sm">Hours</div>
                </div>
                <div className="bg-black/30 rounded-lg p-2 md:p-3 w-16 md:w-20">
                  <div className="text-xl md:text-3xl font-bold text-yellow-400">{countdown.minutes}</div>
                  <div className="text-gray-400 text-xs md:text-sm">Minutes</div>
                </div>
                <div className="bg-black/30 rounded-lg p-2 md:p-3 w-16 md:w-20">
                  <div className="text-xl md:text-3xl font-bold text-yellow-400">{countdown.seconds}</div>
                  <div className="text-gray-400 text-xs md:text-sm">Seconds</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6 mb-8"
            >
              <Button
                onClick={handleWhitelist}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full shadow-2xl w-full sm:w-auto"
              >
                Join Whitelist
              </Button>
              <Button
                onClick={handleRoadmap}
                size="lg"
                variant="outline"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full w-full sm:w-auto"
              >
                Roadmap
              </Button>
              <Button
                onClick={scrollToTokenomics}
                size="lg"
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full w-full sm:w-auto"
              >
                Tokenomics
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl md:text-6xl font-bold text-red-400/10"
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 6 + 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                7
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-red-600/20 to-yellow-600/20 border border-red-500/30 backdrop-blur-sm"
            >
              <Crown className="w-8 md:w-12 h-8 md:h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 break-all leading-tight">
                $0.000007
              </h3>
              <p className="text-gray-300 text-sm md:text-base">Launch Price</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-yellow-600/20 to-red-600/20 border border-yellow-500/30 backdrop-blur-sm"
            >
              <TrendingUp className="w-8 md:w-12 h-8 md:h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">1000x</h3>
              <p className="text-gray-300 text-sm md:text-base">Potential Growth</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-red-600/20 to-white/20 border border-red-500/30 backdrop-blur-sm md:col-span-1 col-span-1"
            >
              <Calendar className="w-8 md:w-12 h-8 md:h-12 text-white mx-auto mb-4" />
              <h3 className="text-base sm:text-lg md:text-3xl font-bold text-white mb-2 leading-tight px-2">
                <span className="block sm:hidden">Sep 7, 2025</span>
                <span className="hidden sm:block">September 7, 2025</span>
              </h3>
              <p className="text-gray-300 text-sm md:text-base">Launch Date</p>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          id="about"
        >
          <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-xl md:text-2xl flex items-center gap-2">
                <Baby className="w-6 md:w-8 h-6 md:h-8 text-yellow-400" />
                About CR7BABY - The Next Generation Meme Coin
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                CR7BABY is the newest addition to the football meme coin family, inspired by the legendary Cristiano
                Ronaldo and the future stars of football. Built on Binance Smart Chain for low fees and lightning-fast
                transactions, our token aims to create a vibrant community of football fans and crypto enthusiasts. With
                innovative tokenomics and a clear roadmap, CR7BABY is positioned to become the next 1000x gem in the
                meme coin space! 🚀⚽
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-red-600/20 to-yellow-600/20 border border-red-500/30"
                >
                  <Rocket className="w-8 md:w-12 h-8 md:h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white text-base md:text-lg mb-2">Early Opportunity</h3>
                  <p className="text-sm">Be among the first to join this rocket to the moon</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-yellow-600/20 to-white/20 border border-yellow-500/30"
                >
                  <Zap className="w-8 md:w-12 h-8 md:h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white text-base md:text-lg mb-2">BSC Speed</h3>
                  <p className="text-sm">Low fees and fast transactions on Binance Smart Chain</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-red-600/20 to-white/20 border border-red-500/30"
                >
                  <Star className="w-8 md:w-12 h-8 md:h-12 text-white mx-auto mb-4" />
                  <h3 className="font-semibold text-white text-base md:text-lg mb-2">Rewards System</h3>
                  <p className="text-sm">Earn passive income just by holding CR7BABY</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Chart Demo Section */}
        <motion.section
          id="chart-demo"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              CR7BABY Projected Growth
            </h2>
            <p className="text-gray-300 text-base md:text-lg">Our projected price movement after launch! 🚀</p>
          </div>
          <TradingChart />
        </motion.section>

        {/* Launch Milestones */}
        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2 text-xl md:text-2xl">
                <Clock className="w-6 md:w-8 h-6 md:h-8 text-yellow-400" />
                CR7BABY Launch Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 md:space-y-6">
                {currentMilestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all gap-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      <Badge
                        variant="default"
                        className="bg-gradient-to-r from-red-600 to-yellow-600 text-white px-3 md:px-4 py-2 w-fit"
                      >
                        <milestone.icon className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                        {milestone.type}
                      </Badge>
                      <div>
                        <div className="text-white font-semibold text-base md:text-lg">{milestone.milestone}</div>
                        <div className="text-gray-400 text-sm md:text-base">{milestone.description}</div>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="text-yellow-400 font-bold text-sm md:text-base">{milestone.timestamp}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Tokenomics section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          id="tokenomics"
        >
          <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2 text-xl md:text-2xl">
                <DollarSign className="w-6 md:w-8 h-6 md:h-8 text-yellow-400" />
                CR7BABY Tokenomics - Fair Launch with Baby GOAT Power
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 md:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors gap-2">
                    <span className="text-gray-300 text-base md:text-lg">Total Supply</span>
                    <span className="text-white font-semibold text-sm sm:text-base md:text-lg break-all">
                      <span className="block sm:hidden">7T $CR7BABY</span>
                      <span className="hidden sm:block">7,000,000,000,000 $CR7BABY</span>
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 md:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors gap-2">
                    <span className="text-gray-300 text-base md:text-lg">Initial Market Cap</span>
                    <span className="text-white font-semibold text-base md:text-lg">$49,000</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 md:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors gap-2">
                    <span className="text-gray-300 text-base md:text-lg">Initial Liquidity</span>
                    <span className="text-white font-semibold text-base md:text-lg">$35,000</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 md:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors gap-2">
                    <span className="text-gray-300 text-base md:text-lg">Launch Price</span>
                    <span className="text-white font-semibold text-base md:text-lg">$0.000007</span>
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="p-4 md:p-6 rounded-xl bg-gradient-to-r from-red-600/20 to-yellow-600/20 border border-red-500/30">
                    <h4 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">Token Distribution</h4>
                    <ul className="text-gray-300 space-y-1 md:space-y-2 text-sm md:text-base">
                      <li>• 50% - Presale & Public Sale</li>
                      <li>• 20% - Liquidity (Locked for 1 Year)</li>
                      <li>• 10% - Marketing & Partnerships</li>
                      <li>• 10% - Development Fund</li>
                      <li>• 5% - Team (Locked for 6 Months)</li>
                      <li>• 5% - Community Rewards</li>
                    </ul>
                  </div>
                  <div className="p-4 md:p-6 rounded-xl bg-gradient-to-r from-yellow-600/20 to-white/20 border border-yellow-500/30">
                    <h4 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">Transaction Taxes</h4>
                    <ul className="text-gray-300 space-y-1 md:space-y-2 text-sm md:text-base">
                      <li>• 3% Buy Tax (1% Liquidity, 1% Marketing, 1% Rewards)</li>
                      <li>• 5% Sell Tax (2% Liquidity, 2% Marketing, 1% Rewards)</li>
                      <li>• 0% Transfer Tax Between Holders</li>
                      <li>• Anti-Whale Mechanism (Max 1% per wallet)</li>
                      <li>• Anti-Bot Protection at Launch</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Community Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          id="community"
        >
          <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2 text-xl md:text-2xl">
                <MessageCircle className="w-6 md:w-8 h-6 md:h-8 text-red-400" />
                Join the CR7BABY Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 md:p-8 rounded-xl bg-gradient-to-br from-red-600/20 to-yellow-600/20 border border-red-500/30 hover:border-red-400/50 transition-all"
                >
                  <Mail className="w-8 md:w-12 h-8 md:h-12 text-red-400 mx-auto mb-4 md:mb-6" />
                  <h3 className="text-white font-semibold mb-3 md:mb-4 text-lg md:text-xl">Contact Us</h3>
                  <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                    Questions about the presale or token?
                  </p>
                  <p className="text-red-400 font-semibold text-base md:text-lg">info@cr7baby.io</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 md:p-8 rounded-xl bg-gradient-to-br from-yellow-600/20 to-white/20 border border-yellow-500/30 hover:border-yellow-400/50 transition-all"
                >
                  <Users className="w-8 md:w-12 h-8 md:h-12 text-yellow-400 mx-auto mb-4 md:mb-6" />
                  <h3 className="text-white font-semibold mb-3 md:mb-4 text-lg md:text-xl">Telegram Community</h3>
                  <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                    Join our growing community of future holders
                  </p>
                  <p className="text-yellow-400 font-semibold text-base md:text-lg">@CR7BABY_Official</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      {/* Whitelist Modal */}
      <AnimatePresence>
        {isWhitelistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsWhitelistOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900 border border-white/20 rounded-lg p-4 md:p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-lg md:text-xl font-semibold mb-4">Join CR7BABY Whitelist</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm md:text-base"
                />

                <div className="p-3 md:p-4 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-lg border border-red-500/30">
                  <p className="text-white text-xs md:text-sm">
                    Whitelist spots are limited! Get priority access to the presale and receive email notifications when
                    presale begins. Plus get a 10% bonus on your purchase!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setIsWhitelistOpen(false)}
                    variant="outline"
                    className="flex-1 border-white/20 text-gray-300 text-sm md:text-base"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleWhitelist}
                    className="flex-1 bg-gradient-to-r from-red-600 to-yellow-600 text-sm md:text-base"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Roadmap Modal */}
      <AnimatePresence>
        {isRoadmapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsRoadmapOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900 border border-white/20 rounded-lg p-4 md:p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-white text-xl md:text-2xl font-bold">CR7BABY Roadmap - The Baby GOAT's Journey</h3>
                <Button
                  onClick={() => setIsRoadmapOpen(false)}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-gray-300"
                >
                  ✕
                </Button>
              </div>

              <div className="text-gray-300 space-y-4 md:space-y-6">
                <section>
                  <h4 className="text-lg md:text-xl font-semibold text-white mb-3">Vision</h4>
                  <p className="text-sm md:text-base">
                    CR7BABY aims to become the leading football-themed meme coin in the crypto space, building a vibrant
                    community of football fans and crypto enthusiasts while delivering exceptional returns to early
                    supporters.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg md:text-xl font-semibold text-white mb-3">The Journey Ahead</h4>
                  <div className="space-y-3 md:space-y-4">
                    <div className="p-3 md:p-4 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-lg border border-red-500/30">
                      <h5 className="text-white font-semibold mb-2 text-sm md:text-base">
                        Phase 1: Pre-Launch (August 2025) 🚀
                      </h5>
                      <ul className="text-gray-300 space-y-1 text-xs md:text-sm">
                        <li>• Website and social media launch</li>
                        <li>• Community building on Telegram and Twitter</li>
                        <li>• Whitelist campaign</li>
                        <li>• Smart contract audit</li>
                      </ul>
                    </div>
                    <div className="p-3 md:p-4 bg-gradient-to-r from-yellow-600/20 to-white/20 rounded-lg border border-yellow-500/30">
                      <h5 className="text-white font-semibold mb-2 text-sm md:text-base">
                        Phase 2: Launch (September 2025) ⚽
                      </h5>
                      <ul className="text-gray-300 space-y-1 text-xs md:text-sm">
                        <li>• Presale on PinkSale</li>
                        <li>• PancakeSwap listing</li>
                        <li>• CoinGecko and CoinMarketCap listings</li>
                        <li>• First marketing campaign</li>
                      </ul>
                    </div>
                    <div className="p-3 md:p-4 bg-gradient-to-r from-red-600/20 to-white/20 rounded-lg border border-red-500/30">
                      <h5 className="text-white font-semibold mb-2 text-sm md:text-base">
                        Phase 3: Growth (Q4 2025) 🌱
                      </h5>
                      <ul className="text-gray-300 space-y-1 text-xs md:text-sm">
                        <li>• CEX listings</li>
                        <li>• CR7BABY NFT collection</li>
                        <li>• Staking platform launch</li>
                        <li>• Partnerships with football influencers</li>
                      </ul>
                    </div>
                    <div className="p-3 md:p-4 bg-gradient-to-r from-yellow-600/20 to-red-600/20 rounded-lg border border-yellow-500/30">
                      <h5 className="text-white font-semibold mb-2 text-sm md:text-base">
                        Phase 4: Expansion (Q1 2026) 🌍
                      </h5>
                      <ul className="text-gray-300 space-y-1 text-xs md:text-sm">
                        <li>• CR7BABY mobile app</li>
                        <li>• Football prediction game</li>
                        <li>• Major exchange listings</li>
                        <li>• Global marketing campaign</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-lg md:text-xl font-semibold text-white mb-3">Presale Benefits</h4>
                  <div className="bg-white/5 rounded-lg p-3 md:p-4">
                    <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                      <li>• 🏆 10% bonus tokens for whitelist participants</li>
                      <li>• ⚽ Guaranteed allocation in presale</li>
                      <li>• 💎 Early access to NFT collection</li>
                      <li>• 🎮 Priority access to staking platform</li>
                      <li>• 🌟 Exclusive community roles</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h4 className="text-lg md:text-xl font-semibold text-white mb-3">Disclaimer</h4>
                  <p className="text-xs md:text-sm text-gray-400">
                    CR7BABY is a meme coin with no intrinsic value or financial return expectation. This is not
                    financial advice. Cryptocurrency investments carry risk. Only invest what you can afford to lose.
                    Always do your own research before investing.
                  </p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
