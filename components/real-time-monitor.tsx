"use client"

import type { Driver } from "@/commons/types/DriverType"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Eye,
  Brain,
  ChevronRight,
  History,
  MapPin,
  Clock,
  AlertTriangle,
  Activity,
  Route,
  Lightbulb,
} from "lucide-react"

interface RealTimeMonitorProps {
  drivers: Driver[]
  onSelectDriver: (driver: Driver) => void
  onViewHistory: () => void
  onViewSuggestions: () => void
}

export function RealTimeMonitor({ drivers, onSelectDriver, onViewHistory, onViewSuggestions }: RealTimeMonitorProps) {
  const getAttentionColor = (level: Driver["attentionLevel"]) => {
    switch (level) {
      case "optimo":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderado":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critico":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAttentionIcon = (level: Driver["attentionLevel"]) => {
    switch (level) {
      case "optimo":
        return "✓"
      case "moderado":
        return "⚠"
      case "critico":
        return "⚠"
      default:
        return "?"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const activeDrivers = drivers.filter((d) => d.isOnDuty)
  const criticalDrivers = drivers.filter((d) => d.attentionLevel === "critico")
  const averageAttention = Math.round(drivers.reduce((acc, d) => acc + d.attentionScore, 0) / drivers.length)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Monitor de Atención - Conductores</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={onViewSuggestions} variant="outline" className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Sugerencias
              </Button>
              <Button onClick={onViewHistory} variant="outline" className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                Historial
              </Button>
              <Badge variant="outline" className="text-sm">
                {activeDrivers.length} En Servicio
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conductores Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{activeDrivers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Estado Crítico</p>
                  <p className="text-2xl font-bold text-red-600">{criticalDrivers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Atención Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">{averageAttention}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Route className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rutas Activas</p>
                  <p className="text-2xl font-bold text-gray-900">{drivers.filter((d) => d.currentRoute).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerta crítica */}
        {criticalDrivers.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="font-semibold text-red-800">
                  ¡ALERTA! {criticalDrivers.length} conductor(es) en estado crítico de atención
                </h3>
              </div>
              <p className="text-red-700 text-sm mt-1">Se recomienda contacto inmediato y parada de seguridad</p>
            </CardContent>
          </Card>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Monitoreo en Tiempo Real</h2>
          <p className="text-gray-600">Estado actual de atención y fatiga de conductores</p>
        </div>

        {/* Lista de conductores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => (
            <Card
              key={driver.id}
              className={`hover:shadow-lg transition-shadow duration-200 cursor-pointer ${
                driver.attentionLevel === "critico" ? "ring-2 ring-red-300" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={driver.image || "/placeholder.svg"} alt={driver.name} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {driver.isOnDuty && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                      <p className="text-sm text-gray-500">Lic: {driver.licenseNumber}</p>
                      <p className="text-xs text-gray-400">{driver.vehicleType}</p>
                    </div>
                  </div>
                  <Badge className={getAttentionColor(driver.attentionLevel)}>
                    {getAttentionIcon(driver.attentionLevel)} {driver.attentionLevel}
                  </Badge>
                </div>

                {/* Métricas principales */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Brain className="h-4 w-4 mr-2" />
                      Nivel de atención
                    </div>
                    <span className={`font-bold text-lg ${getScoreColor(driver.attentionScore)}`}>
                      {driver.attentionScore}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Activity className="h-4 w-4 mr-2" />
                      Nivel de fatiga
                    </div>
                    <span className={`font-medium ${getScoreColor(100 - driver.fatigueLevel)}`}>
                      {driver.fatigueLevel}%
                    </span>
                  </div>

                  {driver.currentRoute && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        Ruta actual
                      </div>
                      <span className="text-sm font-medium text-right">{driver.currentRoute}</span>
                    </div>
                  )}

                  {driver.hoursOnDuty && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Horas en servicio
                      </div>
                      <span className="font-medium">{driver.hoursOnDuty}h</span>
                    </div>
                  )}
                </div>

                {/* Barra de progreso de atención */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Atención</span>
                    <span>{driver.attentionScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        driver.attentionScore >= 80
                          ? "bg-green-500"
                          : driver.attentionScore >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${driver.attentionScore}%` }}
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-3">Última actualización: {driver.lastUpdate}</div>

                <Button onClick={() => onSelectDriver(driver)} className="w-full" variant="outline">
                  Ver Detalles Completos
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
