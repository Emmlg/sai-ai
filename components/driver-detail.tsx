"use client"

import type { Driver } from "@/commons/types/DriverType"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Eye, Brain, Activity, Clock, MapPin, AlertTriangle, TrendingUp } from "lucide-react"
import AttentionByDistanceChart from "@/components/grafic";

interface DriverDetailProps {
  driver: Driver
  onBack: () => void
}

export function DriverDetail({ driver, onBack }: DriverDetailProps) {
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getBarColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getExperienceColor = (level: Driver["experienceLevel"]) => {
    switch (level) {
      case "experto":
        return "text-green-600"
      case "intermedio":
        return "text-yellow-600"
      case "novato":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Monitor
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Detalles del Conductor</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información del conductor */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={driver.image || "/placeholder.svg"} alt={driver.name} />
                  <AvatarFallback className="text-2xl">
                    {driver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {driver.isOnDuty && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">{driver.name}</h2>
                  <Badge className={getAttentionColor(driver.attentionLevel)}>{driver.attentionLevel}</Badge>
                  {driver.isOnDuty && <Badge className="bg-green-100 text-green-800">En Servicio</Badge>}
                </div>
                <p className="text-gray-600 mb-4">
                  Licencia: {driver.licenseNumber} | {driver.vehicleType}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(driver.attentionScore)}`}>
                      {driver.attentionScore}%
                    </div>
                    <div className="text-sm text-gray-500">Nivel de atención</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(100 - driver.fatigueLevel)}`}>
                      {driver.fatigueLevel}%
                    </div>
                    <div className="text-sm text-gray-500">Nivel de fatiga</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getExperienceColor(driver.experienceLevel)}`}>
                      {driver.yearsExperience}
                    </div>
                    <div className="text-sm text-gray-500">Años experiencia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{driver.safetyScore}/100</div>
                    <div className="text-sm text-gray-500">Puntuación seguridad</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerta crítica si aplica */}
        {driver.attentionLevel === "critico" && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-red-800">¡ESTADO CRÍTICO DE ATENCIÓN!</h3>
                  <p className="text-red-700 text-sm">
                    Se recomienda parada inmediata de seguridad y contacto con el conductor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de atención en tiempo real */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Monitoreo de Atención (Últimos 60 min)
              </CardTitle>
              <CardDescription>Evolución del nivel de atención en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {driver.alertnessData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-600">{data.timestamp}</div>
                    <div className="flex-1">

                    </div>
                    < AttentionByDistanceChart
                        attentionLevels={data.attentionScore}
                        distance={data.distanceKm}
                    />
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>

          {/* Métricas detalladas */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Métricas de Atención Detalladas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {driver.alertnessData.length > 0 && (
                    <>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <Eye className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="font-medium">Movimiento Ocular</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">
                          {driver.alertnessData[driver.alertnessData.length - 1]?.eyeMovement || 0}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <Brain className="h-5 w-5 text-green-600 mr-3" />
                          <span className="font-medium">Posición de Cabeza</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          {driver.alertnessData[driver.alertnessData.length - 1]?.headPosition || 0}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center">
                          <Activity className="h-5 w-5 text-yellow-600 mr-3" />
                          <span className="font-medium">Frecuencia de Parpadeo</span>
                        </div>
                        <span className="text-lg font-bold text-yellow-600">
                          {driver.alertnessData[driver.alertnessData.length - 1]?.blinkRate || 0}/min
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                          <span className="font-medium">Bostezos Detectados</span>
                        </div>
                        <span className="text-lg font-bold text-red-600">
                          {driver.alertnessData[driver.alertnessData.length - 1]?.yawnCount || 0}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Información de Ruta Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {driver.currentRoute && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ruta:</span>
                      <span className="font-medium">{driver.currentRoute}</span>
                    </div>
                  )}
                  {driver.estimatedDistance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distancia estimada:</span>
                      <span className="font-medium">{driver.estimatedDistance} km</span>
                    </div>
                  )}
                  {driver.shiftStartTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inicio de turno:</span>
                      <span className="font-medium">{driver.shiftStartTime}</span>
                    </div>
                  )}
                  {driver.hoursOnDuty && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horas en servicio:</span>
                      <span className={`font-medium ${driver.hoursOnDuty > 8 ? "text-red-600" : "text-green-600"}`}>
                        {driver.hoursOnDuty}h
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total de viajes:</span>
                    <span className="font-medium">{driver.totalTrips.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nivel de experiencia:</span>
                    <span className={`font-medium ${getExperienceColor(driver.experienceLevel)}`}>
                      {driver.experienceLevel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recomendaciones */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Recomendaciones Basadas en Estado Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {driver.attentionScore < 60 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mb-2" />
                  <h4 className="font-semibold text-red-800">Atención Crítica</h4>
                  <p className="text-sm text-red-700">Parada inmediata recomendada</p>
                </div>
              )}
              {driver.fatigueLevel > 70 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600 mb-2" />
                  <h4 className="font-semibold text-yellow-800">Alta Fatiga</h4>
                  <p className="text-sm text-yellow-700">Descanso de 15-30 minutos</p>
                </div>
              )}
              {driver.hoursOnDuty && driver.hoursOnDuty > 8 && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mb-2" />
                  <h4 className="font-semibold text-orange-800">Exceso de Horas</h4>
                  <p className="text-sm text-orange-700">Considerar cambio de conductor</p>
                </div>
              )}
              {driver.attentionScore >= 80 && driver.fatigueLevel < 30 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 mb-2" />
                  <h4 className="font-semibold text-green-800">Estado Óptimo</h4>
                  <p className="text-sm text-green-700">Apto para rutas largas</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
