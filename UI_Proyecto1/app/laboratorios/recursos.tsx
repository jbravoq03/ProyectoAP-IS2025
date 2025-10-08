import { router } from "expo-router";
import React from "react";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { ScrollView, Image , StyleSheet, Text, View} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';

const recursos: Recurso[] = [
  { id: "1", nombre: "Recurso1", descripcion: "Descripción del recurso" },
  { id: "2", nombre: "Recurso2", descripcion: "Descripción del recurso" },
  { id: "3", nombre: "Recurso3", descripcion: "Descripción del recurso" },
  { id: "4", nombre: "Recurso4", descripcion: "Descripción del recurso" },
  { id: "5", nombre: "Recurso5", descripcion: "Descripción del recurso" },
];

function Page() {
  return <ReservableResources recursos={recursos} />; // pasar props
}

export type Recurso = {
  id: string;
  nombre: string;
  descripcion: string;
  imagenUrl?: string;
  disponible?: boolean;
};

type Props = {
  recursos?: Recurso[];                 // ← opcional
  onReservar?: (recurso: Recurso) => void;
  titulo?: string;
};

 const handleLaboratorios = () => {
    // Redirige al inicio de sesion
      router.replace('/laboratorios/dashboard');
  };

export default function ReservableResources({
  recursos = [],                        // ← default a []
  onReservar,
  titulo = "Recursos reservables",
}: Props) {
  // normaliza por si llega {data:[...]} desde un API
  const items: Recurso[] = Array.isArray(recursos)
    ? recursos
    : Array.isArray((recursos as any)?.data)
    ? (recursos as any).data
    : [];

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
        <div className="w-full">
              
          <h1 className="text-2xl font-semibold mb-2 text-gray-700">{titulo}</h1>

          <div className="rounded-xl bg-gray-200/60 p-4 max-h-[70vh] overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-sm text-gray-500">No hay recursos disponibles.</div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((r) => (
                  <article key={r.id} className="rounded-md border border-gray-200 bg-white shadow-sm">
                    <div className="relative overflow-hidden rounded-t-md">
                      {r.imagenUrl ? (
                        <img src={r.imagenUrl} alt={r.nombre} className="h-36 w-full object-cover" />
                      ) : (
                        <div className="h-36 w-full bg-gray-100 grid place-items-center">
                          <svg viewBox="0 0 24 24" className="h-10 w-10 text-gray-300" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="9" cy="9" r="2.5" />
                            <path d="M21 17l-6-6-11 11" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800">{r.nombre}</h3>
                      <p className="mt-2 text-xs text-gray-600 line-clamp-2">{r.descripcion}</p>

                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => onReservar?.(r)}
                          className="w-full rounded-md bg-neutral-900 px-3 py-2 text-xs text-white hover:bg-neutral-800"
                        >
                          Reservar Recurso
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
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