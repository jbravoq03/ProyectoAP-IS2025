import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { bitacoraRecursos, getResponsables, recursos } from '@/model/listStorage';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from "react-native-chart-kit";

export default function GraficosUso() {
  const router = useRouter();
  const labId = getResponsables()?.idLab;
  const reservasPorRecurso: Record<number, number> = {};

  const screenWidth = Dimensions.get("window").width;
  
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

  // Transformación a formato que BarChart entiende
  const chartData1 = {
    labels: datosGrafico.map(item => item.nombre),
    datasets: [{ data: datosGrafico.map(item => item.usos) }]
  };

  const chartData2 = {
    labels: datosGrafico2.map(item => item.nombre),
    datasets: [{ data: datosGrafico2.map(item => item.usos) }]
  };
    
   // Configuración del gráfico
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(136, 132, 216, ${opacity})`,
    labelColor: () => "#000",
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // líneas sólidas
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        {/* --- Primer gráfico --- */}
        <Heading size="md" className="text-black mb-4">
          Gráficos de recursos más usados
        </Heading>
        <BarChart
          data={chartData1}
          width={screenWidth - 40}
          height={260}
          yAxisSuffix=""
          yAxisLabel=""
          fromZero
          chartConfig={chartConfig}
          style={{ borderRadius: 16 }}
        />

        {/* --- Segundo gráfico --- */}
        <Heading size="md" className="text-black mb-4">
          Gráficos de uso de materiales
        </Heading>
        <BarChart
          data={chartData2}
          width={screenWidth - 40}
          height={260}
          yAxisSuffix=""
          yAxisLabel=""
          fromZero
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(130, 202, 157, ${opacity})`,
          }}
          style={{ borderRadius: 16 }}
        />

        {/* --- Botón de volver --- */}
        <Button
          onPress={() => router.replace("/tecnicos/repoOperativos")}
          variant="solid"
          action="secondary"
          className="mt-4"
        >
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