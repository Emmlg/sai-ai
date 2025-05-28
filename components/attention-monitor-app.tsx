"use client"

import { useState } from "react"
import { RealTimeMonitor } from "@/components/real-time-monitor"
import { DriverDetail } from "@/components/driver-detail"
import { DriverHistory } from "@/components/driver-history"
import {driverData} from "@/fakeData/DriverData";
import {getDriverHistoryRecord} from "@/fakeData/DriverHistoryRecord";
import {CurrentView, Driver} from "@/commons/types/DriverType";
import {CURRENT_VIEW} from "@/commons/constants/enums";
// Temporarily commenting out the problematic import
// import { DistanceSuggestions } from "@/components/distance-suggestions"


export function AttentionMonitorApp() {
  const [currentView, setCurrentView] = useState<CurrentView>(CURRENT_VIEW.MONITOR)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)

  const drivers = driverData();
  const driverHistory = getDriverHistoryRecord();


  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver)
    setCurrentView(CURRENT_VIEW.DRIVERDETAIL)
  }

  const handleBackToMonitor = () => {
    setCurrentView(CURRENT_VIEW.MONITOR)
    setSelectedDriver(null)
  }

  const handleViewHistory = () => {
    setCurrentView(CURRENT_VIEW.HISTORY)
  }

  const handleViewSuggestions = () => {
    // Temporarily show an alert instead of navigating to suggestions
    alert("Módulo de sugerencias en desarrollo. Próximamente disponible.")
    // setCurrentView("suggestions")
  }

  if (currentView === CURRENT_VIEW.DRIVERDETAIL && selectedDriver) {
    return <DriverDetail driver={selectedDriver} onBack={handleBackToMonitor} />
  }

  if (currentView === CURRENT_VIEW.HISTORY) {
    return <DriverHistory driverHistory={driverHistory} onBack={handleBackToMonitor} />
  }

  // Temporarily commenting out suggestions view
  // if (currentView === "suggestions") {
  //   return <DistanceSuggestions drivers={drivers} onBack={handleBackToMonitor} />
  // }

  return (
    <RealTimeMonitor
      drivers={drivers}
      onSelectDriver={handleSelectDriver}
      onViewHistory={handleViewHistory}
      onViewSuggestions={handleViewSuggestions}
    />
  )
}

export default AttentionMonitorApp
