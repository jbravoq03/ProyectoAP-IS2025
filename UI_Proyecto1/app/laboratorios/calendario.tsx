import { router } from "expo-router";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import React, { useMemo, useState } from "react";
import { ScrollView, Image , StyleSheet, Text, View} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';

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
    //Wrapper a pantalla completa
    <div className="h-[100dvh] min-h-[100dvh] flex flex-col bg-white">

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


      {/*scroll view*/}
      <main className="flex-1 overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <div className="mx-auto w-full max-w-4xl p-6 flex flex-col min-h-0">
          {/* Header de la página */}
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-800">
              Calendario de disponibilidad
            </h1>
          </div>

          <p className="mb-4 text-sm text-gray-600">
            • Días marcados (<span className="inline-block h-2 w-2 rounded-full bg-red-500 align-middle" />)
            indican que el laboratorio está reservado.
          </p>

          {/* Título del mes */}
          <div className="mb-2 text-sm uppercase tracking-wide text-gray-500">
            {monthLabel}
          </div>

          {/* Cabecera de días */}
          <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-gray-500">
            {weekLabels.map((w) => (
              <div key={w} className="uppercase">{w}</div>
            ))}
          </div>

          {/* Contenedor flexible para la grilla + navegación */}
          <section className="mt-1 flex flex-col flex-1 min-h-0">
            {/* Grilla de días: 6 filas fijas y ocupa el espacio disponible */}
            <div className="grid grid-cols-7 grid-rows-6 gap-y-5 text-center flex-1">
              {days.map(({ date, inMonth }, i) => {
                const k = ymd(date);
                const isWeekend = dowMon0(date) >= 5;
                const hasReservations = index.has(k);
                const reservations = index.get(k) || [];
                const title = reservations.length
                  ? reservations.map((r) => `${r.inicio}–${r.fin}`).join(" · ")
                  : "";

                return (
                  <div key={k + i} className="relative">
                    <span
                      className={[
                        "text-sm",
                        inMonth ? "text-gray-800" : "text-gray-400",
                        isWeekend && inMonth ? "text-red-500" : "",
                        "select-none",
                      ].join(" ")}
                      title={title}
                    >
                      {date.getDate()}
                    </span>

                    {hasReservations && (
                      <span
                        className="absolute left-1/2 top-5 -mt-0.5 -translate-x-1/2 rounded-full bg-red-500"
                        style={{ width: 6, height: 6 }}
                        title={title}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navegación: pegada al fondo del main */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => goto(-1)}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 text-gray-800"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                  <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Anterior
              </button>

              <button
                type="button"
                onClick={() => goto(1)}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 text-gray-800"
              >
                Siguiente
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                  <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
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
  }
});