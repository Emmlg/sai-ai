"use client"

import { useState } from "react"
import {
  Bell,
  Home,
  Users,
  BarChart3,
  Settings,
  Search,
  Menu,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    {
      title: "Ingresos Totales",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Usuarios Activos",
      value: "2,350",
      change: "+180.1%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Ventas",
      value: "12,234",
      change: "+19%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Conversión",
      value: "3.2%",
      change: "-4.3%",
      trend: "down",
      icon: Activity,
    },
  ]

  const recentSales = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "+$39.00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      amount: "+$99.00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "+$39.00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Usuarios", active: false },
    { icon: BarChart3, label: "Analíticas", active: false },
    { icon: ShoppingCart, label: "Ventas", active: false },
    { icon: Settings, label: "Configuración", active: false },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white w-64 min-h-screen shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 fixed z-30`}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-gray-800">Mi Dashboard</h1>
        </div>
        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                item.active ? "bg-blue-50 border-r-2 border-blue-500 text-blue-600" : ""
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Contenido del dashboard */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                    <span className="text-gray-500 ml-1">desde el mes pasado</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de ventas */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Resumen de Ventas</CardTitle>
                <CardDescription>Ventas de los últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {[40, 60, 45, 80, 65, 90].map((height, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="bg-blue-500 w-full rounded-t" style={{ height: `${height}%` }} />
                      <span className="text-xs text-gray-500 mt-2">
                        {["Ene", "Feb", "Mar", "Abr", "May", "Jun"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ventas recientes */}
            <Card>
              <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
                <CardDescription>Has realizado 265 ventas este mes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={sale.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {sale.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{sale.name}</p>
                        <p className="text-sm text-gray-500">{sale.email}</p>
                      </div>
                      <div className="ml-auto font-medium">{sale.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progreso de objetivos */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Progreso de Objetivos</CardTitle>
                <CardDescription>Tu progreso hacia los objetivos mensuales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Ventas</span>
                      <span className="text-sm text-gray-500">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Nuevos Usuarios</span>
                      <span className="text-sm text-gray-500">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Ingresos</span>
                      <span className="text-sm text-gray-500">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
