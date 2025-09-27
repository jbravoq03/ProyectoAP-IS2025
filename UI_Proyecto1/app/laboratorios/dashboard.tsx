import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function dashboardLabs() {

  const router = useRouter();
  const handleLogout = () => {
    // Redirige al inicio de sesion
      router.replace('/');
  };
  const handleInvent = () => {
    // Redirige al inicio de sesion
      router.replace('/laboratorios/inventario');
  };

  return (
    <View style={styles.container}>
      <Button variant="solid" size="md" action="primary"  onPress={handleLogout}>
        <ButtonText>Cerrar Sesion</ButtonText>
      </Button>
      <Button variant="solid" size="md" action="primary" onPress={handleInvent}>
        <ButtonText>Inventario</ButtonText>
      </Button>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});