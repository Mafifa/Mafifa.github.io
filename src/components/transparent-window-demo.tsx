import { useState, useEffect } from "react"
import { Monitor } from 'lucide-react'

interface TransparentWindowDemoProps {
  language?: "es" | "en" | "fr"
}

export default function TransparentWindowDemo ({ language = "es" }: TransparentWindowDemoProps) {
  const [isTransparent, setIsTransparent] = useState(false)

  // Alternar entre estado normal y transparente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransparent(prev => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getText = () => {
    switch (language) {
      case "en":
        return {
          title: "Transparent Mode",
          normal: "Normal Mode",
          transparent: "Transparent Mode",
          shortcut: "Ctrl + P",
          description: "Click through and always visible"
        }
      case "fr":
        return {
          title: "Mode Transparent",
          normal: "Mode Normal",
          transparent: "Mode Transparent",
          shortcut: "Ctrl + P",
          description: "Cliquez à travers et toujours visible"
        }
      default:
        return {
          title: "Modo Transparente",
          normal: "Modo Normal",
          transparent: "Modo Transparente",
          shortcut: "Ctrl + P",
          description: "Click a través y siempre visible"
        }
    }
  }

  const text = getText()

  return (
    <div className="relative h-64 w-full max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-yellow-400/20">
      {/* Fondo simulado de una aplicación */}
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-400">background-app.exe</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="h-16 bg-gray-700/50 rounded-md"></div>
          <div className="h-16 bg-gray-700/50 rounded-md"></div>
          <div className="h-16 bg-gray-700/50 rounded-md"></div>
          <div className="h-16 bg-gray-700/50 rounded-md"></div>
        </div>
      </div>

      {/* Ventana del Pomodoro */}
      <div
        className={`absolute transition-all duration-700 ease-in-out ${isTransparent
          ? "bg-black/20 backdrop-blur-sm border-yellow-400/30"
          : "bg-gray-900 border-yellow-400/70"
          } border rounded-lg p-4 w-48 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Monitor className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-xs font-medium text-yellow-400">{text.title}</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">25:00</div>
          <div className="text-xs text-gray-400 mt-1">{isTransparent ? text.transparent : text.normal}</div>
          <div className="mt-3 text-xs bg-yellow-400/20 text-yellow-400 py-1 px-2 rounded">
            {text.shortcut}
          </div>

          {isTransparent && (
            <div className="mt-2 text-xs text-gray-300">{text.description}</div>
          )}
        </div>

        {/* Indicador de transparencia */}
        {isTransparent && (
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce text-yellow-400 text-xs">↓</div>
          </div>
        )}
      </div>

      {/* Etiqueta de atajo */}
      <div className="absolute bottom-2 right-2 bg-yellow-400/80 text-black text-xs py-1 px-2 rounded">
        {text.shortcut}
      </div>
    </div>
  )
}
