import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Image , StyleSheet, Text, View} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';



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
      
      {/* scroll view */}
      <View className="max-h-[70vh] overflow-y-auto pb-4">
        <View className="w-full max-w-4x1 mx-auto">

          <main className="flex-1 overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
            <h1 className="text-3xl font-semibold my-4 text-gray-800">Equipo</h1>

            <SectionCard title="Recursos fijos" className="text-gray-700">
              <ScrollableTable maxHeightClass="max-h-72">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-sm text-gray-700">
                    <Th>Código</Th>
                    <Th>Recurso</Th>
                    <Th>Estado</Th>
                    <Th>Último Mantenimiento</Th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {fixed.map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50">
                        <Td>
                            <span className="block w-full rounded-md bg-gray-50 px-3 py-2 text-gray-800">
                                {row.codigo || "—"}
                            </span>
                        </Td>
                        <Td>
                            <span className="block w-full rounded-md bg-gray-50 px-3 py-2 text-gray-800">
                                {row.recurso || "—"}
                            </span>
                        </Td>
                        <Td>
                            <span className="block w-full rounded-md bg-gray-50 px-3 py-2 text-gray-800">
                                {row.estado || "—"}
                            </span>
                        </Td>
                        <Td>
                            <span className="block w-full rounded-md bg-gray-50 px-3 py-2 text-gray-800">
                                {row.ultimoMantenimiento || "—"}
                            </span>
                        </Td>
                    </tr>
                  ))}

                  {/* fila punteada*/}
                  <tr className="text-gray-400">
                    <Td>…</Td>
                    <Td>…</Td>
                    <Td>…</Td>
                    <Td>…</Td>
                  </tr>
                </tbody>
              </ScrollableTable>

            </SectionCard>

            <SectionCard title="Materiales consumibles" className="mt-6 text-gray-700">
              <ScrollableTable maxHeightClass="max-h-72">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-sm text-gray-700">
                    <Th>Material</Th>
                    <Th>Cantidad</Th>
                    <Th>Medida</Th>
                    <Th>Punto de reorden</Th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {consumables.map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50">
                        <Td>
                            <span className="block w-full rounded-md bg-gray-50 px-3 py-2 text-gray-800">
                                {row.material || "—"}
                            </span>
                        </Td>
                        <Td>
                            <span className="block w-full rounded-md bg-gray-50 px-3 py-2 text-gray-800">
                                {row.cantidad || "—"}
                            </span>
                        </Td>
                        <Td>
                            <span className="block w-full rounded-md bg-gray-50 px-3 py-2 text-gray-800">
                                {row.medida || "—"}
                            </span>
                        </Td>
                        <Td>
                            <span className="block w-full rounded-md bg-gray-50 px-3 py-2 text-gray-800">
                                {row.puntoReorden || "—"}
                            </span>
                        </Td>
                    </tr>
                  ))}
                  <tr className="text-gray-400">
                    <Td>…</Td>
                    <Td>…</Td>
                    <Td>…</Td>
                    <Td>…</Td>
                  </tr>
                </tbody>
              </ScrollableTable>

            </SectionCard>
          </main>

        </View>
      </View>
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
  }
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
  className = "",
}: React.PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <section className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-sm ${className}`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <View className="border-t border-gray-200 pt-3">{children}</View>
    </section>
  );
}

function ScrollableTable({
  children,
  maxHeightClass = "max-h-72",
}: React.PropsWithChildren<{ maxHeightClass?: string }>) {
  return (
    <View className={`rounded-md border border-gray-200 overflow-hidden`}>
      <View className={`${maxHeightClass} overflow-y-auto`}>
        <table className="w-full border-separate border-spacing-0">
          {children}
        </table>
      </View>
    </View>
  );
}

function Th({ children }: React.PropsWithChildren) {
  return (
    <th className="text-left font-medium border-b border-gray-200 px-3 py-2">
      {children}
    </th>
  );
}

function Td({ children }: React.PropsWithChildren) {
  return <td className="border-b border-gray-200 px-3 py-2">{children}</td>;
}
