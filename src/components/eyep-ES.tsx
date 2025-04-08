import { useState, useEffect, useRef } from "react"
import { Clock, Download, Coffee, Brain, MousePointer, Monitor, Timer, Focus, ArrowDown, Menu, X, Github, Twitter, Instagram, ChevronDown, ChevronUp, ComputerIcon as Windows, Apple, Eye } from 'lucide-react'
import TransparentWindowDemo from "./transparent-window-demo"

// ============= TIPOS E INTERFACES =============

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

// ============= COMPONENTES =============

// Componente DownloadCounter
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

// Componente DownloadButton
function DownloadButton ({ platform, large = false, megaLink }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const isWindows = platform === "windows"

  const baseClasses = "flex items-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"

  // Mejorar el contraste para el botón de macOS
  const primaryClasses = "bg-black text-yellow-400 hover:bg-gray-900 border-2 border-yellow-400"
  const secondaryClasses = "bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-black"

  const sizeClasses = large ? "px-6 py-3 text-lg rounded-lg" : "px-4 py-2 text-sm rounded-md"

  const handleDownload = () => {
    setIsDownloading(true)

    // En una implementación real, aquí registrarías la descarga

    // Si hay un enlace de MEGA, redirigir después de un breve retraso
    if (megaLink) {
      setTimeout(() => {
        window.location.href = megaLink

        // Resetear el estado después de otro retraso
        setTimeout(() => {
          setIsDownloading(false)
        }, 1000)
      }, 500)
    } else {
      // Si no hay enlace, simplemente resetear el estado después de un retraso
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
      <span>{isDownloading ? "Descargando..." : isWindows ? "Windows 64-bit" : "macOS 64-bit"}</span>
    </button>
  )
}

// Componente FeatureCard
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

// Componente Modal
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
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">{children}</div>

        <div className="p-4 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente FAQItem
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

// Componente Footer
function Footer ({ onPrivacyClick, onTermsClick }: FooterProps) {
  return (
    <footer className="bg-black text-white border-t border-yellow-400/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">EyeP</h3>
            <p className="text-gray-400 mb-4">
              Una aplicación de productividad única con ojos que siguen tu cursor y reaccionan cuando estás inactivo.
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
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#pomodoro" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Pomodoro
                </a>
              </li>
              <li>
                <a href="#psychology" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Psicología
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Características
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
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button onClick={onTermsClick} className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EyeP. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// Componente Navbar
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-yellow-400 transition-colors">
              Características
            </a>
            <a href="#pomodoro" className="hover:text-yellow-400 transition-colors">
              Pomodoro
            </a>
            <a href="#psychology" className="hover:text-yellow-400 transition-colors">
              Psicología
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
              Descargar
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
              Características
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
              Psicología
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
              Descargar
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

// Componente EyesComponent
function EyesComponent ({ emotion }: EyesComponentProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseTimerRef = useRef(null)

  // Optimización: Reducir la frecuencia de actualización del seguimiento del mouse
  useEffect(() => {
    let lastUpdate = 0
    const updateInterval = 50 // ms entre actualizaciones (20 fps en lugar de 60fps)

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

  // Optimización: Simplificar el cálculo de la posición del ojo
  const calculateEyePosition = (eyeRef: HTMLDivElement | null, isLeftEye: boolean) => {
    if (!eyeRef || !isMouseMoving) return { x: 0, y: 0 }

    const eyeRect = eyeRef.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 }

    const eyeCenterX = eyeRect.left - containerRect.left + eyeRect.width / 2
    const eyeCenterY = eyeRect.top - containerRect.top + eyeRect.height / 2

    // Calcular ángulo y distancia
    const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX)

    // Distancia máxima simplificada
    let maxDistance = 10
    if (emotion === "sleeping") maxDistance = 0

    // Cálculo de distancia simplificado
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
        <EyeComponent
          emotion={emotion}
          getPosition={(ref) => calculateEyePosition(ref, true)}
          isLeftEye={true}
          isMouseMoving={isMouseMoving}
        />

        {/* Right Eye */}
        <EyeComponent
          emotion={emotion}
          getPosition={(ref) => calculateEyePosition(ref, false)}
          isLeftEye={false}
          isMouseMoving={isMouseMoving}
        />
      </div>
    </div>
  )
}

// Componente Eye (usado por EyesComponent)
function EyeComponent ({ emotion, getPosition, isLeftEye, isMouseMoving }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [internalTargetPosition, setInternalTargetPosition] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  // Actualizar posición objetivo cuando se mueve el mouse
  useEffect(() => {
    if (eyeRef.current) {
      const newPosition = getPosition(eyeRef.current)
      setInternalTargetPosition(newPosition)
    }
  }, [getPosition, isMouseMoving])

  // Optimización: Usar requestAnimationFrame para animación más eficiente
  useEffect(() => {
    const animatePosition = () => {
      setPosition((prev) => {
        // Si no se mueve, volver gradualmente al centro
        if (!isMouseMoving) {
          return {
            x: prev.x * 0.9,
            y: prev.y * 0.9,
          }
        }

        // De lo contrario, moverse hacia la posición objetivo
        return {
          x: prev.x + (internalTargetPosition.x - prev.x) * 0.2,
          y: prev.y + (internalTargetPosition.y - prev.y) * 0.2,
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
  }, [internalTargetPosition, isMouseMoving])

  // Estilos simplificados
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

// ============= COMPONENTE PRINCIPAL =============

export default function EyePLandingPage () {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  // Enlaces de MEGA para las descargas
  const windowsMegaLink = "https://mega.nz/file/5hl30KgY#uTuqHyFcl3wwzRnFzvR8ghRraBzfBv5czN0nNyAK2xY"
  const macosMegaLink = "https://mega.nz/file/59lSAKhC#rR0CuKSeopDBrhU_FK52CQi8J6rF2opWQEq11s9jhk0"

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <Navbar />

      {/* Hero Section con Descarga Integrada */}
      <section id="hero" className="relative overflow-hidden py-20 md:py-32">
        {/* Fondo mejorado */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_0%,#111_50%,#000_100%)] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 text-center md:text-left">
              <div className="inline-block bg-yellow-400/80 text-black px-4 py-1 rounded-full text-sm font-bold mb-6">
                ENFÓCATE COMO NUNCA ANTES
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                <span className="block text-white">Aumenta tu productividad con</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                  EyeP
                </span>
              </h1>

              <p className="text-xl mb-8 text-gray-300 max-w-xl mx-auto md:mx-0">
                Una aplicación Pomodoro divertida que te observa mientras trabajas, adaptándose a tu ritmo y
                manteniendo tu enfoque en lo que realmente importa.
              </p>

              {/* Contador de descargas en el hero */}
              <div className="mb-6 md:w-64">
                <DownloadCounter initialCount={1458} />
              </div>

              {/* Botones de descarga integrados en el hero */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                <DownloadButton platform="windows" large megaLink={windowsMegaLink} />
                <DownloadButton platform="macos" large megaLink={macosMegaLink} />
              </div>

              {/* Enlace para ver más */}
              <div className="hidden md:flex items-center justify-start mt-12">
                <a
                  href="#features"
                  className="flex flex-col items-center text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <span className="mb-2">Descubre más</span>
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

      {/* Features Section - Ahora donde estaba Pomodoro */}
      <section
        id="features"
        className="py-20 bg-gradient-to-r from-yellow-500/10 via-yellow-400/20 to-yellow-500/10 border-t border-b border-yellow-400/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">Características Principales</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
            EyeP combina la técnica Pomodoro con un seguimiento visual único para maximizar tu productividad.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Clock className="w-10 h-10" />}
              title="Temporizador Pomodoro"
              description="Gestiona tu tiempo con intervalos de trabajo y descanso para maximizar tu productividad."
            />
            <FeatureCard
              icon={<MousePointer className="w-10 h-10" />}
              title="Eye Tracker Interactivo"
              description="Ojos que siguen tu cursor y cambian de emoción cuando estás inactivo."
            />
            <FeatureCard
              icon={<Brain className="w-10 h-10" />}
              title="Múltiples Emociones"
              description="Los ojos expresan diferentes emociones: normal, enojado, sospechoso y dormido."
            />
            <FeatureCard
              icon={<Coffee className="w-10 h-10" />}
              title="Recordatorios de Descanso"
              description="Te avisa cuando es hora de tomar un descanso para mantener tu mente fresca."
            />
            <FeatureCard
              icon={<Monitor className="w-10 h-10" />}
              title="Aplicación de Escritorio"
              description="Disponible para Windows y macOS, sin necesidad de navegador."
            />
            <FeatureCard
              icon={<div className="relative">
                <Monitor className="w-10 h-10" />
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full animate-pulse-slow"></div>
              </div>}
              title="Modo Transparente"
              description="Presiona Ctrl + P para hacer que el contador se vuelva transparente y se quede fijo sobre todas las ventanas, permitiendo hacer clic a través de él."
            />
          </div>

          {/* Demostración del modo transparente */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-yellow-400">Modo Transparente</h3>
            <TransparentWindowDemo language="es" />
          </div>
        </div>
      </section>

      {/* Psychological Impact Section */}
      <section id="psychology" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-yellow-400">El Impacto Psicológico</h2>
          <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-gray-300">
            La ciencia detrás de por qué ser observado mientras trabajas puede aumentar significativamente tu
            productividad.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Focus className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Efecto Hawthorne
              </h3>
              <p className="text-gray-300">
                Las personas tienden a mejorar su comportamiento cuando saben que están siendo observadas. Nuestra
                aplicación simula esta sensación para aumentar tu rendimiento.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Brain className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Responsabilidad Visual
              </h3>
              <p className="text-gray-300">
                Los ojos que te siguen crean un sentido de responsabilidad, como si alguien estuviera supervisando tu
                trabajo, lo que te mantiene enfocado en tus tareas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <Timer className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Retroalimentación Emocional
              </h3>
              <p className="text-gray-300">
                Las diferentes emociones de los ojos te proporcionan retroalimentación sobre tu comportamiento de
                trabajo, ayudándote a mantener un ritmo constante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pomodoro Technique Section - Ahora donde estaban las características */}
      <section
        id="pomodoro"
        className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-b border-yellow-400/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">La Técnica Pomodoro</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
            Un método probado para mejorar la concentración y la productividad mediante ciclos de trabajo enfocado y
            descansos estratégicos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-900 p-8 rounded-xl relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Elige una Tarea
                </h3>
                <p className="text-gray-300">
                  Selecciona la tarea en la que quieres trabajar y configura el temporizador Pomodoro (25 minutos).
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-xl mt-12 relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Toma un Descanso
                </h3>
                <p className="text-gray-300">
                  Cuando suene la alarma, toma un descanso corto (5 minutos) para refrescar tu mente.
                </p>
              </div>
            </div>

            <div className="mt-12 md:mt-0">
              <div className="bg-gray-900 p-8 rounded-xl relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Trabaja Enfocado
                </h3>
                <p className="text-gray-300">
                  Trabaja en la tarea hasta que suene el temporizador. Evita distracciones y mantén el enfoque.
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-xl mt-12 relative border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
                <div className="absolute -top-6 -left-6 bg-yellow-400/80 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Repite el Ciclo
                </h3>
                <p className="text-gray-300">
                  Después de 4 pomodoros, toma un descanso más largo (15-30 minutos) para recargar energías.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section - Optimizada para pantallas grandes */}
      <section id="demo" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-yellow-400">Prueba la Interacción</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-300">
            Mueve tu cursor sobre los ojos y observa cómo te siguen. Cada par de ojos tiene una emoción diferente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="normal" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Normal</p>
              <p className="text-gray-400 text-sm">Ojos atentos que siguen tu cursor con curiosidad.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="angry" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Enojado</p>
              <p className="text-gray-400 text-sm">Ojos que expresan frustración cuando no estás siendo productivo.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="suspicious" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Sospechoso</p>
              <p className="text-gray-400 text-sm">Ojos que dudan de tu compromiso con la tarea.</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-colors group">
              <div className="mb-4 transform group-hover:scale-105 transition-transform">
                <EyesComponent emotion="sleeping" />
              </div>
              <p className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors">Dormido</p>
              <p className="text-gray-400 text-sm">Ojos cerrados cuando has estado inactivo por mucho tiempo.</p>
            </div>
          </div>

          {/* Versión para pantallas extra grandes */}
          <div className="hidden 2xl:block mt-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-yellow-400/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Interacción en tiempo real</h3>
              <p className="text-gray-300 mb-8">
                Mueve tu cursor por toda la pantalla y observa cómo los ojos te siguen. Esta tecnología de seguimiento
                visual es la base de EyeP.
              </p>

              <div className="grid grid-cols-4 gap-12 items-center">
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="normal" />
                  <p className="mt-2 text-yellow-400">Normal</p>
                </div>
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="angry" />
                  <p className="mt-2 text-yellow-400">Enojado</p>
                </div>
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="suspicious" />
                  <p className="mt-2 text-yellow-400">Sospechoso</p>
                </div>
                <div className="transform hover:scale-110 transition-transform">
                  <EyesComponent emotion="sleeping" />
                  <p className="mt-2 text-yellow-400">Dormido</p>
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
          <h2 className="text-4xl font-bold text-center mb-6 text-white">Preguntas Frecuentes</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-16">
            Todo lo que necesitas saber sobre EyeP y cómo puede ayudarte a mejorar tu productividad.
          </p>

          <div className="max-w-3xl mx-auto space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-yellow-400/20">
            <FAQItem
              question="¿Cómo funciona exactamente el eye tracker?"
              answer="El eye tracker es un componente visual que sigue el movimiento de tu cursor. Los ojos cambian de emoción basándose en tu nivel de actividad, proporcionando retroalimentación visual sobre tu comportamiento de trabajo."
            />

            <FAQItem
              question="¿Puedo personalizar los tiempos del Pomodoro?"
              answer="Sí, puedes ajustar la duración de los intervalos de trabajo y descanso según tus preferencias personales desde la configuración de la aplicación."
            />

            <FAQItem
              question="¿Cómo funciona el modo transparente?"
              answer="Presionando Ctrl + P, el contador Pomodoro se vuelve transparente y se queda fijo sobre todas las ventanas. Esto te permite ver el temporizador mientras trabajas en otras aplicaciones y también puedes hacer clic a través de él para interactuar con lo que hay detrás."
            />

            <FAQItem
              question="¿La aplicación funciona sin conexión a internet?"
              answer="Sí, EyeP es una aplicación de escritorio que funciona completamente sin conexión. Una vez instalada, no necesitas internet para utilizarla."
            />

            <FAQItem
              question="¿Consume muchos recursos del sistema?"
              answer="No, la aplicación está optimizada para consumir mínimos recursos. Puedes trabajar con otras aplicaciones abiertas sin notar ralentización en tu sistema."
            />

            <FAQItem
              question="¿Hay planes para versiones móviles?"
              answer="Actualmente estamos enfocados en perfeccionar las versiones de escritorio, pero estamos considerando desarrollar versiones para iOS y Android en el futuro."
            />
          </div>
        </div>
      </section>

      {/* Download Section - Ahora con contador de descargas */}
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

          <h2 className="text-4xl font-bold mb-6 text-yellow-400">Descarga EyeP Ahora</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
            Disponible para Windows y macOS. Descarga e instala en segundos y comienza a mejorar tu productividad hoy
            mismo.
          </p>

          {/* Contador de descargas */}
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
      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} title="Política de Privacidad">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">1. Información que recopilamos</h3>
          <p>
            EyeP no recopila ninguna información personal identificable. La aplicación funciona completamente sin
            conexión y no envía datos a servidores externos.

          </p>

          <h3 className="text-lg font-bold">2. Uso de la información</h3>
          <p>
            Como no recopilamos información, no hay uso de datos personales. Todas las estadísticas de uso se almacenan
            localmente en tu dispositivo.
          </p>

          <h3 className="text-lg font-bold">3. Cookies y tecnologías similares</h3>
          <p>La aplicación de escritorio no utiliza cookies ni tecnologías de seguimiento.</p>

          <h3 className="text-lg font-bold">4. Compartir información</h3>
          <p>No compartimos ninguna información con terceros, ya que no recopilamos datos de los usuarios.</p>

          <h3 className="text-lg font-bold">5. Seguridad</h3>
          <p>
            Nos comprometemos a garantizar la seguridad de nuestra aplicación mediante actualizaciones regulares de
            seguridad.
          </p>

          <h3 className="text-lg font-bold">6. Cambios a esta política</h3>
          <p>
            Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio
            publicando la nueva Política de Privacidad en esta página.
          </p>

          <h3 className="text-lg font-bold">7. Contacto</h3>
          <p>Si tienes preguntas sobre esta Política de Privacidad, contáctanos en: privacy@eyep.com</p>
        </div>
      </Modal>

      <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} title="Términos y Condiciones">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">1. Aceptación de los términos</h3>
          <p>Al descargar, instalar o utilizar EyeP, aceptas estos Términos y Condiciones en su totalidad.</p>

          <h3 className="text-lg font-bold">2. Licencia de uso</h3>
          <p>
            Te otorgamos una licencia limitada, no exclusiva, no transferible y revocable para descargar, instalar y
            utilizar la aplicación para tu uso personal y no comercial.
          </p>

          <h3 className="text-lg font-bold">3. Restricciones</h3>
          <p>
            No puedes: (a) modificar, descompilar o realizar ingeniería inversa de la aplicación; (b) alquilar,
            arrendar, prestar, vender, redistribuir o sublicenciar la aplicación; (c) utilizar la aplicación para fines
            ilegales.
          </p>

          <h3 className="text-lg font-bold">4. Actualizaciones</h3>
          <p>
            La aplicación puede actualizarse automáticamente de vez en cuando para mejorar el rendimiento, añadir nuevas
            funciones o corregir errores.
          </p>

          <h3 className="text-lg font-bold">5. Propiedad intelectual</h3>
          <p>
            La aplicación y todo su contenido, características y funcionalidad son propiedad de EyeP y están protegidos
            por leyes de propiedad intelectual.
          </p>

          <h3 className="text-lg font-bold">6. Terminación</h3>
          <p>
            Podemos terminar o suspender tu acceso a la aplicación inmediatamente, sin previo aviso, por cualquier
            razón, incluyendo si incumples estos Términos.
          </p>

          <h3 className="text-lg font-bold">7. Limitación de responsabilidad</h3>
          <p>
            En ningún caso seremos responsables por daños indirectos, incidentales, especiales, consecuentes o
            punitivos.
          </p>

          <h3 className="text-lg font-bold">8. Cambios a los términos</h3>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos de cualquier
            cambio publicando los nuevos Términos en esta página.
          </p>

          <h3 className="text-lg font-bold">9. Contacto</h3>
          <p>Si tienes preguntas sobre estos Términos, contáctanos en: terms@eyep.com</p>
        </div>
      </Modal>
    </div>
  )
}