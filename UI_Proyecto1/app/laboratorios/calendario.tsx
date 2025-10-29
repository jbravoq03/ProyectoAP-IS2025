import { Button, ButtonText } from '@/components/ui/button';
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const SOLICITUDES: Solicitud[] = [
  { fecha: "2025-09-29", inicio: "08:00", fin: "10:00" },
  { fecha: "2025-01-11", inicio: "13:00", fin: "16:00" },
  { fecha: "2025-09-18", inicio: "09:00", fin: "12:00" },
  { fecha: "2025-09-23", inicio: "14:00", fin: "17:30" },
  { fecha: "2025-10-01", inicio: "08:00", fin: "09:00" }, // prueba cambio de mes
];

function Page() {
  return <AvailabilityCalendar solicitudes={SOLICITUDES} />;
}

/* ===== Tipos ===== */
export type Solicitud = {
  /** Fecha en ISO local YYYY-MM-DD */
  fecha: string;
  /** Hora 24h "HH:mm" */
  inicio: string;
  /** Hora 24h "HH:mm" */
  fin: string;
};

type Props = {
  solicitudes?: Solicitud[];   // opcional
  onBack?: () => void;
  initialDate?: Date;
};

/* ===== Utilidades de fecha (sin librerías) ===== */
const fmtMonth = (d: Date) =>
  new Intl.DateTimeFormat("es-ES", { month: "long" }).format(d);

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const ymd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// 0..6 con lunes=0
const dowMon0 = (d: Date) => (d.getDay() + 6) % 7;

/** Devuelve 42 días (6 semanas) desde el lunes de la primera semana que contiene el día 1 del mes */
function buildMonthGrid(year: number, month0: number) {
  const first = new Date(year, month0, 1);
  const start = new Date(year, month0, 1 - dowMon0(first)); // lunes inicial
  const days: { date: Date; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({ date: d, inMonth: d.getMonth() === month0 });
  }
  return days;
}

/* ===== Componente ===== */
export default function AvailabilityCalendar({
  solicitudes = [],           // ← default a []
  onBack,
  initialDate = new Date(),
}: Props) {
  const [cursor, setCursor] = useState<Date>(initialDate);

  // índice rápido de solicitudes por día (YYYY-MM-DD)
  const index = useMemo(() => {
    const map = new Map<string, Array<{ inicio: string; fin: string }>>();
    for (const s of solicitudes) {
      if (!map.has(s.fecha)) map.set(s.fecha, []);
      map.get(s.fecha)!.push({ inicio: s.inicio, fin: s.fin });
    }
    // ordenar franjas por hora
    for (const [k, arr] of map) {
      arr.sort((a, b) => (a.inicio < b.inicio ? -1 : 1));
      map.set(k, arr);
    }
    return map;
  }, [solicitudes]);

  const year = cursor.getFullYear();
  const month0 = cursor.getMonth();
  const days = buildMonthGrid(year, month0);

  const monthLabel = `${fmtMonth(cursor)} ${year}`; // ej. "enero 2025"

  const weekLabels = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

  const goto = (deltaMonths: number) => {
    const d = new Date(cursor);
    d.setMonth(d.getMonth() + deltaMonths, 1);
    setCursor(d);
  };

  const handleLaboratorios = () => {
        // Redirige al inicio de sesion
          router.replace('/laboratorios/dashboard');
      };

  return (
  
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={styles.header}>
          Sistema de Gestión de Laboratorios Académicos del Tecnológico de Costa Rica
      </Text>
      <View style={styles.line } />

      <View style={{ 
        flexDirection: 'row',   // horizontal (por defecto es column)
        justifyContent: 'center', // centra horizontalmente
        alignItems: 'center',     // centra verticalmente
        marginVertical: 20,       // opcional, separación arriba/abajo
      }}>
        <Button variant="solid" onPress={handleLaboratorios} style={{backgroundColor: "#ffffffff", 
                                        borderColor: "#000000", 
                                        borderWidth: 2,
                                        width: 200,
                                        justifyContent: 'center',
                                        }} size="sm" action="primary">

            <Icon  as={ArrowLeftIcon} color='#000000ff' size="sm" className="mr-2" />
            <ButtonText>Volver al Dashboard</ButtonText>
        </Button>

      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}>
        {/* Título calendario */}
        <Text style={styles.calendarTitle}>Calendario de disponibilidad</Text>
        <Text style={styles.calendarSubtitle}>
          • Días marcados <Text style={styles.dot}>•</Text> indican que el laboratorio está reservado.
        </Text>

        {/* Mes */}
        <Text style={styles.monthLabel}>{monthLabel}</Text>

        {/* Días de la semana */}
        <View style={styles.weekRow}>
          {weekLabels.map(w => (
            <Text key={w} style={styles.weekDay}>{w.toUpperCase()}</Text>
          ))}
        </View>

        {/* Grilla de días */}
        <View style={styles.grid}>
          {days.map(({ date, inMonth }, i) => {
            const k = ymd(date);
            const isWeekend = dowMon0(date) >= 5;
            const hasReservations = index.has(k);
            const reservations = index.get(k) || [];
            const title = reservations.length
              ? reservations.map(r => `${r.inicio}–${r.fin}`).join(" · ")
              : "";

            return (
              <View key={k + i} style={styles.dayCell}>
                <Text style={{
                  fontSize: 14,
                  color: !inMonth ? '#A0AEC0' : isWeekend ? '#F56565' : '#1A202C',
                }}>
                  {date.getDate()}
                </Text>
                {hasReservations && (
                  <View style={styles.dotReserved} />
                )}
              </View>
            );
          })}
        </View>

        {/* Navegación */}
        <View style={styles.navRow}>
          <Button variant="outline" onPress={() => goto(-1)}>
            <Text>{"<"} Anterior</Text>
          </Button>
          <Button variant="outline" onPress={() => goto(1)}>
            <Text>Siguiente {">"}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>



      
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#ffffffff',
    padding: 20,
  },
  containerCard: {
    flex: 1,
    width: '150%',
    alignItems: 'center', 
    backgroundColor: '#ffffffff',
    padding: 50,
  },
  horizontalContainer: {
    backgroundColor: '#fff',
    borderColor: '#ffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    gap: 8, 
    paddingVertical: 10,
    paddingBottom: 0,
  },
  card: {
    justifyContent: 'center',
    marginTop: 40,
    width: '90%',
    maxWidth: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#ffffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
   header: {
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  line: {
    marginTop: 10,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
    marginBottom: 15,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 80,
    paddingRight: 110,
  },
  tableContent: {
    backgroundColor: "#ffffff", 
    color: "#000000",
  },
   dayCell: {
    width: '14.28%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dotReserved: {
    position: 'absolute',
    top: 20,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F56565',
  },
   navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
    grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },calendarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 4,
  },
  calendarSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F56565',
  },
    monthLabel: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#718096',
    marginBottom: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDay: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    color: '#718096',
  },
});