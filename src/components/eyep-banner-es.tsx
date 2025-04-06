
import { ArrowRight, Clock, Eye, Monitor } from "lucide-react"

interface ProjectBannerProps {
  projectUrl?: string
}

export default function ProjectBannerES ({ projectUrl = "#" }: ProjectBannerProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl mx-auto text-white max-w-4xl">
      {/* App Icon Container */}
      <div className="flex-shrink-0 w-full md:w-[300px] h-[300px] bg-[#8B6D00] rounded-xl flex items-center justify-center p-4">
        <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
          <img src="../resources/eyep.png" alt="EyeP App Icon" width={200} height={200} className="object-contain rounded-lg" />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-between flex-1">
        {/* Project Label */}
        <div className="mb-2">
          <span className="inline-block bg-yellow-500/20 px-4 py-1 rounded-full text-yellow-400 text-sm font-medium mb-4">Proyecto Destacado</span>
        </div>

        {/* Project Title */}
        <h2 className="text-4xl font-bold text-[#FFD700] mb-4">EyeP</h2>

        {/* Project Description */}
        <p className="text-gray-300 mb-6">
          Un pomodoro minimalista con un tracker de mouse en forma de ojo y sistema de modo transparencia. Mejora tu
          productividad con una herramienta que te ayuda a mantener el enfoque y controlar tu tiempo.
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Pomodoro
          </span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm flex items-center gap-1">
            <Eye className="w-4 h-4" />
            Eye Tracker
          </span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm flex items-center gap-1">
            <Monitor className="w-4 h-4" />
            Transparencia
          </span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm">React.js</span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm">Electron</span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm">TypeScript</span>
        </div>

        {/* View Project Button */}
        <a
          href={projectUrl}
          className="self-start px-4 py-2 bg-[#FFD700] text-black rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition-all"
        >
          Ver Proyecto Completo
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

