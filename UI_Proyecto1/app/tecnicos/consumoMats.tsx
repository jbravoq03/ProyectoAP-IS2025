import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { bitacoraRecursos, getResponsables, recursos } from '@/model/listStorage';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function ConsumoMateriales() {
  const router = useRouter();
  const labId = getResponsables()?.idLab;
  const reservasPorRecurso: Record<number, number> = {};
  
  bitacoraRecursos.forEach((item) => {
  const recursoId = Number(item.idRecurso);

  // Buscar el recurso en la lista completa de recursos
  const recurso = recursos.find((r) => r.idRec === recursoId);

  // Si existe y el laboratorio coincide
  if (recurso && recurso.idLab === Number(labId)) {
    if (item.accion.toLowerCase() === "salida") {
      reservasPorRecurso[recursoId] = (reservasPorRecurso[recursoId] || 0) + Number(bitacoraRecursos.find((r) => r.idRecurso === Number(recursoId))?.descripcion.match(/\d+/));
    }
  }
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        <Heading size="md" className="text-black mb-4">Consumo de todos los materiales</Heading>
        {Object.entries(reservasPorRecurso).map(([idRecurso, cantidad]) => (
          <Text key={idRecurso} className="text-black"> Material: {recursos.find((r) => r.idRec === Number(idRecurso))?.nombre} → {cantidad} veces usado</Text>
        ))}
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