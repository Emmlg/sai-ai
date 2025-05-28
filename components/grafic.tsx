"use client";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, CardHeader } from "@mui/material";

const alertnessData = [
    { timestamp: "14:00", attentionScore: 75, eyeMovement: 70, headPosition: 73, blinkRate: 26, yawnCount: 2 },
    { timestamp: "14:15", attentionScore: 72, eyeMovement: 68, headPosition: 71, blinkRate: 28, yawnCount: 3 },
    { timestamp: "14:30", attentionScore: 74, eyeMovement: 72, headPosition: 74, blinkRate: 27, yawnCount: 2 },
    { timestamp: "14:45", attentionScore: 70, eyeMovement: 66, headPosition: 69, blinkRate: 30, yawnCount: 4 },
    { timestamp: "15:00", attentionScore: 72, eyeMovement: 69, headPosition: 72, blinkRate: 29, yawnCount: 3 },
];

// Calculamos distancias acumuladas:
const totalDistance = 451;
const segment = totalDistance / alertnessData.length;
const distanceData = alertnessData.map((entry, index) => ({
    distance: Math.round(segment * (index + 1)),
    attentionScore: entry.attentionScore,
}));

const xvalio = [0,10,20,30,40,50,60,70,80,90,100];

type Props = {
    attentionLevels?: number[];
    distance: number[];
};

export default function AttentionByDistanceChart( { attentionLevels,distance }: Props) {
    return (
        <Card sx={{ maxWidth: "100%", mb: 4 }}>
            <CardHeader title={"Distancia por Nivel de Atención"} />
            <CardContent>
                <LineChart
                    xAxis={[
                        {
                            label: "Nivel de Atención (%)",
                            data: attentionLevels,
                            min: 0,
                            max: 100,
                            tickMinStep: 10,
                        },
                    ]}
                    yAxis={[
                        {
                            label: "Distancia recorrida (km)",
                        },
                    ]}
                    series={[
                        {
                            label: "Distancia",
                            data: distance,
                        },
                    ]}
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
