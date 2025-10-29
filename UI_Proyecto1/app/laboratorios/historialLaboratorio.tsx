import { Button, ButtonText } from '@/components/ui/button';
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#F3F4F6' }} contentContainerStyle={{ paddingBottom: 16 }}>
    {/* Header principal */}
    <Text style={styles.header}>
      Sistema de Gestión de Laboratorios Académicos del Tecnológico de Costa Rica
    </Text>
    <View style={styles.line} />

    {/* Botón Volver */}
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
      <Button
        variant="solid"
        onPress={handleLaboratorios}
        style={{
          backgroundColor: '#fff',
          borderColor: '#000',
          borderWidth: 2,
          width: 200,
          justifyContent: 'center',
        }}
        size="sm"
        action="primary"
      >
        <Icon as={ArrowLeftIcon} color="#000" size="sm" style={{ marginRight: 8 }} />
        <ButtonText>Volver al Dashboard</ButtonText>
      </Button>
    </View>

    {/* Contenedor de tabla */}
    <View style={{ flex: 1, maxWidth: 768, alignSelf: 'center', backgroundColor: '#F3F4F6' }}>
      {/* Header de la tabla */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, backgroundColor: '#F3F4F6' }}>
        <Text style={{ fontSize: 24, fontWeight: '600', color: '#111827', backgroundColor: '#F3F4F6' }}>{title}</Text>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: '#D1D5DB',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>←</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tabla simulada */}
      <View style={{ borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#fff', overflow: 'hidden' }}>
        {/* Header fila */}
        <View style={{ flexDirection: 'row', backgroundColor: '#F3F4F6', paddingVertical: 8 }}>
          <Text style={{ flex: 1, paddingHorizontal: 8, fontWeight: '600', fontSize: 14, backgroundColor: '#F3F4F6' }}>Acción</Text>
          <Text style={{ flex: 2, paddingHorizontal: 8, fontWeight: '600', fontSize: 14, backgroundColor: '#F3F4F6' }}>Descripción</Text>
          <Text style={{ flex: 1, paddingHorizontal: 8, fontWeight: '600', fontSize: 14, backgroundColor: '#F3F4F6' }}>Fecha</Text>
        </View>

        {/* Filas de datos */}
        {padded.map((row, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              backgroundColor: '#F3F4F6',
              paddingVertical: 8,
            }}
          >
            <Text style={{ flex: 1, paddingHorizontal: 8 }}>{row?.accion || '…'}</Text>
            <Text style={{ flex: 2, paddingHorizontal: 8 }}>{row?.descripcion || '…'}</Text>
            <Text style={{ flex: 1, paddingHorizontal: 8 }}>{row?.fecha || '…'}</Text>
          </View>
        ))}
      </View>
    </View>
  </ScrollView>
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
    backgroundColor: '#ffffffff',
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
    backgroundColor: '#ffffffff',
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