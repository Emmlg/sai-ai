"use client"

import type { DriverHistoryRecord } from "@/components/attention-monitor-app"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Brain,
  Star,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Filter,
  Download,
  Clock,
  Activity,
} from "lucide-react"
import { useState } from "react"

interface DriverHistoryProps {
  driverHistory: DriverHistoryRecord[]
  onBack: () => void
}

export function DriverHistory({ driverHistory, onBack }: DriverHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [riskFilter, setRiskFilter] = useState("todos")

  const getStatusColor = (status: DriverHistoryRecord["status"]) => {
    switch (status) {
      case "activo":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactivo":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "suspendido":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskColor = (risk: DriverHistoryRecord["riskLevel"]) => {
    switch (risk) {
      case "bajo":
        return "text-green-600 bg-green-50"
      case "medio":
        return "text-yellow-600 bg-yellow-50"
      case "alto":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getAttentionColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredDrivers = driverHistory.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || driver.status === statusFilter
    const matchesRisk = riskFilter === "todos" || driver.riskLevel === riskFilter

    return matchesSearch && matchesStatus && matchesRisk
  })

  const totalDrivers = driverHistory.length
  const activeDrivers = driverHistory.filter((d) => d.status === "activo").length
  const highRiskDrivers = driverHistory.filter((d) => d.riskLevel === "alto").length
  const averageAttention = Math.round(driverHistory.reduce((acc, d) => acc + d.averageAttentionScore, 0) / totalDrivers)

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
              <h1 className="text-2xl font-bold text-gray-900">Historial de Conductores</h1>
            </div>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exportar Reporte
            </Button>
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
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Conductores</p>
                  <p className="text-2xl font-bold text-gray-900">{totalDrivers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conductores Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{activeDrivers}</p>
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
                  <p className="text-sm font-medium text-gray-600">Alto Riesgo</p>
                  <p className="text-2xl font-bold text-gray-900">{highRiskDrivers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Atención Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">{averageAttention}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtros y Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre o licencia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                  <SelectItem value="suspendido">Suspendido</SelectItem>
                </SelectContent>
              </Select>

              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Nivel de riesgo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los niveles</SelectItem>
                  <SelectItem value="bajo">Riesgo Bajo</SelectItem>
                  <SelectItem value="medio">Riesgo Medio</SelectItem>
                  <SelectItem value="alto">Riesgo Alto</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("todos")
                  setRiskFilter("todos")
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de conductores */}
        <Card>
          <CardHeader>
            <CardTitle>Registro Histórico de Conductores</CardTitle>
            <CardDescription>
              Mostrando {filteredDrivers.length} de {totalDrivers} conductores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={driver.image || "/placeholder.svg"} alt={driver.name} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                        <p className="text-sm text-gray-600">Licencia: {driver.licenseNumber}</p>
                        <p className="text-sm text-gray-500">{driver.vehicleType}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Total Viajes</p>
                        <p className="font-bold text-lg">{driver.totalTrips.toLocaleString()}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">Atención Promedio</p>
                        <p className={`font-bold text-lg ${getAttentionColor(driver.averageAttentionScore)}`}>
                          {driver.averageAttentionScore}%
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">Experiencia</p>
                        <p className="font-bold text-lg">{driver.yearsExperience} años</p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">Horas Totales</p>
                        <p className="font-bold text-lg">{driver.totalHoursDriven.toLocaleString()}h</p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
                        <Badge className={getRiskColor(driver.riskLevel)}>Riesgo {driver.riskLevel}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Último activo: {new Date(driver.lastActiveDate).toLocaleDateString("es-ES")}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Incidentes: {driver.incidentsCount}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star className="h-4 w-4 mr-2" />
                      Viajes perfectos: {driver.perfectTripsPercentage}%
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Incidentes fatiga: {driver.fatigueIncidents}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
