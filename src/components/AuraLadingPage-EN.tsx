import { motion } from "framer-motion"
import { Apple, Bell, ChevronRight, Clock, Download, Monitor, Star } from "lucide-react"
import { useEffect, useState } from "react"

export default function AuraLandingPage () {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Enhanced "WHY NOT YOU?" background text with red/pink aura */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        style={{
          transform: `translateY(${Math.min(scrollY * 0.159, window.innerHeight)}px)`, // Mover hacia abajo
        }}
      >
        <div className="relative w-full h-full flex items-start justify-center">
          {/* Red/pink glow effect behind text */}
          <div className="absolute blur-3xl opacity-10 text-[12vw] font-bold tracking-tighter text-red-500">
            WHY NOT YOU?
          </div>

          {/* Main text with gradient and glow */}
          <h1
            className="text-[12vw] font-bold tracking-tighter whitespace-nowrap opacity-[0.07]"
            style={{
              background: "linear-gradient(to right, #800020, #ff4d4d, #800020)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(255, 77, 77, 0.3)",
            }}
          >
            WHY NOT YOU?
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-44 pb-24">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
              {/* Logo positioned at the top */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-red-600 opacity-30 blur-xl"></div>
                  <img
                    src="../../resources/aura-image.png"
                    alt="Aura Logo"
                    className="relative z-10 w-20 h-20 object-contain"
                  />
                </div>
              </motion.div>

              {/* Main heading with gradient */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              >
                <span className="bg-gradient-to-r from-red-500 to-red-900 text-transparent bg-clip-text">AURA</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
              >
                Mindful reminders for your daily journey.
                <span className="block mt-2 text-red-400">Because your potential is limitless.</span>
              </motion.p>

              {/* Download buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <a
                  href="#download-windows"
                  className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 px-6 py-3 rounded-lg border border-gray-700 transition-all duration-300 group"
                >
                  <Monitor size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <div className="text-sm text-gray-400">Download for</div>
                    <div className="font-medium">Windows (64-bit)</div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all"
                  />
                </a>

                <a
                  href="#download-macos"
                  className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 px-6 py-3 rounded-lg border border-gray-700 transition-all duration-300 group"
                >
                  <Apple size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <div className="text-sm text-gray-400">Download for</div>
                    <div className="font-medium">macOS (64-bit)</div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all"
                  />
                </a>
              </motion.div>

              {/* App preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="relative w-full max-w-2xl mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-900/20 rounded-xl blur-xl transform -translate-y-4"></div>
                <div className="relative grid grid-cols-1 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                  {/* Replace with actual app screenshot */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="flex justify-center mb-4">
                      </div>
                      <h3 className="text-2xl font-medium mb-6">Simple User Interface</h3>
                      <img src="../../resources/main-window.png" alt="" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features section with transparent background to show WHY NOT YOU */}
        <section className="py-20 px-4 sm:px-6 relative">
          <div className="container max-w-6xl mx-auto relative z-10">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-center mb-16"
            >
              Stay <span className="text-red-500">mindful</span>, stay <span className="text-red-500">focused</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900/20 to-red-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <div className="relative bg-gray-900 p-6 rounded-xl border border-gray-800 transition-colors">
                  <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                    <Bell size={24} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Unobtrusive Reminders</h3>
                  <p className="text-gray-400">Gentle notifications that inspire without disrupting your workflow.</p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900/20 to-red-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <div className="relative bg-gray-900 p-6 rounded-xl border border-gray-800 transition-colors">
                  <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                    <Star size={24} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Motivational Messages</h3>
                  <p className="text-gray-400">Curated inspirational quotes that remind you of your potential.</p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900/20 to-red-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                <div className="relative bg-gray-900 p-6 rounded-xl border border-gray-800 transition-colors">
                  <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                    <Clock size={24} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Background Operation</h3>
                  <p className="text-gray-400">Runs silently while you focus on what matters in your day.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Download section with transparent background to show WHY NOT YOU */}
        <section id="download" className="py-20 px-4 sm:px-6 relative">
          <div className="container max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your day?</h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Download Aura now and start receiving mindful reminders that inspire growth.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Windows Download */}
              <motion.div
                id="download-windows"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
              >
                <div className="flex items-center justify-center mb-4">
                  <Monitor size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-medium mb-2">Windows</h3>
                <p className="text-gray-400 text-sm mb-4">64-bit only</p>
                <a
                  href="https://mega.nz/file/hldEHTpK#TISd-FpS2kvboIkqRH2gSIcz_0dDd2nWc-TUO52_35I"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 px-6 py-2 rounded-lg transition-all duration-300"
                >
                  <Download size={18} />
                  <span>Download</span>
                </a>
              </motion.div>

              {/* macOS Download */}
              <motion.div
                id="download-macos"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
              >
                <div className="flex items-center justify-center mb-4">
                  <Apple size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-medium mb-2">macOS</h3>
                <p className="text-gray-400 text-sm mb-4">64-bit only</p>
                <a
                  href="https://mega.nz/file/cw9UVRwa#5CDs1T7NMLpvEJWe_E33aDs5SBzgJMFf5pVw3G-aBXk"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 px-6 py-2 rounded-lg transition-all duration-300"
                >
                  <Download size={18} />
                  <span>Download</span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 border-t border-gray-800 bg-black relative z-10">
          <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src="../../resources/aura-image.png"
                alt="Aura Logo"
                className="w-6 h-6 mr-2"
              />
              <span className="text-gray-400 text-sm">© {new Date().getFullYear()} Aura. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms
              </a>
              <a href="https://www.instagram.com/the_aura_app/" className="text-gray-400 hover:text-white text-sm">
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
