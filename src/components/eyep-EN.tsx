import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Clock,
  Download,
  Coffee,
  Brain,
  MousePointer,
  Monitor,
  Timer,
  Focus,
  ArrowDown,
  Menu,
  X,
  Github,
  Twitter,
  ChevronDown,
  ChevronUp,
  ComputerIcon as Windows,
  Apple,
  Keyboard,
  Eye,
  EyeOff,
} from "lucide-react"

// ============= TYPES AND INTERFACES =============

type Emotion = "normal" | "angry" | "suspicious" | "sleeping"

interface DownloadButtonProps {
  platform: "windows" | "macos"
  large?: boolean
  megaLink?: string
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

interface FAQItemProps {
  question: string
  answer: string
}

interface FooterProps {
  onPrivacyClick: () => void
  onTermsClick: () => void
}

interface EyesComponentProps {
  emotion: Emotion
}

interface EyeProps {
  emotion: Emotion
  getPosition: (ref: HTMLDivElement | null) => { x: number; y: number }
  isLeftEye: boolean
  isMouseMoving: boolean
}

interface DownloadCounterProps {
  initialCount?: number
}

interface TransparentModeAnimationProps {
  isPlaying?: boolean
}

// ============= COMPONENTS =============

// DownloadCounter Component
function DownloadCounter ({ initialCount = 0 }: DownloadCounterProps) {
  const [downloadCount, setDownloadCount] = useState<number>(() => {
    // Verificar si estamos en un entorno de navegador
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("downloadCount");
      return savedCount ? parseInt(savedCount, 10) : initialCount;
    }
    return initialCount; // Valor predeterminado si no hay acceso a localStorage
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Incrementar el contador en 39 al cargar la página
      const newCount = downloadCount + 39;
      setDownloadCount(newCount);
      localStorage.setItem("downloadCount", newCount.toString());
    }

    // Simular carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []); // Solo se ejecuta al cargar la página

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-yellow-400/20">
      <div className="bg-yellow-400/20 p-3 rounded-full">
        <Download className="w-6 h-6 text-yellow-400" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-400">Total Downloads</h3>
        <p className="text-2xl font-bold text-yellow-400">
          {isLoading ? "Loading..." : new Intl.NumberFormat().format(downloadCount)}
        </p>
      </div>
    </div>
  );
}

// DownloadButton Component
function DownloadButton ({ platform, large = false, megaLink }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const isWindows = platform === "windows"

  const baseClasses = "flex items-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"

  // Improve contrast for macOS button
  const primaryClasses = "bg-black text-yellow-400 hover:bg-gray-900 border-2 border-yellow-400"
  const secondaryClasses = "bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-black"

  const sizeClasses = large ? "px-6 py-3 text-lg rounded-lg" : "px-4 py-2 text-sm rounded-md"

  const handleDownload = () => {
    setIsDownloading(true)

    // In a real implementation, you would log the download here

    // If there's a MEGA link, redirect after a short delay
    if (megaLink) {
      setTimeout(() => {
        window.location.href = megaLink

        // Reset state after another delay
        setTimeout(() => {
          setIsDownloading(false)
        }, 1000)
      }, 500)
    } else {
      // If there's no link, just reset state after a delay
      setTimeout(() => {
        setIsDownloading(false)
      }, 1500)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`
        ${baseClasses} 
        ${isWindows ? primaryClasses : secondaryClasses}
        ${sizeClasses}
        ${isDownloading ? "opacity-75 cursor-wait" : ""}
      `}
    >
      {isWindows ? <Windows size={large ? 24 : 18} /> : <Apple size={large ? 24 : 18} />}
      <span>{isDownloading ? "Downloading..." : isWindows ? "Windows 64-bit" : "macOS 64-bit"}</span>
    </button>
  )
}

