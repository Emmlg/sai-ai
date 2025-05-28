"use client"

import type { Profile } from "@/components/sleep-monitor-app"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Activity, ChevronRight, Moon, History, Truck, Shield, Star } from "lucide-react"

interface ProfileListProps {
  profiles: Profile[]
  onSelectProfile: (profile: Profile) => void
  onViewHistory: () => void
}

export function ProfileList({ profiles, onSelectProfile, onViewHistory }: ProfileListProps) {
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

  const getStatusIcon = (status: Profile["status"]) => {
    switch (status) {
      case "perfecto":
        return "✓"
      case "con-problemas":
        return "⚠"
      case "critico":
        return "⚠"
      default:
        return "?"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "text-green-600"
    if (confidence >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Moon className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Monitor de Sueño - Conductores</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={onViewHistory} variant="outline" className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                Ver Historial
              </Button>
              <Badge variant="outline" className="text-sm">
                {profiles.length} Conductores Activos
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de perfiles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Conductores en Servicio</h2>
          <p className="text-gray-600">Monitoreo en tiempo real del estado de sueño y seguridad</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
                      <AvatarFallback>
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                      <p className="text-sm text-gray-500">Lic: {profile.licenseNumber}</p>
                      <p className="text-xs text-gray-400">{profile.vehicleType}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(profile.status)}>
                    {getStatusIcon(profile.status)} {profile.status.replace("-", " ")}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Truck className="h-4 w-4 mr-2" />
                      Total de viajes
                    </div>
                    <span className="font-medium">{profile.totalTrips.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="h-4 w-4 mr-2" />
                      Nivel de confianza
                    </div>
                    <span className={`font-medium ${getConfidenceColor(profile.confidenceLevel)}`}>
                      {profile.confidenceLevel}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Promedio de sueño
                    </div>
                    <span className="font-medium">{profile.averageHours}h</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Activity className="h-4 w-4 mr-2" />
                      Calidad de sueño
                    </div>
                    <span className="font-medium">{profile.sleepQuality}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 mr-2" />
                      Puntuación de seguridad
                    </div>
                    <span className="font-medium">{profile.safetyScore}/100</span>
                  </div>
                </div>

                {/* Barra de progreso de confianza */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Nivel de Confianza</span>
                    <span>{profile.confidenceLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        profile.confidenceLevel >= 85
                          ? "bg-green-500"
                          : profile.confidenceLevel >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${profile.confidenceLevel}%` }}
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-3">Última actualización: {profile.lastUpdate}</div>

                <Button onClick={() => onSelectProfile(profile)} className="w-full" variant="outline">
                  Ver Detalles del Conductor
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
