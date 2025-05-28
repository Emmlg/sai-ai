"use client"

import { useState } from "react"
import { ProfileList } from "@/components/profile-list"
import { ProfileDetail } from "@/components/profile-detail"
import { DriverHistory } from "@/components/driver-history"

export interface Profile {
  id: string
  name: string
  image: string
  status: "perfecto" | "con-problemas" | "critico"
  sleepData: {
    date: string
    hours: number
    quality: number
    deepSleep: number
    remSleep: number
  }[]
  lastUpdate: string
  averageHours: number
  sleepQuality: number
  // Nuevos campos para conductores
  licenseNumber: string
  vehicleType: string
  totalTrips: number
  confidenceLevel: number
  yearsExperience: number
  lastTripDate: string
  safetyScore: number
}

export interface DriverHistoryRecord {
  id: string
  driverId: string
  name: string
  image: string
  licenseNumber: string
  vehicleType: string
  totalTrips: number
  confidenceLevel: number
  yearsExperience: number
  safetyScore: number
  averageSleepQuality: number
  lastActiveDate: string
  status: "activo" | "inactivo" | "suspendido"
  incidentsCount: number
  perfectTripsPercentage: number
  riskLevel: "bajo" | "medio" | "alto"
}

export type CurrentView = "dashboard" | "profile-detail" | "history"

