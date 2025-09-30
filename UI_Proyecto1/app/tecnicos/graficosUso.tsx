import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { bitacoraRecursos, getResponsables, recursos } from '@/model/listStorage';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export default function GraficosUso() {
  const router = useRouter();
  const labId = getResponsables()?.idLab;
  const reservasPorRecurso: Record<number, number> = {};
  
  bitacoraRecursos.forEach((item) => {
    const recursoId = Number(item.idRecurso);
  
    // Buscar el recurso en la lista completa de recursos
    const recurso = recursos.find((r) => r.idRec === recursoId);
  
    // Si existe y el laboratorio coincide
    if (recurso && recurso.idLab === Number(labId)) {
      if (item.accion.toLowerCase() === "reserva") {
        reservasPorRecurso[recursoId] = (reservasPorRecurso[recursoId] || 0) + 1;
      }
    }
  });

  const usoPorMaterial: Record<number, number> = {};
    
  bitacoraRecursos.forEach((item) => {
    const recursoId = Number(item.idRecurso);

    // Buscar el recurso en la lista completa de recursos
    const recurso = recursos.find((r) => r.idRec === recursoId);

    // Si existe y el laboratorio coincide
    if (recurso && recurso.idLab === Number(labId)) {
      if (item.accion.toLowerCase() === "salida") {
        usoPorMaterial[recursoId] = (usoPorMaterial[recursoId] || 0) + Number(bitacoraRecursos.find((r) => r.idRecurso === Number(recursoId))?.descripcion.match(/\d+/));
      }
    }
  });

  const datosGrafico = Object.keys(reservasPorRecurso).map((id) => {
    const recurso = recursos.find(r => r.idRec === Number(id));
    return {
      nombre: recurso?.nombre || `Recurso ${id}`,
      usos: reservasPorRecurso[Number(id)] || 0
    };
  });

  const datosGrafico2 = Object.keys(usoPorMaterial).map((id) => {
    const recurso = recursos.find(r => r.idRec === Number(id));
    return {
      nombre: recurso?.nombre || `Recurso ${id}`,
      usos: usoPorMaterial[Number(id)] || 0
    };
  });

  console.log(datosGrafico);
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        <Heading size="md" className="text-black mb-4">Gráficos de recursos mas usados</Heading>
        <BarChart width={500} height={300} data={datosGrafico}>
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="usos" fill="#8884d8" />
        </BarChart>
        <Heading size="md" className="text-black mb-4">Gráficos de uso de materiales</Heading>
        <BarChart width={500} height={300} data={datosGrafico2}>
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="usos" fill="#82ca9d" />
        </BarChart>

        <Button onPress={() => router.replace('/tecnicos/repoOperativos')} variant="solid" action="secondary" className="mt-4">
          <ButtonText>Volver</ButtonText>
        </Button>
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
});