"use client"

import type { Profile } from "@/components/sleep-monitor-app"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Clock, Activity, Moon, Brain, Eye } from "lucide-react"

interface ProfileDetailProps {
  profile: Profile
  onBack: () => void
}

export function ProfileDetail({ profile, onBack }: ProfileDetailProps) {
  const getStatusColor = (status: Profile["status"]) => {
    switch (status) {
      case "perfecto":
        return "bg-green-100 text-green-800 border-green-200"
      case "con-problemas":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critico":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getQualityColor = (quality: number) => {
    if (quality >= 80) return "text-green-600"
    if (quality >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getBarColor = (quality: number) => {
    if (quality >= 80) return "bg-green-500"
    if (quality >= 60) return "bg-yellow-500"
    return "bg-red-500"
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
                Volver
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Detalles del Perfil</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información del perfil */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback className="text-2xl">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
                  <Badge className={getStatusColor(profile.status)}>{profile.status.replace("-", " ")}</Badge>
                </div>
                <p className="text-gray-600 mb-4">Última actualización: {profile.lastUpdate}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{profile.averageHours}h</div>
                    <div className="text-sm text-gray-500">Promedio de sueño</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getQualityColor(profile.sleepQuality)}`}>
                      {profile.sleepQuality}%
                    </div>
                    <div className="text-sm text-gray-500">Calidad general</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {profile.sleepData[profile.sleepData.length - 1]?.deepSleep || 0}h
                    </div>
                    <div className="text-sm text-gray-500">Sueño profundo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {profile.sleepData[profile.sleepData.length - 1]?.remSleep || 0}h
                    </div>
                    <div className="text-sm text-gray-500">Sueño REM</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de rendimiento de sueño */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Rendimiento de Sueño (7 días)
              </CardTitle>
              <CardDescription>Calidad de sueño diaria con código de colores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.sleepData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-sm text-gray-600">
                      {new Date(data.date).toLocaleDateString("es-ES", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{data.hours}h de sueño</span>
                        <span className={getQualityColor(data.quality)}>{data.quality}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${getBarColor(data.quality)}`}
                          style={{ width: `${data.quality}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Análisis detallado */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Moon className="h-5 w-5 mr-2" />
                  Análisis de Fases del Sueño
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 text-purple-600 mr-3" />
                      <span className="font-medium">Sueño Profundo</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">
                      {profile.sleepData[profile.sleepData.length - 1]?.deepSleep || 0}h
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <div className="flex items-center">
                      <Eye className="h-5 w-5 text-indigo-600 mr-3" />
                      <span className="font-medium">Sueño REM</span>
                    </div>
                    <span className="text-lg font-bold text-indigo-600">
                      {profile.sleepData[profile.sleepData.length - 1]?.remSleep || 0}h
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Resumen Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total de horas dormidas:</span>
                    <span className="font-medium">
                      {profile.sleepData.reduce((acc, data) => acc + data.hours, 0).toFixed(1)}h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calidad promedio:</span>
                    <span className={`font-medium ${getQualityColor(profile.sleepQuality)}`}>
                      {profile.sleepQuality}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mejor noche:</span>
                    <span className="font-medium text-green-600">
                      {Math.max(...profile.sleepData.map((d) => d.quality))}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Noche más difícil:</span>
                    <span className="font-medium text-red-600">
                      {Math.min(...profile.sleepData.map((d) => d.quality))}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
