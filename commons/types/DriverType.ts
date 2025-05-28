import {
    ATTENTION_LEVEL,
    CURRENT_VIEW,
    EXPERIENCE_LEVEL,
    RISK_LEVEL,
    STATUS} from "@/commons/constants/enums";

export interface Driver {
    id: string
    name: string
    image: string
    attentionLevel: ATTENTION_LEVEL
    attentionScore: number // 0-100
    fatigueLevel: number // 0-100
    alertnessData: {
        timestamp: string
        attentionScore: number
        eyeMovement: number
        headPosition: number
        blinkRate: number
        yawnCount: number
    }[]

    lastUpdate: string
    licenseNumber: string
    vehicleType: string
    totalTrips: number
    experienceLevel: EXPERIENCE_LEVEL
    yearsExperience: number
    lastTripDate: string
    safetyScore: number
    currentRoute?: string
    estimatedDistance?: number
    isOnDuty: boolean
    shiftStartTime?: string
    hoursOnDuty?: number
}

export interface DriverHistoryRecord {
    id: string
    driverId: string
    name: string
    image: string
    licenseNumber: string
    vehicleType: string
    totalTrips: number
    experienceLevel: EXPERIENCE_LEVEL
    yearsExperience: number
    averageAttentionScore: number
    lastActiveDate: string
    status: STATUS
    incidentsCount: number
    tipoviaje: string
    riskLevel : RISK_LEVEL
    totalHoursDriven: number
    fatigueIncidents: number
}

export type CurrentView = CURRENT_VIEW
