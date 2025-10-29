import { Button, ButtonText } from '@/components/ui/button';
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';



type FixedResource = {
  codigo: string;
  recurso: string;
  estado: "" | "Activo" | "Inactivo";
  ultimoMantenimiento: string; // dd/mm/yyyy
};

type Consumable = {
  material: string;
  cantidad: string;
  medida: string;
  puntoReorden: string;
};

interface EquipmentPageProps {
  initialValues?: {
    fixed?: FixedResource[];
    consumables?: Consumable[];
  };
  onSubmit?: (values: { fixed: FixedResource[]; consumables: Consumable[] }) => void;
  submitting?: boolean;
  onSave?: (data: { fixed: FixedResource[]; consumables: Consumable[] }) => void;
}

export default function EquipmentPage({
  initialValues,
  onSubmit,
  submitting = false,
  onSave,
}: EquipmentPageProps) {
  const [fixed, setFixed] = useState<FixedResource[]>([
    { codigo: "001", recurso: "Recurso1", estado: "Activo", ultimoMantenimiento: "01/09/2025" },
    { codigo: "002", recurso: "Recurso2", estado: "Inactivo", ultimoMantenimiento: "dd/mm/yyyy" },
  ]);

  const [consumables, setConsumables] = useState<Consumable[]>([
    { material: "Papel", cantidad: "10", medida: "Cajas", puntoReorden: "5" },
    { material: "Material2", cantidad: "20", medida: "Litros", puntoReorden: "10" },
  ]);

  const save = () => onSave?.({ fixed, consumables });

const handleLaboratorios = () => {
      // Redirige al inicio de sesion
        router.replace('/laboratorios/dashboard');
    };

  return (
    <View className="min-h-[100dvh] flex flex-col bg-gray-50">
        
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
      
      {/* Scroll view */}
      <ScrollView style={{ maxHeight: '70%', paddingBottom: 16 }}>
        <View style={{ width: '100%', alignSelf: 'center' }}>
          <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: '600', marginVertical: 12, color: '#1f2937' }}>
              Equipo
            </Text>

            {/* --- Recursos fijos --- */}
            <SectionCard title="Recursos fijos">
              <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                {/* Encabezado */}
                <View style={{ flexDirection: 'row', backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#e5e7eb' }}>
                  {['Código', 'Recurso', 'Estado', 'Último Mantenimiento'].map((header, i) => (
                    <Text key={i} style={{ flex: 1, padding: 8, fontWeight: '600', color: '#374151' }}>
                      {header}
                    </Text>
                  ))}
                </View>

                {/* Filas */}
                {fixed.map((row, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fafb',
                      borderBottomWidth: 1,
                      borderColor: '#e5e7eb',
                    }}
                  >
                    <Text style={styles.cell}>{row.codigo || '—'}</Text>
                    <Text style={styles.cell}>{row.recurso || '—'}</Text>
                    <Text style={styles.cell}>{row.estado || '—'}</Text>
                    <Text style={styles.cell}>{row.ultimoMantenimiento || '—'}</Text>
                  </View>
                ))}

                {/* Fila punteada */}
                <View style={{ flexDirection: 'row', opacity: 0.4 }}>
                  {Array(4).fill('…').map((dot, i) => (
                    <Text key={i} style={styles.cell}>{dot}</Text>
                  ))}
                </View>
              </View>
            </SectionCard>

            {/* --- Materiales consumibles --- */}
            <SectionCard title="Materiales consumibles" style={{ marginTop: 24, color: '#374151' }}>
              <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                {/* Encabezado */}
                <View style={{ flexDirection: 'row', backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#e5e7eb' }}>
                  {['Material', 'Cantidad', 'Medida', 'Punto de reorden'].map((header, i) => (
                    <Text key={i} style={{ flex: 1, padding: 8, fontWeight: '600', color: '#374151' }}>
                      {header}
                    </Text>
                  ))}
                </View>

                {/* Filas */}
                {consumables.map((row, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fafb',
                      borderBottomWidth: 1,
                      borderColor: '#e5e7eb',
                    }}
                  >
                    <Text style={styles.cell}>{row.material || '—'}</Text>
                    <Text style={styles.cell}>{row.cantidad || '—'}</Text>
                    <Text style={styles.cell}>{row.medida || '—'}</Text>
                    <Text style={styles.cell}>{row.puntoReorden || '—'}</Text>
                  </View>
                ))}

                {/* Fila punteada */}
                <View style={{ flexDirection: 'row', opacity: 0.4 }}>
                  {Array(4).fill('…').map((dot, i) => (
                    <Text key={i} style={styles.cell}>{dot}</Text>
                  ))}
                </View>
              </View>
            </SectionCard>
          </View>
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
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#1f2937',
  },
});

/* ---------- Helpers & subcomponentes ---------- */

function updateRow<T>(
  set: React.Dispatch<React.SetStateAction<T[]>>,
  arr: T[],
  index: number,
  patch: Partial<T>
) {
  set(arr.map((r, i) => (i === index ? { ...r, ...patch } : r)));
}

function SectionCard({
  title,
  children,
  style,
}: React.PropsWithChildren<{ title: string; style?: any }>) {
  return (
    <View style={[{ borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#fff', padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 }, style]}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>{title}</Text>
      <View style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 8 }}>{children}</View>
    </View>
  );
}

function ScrollableTable({ children, style }: React.PropsWithChildren<{ style?: any }>) {
  return (
    <View style={{ borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden' }}>
      <ScrollView style={[{ maxHeight: 180 }, style]}>
        <View>{children}</View>
      </ScrollView>
    </View>
  );
}

function Th({ children, style }: React.PropsWithChildren<{ style?: any }>) {
  return <Text style={[{ fontWeight: '600', paddingVertical: 8, paddingHorizontal: 12 }, style]}>{children}</Text>;
}

function Td({ children, style }: React.PropsWithChildren<{ style?: any }>) {
  return <Text style={[{ paddingVertical: 8, paddingHorizontal: 12 }, style]}>{children}</Text>;
}
