import { useTranslations } from '@/i18n/utils'
import { ArrowRight } from 'lucide-react'

type Lang = 'en' | 'fr' | 'es'

export function PortfolioIntegration ({ lang }: { lang: Lang }) {
  const t = useTranslations(lang)
  return (
    <section id="theway-project" className="py-16 bg-[#141414]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 scale-50 md:scale-90">
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-500/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#d4b000] to-[#8a7200] rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-[#1a1a1a] opacity-30"></div>
                <div className="relative z-10 w-3/5 h-3/5">
                  <img
                    src="../resources/icon.png"
                    alt="TheWay Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="inline-block bg-yellow-500/20 px-4 py-1 rounded-full text-yellow-400 text-sm font-medium mb-4">
              {t('theWay.destacado')}
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                background: 'linear-gradient(to right, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(255, 215, 0, 0.3)'
              }}
            >
              <span style={{ color: '#FFD700' }}>The</span>
              <span style={{ color: '#FFFFFF' }}>Way</span>
            </h2>

            <p className="text-gray-300 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {t('theWay.description')}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-white">Express</span>
              <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-white">React.js</span>
              <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-white">TypeScript</span>
              <span className="px-3 py-1 text-sm rounded-full bg-yellow-500 text-black">Electron</span>
              <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-white">Node.js</span>
            </div>

            <a
              href={`/${lang}/TheWay`}
              className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {t('theWay.verCompleto')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
