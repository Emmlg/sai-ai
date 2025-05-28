"use client"

import type { Driver } from "@/components/attention-monitor-app"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Route, Clock, Brain, Star, AlertTriangle } from "lucide-react"

interface DistanceSuggestionsProps {
  drivers: Driver[]
  onBack: () => void
}

function DistanceSuggestions({ drivers, onBack }: DistanceSuggestionsProps) {
  const getDistanceCategory = (distance: number) => {
    if (distance <= 50) return "corta"
    if (distance <= 200) return "media"
    return "larga"
  }

  const getDriverSuitability = (driver: Driver, distance: number) => {
    const category = getDistanceCategory(distance)
    let score = 0

    // Puntuación base por nivel de atención
    score += driver.attentionScore * 0.4

    // Puntuación por experiencia
    if (driver.experienceLevel === "experto") score += 30
    else if (driver.experienceLevel === "intermedio") score += 20
    else score += 10

    // Penalización por fatiga
    score -= driver.fatigueLevel * 0.3

    // Penalización por horas en servicio
    if (driver.hoursOnDuty) {
      if (driver.hoursOnDuty > 8) score -= 20
      else if (driver.hoursOnDuty > 6) score -= 10
    }

    // Ajuste por tipo de distancia
    if (category === "larga" && driver.experienceLevel === "novato") score -= 15
    if (category === "corta" && driver.attentionLevel === "critico") score -= 25

    return Math.max(0, Math.min(100, score))
  }

  const getSuggestedDrivers = (distanceCategory: string, maxDistance: number) => {
    return drivers
      .filter((driver) => driver.isOnDuty)
      .map((driver) => ({
        ...driver,
        suitabilityScore: getDriverSuitability(driver, maxDistance),
      }))
      .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
      .slice(0, 5)
  }

  const shortDistanceDrivers = getSuggestedDrivers("corta", 50)
  const mediumDistanceDrivers = getSuggestedDrivers("media", 200)
  const longDistanceDrivers = getSuggestedDrivers("larga", 500)

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getSuitabilityBadge = (score: number) => {
    if (score >= 80) return { text: "Excelente", color: "bg-green-100 text-green-800" }
    if (score >= 60) return { text: "Bueno", color: "bg-yellow-100 text-yellow-800" }
    return { text: "No recomendado", color: "bg-red-100 text-red-800" }
  }

  const DriverCard = ({ driver, suitabilityScore }: { driver: Driver; suitabilityScore: number }) => {
    const badge = getSuitabilityBadge(suitabilityScore)

    return (
      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={driver.image || "/placeholder.svg"} alt={driver.name} />
              <AvatarFallback>
                {driver.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-gray-900">{driver.name}</h4>
              <p className="text-sm text-gray-600">{driver.vehicleType}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${getSuitabilityColor(suitabilityScore).split(" ")[0]}`}>
              {Math.round(suitabilityScore)}%
            </div>
            <Badge className={badge.color}>{badge.text}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Brain className="h-4 w-4 mr-2" />
            Atención: {driver.attentionScore}%
          </div>
          <div className="flex items-center text-gray-600">
            <Star className="h-4 w-4 mr-2" />
            Experiencia: {driver.experienceLevel}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            En servicio: {driver.hoursOnDuty || 0}h
          </div>
          <div className="flex items-center text-gray-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Fatiga: {driver.fatigueLevel}%
          </div>
        </div>

        {suitabilityScore < 60 && (
          <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-700">
            <AlertTriangle className="h-4 w-4 inline mr-1" />
            No recomendado para esta distancia debido a {driver.fatigueLevel > 50 ? "alta fatiga" : "baja atención"}
          </div>
        )}
      </div>
    )
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
              <h1 className="text-2xl font-bold text-gray-900">Sugerencias por Distancia</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información general */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Route className="h-5 w-5 mr-2" />
              Sistema de Recomendaciones Inteligente
            </CardTitle>
            <CardDescription>
              Conductores sugeridos basados en nivel de atención, experiencia, fatiga y horas de servicio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Distancia Corta</h3>
                <p className="text-sm text-blue-700">Hasta 50 km</p>
                <p className="text-xs text-blue-600 mt-1">Rutas urbanas y locales</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Route className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-yellow-900">Distancia Media</h3>
                <p className="text-sm text-yellow-700">50 - 200 km</p>
                <p className="text-xs text-yellow-600 mt-1">Rutas regionales</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Distancia Larga</h3>
                <p className="text-sm text-purple-700">Más de 200 km</p>
                <p className="text-xs text-purple-600 mt-1">Rutas interurbanas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Distancia Corta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <MapPin className="h-5 w-5 mr-2" />
                Distancia Corta (≤ 50 km)
              </CardTitle>
              <CardDescription>Conductores recomendados para rutas urbanas y locales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shortDistanceDrivers.map((driver) => (
                  <DriverCard key={driver.id} driver={driver} suitabilityScore={driver.suitabilityScore} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distancia Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-600">
                <Route className="h-5 w-5 mr-2" />
                Distancia Media (50-200 km)
              </CardTitle>
              <CardDescription>Conductores recomendados para rutas regionales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mediumDistanceDrivers.map((driver) => (
                  <DriverCard key={driver.id} driver={driver} suitabilityScore={driver.suitabilityScore} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distancia Larga */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-600">
                <Clock className="h-5 w-5 mr-2" />
                Distancia Larga (> 200 km)
              </CardTitle>
              <CardDescription>Conductores recomendados para rutas interurbanas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {longDistanceDrivers.map((driver) => (
                  <DriverCard key={driver.id} driver={driver} suitabilityScore={driver.suitabilityScore} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Criterios de evaluación */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Criterios de Evaluación</CardTitle>
            <CardDescription>Factores considerados para las recomendaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <Brain className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-semibold">Nivel de Atención</h4>
                <p className="text-sm text-gray-600">40% del puntaje total</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Star className="h-6 w-6 text-yellow-600 mb-2" />
                <h4 className="font-semibold">Experiencia</h4>
                <p className="text-sm text-gray-600">30% del puntaje total</p>
              </div>
              <div className="p-4 border rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-semibold">Nivel de Fatiga</h4>
                <p className="text-sm text-gray-600">Penalización variable</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Clock className="h-6 w-6 text-purple-600 mb-2" />
                <h4 className="font-semibold">Horas de Servicio</h4>
                <p className="text-sm text-gray-600">Penalización por exceso</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { DistanceSuggestions }
export default DistanceSuggestions
