import { ArrowRight, Bell, Clock, Star } from "lucide-react"

interface ProjectBannerProps {
  projectUrl?: string
}

export function AuraBannerFR ({ projectUrl = "#" }: ProjectBannerProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl text-white max-w-4xl mx-auto">
      {/* App Icon Container */}
      <div className="flex-shrink-0 w-full md:w-[300px] h-[300px] bg-[#7e3b3b] rounded-xl flex items-center justify-center p-4">
        <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src="/resources/aura-image.png"
            alt="Icône Aura"
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
            Projet en Vedette
          </span>
        </div>

        {/* Project Title */}
        <h2 className="text-4xl font-bold text-[#c53030] mb-4">AURA</h2>

        {/* Project Description */}
        <p className="text-gray-300 mb-6">
          Une application de rappels conscients qui affiche des messages motivants sous forme de notifications.
          Augmentez votre pleine conscience et restez inspiré tout au long de votre journée avec des rappels doux de
          votre potentiel illimité.
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm flex items-center gap-1">
            <Bell className="w-4 h-4" />
            Rappels
          </span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm flex items-center gap-1">
            <Star className="w-4 h-4" />
            Motivation
          </span>
          <span className="px-3 py-1 bg-[#333333] rounded-full text-sm flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Mode Arrière-plan
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
          Voir le Projet Complet
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
