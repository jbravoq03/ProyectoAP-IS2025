import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';

import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';


import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import { 
  getReservasTotales, 
  getMantenimientosActivos, 
  getRecursosMasUsados 
} from '@/services/moduloAdmin_service';

export default function dashboardAdmins() {

  const router = useRouter();

  const handleLogout = () => {
    // Redirige al inicio de sesion
      router.replace('/');
  };

  const handleGestionUsuarios = () => {
    // Redirige a gestion de usuarios
      router.replace('/administradores/gestion_usuarios');
  }

  const handleConfiguracionParametros = () => {
    // Redirige a configuracion de parametros
      router.replace('/administradores/configuracion_parametros');
  }

  const handleBitacora = () => {
    // Redirige a bitacora
      router.replace('/administradores/bitacora');
  }

  const handleReportesInstitucionales = () => {
    // Redirige a reportes institucionales
      router.replace('/administradores/reportes_institucionales');
  }

  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedMonth, setSelectedMonth] = useState('todos');

  const [metricas, setMetricas] = useState({
    reservasTotales: [] as any[],
    mantenimientosActivos: [] as any[],
    recursosMasUsados: [] as any[]
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Cargar métricas del dashboard
  const cargarMetricasDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      // Convertir a números para el backend
      const year = parseInt(selectedYear);
      const month = parseInt(selectedMonth);

      const params = new URLSearchParams();
      // Solo agregar parámetros si no son "todos"
      if (selectedYear !== 'todos') {
        params.append('year', selectedYear);
      }
      if (selectedMonth !== 'todos') {
        params.append('month', selectedMonth);
      }

      const [reservasRes, mantenimientosRes, recursosRes] = await Promise.all([
        getReservasTotales(params.toString()),
        getMantenimientosActivos(params.toString()),
        getRecursosMasUsados(params.toString())
      ]);

      setMetricas({
        reservasTotales: reservasRes.data || [],
        mantenimientosActivos: mantenimientosRes.data || [],
        recursosMasUsados: recursosRes.data || []
      });

    } catch (err) {
      setError('Error al cargar las métricas del dashboard');
      console.error('Error loading dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMetricasDashboard();
  }, [selectedYear, selectedMonth]); // Recargar cuando cambien los filtros

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando métricas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button onPress={cargarMetricasDashboard} variant="solid" size="sm">
          <ButtonText>Reintentar</ButtonText>
        </Button>
      </View>
    );
  }

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
          <Image
            source={require('../../assets/images/tec.png')} 
            style={{ width: 150, height: 40}}
            resizeMode="contain"
            alt="Logo"
          />
          <Button onPress={handleGestionUsuarios} variant="solid" className="bg-white" size="md" action="primary" >
            <ButtonText className="text-black">Gestión de Usuarios</ButtonText>
          </Button>
          <Button onPress={handleConfiguracionParametros} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Configuración de Parámetros</ButtonText>
          </Button>
          <Button onPress={handleBitacora} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Bitácora</ButtonText>
          </Button>
          <Button onPress={handleReportesInstitucionales} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Reportes Institucionales</ButtonText>
          </Button>
          <Button onPress={handleLogout} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Cerrar Sesión</ButtonText>
          </Button>
        </ScrollView>
      </View>
      
      <View style={styles.line} />
      {/* Fin Menú principal*/}

      <Text style={styles.title}>Métricas Globales</Text>

      {/* 🔹 Filtros */}

      <View style={styles.filterContainer}>
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.horizontalContainer}
        >
          <Text style={styles.filterTitle}>Filtrar por:</Text>
    
          <Picker
            selectedValue={selectedMonth}
            style={{...styles.picker, backgroundColor: '#f0f0f0', marginRight: 9}}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            <Picker.Item label="Todos los meses " value="todos" />
            <Picker.Item label="Enero" value="1" />
            <Picker.Item label="Febrero" value="2" />
            <Picker.Item label="Marzo" value="3" />
            <Picker.Item label="Abril" value="4" />
            <Picker.Item label="Mayo" value="5" />
            <Picker.Item label="Junio" value="6" />
            <Picker.Item label="Julio" value="7" />
            <Picker.Item label="Agosto" value="8" />
            <Picker.Item label="Septiembre" value="9" />
            <Picker.Item label="Octubre" value="10" />
            <Picker.Item label="Noviembre" value="11" />
            <Picker.Item label="Diciembre" value="12" />
          </Picker>

          <Picker
            selectedValue={selectedYear}
            style={{...styles.picker, backgroundColor: '#f0f0f0'}}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            <Picker.Item label="Todos los años" value="todos" />
            <Picker.Item label="2025" value="2025" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="2022" value="2022" />
            <Picker.Item label="2021" value="2021" />
            <Picker.Item label="2020" value="2020" />
            <Picker.Item label="2019" value="2019" />
            <Picker.Item label="2018" value="2018" />
            <Picker.Item label="2017" value="2017" />
            <Picker.Item label="2016" value="2016" />
            <Picker.Item label="2015" value="2015" />
            <Picker.Item label="2014" value="2014" />
            <Picker.Item label="2013" value="2013" />
            <Picker.Item label="2012" value="2012" />
            <Picker.Item label="2011" value="2011" />
            <Picker.Item label="2010" value="2010" />
          </Picker>
        </ScrollView>
      </View>

      {/* 🔹 Cards */}
      <View style={styles.horizontalContainer}>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.horizontalContainer}
          >
          {/* Card 1: Reservas Totales */}
          <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0' }}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCellLeft}>Reservas Totales</Text>
              <View style={styles.verticalSeparator} />
              <Text style={styles.headerCellRight}>Cantidad</Text>
            </View>
            <ScrollView style={styles.tableContainer}>
              {metricas.reservasTotales.length > 0 ? (
                metricas.reservasTotales.map((item: any, index: number) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCellLeft}>{item.laboratorio}</Text>
                    <View style={styles.verticalSeparator} />
                    <Text style={styles.tableCellRight}>{item.reservas} reservas</Text>
                  </View>
                ))
              ) : (
                <View style={styles.tableRow}>
                  <Text style={styles.noDataText}>No hay reservas aprobadas</Text>
                </View>
              )}
            </ScrollView>
          </Card>

          {/* Card 2: Mantenimientos Activos */}
          <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0' }}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCellLeft}>Mantenimientos Activos</Text>
              <View style={styles.verticalSeparator} />
              <Text style={styles.headerCellRight}>Estado</Text>
            </View>
            <ScrollView style={styles.tableContainer}>
              {metricas.mantenimientosActivos.length > 0 ? (
                metricas.mantenimientosActivos.map((item: any, index: number) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCellLeft}>{item.recurso}</Text>
                    <View style={styles.verticalSeparator} />
                    <Text style={styles.tableCellRight}>{item.estado}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.tableRow}>
                  <Text style={styles.noDataText}>No hay mantenimientos activos</Text>
                </View>
              )}
            </ScrollView>
          </Card>

          {/* Card 3: Recursos Más Usados */}
          <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0' }}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCellLeft}>Recursos más usados</Text>
              <View style={styles.verticalSeparator} />
              <Text style={styles.headerCellRight}>Usos</Text>
            </View>
            <ScrollView style={styles.tableContainer}>
              {metricas.recursosMasUsados.length > 0 ? (
                metricas.recursosMasUsados.map((item: any, index: number) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCellLeft}>{item.recurso}</Text>
                    <View style={styles.verticalSeparator} />
                    <Text style={styles.tableCellRight}>{item.usos} usos</Text>
                  </View>
                ))
              ) : (
                <View style={styles.tableRow}>
                  <Text style={styles.noDataText}>No hay datos de uso</Text>
                </View>
              )}
            </ScrollView>
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
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
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
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginRight: 15,
  },
  filterContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  picker: {
    height: 40,
    width: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#000',
    fontWeight: 500,
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
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    minHeight: 600,
  },
  tableContainer: {
    maxHeight: 1000, // espacio de elem mostrados sin scrollear
    width: 550,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
  },
  tableCellLeft: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    fontWeight: '500',
    paddingLeft: 15,
    marginTop: 8,
    marginBottom: 8,
  },
  tableCellRight: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    flex: 1,
    paddingLeft: 25,
    marginTop: 8,
    marginBottom: 8,
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#f4f4f4',
  },
  headerCellLeft: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 15,
  },
  headerCellRight: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 25,
  },
  verticalSeparator: {
    width: 2,              // grosor de la línea
    backgroundColor: '#ccc', // color gris claro
    alignSelf: 'stretch',    // 🔹 hace que cubra toda la altura de la fila
  },

});