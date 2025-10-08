import { router } from "expo-router";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import React, { useMemo, useState } from "react";
import { ScrollView, Image , StyleSheet, Text, View} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';

/* ===== Tipos ===== */
export type HistItem = {
  accion: string;
  descripcion: string;
  fecha: string;      // dd/mm/yyyy
};

/* ===== Props ===== */
type Props = {
  items?: HistItem[]; // puede venir undefined mientras carga
  minRows?: number;   // cuántas filas mínimo se muestran (para ver “…”)
  title?: string;
  onBack?: () => void;
};

const handleLaboratorios = () => {
  // Redirige al inicio de sesion
    router.replace('/laboratorios/dashboard');
};

/* ===== Componente ===== */
export default function LabHistory({
  items = [],
  minRows = 1,
  title = "Historial del laboratorio",
  onBack,
}: Props) {
  // Completa con filas “…” si hay menos que minRows
  const padded: (HistItem | null)[] =
    items.length >= minRows
      ? items
      : [...items, ...Array.from({ length: minRows - items.length }, () => null)];

  return (
    <div className="min-h-[100dvh] bg-white p-6">
      
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
      <div className="mx-auto w-full max-w-4xl p-6 flex flex-col min-h-0">
        <div className="w-full"></div>
          {/* Contenedor centrado */}
          <div className="mx-auto w-full max-w-4xl">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>

              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
                  aria-label="Volver"
                  title="Volver"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
                    <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>

            {/* Tabla */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <table className="w-full border-separate border-spacing-0">
                <thead className="bg-gray-100">
                  <tr className="text-left text-sm text-gray-700">
                    <Th>Acción</Th>
                    <Th>Descripción</Th>
                    <Th>Fecha</Th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {padded.map((row, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      {row ? (
                        <>
                          <Td>{row.accion}</Td>
                          <Td>{row.descripcion}</Td>
                          <Td>{row.fecha}</Td>
                        </>
                      ) : (
                        <>
                          <Td>…</Td>
                          <Td>…</Td>
                          <Td>…</Td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
}

/* ===== Celdas ===== */
function Th({ children }: React.PropsWithChildren) {
  return <th className="px-4 py-2 font-medium border-b border-gray-200">{children}</th>;
}
function Td({ children }: React.PropsWithChildren) {
  return <td className="px-4 py-2 border-b border-gray-200 text-gray-800">{children}</td>;
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