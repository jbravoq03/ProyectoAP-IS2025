import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
export default function loginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = () => {

     // Regex para validar que tenga @ y .
    const emailRegex = /^[^\s@]+@(estudiante\.tec\.ac\.cr|itcr\.ac\.cr|tec\.ac\.cr)$/;

    if (!emailRegex.test(email)) {
      setError('Formatos validos: @estudiante.tec.ac.cr, @itcr.ac.cr, @tec.ac.cr');
      return;
    }

    setError('');
    // Continuar con login
    console.log('Email válido:', email);
    console.log('Contraseña:', pass);


    // Redirige al modulo segun email (Consultar antes a BD para saber el rol correspondiente)
    if (email.endsWith("@estudiante.tec.ac.cr")) {
      router.replace("/usuarios/dashboard");
    } else if (email.endsWith("@itcr.ac.cr")) {
      router.replace("/usuarios/dashboard"); 
    } else if (email.endsWith("@tec.ac.cr")) {
      router.replace("/administradores/dashboard");
    }

    setEmail('')
    setPass('')

  };

  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>
        Sistema de Gestión de Laboratorios Académicos del Tecnológico de Costa Rica
      </Text>
      <View style={styles.line} />
      <View style={styles.containerCard}>
        <FormControl className="p-4 border border-outline-200 rounded-lg w-full" style={styles.card}>
        <VStack className="gap-4">
          <Heading className="text-black">Iniciar Sesión</Heading>
          <VStack space="xs">
            <Text className="text-black">Correo</Text>
            <Input>
              <InputField value={email} onChangeText={(text) => setEmail(text)} className="text-black" type="text" keyboardType="email-address"/>
            </Input>
            {error ? <Text style={{ color: 'red', marginTop: 4 }}>{error}</Text> : null}
          </VStack>
          <VStack space="xs">
            <Text className="text-black">Contraseña</Text>
            <Input>
              <InputField style={{ textAlign: 'left' }} value={pass} onChangeText={(text) => setPass(text)} className="text-black" type={showPassword ? 'text' : 'password'} />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <Button action="secondary" size="md" className="ml-auto" onPress={handleLogin}>
            <ButtonText>Iniciar Sesion</ButtonText>
          </Button>
        </VStack>
        </FormControl>
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
  },
});