// FeatureCard Component
function FeatureCard ({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-yellow-400/10 hover:border-yellow-400/30 group">
      <div className="bg-yellow-400/10 text-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-yellow-400/20 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-yellow-400 group-hover:text-yellow-300 transition-colors">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

// Modal Component
function Modal ({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      // Restore scrolling when modal is closed
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        ref={modalRef}
        className="bg-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-yellow-400">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">{children}</div>

        <div className="p-4 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// FAQItem Component
function FAQItem ({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-black/20 pb-4">
      <button className="flex items-center justify-between w-full text-left py-4" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl font-bold">{question}</h3>
        <span className="ml-2">{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
      </button>

      {isOpen && (
        <div className="mt-2 text-white/70">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

// Footer Component
function Footer ({ onPrivacyClick, onTermsClick }: FooterProps) {
  return (
    <footer className="bg-black text-white border-t border-yellow-400/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">EyeP</h3>
            <p className="text-gray-400 mb-4">
              A unique productivity app with eyes that follow your cursor and react when you're idle.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Mafifa/eyep" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://x.com/Mafifa_Charlys" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pomodoro" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Pomodoro
                </a>
              </li>
              <li>
                <a href="#psychology" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Psychology
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={onPrivacyClick} className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onTermsClick} className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Terms of Use
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EyeP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Navbar Component
function Navbar () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black/90 backdrop-blur-sm text-white py-4 border-b border-yellow-400/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src="../../../resources/eyep.png" alt="EyeP" width={40} height={40} className="rounded-md" />
            <span className="font-bold text-xl text-yellow-400">EyeP</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-yellow-400 transition-colors">
              Features
            </a>
            <a href="#pomodoro" className="hover:text-yellow-400 transition-colors">
              Pomodoro
            </a>
            <a href="#psychology" className="hover:text-yellow-400 transition-colors">
              Psychology
            </a>
            <a href="#demo" className="hover:text-yellow-400 transition-colors">
              Demo
            </a>
            <a href="#faq" className="hover:text-yellow-400 transition-colors">
              FAQ
            </a>
            <a
              href="#download"
              className="bg-yellow-400/80 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-medium transition-colors"
            >
              Download
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4">
            <a
              href="#features"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pomodoro"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pomodoro
            </a>
            <a
              href="#psychology"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Psychology
            </a>
            <a
              href="#demo"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Demo
            </a>
            <a
              href="#faq"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#download"
              className="bg-yellow-400/80 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-medium transition-colors inline-block w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              Download
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

// EyesComponent
function EyesComponent ({ emotion }: EyesComponentProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseTimerRef = useRef<number | null>(null)

  // Optimization: Reduce frequency of mouse tracking updates
  useEffect(() => {
    let lastUpdate = 0
    const updateInterval = 50 // ms between updates (20 fps instead of 60fps)

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < updateInterval) return

      lastUpdate = now

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
        setIsMouseMoving(true)

        if (mouseTimerRef.current) {
          clearTimeout(mouseTimerRef.current)
        }

        mouseTimerRef.current = setTimeout(() => {
          setIsMouseMoving(false)
        }, 3000)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current)
      }
    }
  }, [])

  // Optimization: Simplify eye position calculation
  const calculateEyePosition = (eyeRef: HTMLDivElement | null, isLeftEye: boolean) => {
    if (!eyeRef || !isMouseMoving) return { x: 0, y: 0 }

    const eyeRect = eyeRef.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 }

    const eyeCenterX = eyeRect.left - containerRect.left + eyeRect.width / 2
    const eyeCenterY = eyeRect.top - containerRect.top + eyeRect.height / 2

    // Calculate angle and distance
    const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX)

    // Simplified maximum distance
    let maxDistance = 10
    if (emotion === "sleeping") maxDistance = 0

    // Simplified distance calculation
    const distance = Math.min(maxDistance, Math.hypot(mousePosition.x - eyeCenterX, mousePosition.y - eyeCenterY) / 25)

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  }

  return (
    <div className="flex items-center justify-center" ref={containerRef} style={{ background: "transparent" }}>
      <div className="flex gap-8">
        {/* Left Eye */}
        <SingleEye
          emotion={emotion}
          getPosition={(ref) => calculateEyePosition(ref, true)}
          isLeftEye={true}
          isMouseMoving={isMouseMoving}
        />

        {/* Right Eye */}
        <SingleEye
          emotion={emotion}
          getPosition={(ref) => calculateEyePosition(ref, false)}
          isLeftEye={false}
          isMouseMoving={isMouseMoving}
        />
      </div>
    </div>
  )
}

// Eye Component (used by EyesComponent)
function SingleEye ({ emotion, getPosition, isLeftEye, isMouseMoving }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  // Update target position when mouse moves
  useEffect(() => {
    if (eyeRef.current) {
      const newPosition = getPosition(eyeRef.current)
      setTargetPosition(newPosition)
    }
  }, [getPosition, isMouseMoving])

  // Optimization: Use requestAnimationFrame for more efficient animation
  useEffect(() => {
    const animatePosition = () => {
      setPosition((prev) => {
        // If no movement, gradually return to center
        if (!isMouseMoving) {
          return {
            x: prev.x * 0.9,
            y: prev.y * 0.9,
          }
        }

        // Otherwise, move toward target position
        return {
          x: prev.x + (targetPosition.x - prev.x) * 0.2,
          y: prev.y + (targetPosition.y - prev.y) * 0.2,
        }
      })

      animationRef.current = requestAnimationFrame(animatePosition)
    }

    animationRef.current = requestAnimationFrame(animatePosition)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetPosition, isMouseMoving])

  // Simplified styles
  const getEyeContainerStyle = () => "relative w-24 h-24"

  const getEyeStyle = () => {
    const baseStyle = "absolute inset-0"

    switch (emotion) {
      case "angry":
        return `${baseStyle} bg-white border-red-500 border-4`
      case "suspicious":
        return `${baseStyle} bg-white border-amber-500 border-4`
      case "sleeping":
        return `${baseStyle} bg-white border-gray-400 border-4 rounded-full`
      default:
        return `${baseStyle} bg-white border-gray-800 border-4 rounded-full`
    }
  }

  const getPupilStyle = () => {
    switch (emotion) {
      case "angry":
        return "bg-red-900 w-8 h-8 rounded-full"
      case "suspicious":
        return "bg-amber-900 w-8 h-8 rounded-full"
      case "sleeping":
        return "bg-black w-8 h-8 rounded-full opacity-0"
      default:
        return "bg-black w-8 h-8 rounded-full"
    }
  }

  const getEmotionElements = () => {
    if (emotion === "sleeping") {
      return (
        <>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-400 border-b-2 border-gray-500 rounded-t-full z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-400 border-t-2 border-gray-500 rounded-b-full z-10"></div>
        </>
      )
    }
    return null
  }

  const getEyeShapeStyle = () => {
    if (emotion === "angry") {
      return isLeftEye
        ? {
          clipPath: "polygon(116% 84%, 0% 6%, 0% 100%, 100% 100%)",
          borderRadius: "0 0 10% 0",
          height: "100px",
          background: "white",
          border: "4px solid #ef4444",
        }
        : {
          clipPath: "polygon(-16% 84%, 100% 6%, 100% 100%, 0 100%)",
          borderRadius: "0 0 0 10%",
          height: "100px",
          background: "white",
          border: "4px solid #ef4444",
        }
    }

    if (emotion === "suspicious") {
      return {
        clipPath: "polygon(0 59%, 100% 59%, 100% 100%, 0% 100%)",
        borderRadius: "10px",
        height: "100px",
        background: "white",
        border: "5px solid #f59e0b",
        borderTop: "none",
      }
    }

    if (emotion === "sleeping") {
      return {
        borderRadius: "50%",
        height: "100px",
        background: "white",
        border: "4px solid #9ca3af",
      }
    }

    return {
      borderRadius: "50%",
      height: "100px",
      background: "white",
      border: "4px solid #1f2937",
    }
  }

  const getPupilVerticalOffset = () => {
    switch (emotion) {
      case "angry":
        return 8
      case "suspicious":
        return 12
      default:
        return 0
    }
  }

  return (
    <div ref={eyeRef} className={getEyeContainerStyle()}>
      <div className={getEyeStyle()} style={getEyeShapeStyle()}>
        {getEmotionElements()}

        <div
          className={`absolute ${getPupilStyle()}`}
          style={{
            top: `calc(50% + ${getPupilVerticalOffset()}px)`,
            left: "50%",
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
            transition: isMouseMoving ? "none" : "transform 0.5s ease-out",
            zIndex: 5,
          }}
        />
      </div>
    </div>
  )
}

// TransparentModeAnimation Component
function TransparentModeAnimation ({ isPlaying = true }: TransparentModeAnimationProps) {
  const [animationState, setAnimationState] = useState<"normal" | "transparent">("normal")
  const [showKeyPress, setShowKeyPress] = useState(false)
  const timerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isPlaying) return

    const animationInterval = setInterval(() => {
      setShowKeyPress(true)

      setTimeout(() => {
        setAnimationState("transparent")
        setShowKeyPress(false)

        setTimeout(() => {
          setAnimationState("normal")
        }, 3000)
      }, 1500)
    }, 6000)

    return () => clearInterval(animationInterval)
  }, [isPlaying])

  return (
    <div className="relative w-full h-[300px] bg-gray-900 rounded-lg overflow-hidden border border-yellow-400/20">
      {/* Desktop mockup */}
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="h-6 bg-gray-800 rounded-t-md flex items-center px-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        <div className="flex-1 bg-gray-800 p-3 relative">
          {/* Desktop content */}
          <div className="absolute inset-0 m-3 bg-gray-700 rounded">
            <div className="p-2 text-xs text-gray-300">
              <p>Document.txt - Notepad</p>
              <div className="mt-2 h-[180px] bg-white text-black p-2 rounded">
                <p className="text-sm">Project notes:</p>
                <p className="text-sm mt-1">- Complete the landing page design</p>
                <p className="text-sm">- Add transparent mode feature</p>
                <p className="text-sm">- Fix responsive layout issues</p>
                <p className="text-sm">- Update documentation</p>
              </div>
            </div>
          </div>

          {/* Pomodoro timer */}
          <div
            ref={timerRef}
            className={`absolute ${animationState === "transparent"
              ? "top-4 right-4 bg-black/40 backdrop-blur-sm pointer-events-none"
              : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900"
              } transition-all duration-700 p-4 rounded-lg border-2 border-yellow-400 shadow-lg`}
            style={{
              width: animationState === "transparent" ? "120px" : "200px",
              zIndex: 50,
            }}
          >
            <div className="text-center">
              <p
                className={`font-bold ${animationState === "transparent" ? "text-yellow-400 text-sm" : "text-yellow-400 text-xl"}`}
              >
                25:00
              </p>
              {animationState === "normal" && <p className="text-gray-300 text-xs mt-1">Focus Time</p>}
            </div>
          </div>

          {/* Keyboard shortcut overlay */}
          {showKeyPress && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 px-4 py-2 rounded-lg z-50 flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-mono">Ctrl + P</span>
            </div>
          )}

          {/* Click-through indicator (only in transparent mode) */}
          {animationState === "transparent" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <div className="relative">
                <MousePointer className="w-6 h-6 text-white animate-pulse" />
                <div className="absolute w-8 h-8 bg-yellow-400/30 rounded-full -inset-1 animate-ping"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============= MAIN COMPONENT =============

export default function EyePLandingPage () {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  // MEGA links for downloads
  const windowsMegaLink = "https://mega.nz/file/5hl30KgY#uTuqHyFcl3wwzRnFzvR8ghRraBzfBv5czN0nNyAK2xY"
  const macosMegaLink = "https://mega.nz/file/59lSAKhC#rR0CuKSeopDBrhU_FK52CQi8J6rF2opWQEq11s9jhk0"

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <Navbar />

      {/* Hero Section with Integrated Download */}
      <section id="hero" className="relative overflow-hidden py-20 md:py-32">
        {/* Enhanced background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_0%,#111_50%,#000_100%)] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 text-center md:text-left">
              <div className="inline-block bg-yellow-400/80 text-black px-4 py-1 rounded-full text-sm font-bold mb-6">
                FOCUS LIKE NEVER BEFORE
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                <span className="block text-white">Boost your productivity with</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                  EyeP
                </span>
              </h1>

              <p className="text-xl mb-8 text-gray-300 max-w-xl mx-auto md:mx-0">
                A funny Pomodoro app that watches you while you work, adapting to your pace and keeping your
                focus on what truly matters.
              </p>

              {/* Download counter */}
              <div className="flex justify-center md:justify-start mb-8">
                <DownloadCounter initialCount={1458} />
              </div>

              {/* Download buttons integrated in hero */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                <DownloadButton platform="windows" large megaLink={windowsMegaLink} />
                <DownloadButton platform="macos" large megaLink={macosMegaLink} />
              </div>

              {/* See more link */}
              <div className="hidden md:flex items-center justify-start mt-12">
                <a
                  href="#features"
                  className="flex flex-col items-center text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <span className="mb-2">Discover more</span>
                  <ArrowDown className="animate-bounce" />
                </a>
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <div className="relative h-[400px] w-full flex items-center justify-center">
                <div className="relative">
                  <img
                    src="../../../resources/eyep.png"
                    alt="EyeP Icon"
                    width={240}
                    height={240}
                    className="animate-float drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section - Now before Pomodoro Technique */}
      <section
        id="features"
        className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-b border-yellow-400/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">Main Features</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
            EyeP combines the Pomodoro technique with unique visual tracking to maximize your productivity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Clock className="w-10 h-10" />}
              title="Pomodoro Timer"
              description="Manage your time with work and break intervals to maximize your productivity."
            />
            <FeatureCard
              icon={<MousePointer className="w-10 h-10" />}
              title="Interactive Eye Tracking"
              description="Eyes that follow your cursor and change emotion when you're idle."
            />
            <FeatureCard
              icon={<Brain className="w-10 h-10" />}
              title="Multiple Emotions"
              description="Eyes express different emotions: normal, angry, suspicious, and sleeping."
            />
            <FeatureCard
              icon={<Coffee className="w-10 h-10" />}
              title="Break Reminders"
              description="Alerts you when it's time to take a break to keep your mind fresh."
            />
            <FeatureCard
              icon={<Monitor className="w-10 h-10" />}
              title="Desktop Application"
              description="Available for Windows and macOS, no browser needed."
            />
            <FeatureCard
              icon={<Keyboard className="w-10 h-10" />}
              title="Transparent Mode"
              description="Press Ctrl+P to make the timer transparent and fixed on screen, allowing clicks to pass through."
            />
          </div>

          {/* Transparent Mode Feature Highlight */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Transparent Mode</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-yellow-400/20 p-2 rounded-full">
                      <Keyboard className="w-5 h-5 text-yellow-400" />
                    </div>
                    <p className="text-lg font-semibold text-white">Ctrl + P Shortcut</p>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Press <span className="bg-gray-700 px-2 py-1 rounded text-sm font-mono">Ctrl + P</span> to toggle
                    transparent mode. The timer becomes:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-yellow-400">
                        <Eye className="w-4 h-4" />
                      </div>
                      <span>Transparent and smaller, staying out of your way</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-yellow-400">
                        <EyeOff className="w-4 h-4" />
                      </div>
                      <span>Click-through, allowing you to interact with content behind it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-yellow-400">
                        <Focus className="w-4 h-4" />
                      </div>
                      <span>Fixed on screen, always visible no matter what app you're using</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <TransparentModeAnimation />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pomodoro Technique Section */}
      <section
        id="pomodoro"
        className="py-20 bg-gradient-to-r from-yellow-500/10 via-yellow-400/20 to-yellow-500/10 border-t border-b border-yellow-400/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">The Pomodoro Technique</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
            A proven method to improve focus and productivity through targeted work cycles and strategic breaks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-900 p-8 rounded-xl relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Choose a Task
                </h3>
                <p className="text-gray-300">
                  Select the task you want to work on and set the Pomodoro timer (25 minutes).
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-xl mt-12 relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Take a Break
                </h3>
                <p className="text-gray-300">
                  When the alarm rings, take a short break (5 minutes) to refresh your mind.
                </p>
              </div>
            </div>

            <div className="mt-12 md:mt-0">
              <div className="bg-gray-900 p-8 rounded-xl relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Work Focused
                </h3>
                <p className="text-gray-300">
                  Work on the task until the timer rings. Avoid distractions and maintain your focus.
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-xl mt-12 relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Repeat the Cycle
                </h3>
                <p className="text-gray-300">
                  After 4 pomodoros, take a longer break (15-30 minutes) to recharge your energy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Psychological Impact Section */}
      <section id="psychology" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-yellow-400">The Psychological Impact</h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-gray-300">
            The science behind why being watched while you work can significantly increase your productivity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Focus className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Hawthorne Effect
              </h3>
              <p className="text-gray-300">
                People tend to improve their behavior when they know they're being observed. Our app simulates this
                feeling to boost your performance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Brain className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Visual Accountability
              </h3>
              <p className="text-gray-300">
                The eyes that follow you create a sense of accountability, as if someone is overseeing your work,
                keeping you focused on your tasks.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Timer className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Emotional Feedback
              </h3>
              <p className="text-gray-300">
                The different emotions of the eyes provide feedback on your work behavior, helping you maintain a
                consistent pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section - Optimized for large screens */}
      <section id="demo" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-yellow-400">Try the Interaction</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-300">
            Move your cursor over the eyes and observe how they follow you. Each pair of eyes has a different emotion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="normal" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Normal</p>
              <p className="text-gray-400 text-sm">Attentive eyes that follow your cursor with curiosity.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="angry" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Angry</p>
              <p className="text-gray-400 text-sm">Eyes that express frustration when you're not being productive.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="suspicious" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Suspicious</p>
              <p className="text-gray-400 text-sm">Eyes that doubt your commitment to the task.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="sleeping" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Sleeping</p>
              <p className="text-gray-400 text-sm">Eyes that close when you've been inactive for a while.</p>
            </div>
          </div>

          {/* Extra large screen version */}
          <div className="hidden 2xl:block mt-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Real-time Interaction</h3>
              <p className="text-gray-300 mb-8">
                Move your cursor around the screen and observe how the eyes follow you. This visual tracking technology
                is the foundation of EyeP.
              </p>

              <div className="grid grid-cols-4 gap-12 items-center">
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="normal" />
                  <p className="mt-2 text-yellow-400">Normal</p>
                </div>
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="angry" />
                  <p className="mt-2 text-yellow-400">Angry</p>
                </div>
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="suspicious" />
                  <p className="mt-2 text-yellow-400">Suspicious</p>
                </div>
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="sleeping" />
                  <p className="mt-2 text-yellow-400">Sleeping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-b border-yellow-400/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">Frequently Asked Questions</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
            Everything you need to know about EyeP and how it can help improve your productivity.
          </p>

          <div className="max-w-3xl mx-auto space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-yellow-400/20">
            <FAQItem
              question="How exactly does the eye tracking work?"
              answer="The eye tracking is a visual component that follows your cursor movement. The eyes change emotion based on your activity level, providing visual feedback on your work behavior."
            />

            <FAQItem
              question="Can I customize the Pomodoro times?"
              answer="Yes, you can adjust the duration of work and break intervals according to your personal preferences from the app settings."
            />

            <FAQItem
              question="How does the transparent mode work?"
              answer="Press Ctrl+P to toggle transparent mode. The timer becomes smaller, transparent, and click-through, allowing you to see and interact with content behind it while still keeping track of your time."
            />

            <FAQItem
              question="Does the app work offline?"
              answer="Yes, EyeP is a desktop application that works completely offline. Once installed, you don't need internet to use it."
            />

            <FAQItem
              question="Does it consume a lot of system resources?"
              answer="No, the application is optimized to consume minimal resources. You can work with other applications open without noticing any system slowdown."
            />

            <FAQItem
              question="Are there plans for mobile versions?"
              answer="We're currently focused on perfecting the desktop versions, but we're considering developing iOS and Android versions in the future."
            />

            <FAQItem
              question="How do I report a bug or suggest a feature?"
              answer="You can email us at support@eyep.com or use the bug reporting feature in the app from the settings menu."
            />
          </div>
        </div>
      </section>

      {/* Download Section - Now with download counter */}
      <section id="download" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-8">
            <img
              src="../../../resources/eyep.png"
              alt="EyeP Icon"
              width={120}
              height={120}
              className="rounded-xl drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
            />
          </div>

          <h2 className="text-4xl font-bold mb-6 text-yellow-400">Download EyeP Now</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
            Available for Windows and macOS. Download and install in seconds and start improving your productivity
            today.
          </p>

          {/* Download counter */}
          <div className="flex justify-center mb-10">
            <DownloadCounter initialCount={1458} />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <DownloadButton platform="windows" large megaLink={windowsMegaLink} />
            <DownloadButton platform="macos" large megaLink={macosMegaLink} />
          </div>
        </div>
      </section>

      <Footer onPrivacyClick={() => setShowPrivacyModal(true)} onTermsClick={() => setShowTermsModal(true)} />

      {/* Modals */}
      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} title="Privacy Policy">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">1. Information We Collect</h3>
          <p>
            EyeP does not collect any personally identifiable information. The application works completely offline and
            doesn't send data to external servers.
          </p>

          <h3 className="text-lg font-bold">2. Use of Information</h3>
          <p>
            As we don't collect information, there is no use of personal data. All usage statistics are stored locally
            on your device.
          </p>

          <h3 className="text-lg font-bold">3. Cookies and Similar Technologies</h3>
          <p>The desktop application does not use cookies or tracking technologies.</p>

          <h3 className="text-lg font-bold">4. Information Sharing</h3>
          <p>We do not share any information with third parties, as we don't collect user data.</p>

          <h3 className="text-lg font-bold">5. Security</h3>
          <p>We are committed to ensuring the security of our application through regular security updates.</p>

          <h3 className="text-lg font-bold">6. Changes to This Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page.
          </p>

          <h3 className="text-lg font-bold">7. Contact</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at: privacy@eyep.com</p>
        </div>
      </Modal>

      <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} title="Terms of Use">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">1. Acceptance of Terms</h3>
          <p>By downloading, installing, or using EyeP, you agree to these Terms of Use in their entirety.</p>

          <h3 className="text-lg font-bold">2. License to Use</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable license to download, install, and use the
            application for your personal, non-commercial use.
          </p>

          <h3 className="text-lg font-bold">3. Restrictions</h3>
          <p>
            You may not: (a) modify, decompile, or reverse engineer the application; (b) rent, lease, sell,
            redistribute, or sublicense the application; (c) use the application for any illegal purposes.
          </p>

          <h3 className="text-lg font-bold">4. Updates</h3>
          <p>
            The application may automatically update from time to time to improve performance, enhance functionality, or
            fix bugs.
          </p>

          <h3 className="text-lg font-bold">5. Intellectual Property</h3>
          <p>
            The application and all of its content, features, and functionality are owned by EyeP and are protected by
            intellectual property laws.
          </p>

          <h3 className="text-lg font-bold">6. Termination</h3>
          <p>
            We may terminate or suspend your access to the application immediately, without prior notice, for any reason
            whatsoever, including if you breach these Terms.
          </p>

          <h3 className="text-lg font-bold">7. Limitation of Liability</h3>
          <p>
            In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages.
          </p>

          <h3 className="text-lg font-bold">8. Changes to Terms</h3>
          <p>
            We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new
            Terms on this page.
          </p>

          <h3 className="text-lg font-bold">9. Contact</h3>
          <p>If you have any questions about these Terms, please contact us at: terms@eyep.com</p>
        </div>
      </Modal>
    </div>
  )
}

