import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Input, InputField } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import {
  BellIcon,
  Icon,
  SearchIcon
} from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import NotificationTray from '@/components/NotificationTray';

// Mock data for resources
const recursosData = [
  {
    id: 1,
    tipoRecurso: 'Sala de estudio',
    laboratorio: 'Lab2',
    fechaDisponibilidad: '10/09/2025',
  },
  {
    id: 2,
    tipoRecurso: 'Proyector',
    laboratorio: 'Lab1',
    fechaDisponibilidad: '11/09/2025',
  },
  {
    id: 3,
    tipoRecurso: 'Computadora',
    laboratorio: 'Lab3',
    fechaDisponibilidad: '12/09/2025',
  },
  {
    id: 4,
    tipoRecurso: 'Pizarra Digital',
    laboratorio: 'Lab4',
    fechaDisponibilidad: '13/09/2025',
  },
];

export default function BusquedaLaboratorios() {
  const router = useRouter();
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTipoRecurso, setSelectedTipoRecurso] = useState('');
  const [selectedLaboratorio, setSelectedLaboratorio] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleLogout = () => {
    router.replace('/');
  };

  const handleNotifications = () => {
    setNotificationOpen(true);
  };

  const closeNotifications = () => {
    setNotificationOpen(false);
  };

  const handleReserve = (recurso: any) => {
    Alert.alert(
      'Reserva',
      `¿Desea reservar ${recurso.tipoRecurso} en ${recurso.laboratorio} para el ${recurso.fechaDisponibilidad}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Reservar', 
          onPress: () => Alert.alert('Éxito', 'Recurso reservado exitosamente') 
        }
      ]
    );
  };

  // Filter resources based on search and filters
  const filteredRecursos = recursosData.filter(recurso => {
    const matchesSearch = recurso.tipoRecurso.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recurso.laboratorio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTipo = !selectedTipoRecurso || recurso.tipoRecurso === selectedTipoRecurso;
    const matchesLab = !selectedLaboratorio || recurso.laboratorio === selectedLaboratorio;
    
    return matchesSearch && matchesTipo && matchesLab;
  });

  const handleInicio = () => {
    router.push('/usuarios/dashboard');
  };

  const handleCalendario = () => {
    router.push('/usuarios/calendario_personal');
  };

  const handleFormulario = () => {
    router.push('/usuarios/formulario_solicitud');
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
          <Button variant="solid" className="bg-blue-500" size="md" action="primary">
            <ButtonText className="text-white">Búsqueda de Laboratorios</ButtonText>
          </Button>
          <Button onPress={handleCalendario} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Calendario Personal</ButtonText>
          </Button>
          <Button onPress={handleFormulario} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Formulario de Solicitud</ButtonText>
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Búsqueda de recursos</Text>

        <View style={styles.contentContainer}>
          {/* Left side - Search and Results */}
          <View style={styles.leftContainer}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Input variant="rounded" style={styles.searchInput}>
                <InputField
                  placeholder="Búsqueda..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="text-black"
                />
              </Input>
            </View>

            {/* Results Table */}
            <Card size="md" variant="elevated" style={styles.tableCard}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Tipo de Recurso</Text>
                <View style={styles.verticalSeparator} />
                <Text style={styles.headerCell}>Laboratorio</Text>
                <View style={styles.verticalSeparator} />
                <Text style={styles.headerCell}>Fecha de disponibilidad</Text>
                <View style={styles.verticalSeparator} />
                <Text style={styles.headerCell}>Acción</Text>
              </View>

              <ScrollView style={styles.tableContainer}>
                {filteredRecursos.length > 0 ? (
                  filteredRecursos.map((recurso) => (
                    <View key={recurso.id} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{recurso.tipoRecurso}</Text>
                      <View style={styles.verticalSeparator} />
                      <Text style={styles.tableCell}>{recurso.laboratorio}</Text>
                      <View style={styles.verticalSeparator} />
                      <Text style={styles.tableCell}>{recurso.fechaDisponibilidad}</Text>
                      <View style={styles.verticalSeparator} />
                      <View style={styles.actionCell}>
                        <Button
                          onPress={() => handleReserve(recurso)}
                          variant="solid"
                          className="bg-blue-500"
                          size="sm"
                        >
                          <ButtonText className="text-white">Reservar</ButtonText>
                        </Button>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>No se encontraron recursos</Text>
                  </View>
                )}
                
                {/* Empty rows to match design */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>---</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCell}>---</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCell}>---</Text>
                  <View style={styles.verticalSeparator} />
                  <View style={styles.actionCell}>
                    <Button variant="solid" className="bg-gray-300" size="sm" disabled>
                      <ButtonText className="text-gray-500">Reservar</ButtonText>
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </Card>
          </View>

          {/* Right side - Filters */}
          <View style={styles.rightContainer}>
            <Card size="md" variant="elevated" style={styles.filtersCard}>
              <VStack space="md">
                <Text style={styles.filtersTitle}>Filtros</Text>

                {/* Tipo de recurso filter */}
                <FormControl>
                  <Text style={styles.filterLabel}>Tipo de recurso</Text>
                  <View style={styles.filterPickerContainer}>
                    <Picker
                      selectedValue={selectedTipoRecurso}
                      style={styles.filterPicker}
                      onValueChange={(itemValue) => setSelectedTipoRecurso(itemValue)}
                    >
                      <Picker.Item label="Tipo de recurso" value="" />
                      <Picker.Item label="Sala de estudio" value="Sala de estudio" />
                      <Picker.Item label="Proyector" value="Proyector" />
                      <Picker.Item label="Computadora" value="Computadora" />
                      <Picker.Item label="Pizarra Digital" value="Pizarra Digital" />
                    </Picker>
                  </View>
                </FormControl>

                {/* Laboratorio filter */}
                <FormControl>
                  <Text style={styles.filterLabel}>Laboratorio</Text>
                  <View style={styles.filterPickerContainer}>
                    <Picker
                      selectedValue={selectedLaboratorio}
                      style={styles.filterPicker}
                      onValueChange={(itemValue) => setSelectedLaboratorio(itemValue)}
                    >
                      <Picker.Item label="Laboratorio" value="" />
                      <Picker.Item label="Lab1" value="Lab1" />
                      <Picker.Item label="Lab2" value="Lab2" />
                      <Picker.Item label="Lab3" value="Lab3" />
                      <Picker.Item label="Lab4" value="Lab4" />
                    </Picker>
                  </View>
                </FormControl>

                {/* Fecha de disponibilidad filter */}
                <FormControl>
                  <Text style={styles.filterLabel}>Fecha de disponibilidad</Text>
                  <HStack space="xs" style={styles.dateFilterContainer}>
                    <View style={styles.dateFilterPicker}>
                      <Picker
                        selectedValue={selectedDay}
                        style={styles.smallPicker}
                        onValueChange={(itemValue) => setSelectedDay(itemValue)}
                      >
                        <Picker.Item label="Día" value="" />
                        {[...Array(31)].map((_, i) => (
                          <Picker.Item 
                            key={i + 1} 
                            label={String(i + 1).padStart(2, '0')} 
                            value={String(i + 1).padStart(2, '0')} 
                          />
                        ))}
                      </Picker>
                    </View>

                    <View style={styles.dateFilterPicker}>
                      <Picker
                        selectedValue={selectedMonth}
                        style={styles.smallPicker}
                        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                      >
                        <Picker.Item label="Mes" value="" />
                        <Picker.Item label="01" value="01" />
                        <Picker.Item label="02" value="02" />
                        <Picker.Item label="03" value="03" />
                        <Picker.Item label="04" value="04" />
                        <Picker.Item label="05" value="05" />
                        <Picker.Item label="06" value="06" />
                        <Picker.Item label="07" value="07" />
                        <Picker.Item label="08" value="08" />
                        <Picker.Item label="09" value="09" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                      </Picker>
                    </View>

                    <View style={styles.dateFilterPicker}>
                      <Picker
                        selectedValue={selectedYear}
                        style={styles.smallPicker}
                        onValueChange={(itemValue) => setSelectedYear(itemValue)}
                      >
                        <Picker.Item label="Año" value="" />
                        <Picker.Item label="2025" value="2025" />
                        <Picker.Item label="2026" value="2026" />
                      </Picker>
                    </View>
                  </HStack>
                </FormControl>
              </VStack>
            </Card>
          </View>
        </View>
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
  contentContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
  },
  leftContainer: {
    flex: 2,
  },
  rightContainer: {
    flex: 1,
    minWidth: 300,
  },
  searchContainer: {
    marginBottom: 20,
    width: '100%',
  },
  searchInput: {
    backgroundColor: '#f9f9f9',
  },
  tableCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#f4f4f4',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  tableContainer: {
    maxHeight: 400,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tableCell: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionCell: {
    flex: 1,
    alignItems: 'center',
  },
  verticalSeparator: {
    width: 2,
    backgroundColor: '#ccc',
    alignSelf: 'stretch',
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  filtersCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  filterPickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  filterPicker: {
    height: 40,
    color: '#000',
  },
  dateFilterContainer: {
    justifyContent: 'space-between',
  },
  dateFilterPicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 2,
  },
  smallPicker: {
    height: 40,
    color: '#000',
  },
});
