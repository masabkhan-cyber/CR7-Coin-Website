"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Rocket } from "lucide-react"

interface ChartPoint {
  time: number
  price: number
  signal?: {
    type: "LAUNCH" | "PUMP"
    reason: string
    confidence: number
  }
}

const generateProjectedData = (): ChartPoint[] => {
  const data: ChartPoint[] = []
  let price = 0.000007 // Starting price for CR7BABY

  for (let i = 0; i < 40; i++) {
    // More volatile movement for meme coin with strong upward bias
    const change = (Math.random() - 0.2) * 0.000001
    price = Math.max(price + change, 0.000001)

    const point: ChartPoint = {
      time: i,
      price: Number(price.toFixed(9)),
    }

    // Add projected signals
    if (i === 0 || i === 7 || i === 17 || i === 27 || i === 37) {
      const isLaunch = i === 0

      point.signal = {
        type: isLaunch ? "LAUNCH" : "PUMP",
        reason: isLaunch
          ? "CR7BABY launches on PancakeSwap! 🚀"
          : [
              "Major marketing campaign begins! 📈",
              "Influencer partnership announced! 🌟",
              "CoinGecko listing confirmed! 🦎",
              "CEX listing imminent! 💎",
            ][Math.floor(Math.random() * 4)],
        confidence: Math.floor(Math.random() * 10) + 90, // Very high confidence
      }
    }

    data.push(point)
  }

  return data
}

