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
  Instagram,
  ChevronDown,
  ChevronUp,
  ComputerIcon as Windows,
  Apple,
} from "lucide-react"

// ============= TYPES ET INTERFACES =============

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

// ============= COMPOSANTS =============

// Composant DownloadCounter
function DownloadCounter ({ initialCount = 0 }: DownloadCounterProps) {
  const [downloadCount, setDownloadCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setDownloadCount(initialCount)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [initialCount])

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-yellow-400/20">
      <div className="bg-yellow-400/20 p-3 rounded-full">
        <Download className="w-6 h-6 text-yellow-400" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-400">Téléchargements Totaux</h3>
        <p className="text-2xl font-bold text-yellow-400">
          {isLoading ? "Chargement..." : new Intl.NumberFormat().format(downloadCount)}
        </p>
      </div>
    </div>
  )
}

// Composant DownloadButton
function DownloadButton ({ platform, large = false, megaLink }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const isWindows = platform === "windows"

  const baseClasses = "flex items-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"

  // Améliorer le contraste pour le bouton macOS
  const primaryClasses = "bg-black text-yellow-400 hover:bg-gray-900 border-2 border-yellow-400"
  const secondaryClasses = "bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-black"

  const sizeClasses = large ? "px-6 py-3 text-lg rounded-lg" : "px-4 py-2 text-sm rounded-md"

  const handleDownload = () => {
    setIsDownloading(true)

    // Dans une implémentation réelle, vous enregistreriez le téléchargement ici

    // S'il y a un lien MEGA, rediriger après un court délai
    if (megaLink) {
      setTimeout(() => {
        window.location.href = megaLink

        // Réinitialiser l'état après un autre délai
        setTimeout(() => {
          setIsDownloading(false)
        }, 1000)
      }, 500)
    } else {
      // S'il n'y a pas de lien, simplement réinitialiser l'état après un délai
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
      <span>{isDownloading ? "Téléchargement..." : isWindows ? "Windows 64-bit" : "macOS 64-bit"}</span>
    </button>
  )
}

// Composant FeatureCard
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

// Composant Modal
function Modal ({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Fermer la modal en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Empêcher le défilement lorsque la modal est ouverte
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      // Restaurer le défilement lorsque la modal est fermée
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Fermer la modal en appuyant sur la touche Échap
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
            <span className="sr-only">Fermer</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">{children}</div>

        <div className="p-4 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

// Composant FAQItem
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

// Composant Footer
function Footer ({ onPrivacyClick, onTermsClick }: FooterProps) {
  return (
    <footer className="bg-black text-white border-t border-yellow-400/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">EyeP</h3>
            <p className="text-gray-400 mb-4">
              Une application de productivité unique avec des yeux qui suivent votre curseur et réagissent lorsque vous
              êtes inactif.
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
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#pomodoro" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Pomodoro
                </a>
              </li>
              <li>
                <a href="#psychology" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Psychologie
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Démo
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
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={onPrivacyClick} className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Politique de Confidentialité
                </button>
              </li>
              <li>
                <button onClick={onTermsClick} className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Conditions d'Utilisation
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
          <p>&copy; {new Date().getFullYear()} EyeP. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

// Composant Navbar
function Navbar () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black/90 backdrop-blur-sm text-white py-4 border-b border-yellow-400/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="../../../resources/eyep.png" alt="EyeP" width={40} height={40} className="rounded-md" />
            <span className="font-bold text-xl text-yellow-400">EyeP</span>
          </a>

          {/* Navigation Bureau */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#pomodoro" className="hover:text-yellow-400 transition-colors">
              Pomodoro
            </a>
            <a href="#psychology" className="hover:text-yellow-400 transition-colors">
              Psychologie
            </a>
            <a href="#features" className="hover:text-yellow-400 transition-colors">
              Fonctionnalités
            </a>
            <a href="#demo" className="hover:text-yellow-400 transition-colors">
              Démo
            </a>
            <a href="#faq" className="hover:text-yellow-400 transition-colors">
              FAQ
            </a>
            <a
              href="#download"
              className="bg-yellow-400/80 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-medium transition-colors"
            >
              Télécharger
            </a>
          </nav>

          {/* Bouton Menu Mobile */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4">
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
              Psychologie
            </a>
            <a
              href="#features"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Fonctionnalités
            </a>
            <a
              href="#demo"
              className="hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Démo
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
              Télécharger
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

// Composant EyesComponent
function EyesComponent ({ emotion }: EyesComponentProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseTimerRef = useRef(null)

  // Optimisation : Réduire la fréquence de mise à jour du suivi de la souris
  useEffect(() => {
    let lastUpdate = 0
    const updateInterval = 50 // ms entre les mises à jour (20 fps au lieu de 60fps)

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

  // Optimisation : Simplifier le calcul de la position de l'œil
  const calculateEyePosition = (eyeRef: HTMLDivElement | null, isLeftEye: boolean) => {
    if (!eyeRef || !isMouseMoving) return { x: 0, y: 0 }

    const eyeRect = eyeRef.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 }

    const eyeCenterX = eyeRect.left - containerRect.left + eyeRect.width / 2
    const eyeCenterY = eyeRect.top - containerRect.top + eyeRect.height / 2

    // Calculer l'angle et la distance
    const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX)

    // Distance maximale simplifiée
    let maxDistance = 10
    if (emotion === "sleeping") maxDistance = 0

    // Calcul de distance simplifié
    const distance = Math.min(maxDistance, Math.hypot(mousePosition.x - eyeCenterX, mousePosition.y - eyeCenterY) / 25)

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  }

  return (
    <div className="flex items-center justify-center" ref={containerRef} style={{ background: "transparent" }}>
      <div className="flex gap-8">
        {/* Œil Gauche */}
        <Eye
          emotion={emotion}
          getPosition={(ref) => calculateEyePosition(ref, true)}
          isLeftEye={true}
          isMouseMoving={isMouseMoving}
        />

        {/* Œil Droit */}
        <Eye
          emotion={emotion}
          getPosition={(ref) => calculateEyePosition(ref, false)}
          isLeftEye={false}
          isMouseMoving={isMouseMoving}
        />
      </div>
    </div>
  )
}

// Composant Eye (utilisé par EyesComponent)
function Eye ({ emotion, getPosition, isLeftEye, isMouseMoving }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  // Mettre à jour la position cible lorsque la souris bouge
  useEffect(() => {
    if (eyeRef.current) {
      const newPosition = getPosition(eyeRef.current)
      setTargetPosition(newPosition)
    }
  }, [getPosition, isMouseMoving])

  // Optimisation : Utiliser requestAnimationFrame pour une animation plus efficace
  useEffect(() => {
    const animatePosition = () => {
      setPosition((prev) => {
        // Si pas de mouvement, revenir progressivement au centre
        if (!isMouseMoving) {
          return {
            x: prev.x * 0.9,
            y: prev.y * 0.9,
          }
        }

        // Sinon, se déplacer vers la position cible
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

  // Styles simplifiés
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

// ============= COMPOSANT PRINCIPAL =============

export default function EyePLandingPageFR () {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  // Liens MEGA pour les téléchargements
  const windowsMegaLink = "https://mega.nz/file/k10XnLoY#gjc1mYuVAwwZKU7VNHSlMPyWpqXW2PRJkdKo31wkwgw"
  const macosMegaLink = "https://mega.nz/file/1g1FnLRT#mqI9Q-YXnRvfkpSLwhYjBC_sRbMcuUhVLl6Rro89u8M"

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <Navbar />

      {/* Section Héro avec Téléchargement Intégré */}
      <section id="hero" className="relative overflow-hidden py-20 md:py-32">
        {/* Fond amélioré */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_0%,#111_50%,#000_100%)] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 text-center md:text-left">
              <div className="inline-block bg-yellow-400/80 text-black px-4 py-1 rounded-full text-sm font-bold mb-6">
                CONCENTREZ-VOUS COMME JAMAIS AUPARAVANT
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                <span className="block text-white">Augmentez votre productivité avec</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                  EyeP
                </span>
              </h1>

              <p className="text-xl mb-8 text-gray-300 max-w-xl mx-auto md:mx-0">
                Une application Pomodoro révolutionnaire qui vous observe pendant que vous travaillez, s'adaptant à
                votre rythme et gardant votre attention sur ce qui compte vraiment.
              </p>

              {/* Compteur de téléchargements */}
              <div className="flex justify-center md:justify-start mb-8">
                <DownloadCounter initialCount={1458} />
              </div>

              {/* Boutons de téléchargement intégrés dans le héro */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                <DownloadButton platform="windows" large megaLink={windowsMegaLink} />
                <DownloadButton platform="macos" large megaLink={macosMegaLink} />
              </div>

              {/* Lien pour voir plus */}
              <div className="hidden md:flex items-center justify-start mt-12">
                <a
                  href="#pomodoro"
                  className="flex flex-col items-center text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <span className="mb-2">Découvrir plus</span>
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

      {/* Section Technique Pomodoro */}
      <section
        id="pomodoro"
        className="py-20 bg-gradient-to-r from-yellow-500/10 via-yellow-400/20 to-yellow-500/10 border-t border-b border-yellow-400/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">La Technique Pomodoro</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
            Une méthode éprouvée pour améliorer la concentration et la productivité grâce à des cycles de travail ciblés
            et des pauses stratégiques.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-900 p-8 rounded-xl relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Choisissez une Tâche
                </h3>
                <p className="text-gray-300">
                  Sélectionnez la tâche sur laquelle vous souhaitez travailler et réglez le minuteur Pomodoro (25
                  minutes).
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-xl mt-12 relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Prenez une Pause
                </h3>
                <p className="text-gray-300">
                  Lorsque l'alarme sonne, prenez une courte pause (5 minutes) pour rafraîchir votre esprit.
                </p>
              </div>
            </div>

            <div className="mt-12 md:mt-0">
              <div className="bg-gray-900 p-8 rounded-xl relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Travaillez Concentré
                </h3>
                <p className="text-gray-300">
                  Travaillez sur la tâche jusqu'à ce que le minuteur sonne. Évitez les distractions et maintenez votre
                  concentration.
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-xl mt-12 relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Répétez le Cycle
                </h3>
                <p className="text-gray-300">
                  Après 4 pomodoros, prenez une pause plus longue (15-30 minutes) pour recharger vos énergies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Impact Psychologique */}
      <section id="psychology" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-yellow-400">L'Impact Psychologique</h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-gray-300">
            La science qui explique pourquoi être observé pendant que vous travaillez peut augmenter significativement
            votre productivité.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Focus className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Effet Hawthorne
              </h3>
              <p className="text-gray-300">
                Les personnes ont tendance à améliorer leur comportement lorsqu'elles savent qu'elles sont observées.
                Notre application simule cette sensation pour augmenter vos performances.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Brain className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Responsabilité Visuelle
              </h3>
              <p className="text-gray-300">
                Les yeux qui vous suivent créent un sentiment de responsabilité, comme si quelqu'un supervisait votre
                travail, ce qui vous maintient concentré sur vos tâches.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Timer className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Retour Émotionnel
              </h3>
              <p className="text-gray-300">
                Les différentes émotions des yeux vous fournissent un retour sur votre comportement de travail, vous
                aidant à maintenir un rythme constant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités - Améliorée */}
      <section
        id="features"
        className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-b border-yellow-400/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">Fonctionnalités Principales</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
            EyeP combine la technique Pomodoro avec un suivi visuel unique pour maximiser votre productivité.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Clock className="w-10 h-10" />}
              title="Minuteur Pomodoro"
              description="Gérez votre temps avec des intervalles de travail et de pause pour maximiser votre productivité."
            />
            <FeatureCard
              icon={<MousePointer className="w-10 h-10" />}
              title="Suivi Oculaire Interactif"
              description="Des yeux qui suivent votre curseur et changent d'émotion lorsque vous êtes inactif."
            />
            <FeatureCard
              icon={<Brain className="w-10 h-10" />}
              title="Émotions Multiples"
              description="Les yeux expriment différentes émotions : normal, en colère, suspicieux et endormi."
            />
            <FeatureCard
              icon={<Coffee className="w-10 h-10" />}
              title="Rappels de Pause"
              description="Vous avertit quand il est temps de prendre une pause pour garder votre esprit frais."
            />
            <FeatureCard
              icon={<Monitor className="w-10 h-10" />}
              title="Application de Bureau"
              description="Disponible pour Windows et macOS, sans besoin de navigateur."
            />
            <FeatureCard
              icon={<Download className="w-10 h-10" />}
              title="Installation Simple"
              description="Téléchargez et installez en quelques secondes, sans configurations compliquées."
            />
          </div>
        </div>
      </section>

      {/* Section Démo Interactive - Optimisée pour grands écrans */}
      <section id="demo" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-yellow-400">Essayez l'Interaction</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-300">
            Déplacez votre curseur sur les yeux et observez comment ils vous suivent. Chaque paire d'yeux a une émotion
            différente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="normal" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Normal</p>
              <p className="text-gray-400 text-sm">Des yeux attentifs qui suivent votre curseur avec curiosité.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="angry" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">En Colère</p>
              <p className="text-gray-400 text-sm">
                Des yeux qui expriment de la frustration lorsque vous n'êtes pas productif.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="suspicious" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Suspicieux</p>
              <p className="text-gray-400 text-sm">Des yeux qui doutent de votre engagement envers la tâche.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="sleeping" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Endormi</p>
              <p className="text-gray-400 text-sm">Des yeux fermés lorsque vous êtes inactif depuis longtemps.</p>
            </div>
          </div>

          {/* Version pour écrans extra larges */}
          <div className="hidden 2xl:block mt-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Interaction en temps réel</h3>
              <p className="text-gray-300 mb-8">
                Déplacez votre curseur sur l'écran et observez comment les yeux vous suivent. Cette technologie de suivi
                visuel est la base d'EyeP.
              </p>

              <div className="grid grid-cols-4 gap-12 items-center">
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="normal" />
                  <p className="mt-2 text-yellow-400">Normal</p>
                </div>
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="angry" />
                  <p className="mt-2 text-yellow-400">En Colère</p>
                </div>
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="suspicious" />
                  <p className="mt-2 text-yellow-400">Suspicieux</p>
                </div>
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="sleeping" />
                  <p className="mt-2 text-yellow-400">Endormi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section
        id="faq"
        className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-b border-yellow-400/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">Questions Fréquemment Posées</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
            Tout ce que vous devez savoir sur EyeP et comment il peut vous aider à améliorer votre productivité.
          </p>

          <div className="max-w-3xl mx-auto space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-yellow-400/20">
            <FAQItem
              question="Comment fonctionne exactement le suivi oculaire ?"
              answer="Le suivi oculaire est un composant visuel qui suit le mouvement de votre curseur. Les yeux changent d'émotion en fonction de votre niveau d'activité, fournissant un retour visuel sur votre comportement de travail."
            />

            <FAQItem
              question="Puis-je personnaliser les temps du Pomodoro ?"
              answer="Oui, vous pouvez ajuster la durée des intervalles de travail et de pause selon vos préférences personnelles depuis les paramètres de l'application."
            />

            <FAQItem
              question="L'application fonctionne-t-elle hors ligne ?"
              answer="Oui, EyeP est une application de bureau qui fonctionne complètement hors ligne. Une fois installée, vous n'avez pas besoin d'internet pour l'utiliser."
            />

            <FAQItem
              question="Consomme-t-elle beaucoup de ressources système ?"
              answer="Non, l'application est optimisée pour consommer un minimum de ressources. Vous pouvez travailler avec d'autres applications ouvertes sans remarquer de ralentissement de votre système."
            />

            <FAQItem
              question="Y a-t-il des plans pour des versions mobiles ?"
              answer="Nous sommes actuellement concentrés sur le perfectionnement des versions de bureau, mais nous envisageons de développer des versions pour iOS et Android à l'avenir."
            />

            <FAQItem
              question="Comment puis-je signaler un bug ou suggérer une fonctionnalité ?"
              answer="Vous pouvez nous envoyer un e-mail à support@eyep.com ou utiliser la fonction de signalement de bugs dans l'application depuis le menu des paramètres."
            />
          </div>
        </div>
      </section>

      {/* Section Téléchargement - Maintenant avec compteur de téléchargements */}
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

          <h2 className="text-4xl font-bold mb-6 text-yellow-400">Téléchargez EyeP Maintenant</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
            Disponible pour Windows et macOS. Téléchargez et installez en quelques secondes et commencez à améliorer
            votre productivité dès aujourd'hui.
          </p>

          {/* Compteur de téléchargements */}
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
      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} title="Politique de Confidentialité">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">1. Informations que nous collectons</h3>
          <p>
            EyeP ne collecte aucune information personnelle identifiable. L'application fonctionne complètement hors
            ligne et n'envoie pas de données à des serveurs externes.
          </p>

          <h3 className="text-lg font-bold">2. Utilisation des informations</h3>
          <p>
            Comme nous ne collectons pas d'informations, il n'y a pas d'utilisation de données personnelles. Toutes les
            statistiques d'utilisation sont stockées localement sur votre appareil.
          </p>

          <h3 className="text-lg font-bold">3. Cookies et technologies similaires</h3>
          <p>L'application de bureau n'utilise pas de cookies ni de technologies de suivi.</p>

          <h3 className="text-lg font-bold">4. Partage d'informations</h3>
          <p>
            Nous ne partageons aucune information avec des tiers, car nous ne collectons pas de données utilisateur.
          </p>

          <h3 className="text-lg font-bold">5. Sécurité</h3>
          <p>
            Nous nous engageons à assurer la sécurité de notre application grâce à des mises à jour régulières de
            sécurité.
          </p>

          <h3 className="text-lg font-bold">6. Modifications de cette politique</h3>
          <p>
            Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous informerons de
            tout changement en publiant la nouvelle Politique de Confidentialité sur cette page.
          </p>

          <h3 className="text-lg font-bold">7. Contact</h3>
          <p>
            Si vous avez des questions concernant cette Politique de Confidentialité, contactez-nous à :
            privacy@eyep.com
          </p>
        </div>
      </Modal>

      <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} title="Conditions d'Utilisation">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">1. Acceptation des conditions</h3>
          <p>
            En téléchargeant, installant ou utilisant EyeP, vous acceptez ces Conditions d'Utilisation dans leur
            intégralité.
          </p>

          <h3 className="text-lg font-bold">2. Licence d'utilisation</h3>
          <p>
            Nous vous accordons une licence limitée, non exclusive, non transférable et révocable pour télécharger,
            installer et utiliser l'application pour votre usage personnel et non commercial.
          </p>

          <h3 className="text-lg font-bold">3. Restrictions</h3>
          <p>
            Vous ne pouvez pas : (a) modifier, décompiler ou faire de l'ingénierie inverse de l'application ; (b) louer,
            prêter, vendre, redistribuer ou sous-licencier l'application ; (c) utiliser l'application à des fins
            illégales.
          </p>

          <h3 className="text-lg font-bold">4. Mises à jour</h3>
          <p>
            L'application peut se mettre à jour automatiquement de temps à autre pour améliorer les performances,
            ajouter de nouvelles fonctionnalités ou corriger des bugs.
          </p>

          <h3 className="text-lg font-bold">5. Propriété intellectuelle</h3>
          <p>
            L'application et tout son contenu, ses caractéristiques et ses fonctionnalités sont la propriété d'EyeP et
            sont protégés par les lois sur la propriété intellectuelle.
          </p>

          <h3 className="text-lg font-bold">6. Résiliation</h3>
          <p>
            Nous pouvons mettre fin ou suspendre votre accès à l'application immédiatement, sans préavis, pour quelque
            raison que ce soit, y compris si vous enfreignez ces Conditions.
          </p>

          <h3 className="text-lg font-bold">7. Limitation de responsabilité</h3>
          <p>
            En aucun cas, nous ne serons responsables des dommages indirects, accessoires, spéciaux, consécutifs ou
            punitifs.
          </p>

          <h3 className="text-lg font-bold">8. Modifications des conditions</h3>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. Nous vous informerons de tout
            changement en publiant les nouvelles Conditions sur cette page.
          </p>

          <h3 className="text-lg font-bold">9. Contact</h3>
          <p>Si vous avez des questions concernant ces Conditions, contactez-nous à : terms@eyep.com</p>
        </div>
      </Modal>
    </div>
  )
}

