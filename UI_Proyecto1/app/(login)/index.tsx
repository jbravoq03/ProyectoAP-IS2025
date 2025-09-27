import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function loginScreen() {
  const router = useRouter();
  
  const handleLogin = () => {
    // Redirige al grupo laboratorios después de iniciar sesión
     router.replace('/laboratorios/dashboard');
  };

  return (
    <View style={styles.container}>

      <Button variant="solid" size="md" action="primary" onPress={handleLogin}>
        <ButtonText>Iniciar sesion</ButtonText>
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