export default function TradingChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState<ChartPoint[]>(generateProjectedData())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showSignals, setShowSignals] = useState(false)
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0)
  const [activeSignal, setActiveSignal] = useState<ChartPoint | null>(null)

  useEffect(() => {
    // Phase 1: Draw the line quickly
    const lineInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1
        if (next >= data.length) {
          clearInterval(lineInterval)
          setTimeout(() => {
            setShowSignals(true)
          }, 500)
          return data.length - 1
        }
        return next
      })
    }, 120) // Faster for meme coin excitement

    return () => clearInterval(lineInterval)
  }, [data])

  useEffect(() => {
    if (!showSignals) return

    const signalPoints = data.filter((point) => point.signal)

    if (currentSignalIndex < signalPoints.length) {
      const timer = setTimeout(() => {
        const signal = signalPoints[currentSignalIndex]
        setActiveSignal(signal)

        setTimeout(() => {
          setCurrentSignalIndex((prev) => prev + 1)
        }, 2500) // Shorter display time for excitement
      }, 800)

      return () => clearTimeout(timer)
    } else {
      setTimeout(() => {
        setData(generateProjectedData())
        setCurrentIndex(0)
        setShowSignals(false)
        setCurrentSignalIndex(0)
        setActiveSignal(null)
      }, 1500)
    }
  }, [showSignals, currentSignalIndex, data])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const visibleData = data.slice(0, currentIndex + 1)
    if (visibleData.length < 2) return

    const maxPrice = Math.max(...data.map((d) => d.price))
    const minPrice = Math.min(...data.map((d) => d.price))
    const priceRange = maxPrice - minPrice || 0.000001

    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Draw grid
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 0.5
    ctx.setLineDash([3, 3])

    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()
    }

    ctx.setLineDash([])

    // Draw price line with CR7 colors
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    for (let i = 1; i < visibleData.length; i++) {
      const prevPoint = visibleData[i - 1]
      const currentPoint = visibleData[i]

      const prevX = padding + ((i - 1) / (data.length - 1)) * chartWidth
      const prevY = padding + chartHeight - ((prevPoint.price - minPrice) / priceRange) * chartHeight
      const currentX = padding + (i / (data.length - 1)) * chartWidth
      const currentY = padding + chartHeight - ((currentPoint.price - minPrice) / priceRange) * chartHeight

      // CR7 themed colors
      if (currentPoint.price > prevPoint.price) {
        ctx.strokeStyle = "#EAB308" // Gold for up
      } else if (currentPoint.price < prevPoint.price) {
        ctx.strokeStyle = "#EF4444" // Red for down
      } else {
        ctx.strokeStyle = "#FFFFFF" // White for no change
      }

      ctx.beginPath()
      ctx.moveTo(prevX, prevY)
      ctx.lineTo(currentX, currentY)
      ctx.stroke()
    }

    // Draw signal markers
    if (showSignals) {
      const signalPoints = data.filter((point) => point.signal)
      const visibleSignals = signalPoints.slice(0, currentSignalIndex + (activeSignal ? 1 : 0))

      visibleSignals.forEach((point) => {
        const index = data.findIndex((d) => d === point)
        const x = padding + (index / (data.length - 1)) * chartWidth
        const y = padding + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight

        const isActive = point === activeSignal
        const radius = isActive ? 14 : 12

        // Signal colors
        ctx.fillStyle = point.signal!.type === "LAUNCH" ? "#EF4444" : "#EAB308"
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.fill()

        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = isActive ? 4 : 3
        ctx.stroke()

        // Signal text
        ctx.fillStyle = "#FFFFFF"
        ctx.font = `bold ${isActive ? 14 : 12}px Arial`
        ctx.textAlign = "center"
        ctx.shadowColor = "#000000"
        ctx.shadowBlur = 3
        ctx.fillText(point.signal!.type, x, y - (isActive ? 25 : 20))
        ctx.shadowBlur = 0
      })
    }

    // Current price line
    if (visibleData.length > 0) {
      const currentPrice = visibleData[visibleData.length - 1].price
      const y = padding + chartHeight - ((currentPrice - minPrice) / priceRange) * chartHeight

      ctx.strokeStyle = "#EAB308"
      ctx.lineWidth = 2
      ctx.setLineDash([6, 3])
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()
      ctx.setLineDash([])

      // Price label
      ctx.fillStyle = "#EAB308"
      ctx.fillRect(canvas.width - padding - 90, y - 12, 85, 18)
      ctx.fillStyle = "#000000"
      ctx.font = "bold 10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(`$${currentPrice.toFixed(9)}`, canvas.width - padding - 47, y - 1)
    }
  }, [data, currentIndex, showSignals, currentSignalIndex, activeSignal])

  const maxPrice = Math.max(...data.map((d) => d.price))
  const minPrice = Math.min(...data.map((d) => d.price))
  const signalCount = data.filter((d) => d.signal).length

  // Get current signal for display
  const signalPoints = data.filter((point) => point.signal)
  const currentSignal =
    activeSignal || (signalPoints.length > 0 ? signalPoints[Math.max(0, currentSignalIndex - 1)] : null)

  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Rocket className="w-6 h-6 text-yellow-400" />
          CR7BABY Projected Price Chart (Post-Launch)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="h-80 bg-slate-900/50 rounded-lg p-4 relative overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />

            {/* Status indicator */}
            <div className="absolute top-4 left-4 bg-black/60 rounded-lg p-2">
              <div className="text-white text-sm">
                {!showSignals ? "Projecting Growth..." : activeSignal ? "Milestone Alert!" : "Projection Complete"}
              </div>
            </div>

            {/* Current price indicator */}
            {currentIndex > 0 && (
              <div className="absolute top-4 right-4 bg-black/60 rounded-lg p-2">
                <div className="text-white font-bold text-lg">${data[currentIndex]?.price.toFixed(9)}</div>
                <div className="text-gray-400 text-sm">Projected Price</div>
              </div>
            )}
          </div>

          {/* Signal Display - Always visible, content slides */}
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-red-600/20 to-yellow-600/20 border border-red-500/30 min-h-[100px] overflow-hidden">
            {currentSignal ? (
              <motion.div
                key={`signal-${currentSignalIndex}`}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <Badge
                    variant="default"
                    className={`${
                      currentSignal.signal?.type === "LAUNCH" ? "bg-red-600" : "bg-yellow-600"
                    } text-white px-3 py-1 w-fit`}
                  >
                    {currentSignal.signal?.type === "LAUNCH" ? (
                      <Rocket className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    )}
                    {currentSignal.signal?.type}!
                  </Badge>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="text-white font-semibold text-sm sm:text-base break-all">
                      ${currentSignal.price.toFixed(9)}
                    </div>
                    <div className="text-white text-sm sm:text-base">
                      <span className="hidden sm:inline">Confidence: </span>
                      <span className="sm:hidden">Conf: </span>
                      {currentSignal.signal?.confidence}%
                    </div>
                  </div>
                </div>
                <div className="text-gray-300 text-sm sm:text-base">
                  <strong>Projection:</strong> {currentSignal.signal?.reason}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center h-full"
              >
                <div className="text-gray-400 text-center">
                  <div className="text-lg font-semibold mb-2">Waiting for signals...</div>
                  <div className="text-sm">Chart analysis in progress</div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Statistics - Always visible, content slides */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-3 text-center overflow-hidden">
              <motion.div
                key={`stat-high-${data.length}`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-gray-400 text-xs sm:text-sm">Projected High</div>
                <div className="text-white font-bold text-sm sm:text-base break-all leading-tight px-1">
                  ${maxPrice.toFixed(9)}
                </div>
              </motion.div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center overflow-hidden">
              <motion.div
                key={`stat-launch-${data.length}`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-gray-400 text-xs sm:text-sm">Launch Price</div>
                <div className="text-white font-bold text-sm sm:text-base break-all leading-tight px-1">$0.000007</div>
              </motion.div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center overflow-hidden">
              <motion.div
                key={`stat-events-${data.length}`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="text-gray-400 text-xs sm:text-sm">Growth Events</div>
                <div className="text-white font-bold text-sm sm:text-base">{signalCount}</div>
              </motion.div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
