import { ArrowRight, Bell, Clock, Star } from "lucide-react"

interface ProjectBannerProps {
  projectUrl?: string
}

export function AuraBannerES ({ projectUrl = "#" }: ProjectBannerProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl text-white max-w-4xl mx-auto">
      {/* App Icon Container */}
      <div className="flex-shrink-0 w-full md:w-[300px] h-[300px] bg-[#7e3b3b] rounded-xl flex items-center justify-center p-4">
        <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src="/resources/aura-image.png"
            alt="Ícono de Aura"
            width={200}
            height={200}
            className="object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-between flex-1">
        {/* Project Label */}
        <div className="mb-2">
          <span className="inline-block bg-red-500/20 px-4 py-1 rounded-full text-red-400 text-sm font-medium mb-4">
            Proyecto Destacado
          </span>
        </div>

        {/* Project Title */}
        <h2 className="text-4xl font-bold text-[#c53030] mb-4">AURA</h2>

        {/* Project Description */}
        <p className="text-gray-300 mb-6">
          Una aplicación de recordatorios conscientes que muestra mensajes motivacionales como notificaciones. Aumenta
          tu atención plena y mantente inspirado durante todo el día con suaves recordatorios de tu potencial ilimitado.
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm flex items-center gap-1">
            <Bell className="w-4 h-4" />
            Recordatorios
          </span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm flex items-center gap-1">
            <Star className="w-4 h-4" />
            Motivación
          </span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Modo Segundo Plano
          </span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm">React.js</span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm">Electron</span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm">TypeScript</span>
        </div>

        {/* View Project Button */}
        <a
          href={projectUrl}
          className="self-start px-4 py-2 bg-[#c53030] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition-all"
        >
          Ver Proyecto Completo
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
