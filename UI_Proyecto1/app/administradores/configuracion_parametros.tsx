import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';

import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Picker } from '@react-native-picker/picker';


import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TextInput, Alert, Switch } from 'react-native';

export default function configuracionParametrosAdmins() {
  
  const router = useRouter();

  const handleReturn = () => {
    // Redirige al inicio de sesion
      router.replace('/administradores/dashboard');
  };

  const [maxDuration, setMaxDuration] = useState('1');
  const [minAntelation, setMinAntelation] = useState('1');
  const [allowSimultaneous, setAllowSimultaneous] = useState(false);

  const [etiqueta, setEtiqueta] = useState('Disponible');
  const [canalesEnvio, setCanalesEnvio] = useState('Directo');
  const [tiempoNotificacion, setTiempoNotificacion] = useState('0');

  // Guardar etiqueta: crear si es 'Nueva', modificar si es otra
  const handleSaveEtiqueta = () => {
    const isWeb = typeof window !== 'undefined' && window.document;
    if (etiqueta === 'Nueva' || null) {
      if (!etiqueta.trim() || etiqueta === 'Nueva') {
        if (isWeb) {
          window.alert('Por favor, ingrese el nombre de la nueva etiqueta en el campo de texto.');
        } else {
          Alert.alert('Aviso', 'Por favor, ingrese el nombre de la nueva etiqueta en el campo de texto.');
        }
        return;
      }
      // Lógica para crear nueva etiqueta
      if (isWeb) {
        window.alert(`Etiqueta creada: ${etiqueta}`);
      } else {
        Alert.alert('Etiqueta creada', `Etiqueta creada: ${etiqueta}`);
      }
      console.log('Creando nueva etiqueta:', etiqueta);
    } else {
      // Lógica para modificar etiqueta existente
      if (isWeb) {
        window.alert(`Etiqueta modificada: ${etiqueta}`);
      } else {
        Alert.alert('Etiqueta modificada', `Etiqueta modificada: ${etiqueta}`);
      }
      console.log(`Modificando etiqueta a: ${etiqueta}`);
    }
  };

  const handleModify = () => {
    // Recoge los valores actuales de los estados
    const config = {
      maxDuration,
      minAntelation,
      allowSimultaneous,
      etiqueta,
      canalesEnvio,
      tiempoNotificacion,
    };

    // Validar canal de envío
    const isWeb = typeof window !== 'undefined' && window.document;
    if (canalesEnvio === 'Correo') {
      if (isWeb) {
        window.alert('El canal de envío "Correo" no está disponible aún. Seleccione otro canal.');
      } else {
        Alert.alert('No disponible', 'El canal de envío "Correo" no está disponible aún. Seleccione otro canal.');
      }
      return;
    }
    
    // Mostrar aviso y guardar
    if (isWeb) {
      window.alert('Configuración guardada:\n' + JSON.stringify(config, null, 2));
    } else {
      Alert.alert('Configuración guardada', JSON.stringify(config, null, 2));
    }
    console.log('Configuración guardada:', config);
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
    <View style={styles.container}>
      
      {/* Inicio Menú principal*/}
      <View style={styles.horizontalContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.horizontalContainer}
        >
          <Text style={{...styles.title, paddingBottom: 10, paddingLeft: 170, paddingRight: 70 }}>Configuración de Parámetros</Text>
          <Button onPress={handleReturn} variant="solid" className="bg-white" size="md" action="primary"
          style={{ alignContent: 'center', justifyContent: 'center' }}>
            <ButtonText className="text-black">Regresar</ButtonText>
          </Button>
        </ScrollView>
      </View>

      {/* 🔹 Card */}
      <View style={styles.horizontalContainer}>
          <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.horizontalContainer}
          >
          <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0', alignItems: 'center' }}>
            
            {/* 🔹 Reglas de Horarios de Reserva y Simulteniedad */}
            <Text style={{...styles.filterTitle, marginTop: 8, flexDirection: 'column'}}>Reglas de reserva</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{...styles.horizontalContainer, backgroundColor: 'transparent', bottom: 25 }}
            >
                <View style={styles.modifyContainer}>
                    {/* Máxima duración */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>Duración máxima</Text>
                        <Picker
                        selectedValue={maxDuration}
                        style={styles.picker}
                        dropdownIconColor="#000"
                        onValueChange={(itemValue) => setMaxDuration(itemValue)}
                        >
                        {Array.from({ length: 48 }, (_, i) => i + 1).map((val) => (
                            <Picker.Item key={val} label={`${val}h`} value={val} />
                        ))}
                        </Picker>
                    </View>

                    {/* Antelación mínima */}
                    <View style={styles.formField}>
                        <Text style={styles.label}>Antelación mínima</Text>
                        <Picker
                        selectedValue={minAntelation}
                        style={styles.picker}
                        dropdownIconColor="#000"
                        onValueChange={(itemValue) => setMinAntelation(itemValue)}
                        >
                        {Array.from({ length: 15 }, (_, i) => i + 1).map((val) => (
                            <Picker.Item key={val} label={`${val}d`} value={val} />
                        ))}
                        </Picker>
                    </View>

                    {/* Switch simultáneas */}
                    <View style={{...styles.formField, bottom: 8 }}>
                        <Text style={{...styles.label, marginBottom: 10}}>Reservas simultáneas</Text>
                        <Switch
                        value={allowSimultaneous}
                        onValueChange={(val) => setAllowSimultaneous(val)}
                        />
                    </View>
                </View>
            </ScrollView>
          
            {/* Estados y Etiquetas */}
            <Text style={{...styles.filterTitle, flexDirection: 'column' }}>Personalización de estados y etiquetas</Text>
            <View style={{...styles.modifyContainer, paddingVertical: 15, flexDirection: 'column' }}>
                <Picker
                selectedValue={etiqueta}
                style={styles.picker}
                dropdownIconColor="#000"
                onValueChange={(itemValue) => setEtiqueta(itemValue)}
                >
                <Picker.Item label="Disponible" value="Disponible" />
                <Picker.Item label="No disponible" value="No disponible" />
                <Picker.Item label="En mantenimiento" value="En mantenimiento" />
                <Picker.Item label="Nueva" value="Nueva" />
                </Picker>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{...styles.horizontalContainer, backgroundColor: 'transparent', bottom: 30, gap: 20 }}
            >
                <Text style={styles.filterTitle}>Estado o Etiqueta:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Modificar o crear etiqueta"
                    placeholderTextColor="#777"
                    value={etiqueta}
                    onChangeText={setEtiqueta}
                />
                <Button 
                variant="solid" 
                size="sm" 
                action="primary" 
                className="bg-white" 
                style={styles.searchButton}
                onPress={handleSaveEtiqueta}
                >
                <ButtonText className="text-black">Guardar</ButtonText>
                </Button>
            </ScrollView>
            

            {/* Notificaciones */}
            <ScrollView style={styles.tableContainer}>

                {/* Headers */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 50, marginBottom: 10, backgroundColor: 'transparent' }}>
            <Text style={styles.filterTitle}>Configuración de notificaciones</Text>
            <Text style={styles.filterTitle}>Tiempos para notificar (antelación)</Text>
          </View>

                {/* Dropdowns */}
                <ScrollView style={styles.tableContainer}>
                    <View style={styles.modifyContainer}>
                        <Picker
                            selectedValue={canalesEnvio}
                            style={styles.picker}
                            dropdownIconColor="#000"
                            onValueChange={(itemValue) => setCanalesEnvio(itemValue)}
                        >
                            <Picker.Item label="Directo" value="Directo" />
                            <Picker.Item label="Correo (no disponible)" value="Correo" />
                        </Picker>
                        <Picker
                            selectedValue={tiempoNotificacion}
                            style={styles.picker}
                            dropdownIconColor="#000"
                            onValueChange={(itemValue) => setTiempoNotificacion(itemValue)}
                        >
                            {/* Primeros valores en minutos */}
                            <Picker.Item label="0 min" value="0" />
                            <Picker.Item label="5 min" value="5" />
                            <Picker.Item label="10 min" value="10" />
                            <Picker.Item label="15 min" value="15" />
                            <Picker.Item label="30 min" value="30" />
                            <Picker.Item label="45 min" value="45" />
                            <Picker.Item label="55 min" value="55" />

                            {/* Horas dinámicas */}
                            {Array.from({ length: 24 }, (_, i) => i + 1).map((h) => (
                                <Picker.Item key={h} label={`${h} h`} value={h * 60} />
                            ))}

                            {/* Días */}
                            <Picker.Item label="1 d" value="1440" />
                            <Picker.Item label="2 d" value="2880" />
                            <Picker.Item label="3 d" value="4320" />
                        </Picker>
                    </View>
                </ScrollView>
            </ScrollView>

            {/* Guardar configuración */}
            <View style={{ ...styles.modifyContainer, marginBottom: 15  }}>
                <Button
                    onPress={handleModify}
                    variant="solid"
                    size="sm"
                    action="primary"
                    className="bg-blue-500"
                    style={styles.modifyButton}
                >
                    <ButtonText className="text-white">Guardar Configuración</ButtonText>
                </Button>
            </View>

          </Card>
          </ScrollView>

        </View>

    </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#ffffffff',
    padding: 20,
  },
  horizontalContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    color: 'transparent',
  },
  line: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  filterBox: {
    flex: 1,
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    height: 40,
    width: 400,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    color: '#000',
    fontWeight: '500',
    backgroundColor: '#fcfcfc',
  },
  searchButton: {
    height: 40,
    justifyContent: 'center',
  },
  cardsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: 10,
    gap: 20,
  },
  card: {
    width: 1000,
    padding: 15,
    backgroundColor: '#fff',
    minHeight: 600,
  },
  tableContainer: {
    maxHeight: 1000, // espacio de elem mostrados sin scrollear
    width: '100%',
  },
  picker: {
    height: 40,
    width: 290,
    backgroundColor: '#fdfdfdff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    color: '#000',
    fontWeight: '600',
    justifyContent: 'center',
  },
  modifyButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    gap: 20,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    width: '100%',
  },
  formField: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
  },
  label: {
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },

});