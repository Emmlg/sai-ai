// Definimos el tipo de datos esperados (opcional pero recomendado en TS)
export interface MetricsData {
    /*bostezos_totales_sesion: number;
    frecuencia_parpadeo_por_minuto: number;
    movimiento_cabeza_porcentaje_optimo: number;
    movimiento_ocular_porcentaje_optimo: number;
   // nivel_alerta_actual: number;
    puntuacion_somnolencia_actual: number;
   // tiempo_sesion_minutos: number;

    */
    timestamp: string;
    attentionScore: number;
    eyeMovement: number;
    headPosition: number;
    blinkRate: number;
    yawnCount: number;
}


const API_URL = "https://ae17-189-150-8-61.ngrok-free.app/metrics";

// Función que retorna los datos
export async function getMetricsData(): Promise<MetricsData[] | null> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: MetricsData[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener datos de métricas:", error);
        return null;
    }
}