export function SleepMonitorApp() {
  const [currentView, setCurrentView] = useState<CurrentView>("dashboard")
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)

  const profiles: Profile[] = [
    {
      id: "1",
      name: "María González",
      image: "/placeholder.svg?height=80&width=80",
      status: "perfecto",
      lastUpdate: "Hace 2 horas",
      averageHours: 8.2,
      sleepQuality: 92,
      licenseNumber: "B-12345678",
      vehicleType: "Camión de carga",
      totalTrips: 1247,
      confidenceLevel: 95,
      yearsExperience: 8,
      lastTripDate: "2024-01-07",
      safetyScore: 98,
      sleepData: [
        { date: "2024-01-01", hours: 8.5, quality: 95, deepSleep: 2.1, remSleep: 1.8 },
        { date: "2024-01-02", hours: 7.8, quality: 88, deepSleep: 1.9, remSleep: 1.6 },
        { date: "2024-01-03", hours: 8.2, quality: 92, deepSleep: 2.0, remSleep: 1.7 },
        { date: "2024-01-04", hours: 8.0, quality: 90, deepSleep: 2.2, remSleep: 1.9 },
        { date: "2024-01-05", hours: 8.3, quality: 94, deepSleep: 2.1, remSleep: 1.8 },
        { date: "2024-01-06", hours: 7.9, quality: 89, deepSleep: 1.8, remSleep: 1.5 },
        { date: "2024-01-07", hours: 8.1, quality: 91, deepSleep: 2.0, remSleep: 1.7 },
      ],
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      image: "/placeholder.svg?height=80&width=80",
      status: "con-problemas",
      lastUpdate: "Hace 1 hora",
      averageHours: 6.5,
      sleepQuality: 68,
      licenseNumber: "A-87654321",
      vehicleType: "Autobús urbano",
      totalTrips: 892,
      confidenceLevel: 72,
      yearsExperience: 5,
      lastTripDate: "2024-01-07",
      safetyScore: 76,
      sleepData: [
        { date: "2024-01-01", hours: 6.2, quality: 65, deepSleep: 1.2, remSleep: 1.0 },
        { date: "2024-01-02", hours: 6.8, quality: 72, deepSleep: 1.4, remSleep: 1.2 },
        { date: "2024-01-03", hours: 6.0, quality: 60, deepSleep: 1.1, remSleep: 0.9 },
        { date: "2024-01-04", hours: 6.5, quality: 68, deepSleep: 1.3, remSleep: 1.1 },
        { date: "2024-01-05", hours: 6.9, quality: 75, deepSleep: 1.5, remSleep: 1.3 },
        { date: "2024-01-06", hours: 6.3, quality: 66, deepSleep: 1.2, remSleep: 1.0 },
        { date: "2024-01-07", hours: 6.7, quality: 70, deepSleep: 1.4, remSleep: 1.2 },
      ],
    },
    {
      id: "3",
      name: "Ana Martínez",
      image: "/placeholder.svg?height=80&width=80",
      status: "critico",
      lastUpdate: "Hace 30 min",
      averageHours: 4.8,
      sleepQuality: 35,
      licenseNumber: "C-11223344",
      vehicleType: "Taxi",
      totalTrips: 2156,
      confidenceLevel: 45,
      yearsExperience: 12,
      lastTripDate: "2024-01-07",
      safetyScore: 58,
      sleepData: [
        { date: "2024-01-01", hours: 4.5, quality: 30, deepSleep: 0.8, remSleep: 0.6 },
        { date: "2024-01-02", hours: 5.2, quality: 42, deepSleep: 1.0, remSleep: 0.8 },
        { date: "2024-01-03", hours: 4.0, quality: 25, deepSleep: 0.6, remSleep: 0.4 },
        { date: "2024-01-04", hours: 4.8, quality: 35, deepSleep: 0.9, remSleep: 0.7 },
        { date: "2024-01-05", hours: 5.0, quality: 38, deepSleep: 0.9, remSleep: 0.7 },
        { date: "2024-01-06", hours: 4.2, quality: 28, deepSleep: 0.7, remSleep: 0.5 },
        { date: "2024-01-07", hours: 4.9, quality: 40, deepSleep: 0.8, remSleep: 0.6 },
      ],
    },
  ]

  const driverHistory: DriverHistoryRecord[] = [
    {
      id: "h1",
      driverId: "1",
      name: "María González",
      image: "/placeholder.svg?height=80&width=80",
      licenseNumber: "B-12345678",
      vehicleType: "Camión de carga",
      totalTrips: 1247,
      confidenceLevel: 95,
      yearsExperience: 8,
      safetyScore: 98,
      averageSleepQuality: 92,
      lastActiveDate: "2024-01-07",
      status: "activo",
      incidentsCount: 2,
      perfectTripsPercentage: 94,
      riskLevel: "bajo",
    },
    {
      id: "h2",
      driverId: "2",
      name: "Carlos Rodríguez",
      image: "/placeholder.svg?height=80&width=80",
      licenseNumber: "A-87654321",
      vehicleType: "Autobús urbano",
      totalTrips: 892,
      confidenceLevel: 72,
      yearsExperience: 5,
      safetyScore: 76,
      averageSleepQuality: 68,
      lastActiveDate: "2024-01-07",
      status: "activo",
      incidentsCount: 8,
      perfectTripsPercentage: 78,
      riskLevel: "medio",
    },
    {
      id: "h3",
      driverId: "3",
      name: "Ana Martínez",
      image: "/placeholder.svg?height=80&width=80",
      licenseNumber: "C-11223344",
      vehicleType: "Taxi",
      totalTrips: 2156,
      confidenceLevel: 45,
      yearsExperience: 12,
      safetyScore: 58,
      averageSleepQuality: 35,
      lastActiveDate: "2024-01-07",
      status: "activo",
      incidentsCount: 15,
      perfectTripsPercentage: 62,
      riskLevel: "alto",
    },
    {
      id: "h4",
      driverId: "4",
      name: "Luis Fernández",
      image: "/placeholder.svg?height=80&width=80",
      licenseNumber: "B-55667788",
      vehicleType: "Camión de carga",
      totalTrips: 1856,
      confidenceLevel: 88,
      yearsExperience: 15,
      safetyScore: 91,
      averageSleepQuality: 85,
      lastActiveDate: "2024-01-05",
      status: "inactivo",
      incidentsCount: 4,
      perfectTripsPercentage: 89,
      riskLevel: "bajo",
    },
    {
      id: "h5",
      driverId: "5",
      name: "Sofia López",
      image: "/placeholder.svg?height=80&width=80",
      licenseNumber: "A-99887766",
      vehicleType: "Autobús interurbano",
      totalTrips: 1423,
      confidenceLevel: 78,
      yearsExperience: 7,
      safetyScore: 82,
      averageSleepQuality: 72,
      lastActiveDate: "2024-01-06",
      status: "activo",
      incidentsCount: 6,
      perfectTripsPercentage: 83,
      riskLevel: "medio",
    },
    {
      id: "h6",
      driverId: "6",
      name: "Diego Morales",
      image: "/placeholder.svg?height=80&width=80",
      licenseNumber: "C-44332211",
      vehicleType: "Taxi",
      totalTrips: 987,
      confidenceLevel: 52,
      yearsExperience: 3,
      safetyScore: 64,
      averageSleepQuality: 48,
      lastActiveDate: "2024-01-04",
      status: "suspendido",
      incidentsCount: 12,
      perfectTripsPercentage: 68,
      riskLevel: "alto",
    },
    {
      id: "h7",
      driverId: "7",
      name: "Carmen Ruiz",
      image: "/placeholder.svg?height=80&width=80",
      licenseNumber: "B-77889900",
      vehicleType: "Camión de reparto",
      totalTrips: 2341,
      confidenceLevel: 92,
      yearsExperience: 11,
      safetyScore: 96,
      averageSleepQuality: 89,
      lastActiveDate: "2024-01-06",
      status: "activo",
      incidentsCount: 3,
      perfectTripsPercentage: 91,
      riskLevel: "bajo",
    },
    {
      id: "h8",
      driverId: "8",
      name: "Roberto Silva",
      image: "/placeholder.svg?height=80&width=80",
      licenseNumber: "A-12398765",
      vehicleType: "Autobús escolar",
      totalTrips: 756,
      confidenceLevel: 81,
      yearsExperience: 6,
      safetyScore: 87,
      averageSleepQuality: 79,
      lastActiveDate: "2024-01-03",
      status: "inactivo",
      incidentsCount: 5,
      perfectTripsPercentage: 85,
      riskLevel: "bajo",
    },
  ]

  const handleSelectProfile = (profile: Profile) => {
    setSelectedProfile(profile)
    setCurrentView("profile-detail")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedProfile(null)
  }

  const handleViewHistory = () => {
    setCurrentView("history")
  }

  if (currentView === "profile-detail" && selectedProfile) {
    return <ProfileDetail profile={selectedProfile} onBack={handleBackToDashboard} />
  }

  if (currentView === "history") {
    return <DriverHistory driverHistory={driverHistory} onBack={handleBackToDashboard} />
  }

  return <ProfileList profiles={profiles} onSelectProfile={handleSelectProfile} onViewHistory={handleViewHistory} />
}
