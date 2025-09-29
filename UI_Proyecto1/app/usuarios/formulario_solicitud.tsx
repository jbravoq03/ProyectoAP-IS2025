import NotificationTray from '@/components/NotificationTray';
import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormControl } from '@/components/ui/form-control';
import { HStack } from '@/components/ui/hstack';
import {
  BellIcon,
  Icon
} from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet } from 'react-native';

export default function FormularioSolicitud() {
  const router = useRouter();
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  // Form state
  const [selectedRecurso, setSelectedRecurso] = useState('');
  const [selectedLaboratorio, setSelectedLaboratorio] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinutes, setSelectedMinutes] = useState('');
  const [documentAttached, setDocumentAttached] = useState(false);

  const handleLogout = () => {
    router.replace('/');
  };

  const handleNotifications = () => {
    setNotificationOpen(true);
  };

  const closeNotifications = () => {
    setNotificationOpen(false);
  };

  const handleAttachDocument = () => {
    // Simulate document attachment
    setDocumentAttached(true);
    Alert.alert('Documento', 'Documento adjuntado exitosamente');
  };

  const handleSubmitRequest = () => {
    if (!selectedRecurso || !selectedLaboratorio || !selectedDate || !selectedHour || !selectedMinutes) {
      Alert.alert('Error', 'Por favor complete todos los campos requeridos');
      return;
    }
    
    Alert.alert(
      'Solicitud Enviada',
      `Recurso: ${selectedRecurso}\nLaboratorio: ${selectedLaboratorio}\nFecha: ${selectedDate}\nHora: ${selectedHour}:${selectedMinutes}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setSelectedRecurso('');
            setSelectedLaboratorio('');
            setSelectedDate('');
            setSelectedHour('');
            setSelectedMinutes('');
            setDocumentAttached(false);
          }
        }
      ]
    );
  };

  const handleInicio = () => {
    router.push('/usuarios/dashboard');
  };

  const handleBusquedaLab = () => {
    router.push('/usuarios/busqueda_laboratorios');
  };

  const handleCalendario = () => {
    router.push('/usuarios/calendario_personal');
  };

  const handleHistorial = () => {
    router.push('/usuarios/historial_personal');
  };

  return (
    <View style={styles.container}>
      {/* Header with Navigation */}
      <View style={styles.horizontalContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.horizontalContainer}
        >
          <Image
            source={require('../../assets/images/tec.png')} 
            style={{ width: 150, height: 40}}
            resizeMode="contain"
            alt="Logo"
          />
          <Button onPress={handleInicio} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Inicio de Usuario</ButtonText>
          </Button>
          <Button onPress={handleBusquedaLab} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Búsqueda de Laboratorios</ButtonText>
          </Button>
          <Button onPress={handleCalendario} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Calendario Personal</ButtonText>
          </Button>
          <Button variant="solid" className="bg-blue-500" size="md" action="primary">
            <ButtonText className="text-white">Formulario de Solicitud</ButtonText>
          </Button>
          <Button onPress={handleHistorial} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Historial Personal</ButtonText>
          </Button>
          <Button onPress={handleNotifications} variant="solid" className="bg-white" size="md" action="primary">
            <Icon as={BellIcon} color='#000000ff' size="sm" className="mr-2" />
          </Button>
          <Button onPress={handleLogout} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Cerrar Sesión</ButtonText>
          </Button>
        </ScrollView>
      </View>
      
      <View style={styles.line} />

      {/* Main Content */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <ScrollView showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Formulario de solicitud</Text>

          <Card size="md" variant="elevated" style={styles.formCard}>
            <VStack space="lg" style={styles.formContainer}>
              
              {/* Recurso Dropdown */}
              <FormControl>
                <Text style={styles.label}>Recurso</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedRecurso}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedRecurso(itemValue)}
                  >
                    <Picker.Item label="Recurso" value="" />
                    <Picker.Item label="Proyector" value="proyector" />
                    <Picker.Item label="Computadora" value="computadora" />
                    <Picker.Item label="Pizarra Digital" value="pizarra_digital" />
                    <Picker.Item label="Sistema de Audio" value="audio" />
                    <Picker.Item label="Cámara" value="camara" />
                  </Picker>
                </View>
              </FormControl>

              {/* Laboratorio Dropdown */}
              <FormControl>
                <Text style={styles.label}>Laboratorio</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedLaboratorio}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedLaboratorio(itemValue)}
                  >
                    <Picker.Item label="Laboratorio" value="" />
                    <Picker.Item label="Lab1" value="lab1" />
                    <Picker.Item label="Lab2" value="lab2" />
                    <Picker.Item label="Lab3" value="lab3" />
                    <Picker.Item label="Lab4" value="lab4" />
                    <Picker.Item label="Lab5" value="lab5" />
                  </Picker>
                </View>
              </FormControl>

              {/* Fecha y Hora */}
              <FormControl>
                <Text style={styles.label}>Fecha y Hora</Text>
                <HStack space="sm" style={styles.dateTimeContainer}>
                  <View style={styles.datePickerContainer}>
                    <Picker
                      selectedValue={selectedDate}
                      style={styles.datePicker}
                      onValueChange={(itemValue) => setSelectedDate(itemValue)}
                    >
                      <Picker.Item label="Seleccionar Fecha" value="" />
                      <Picker.Item label="29/09/2025" value="29/09/2025" />
                      <Picker.Item label="30/09/2025" value="30/09/2025" />
                      <Picker.Item label="01/10/2025" value="01/10/2025" />
                      <Picker.Item label="02/10/2025" value="02/10/2025" />
                      <Picker.Item label="03/10/2025" value="03/10/2025" />
                    </Picker>
                  </View>
                  
                  <View style={styles.timePickerContainer}>
                    <Picker
                      selectedValue={selectedHour}
                      style={styles.timePicker}
                      onValueChange={(itemValue) => setSelectedHour(itemValue)}
                    >
                      <Picker.Item label="Hora" value="" />
                      <Picker.Item label="08" value="08" />
                      <Picker.Item label="09" value="09" />
                      <Picker.Item label="10" value="10" />
                      <Picker.Item label="11" value="11" />
                      <Picker.Item label="12" value="12" />
                      <Picker.Item label="13" value="13" />
                      <Picker.Item label="14" value="14" />
                      <Picker.Item label="15" value="15" />
                      <Picker.Item label="16" value="16" />
                      <Picker.Item label="17" value="17" />
                    </Picker>
                  </View>

                  <Text style={styles.timeSeparator}>:</Text>

                  <View style={styles.timePickerContainer}>
                    <Picker
                      selectedValue={selectedMinutes}
                      style={styles.timePicker}
                      onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
                    >
                      <Picker.Item label="Minutos" value="" />
                      <Picker.Item label="00" value="00" />
                      <Picker.Item label="15" value="15" />
                      <Picker.Item label="30" value="30" />
                      <Picker.Item label="45" value="45" />
                    </Picker>
                  </View>
                </HStack>
              </FormControl>

              {/* Attach Document Section */}
              <FormControl>
                <HStack space="sm" style={styles.attachContainer}>
                  <Button
                    onPress={handleAttachDocument}
                    variant="solid"
                    className="bg-gray-700"
                    size="md"
                    style={styles.attachButton}
                  >
                    <ButtonText className="text-white">Adjuntar motivo</ButtonText>
                  </Button>
                  
                  {documentAttached && (
                    <View style={styles.documentIndicator}>
                      <Text style={styles.documentText}>📄 Doc. Adjuntado</Text>
                    </View>
                  )}
                </HStack>
              </FormControl>

              {/* Submit Button */}
              <Button
                onPress={handleSubmitRequest}
                variant="solid"
                className="bg-gray-700"
                size="lg"
                style={styles.submitButton}
              >
                <ButtonText className="text-white">Enviar solicitud</ButtonText>
              </Button>

            </VStack>
          </Card>
        </ScrollView>
      </ScrollView>

      {/* Notification Tray */}
      <NotificationTray 
        visible={notificationOpen} 
        onClose={closeNotifications} 
      />
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
  horizontalContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 10,
  },
  line: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 80,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  formCard: {
    alignItems: 'center', 
    width: '95%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    color: '#000',
  },
  dateTimeContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  datePickerContainer: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  datePicker: {
    height: 50,
    color: '#000',
  },
  timePickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 5,
  },
  timePicker: {
    height: 50,
    color: '#000',
  },
  timeSeparator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 5,
  },
  attachContainer: {
    alignItems: 'center',
    width: '100%',
  },
  attachButton: {
    backgroundColor: '#4a4a4a',
  },
  documentIndicator: {
    marginLeft: 15,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  documentText: {
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#4a4a4a',
    width: '100%',
    marginTop: 10,
  },
});
