import { useEffect, useState, useRef } from 'react'

// Importez les icônes dont vous avez besoin
// Si vous utilisez react-icons, vous pouvez remplacer ces importations
// par les équivalentes de cette bibliothèque
const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-2 h-5 w-5"
  >
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
)

const Download = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-2 h-5 w-5"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)

const ExternalLink = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-2 h-5 w-5"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
)

const Shield = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-yellow-400"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

const Zap = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-yellow-400"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
)

const Layers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-yellow-400"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
)

export default function TheWayComponent () {
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const heroRef = useRef(null)

  // Gérer le défilement pour les effets de parallaxe
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => { window.removeEventListener('scroll', handleScroll) }
  }, [])

  // Détecter les appareils mobiles
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => { window.removeEventListener('resize', checkMobile) }
  }, [])

  // Fonction pour créer un observateur d'intersection
  const createObserver = (element, callback) => {
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return observer
  }

  // Calculer l'opacité et l'échelle en fonction du défilement
  const heroOpacity = Math.max(1 - scrollY / 300, 0)
  const heroScale = Math.max(1 - scrollY / 2000, 0.9)

  // Fonction pour ajouter des styles CSS à l'en-tête
  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0);
          opacity: 0.1;
        }
        50% {
          transform: translateY(-20px);
          opacity: 0.3;
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
      
      @keyframes scrollDown {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(4px);
        }
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.8s ease forwards;
      }
      
      .animate-float {
        animation: float 10s ease-in-out infinite;
      }
      
      .animate-pulse {
        animation: pulse 3s ease-in-out infinite;
      }
      
      .animate-scrollDown {
        animation: scrollDown 1.5s ease-in-out infinite;
      }
      
      .animate-bounce {
        animation: bounce 1.5s ease-in-out infinite;
      }
      
      .transition-all {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .duration-300 {
        transition-duration: 300ms;
      }
      
      .duration-500 {
        transition-duration: 500ms;
      }
      
      .transform {
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      }
      
      .hover\\:scale-105:hover {
        --tw-scale-x: 1.05;
        --tw-scale-y: 1.05;
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      }
      
      .hover\\:-translate-y-1:hover {
        --tw-translate-y: -0.25rem;
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      }
      
      @media (min-width: 480px) {
        .xs\\:flex-row {
          flex-direction: row;
        }
        .xs\\:w-auto {
          width: auto;
        }
      }
    `

    document.head.appendChild(styleElement)

    // Ajouter Google Fonts si elles ne sont pas déjà chargées
    if (!document.getElementById('google-fonts')) {
      const link = document.createElement('link')
      link.id = 'google-fonts'
      link.rel = 'stylesheet'
      link.href =
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap'
      document.head.appendChild(link)
    }

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden">
      {/* Section Héro */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center py-10 md:py-0"
      >
        {/* Arrière-plan avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4b000] to-[#8a7200] opacity-90">
          <div className="absolute inset-0 bg-[#1a1a1a] opacity-70"></div>
        </div>

        {/* Éléments flottants - quantité réduite pour mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-400/10 animate-float"
              style={{
                width: Math.random() * (isMobile ? 60 : 100) + 40,
                height: Math.random() * (isMobile ? 60 : 100) + 40,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Contenu */}
        <div className="container mx-auto px-4 relative z-10">
          <div
            className="flex flex-col items-center text-center"
            style={{
              opacity: heroOpacity,
              transform: `scale(${heroScale})`,
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          >
            <div className="mb-6 md:mb-8 relative animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-3xl overflow-hidden shadow-2xl scale-75 sm:scale-90 md:scale-100">
                <img
                  src="../../../resources/icon.png"
                  alt="TheWay Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -inset-4 rounded-full bg-yellow-400/20 blur-xl -z-10 animate-pulse"
                style={{ animationDuration: '3s' }}
              />
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 animate-fadeIn tracking-tight"
              style={{
                animationDelay: '0.4s',
                fontFamily: "'Montserrat', sans-serif",
                background: 'linear-gradient(to right, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(255, 215, 0, 0.3)'
              }}
            >
              <span style={{ color: '#FFD700' }}>The</span>
              <span style={{ color: '#FFFFFF' }}>Way</span>
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mb-6 md:mb-8 animate-fadeIn"
              style={{
                animationDelay: '0.6s',
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: '0.5px',
                lineHeight: '1.6',
                fontWeight: '300'
              }}
            >
              Le pont sécurisé pour le transfert de fichiers entre plateformes
            </p>

            <div
              className="flex flex-col xs:flex-row gap-3 md:gap-4 animate-fadeIn w-full xs:w-auto justify-center"
              style={{ animationDelay: '0.8s' }}
            >
              <a
                href="https://github.com/Mafifa/theway"
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-medium py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explorer
                <ArrowRight />
              </a>
              <a
                href="https://github.com/Mafifa/theway"
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-700"
              >
                Télécharger
                <Download />
              </a>
            </div>
          </div>
        </div>

        {/* Indicateur de défilement - caché sur les très petits écrans */}
        <div
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block"
          style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div
              className="w-1 h-2 bg-white rounded-full animate-scrollDown"
              style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }}
            />
          </div>
        </div>
      </section>

      {/* Section Caractéristiques */}
      <section id="features" className="py-12 md:py-16 lg:py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                background: 'linear-gradient(to right, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Caractéristiques Principales
            </h2>
            <p
              className="text-gray-400 max-w-2xl mx-auto"
              style={{
                fontFamily: "'Poppins', sans-serif",
                lineHeight: '1.6',
                fontWeight: '300',
                letterSpacing: '0.3px'
              }}
            >
              TheWay offre une solution complète pour le transfert sécurisé de fichiers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-yellow-900/20 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-900/10">
              <div className="bg-yellow-500/10 p-4 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6">
                <Shield />
              </div>
              <h3
                className="text-lg sm:text-xl font-bold mb-3 md:mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Chiffrement Total
              </h3>
              <p
                className="text-gray-400"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.6',
                  fontWeight: '300',
                  letterSpacing: '0.3px'
                }}
              >
                Vos fichiers restent privés et sécurisés tout au long du processus de transfert grâce au chiffrement de
                bout en bout.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-yellow-900/20 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-900/10">
              <div className="bg-yellow-500/10 p-4 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6">
                <Zap />
              </div>
              <h3
                className="text-lg sm:text-xl font-bold mb-3 md:mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Vitesse Optimale
              </h3>
              <p
                className="text-gray-400"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.6',
                  fontWeight: '300',
                  letterSpacing: '0.3px'
                }}
              >
                Optimisé pour la vitesse avec une surcharge minimale, permettant des transferts efficaces même avec des
                fichiers volumineux.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-yellow-900/20 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-900/10 sm:col-span-2 md:col-span-1">
              <div className="bg-yellow-500/10 p-4 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6">
                <Layers />
              </div>
              <h3
                className="text-lg sm:text-xl font-bold mb-3 md:mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Multiplateforme
              </h3>
              <p
                className="text-gray-400"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.6',
                  fontWeight: '300',
                  letterSpacing: '0.3px'
                }}
              >
                Connectez et transférez des fichiers sans problème entre différents systèmes d'exploitation comme
                Windows, macOS et Linux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Aperçu de l'Application */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#1a1a1a] to-[#252525]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div
              className="md:w-1/2 transform transition-all duration-500 opacity-0 translate-x-[-50px]"
              id="app-preview-text"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1'
                        el.style.transform = 'translateX(0)'
                        observer.disconnect()
                      }
                    },
                    { threshold: 0.1 }
                  )
                  observer.observe(el)
                }
              }}
            >
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  background: 'linear-gradient(to right, #FFD700, #FFA500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Interface Minimaliste et Fonctionnelle
              </h2>
              <p
                className="text-gray-300 mb-4 md:mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.6',
                  fontWeight: '300',
                  letterSpacing: '0.3px'
                }}
              >
                TheWay est conçu avec une approche minimaliste qui privilégie la facilité d'utilisation. L'interface
                intuitive vous permet de transférer des fichiers en quelques clics, sans sacrifier la sécurité ou les
                fonctionnalités avancées.
              </p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-start">
                  <div className="bg-yellow-500/20 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                  <p
                    className="text-gray-300"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: '1.6',
                      fontWeight: '300',
                      letterSpacing: '0.3px'
                    }}
                  >
                    Design épuré et sans distractions
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-500/20 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                  <p
                    className="text-gray-300"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: '1.6',
                      fontWeight: '300',
                      letterSpacing: '0.3px'
                    }}
                  >
                    Transfert par glisser-déposer
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-500/20 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                  <p
                    className="text-gray-300"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: '1.6',
                      fontWeight: '300',
                      letterSpacing: '0.3px'
                    }}
                  >
                    Historique des transferts intégré
                  </p>
                </li>
              </ul>
              <a
                href="https://github.com/Mafifa/theway"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Voir toutes les fonctionnalités
                <ArrowRight />
              </a>
            </div>

            <div
              className="md:w-1/2 transform transition-all duration-500 opacity-0 translate-x-[50px]"
              id="app-preview-image"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1'
                        el.style.transform = 'translateX(0)'
                        observer.disconnect()
                      }
                    },
                    { threshold: 0.1 }
                  )
                  observer.observe(el)
                }
              }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-yellow-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-yellow-500/20 shadow-2xl">
                  {/* Maquette d'application - remplacer par une capture d'écran réelle lorsqu'elle est disponible */}
                  <div className="aspect-[16/9] bg-gray-800 flex items-center justify-center">
                    <div className="text-center p-4 sm:p-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-2xl overflow-hidden">
                        <img
                          src="../../../resources/icon.png"
                          alt="TheWay Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg p-4 sm:p-6">
                        <div className="h-6 sm:h-8 w-full bg-yellow-500/20 rounded-lg mb-4"></div>
                        <div className="flex gap-2 sm:gap-4 mb-4">
                          <div className="h-16 sm:h-20 w-1/2 bg-gray-800 rounded-lg"></div>
                          <div className="h-16 sm:h-20 w-1/2 bg-gray-800 rounded-lg"></div>
                        </div>
                        <div className="h-24 sm:h-32 w-full bg-gray-800 rounded-lg mb-4"></div>
                        <div className="flex justify-end">
                          <div className="h-8 sm:h-10 w-24 sm:w-32 bg-yellow-500 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Téléchargement */}
      <section id="download" className="py-12 md:py-16 lg:py-20 bg-[#252525]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="mb-6 md:mb-8 transform transition-all duration-500 opacity-0 scale-90"
              id="download-logo"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1'
                        el.style.transform = 'scale(1)'
                        observer.disconnect()
                      }
                    },
                    { threshold: 0.1 }
                  )
                  observer.observe(el)
                }
              }}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl overflow-hidden">
                <img
                  src="../../../resources/icon.png"
                  alt="TheWay Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 transform transition-all duration-500 opacity-0 translate-y-[20px]"
              id="download-title"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                        observer.disconnect()
                      }
                    },
                    { threshold: 0.1 }
                  )
                  observer.observe(el)
                }
              }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                background: 'linear-gradient(to right, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Téléchargez TheWay Maintenant
            </h2>

            <p
              className="text-gray-300 mb-6 md:mb-8 transform transition-all duration-500 opacity-0 translate-y-[20px]"
              id="download-desc"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                        observer.disconnect()
                      }
                    },
                    { threshold: 0.1 }
                  )
                  observer.observe(el)
                }
              }}
              style={{
                fontFamily: "'Poppins', sans-serif",
                lineHeight: '1.6',
                fontWeight: '300',
                letterSpacing: '0.3px'
              }}
            >
              Disponible pour toutes les principales plateformes. Commencez à transférer des fichiers en toute sécurité
              dès aujourd'hui.
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 transform transition-all duration-500 opacity-0 translate-y-[20px]"
              id="download-buttons"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                        observer.disconnect()
                      }
                    },
                    { threshold: 0.1 }
                  )
                  observer.observe(el)
                }
              }}
            >
              <a
                href="https://github.com/Mafifa/theway"
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 hover:shadow-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <div className="text-left">
                  <div className="text-xs text-gray-400">Télécharger pour</div>
                  <div className="font-bold">Windows</div>
                </div>
              </a>
              <a
                href="https://github.com/Mafifa/theway"
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 hover:shadow-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <div className="text-left">
                  <div className="text-xs text-gray-400">Télécharger pour</div>
                  <div className="font-bold">macOS</div>
                </div>
              </a>
              <a
                href="https://github.com/Mafifa/theway"
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 hover:shadow-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <div className="text-left">
                  <div className="text-xs text-gray-400">Télécharger pour</div>
                  <div className="font-bold">Linux</div>
                </div>
              </a>
            </div>

            <div
              className="mt-6 md:mt-8 text-gray-400 text-sm opacity-0 transition-opacity duration-500"
              id="download-version"
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1'
                        observer.disconnect()
                      }
                    },
                    { threshold: 0.1 }
                  )
                  observer.observe(el)
                }
              }}
              style={{
                fontFamily: "'Poppins', sans-serif",
                lineHeight: '1.6',
                fontWeight: '300',
                letterSpacing: '0.3px'
              }}
            >
              <p>Version 1.0.6 | Mis à jour le 15/3/2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-[#252525] to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div
            className="max-w-3xl mx-auto bg-gradient-to-r from-yellow-900/30 to-yellow-700/30 rounded-2xl p-6 sm:p-8 md:p-12 border border-yellow-500/20 transform transition-all duration-500 opacity-0 scale-95"
            id="cta-section"
            ref={(el) => {
              if (el) {
                const observer = new IntersectionObserver(
                  ([entry]) => {
                    if (entry.isIntersecting) {
                      el.style.opacity = '1'
                      el.style.transform = 'scale(1)'
                      observer.disconnect()
                    }
                  },
                  { threshold: 0.1 }
                )
                observer.observe(el)
              }
            }}
          >
            <div className="text-center">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  textShadow: '0 2px 10px rgba(255, 215, 0, 0.2)'
                }}
              >
                Prêt pour des transferts de fichiers plus sécurisés ?
              </h2>
              <p
                className="text-gray-300 mb-6 md:mb-8"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.6',
                  fontWeight: '300',
                  letterSpacing: '0.3px'
                }}
              >
                Rejoignez des milliers d'utilisateurs qui font confiance à TheWay pour leurs transferts de fichiers
                quotidiens.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <a
                  href="https://github.com/Mafifa/theway"
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-medium py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Télécharger Maintenant
                  <Download />
                </a>
                <a
                  href="https://github.com/Mafifa/theway"
                  className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-700"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Voir la Documentation
                  <ExternalLink />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="py-8 md:py-12 bg-[#1a1a1a] border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden mr-3">
                <img
                  src="../../../resources/icon.png"
                  alt="TheWay Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <span
                  style={{
                    background: 'linear-gradient(to right, #FFD700, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  The
                </span>
                Way
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <a
                href="https://github.com/Mafifa/theway"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.6',
                  fontWeight: '300',
                  letterSpacing: '0.3px'
                }}
              >
                Fonctionnalités
              </a>
              <a
                href="https://github.com/Mafifa/theway"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.6',
                  fontWeight: '300',
                  letterSpacing: '0.3px'
                }}
              >
                Téléchargements
              </a>
              <a
                href="https://github.com/Mafifa/theway"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.6',
                  fontWeight: '300',
                  letterSpacing: '0.3px'
                }}
              >
                Documentation
              </a>
              <a
                href="https://mafifa.github.io/fr/"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: '1.6',
                  fontWeight: '300',
                  letterSpacing: '0.3px'
                }}
              >
                Contact
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p
              className="text-gray-500 text-xs sm:text-sm mb-4 md:mb-0"
              style={{
                fontFamily: "'Poppins', sans-serif",
                lineHeight: '1.6',
                fontWeight: '300',
                letterSpacing: '0.3px'
              }}
            >
              © 2025 TheWay. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
