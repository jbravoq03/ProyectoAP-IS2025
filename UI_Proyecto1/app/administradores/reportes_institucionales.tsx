import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';

import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Picker } from '@react-native-picker/picker';


import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Alert} from 'react-native';

export default function reportesInstitucionalesAdmins() {

  const router = useRouter();

  const isWeb = typeof window !== 'undefined' && window.document;

  const handleReturn = () => {
    // Redirige al inicio de sesion
      router.replace('/administradores/dashboard');
  };

  const handleFiltrar = () => {
    if (!isWeb) {
        Alert.alert('Funcionalidad de filtrado no implementada aún.');
    }
    else {
        window.alert('Funcionalidad de filtrado no implementada aún.');
    }
  };

  const handleExportar = () => {
    if (!isWeb) {
        Alert.alert('Funcionalidad de exportación no implementada aún.');
    }
    else {
        window.alert('Funcionalidad de exportación no implementada aún.');
    }
  };

  const [searchRecurso, setSearchRecurso] = useState('Todos');
  const [searchLaboratorio, setSearchLaboratorio] = useState('Todos');

  const [selectedFechaDia, setSelectedFechaDia] = useState('29');
  const [selectedFechaMes, setSelectedFechaMes] = useState('9');
  const [selectedFecha365Dias, setSelectedFecha365Dias] = useState('2025');

  type Log = { usuario: string; modulo: string; fecha: string; accion: string; };

  const logs: Log[] = [
    { usuario: 'Juan Pérez', modulo: 'Reservas', fecha: '2025-09-25', accion: 'Creó una reserva' },
    { usuario: 'María Gómez', modulo: 'Usuarios', fecha: '2025-09-24', accion: 'Modificó un perfil' },
    { usuario: 'Carlos Rojas', modulo: 'Inventario', fecha: '2025-09-23', accion: 'Eliminó un recurso' },
    { usuario: 'Ana Martínez', modulo: 'Reportes', fecha: '2025-09-22', accion: 'Generó un reporte' },
    { usuario: 'Luis Fernández', modulo: 'Mantenimiento', fecha: '2025-09-21', accion: 'Actualizó estado de mantenimiento' },
    { usuario: 'Sofía López', modulo: 'Configuración', fecha: '2025-09-20', accion: 'Cambió parámetros del sistema' },
    { usuario: 'Miguel Torres', modulo: 'Notificaciones', fecha: '2025-09-19', accion: 'Envié una notificación' },
    { usuario: 'Laura Sánchez', modulo: 'Seguridad', fecha: '2025-09-18', accion: 'Actualizó permisos de usuario' },
    { usuario: 'Diego Ramírez', modulo: 'Auditoría', fecha: '2025-09-17', accion: 'Revisó logs del sistema' },
    { usuario: 'Elena Cruz', modulo: 'Soporte', fecha: '2025-09-16', accion: 'Atendió un ticket de soporte' },
  ];

  // 🔹 DATOS PARA LOS FILTROS
  const tiposRecursos = [
    'Todos',
    'Equipos de Computación',
    'Equipos de Laboratorio',
    'Materiales de Consumo',
    'Reactivos Químicos',
    'Equipos de Medición',
    'Herramientas',
    'Mobiliario',
    'Equipos Audiovisuales'
  ];

  const laboratorios = [
    'Todos',
    'Laboratorio de Química',
    'Laboratorio de Física',
    'Laboratorio de Computación',
    'Laboratorio de Electrónica',
    'Laboratorio de Biología',
    'Laboratorio de Mecánica',
    'Laboratorio de Investigación',
    'Laboratorio de Pruebas'
  ];

  // Datos de ejemplo para las nuevas tablas
  const materiales = [
    { material: 'Alcohol', cantidad: 120 },
    { material: 'Guantes', cantidad: 300 },
    { material: 'Reactivos', cantidad: 45 },
    { material: 'Papel', cantidad: 500 },
  ];

  const desempeno = [
    { laboratorio: 'Lab Química', tiempo: '2h 15m' },
    { laboratorio: 'Lab Física', tiempo: '1h 40m' },
    { laboratorio: 'Lab Computación', tiempo: '3h 05m' },
    { laboratorio: 'Lab Electrónica', tiempo: '2h 50m' },
  ];

  /* Para los filtros */
  const usuariosUnicos = [...new Set(logs.map(l => l.usuario))];
  const modulosUnicos = [...new Set(logs.map(l => l.modulo))];
  const accionesUnicas = [...new Set(logs.map(l => l.accion))];

  return (
    <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.horizontalScrollContent}
    >
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
    <View style={styles.container}>
      {/* Inicio Menú principal*/}
      <View style={styles.horizontalContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.horizontalContainer}
        >
          <Text style={{...styles.title, paddingBottom: 10, paddingLeft: 70, paddingRight: 70 }}>Bitácora</Text>
          <Button onPress={handleReturn} variant="solid" className="bg-white" size="md" action="primary"
          style={{ alignContent: 'center', justifyContent: 'center' }}>
            <ButtonText className="text-black">Regresar</ButtonText>
          </Button>
        </ScrollView>
      </View>

      <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{...styles.horizontalContainer, alignItems: 'flex-start' }}
      >

      {/* 🔹 Tablas */}
      <View style={{...styles.horizontalContainer, flexDirection: 'column', paddingTop: 0 }}>
        {/* Tabla de uso global */}
        <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0', paddingTop: 0 }}>
          <Text style={styles.title}>Uso Global</Text>
          <View style={{...styles.tableHeader, marginTop: 5}}>
            <Text style={styles.headerCellUser}>Servicio</Text>
            <View style={[styles.verticalSeparator]} />
            <Text style={styles.headerCellModule}>Cantidad</Text>
          </View>
          <ScrollView style={{...styles.tableContainer, marginBottom: 8 }}>
            {logs.map((log, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCellUser}>{log.usuario}</Text>
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellModule}>{log.modulo}</Text>
              </View>
            ))}
          </ScrollView>
        </Card>

        {/* Tabla de Consumo de Materiales */}
        <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0', paddingTop: 0 }}>
          <Text style={styles.title}>Consumo de Materiales</Text>
          <View style={{...styles.tableHeader, marginTop: 5}}>
            <Text style={styles.headerCellUser}>Material</Text>
            <View style={[styles.verticalSeparator]} />
            <Text style={styles.headerCellModule}>Cantidad</Text>
          </View>
          <ScrollView style={{...styles.tableContainer, marginBottom: 8 }}>
            {materiales.map((mat, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCellUser}>{mat.material}</Text>
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellModule}>{mat.cantidad}</Text>
              </View>
            ))}
          </ScrollView>
        </Card>

        {/* Tabla de Desempeño */}
        <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0', paddingTop: 0 }}>
          <Text style={styles.title}>Desempeño</Text>
          <View style={{...styles.tableHeader, marginTop: 5}}>
            <Text style={styles.headerCellUser}>Laboratorio</Text>
            <View style={[styles.verticalSeparator]} />
            <Text style={styles.headerCellModule}>Tiempo promedio de respuesta</Text>
          </View>
          <ScrollView style={{...styles.tableContainer, marginBottom: 8 }}>
            {desempeno.map((lab, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCellUser}>{lab.laboratorio}</Text>
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellModule}>{lab.tiempo}</Text>
              </View>
            ))}
          </ScrollView>
        </Card>
      </View>

        {/* 🔹 Filtros */}
        <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0', width: 400}}>
        <Text style={styles.filterTitle}>Filtros</Text>
            <View style={{...styles.filterContainer, width: 350, height: 550, backgroundColor: 'transparent', marginTop: -10, paddingTop: 0 }}>
            
                <Text style={{...styles.filterTitle, flexDirection: 'column', marginTop: -20 }}>Tipo de Recurso</Text>
                <View style={{...styles.modifyContainer, paddingVertical: 15, flexDirection: 'column' }}>
                    <Picker
                    selectedValue={searchRecurso}
                    style={styles.picker}
                    dropdownIconColor="#000"
                    onValueChange={(itemValue) => setSearchRecurso(itemValue)}
                    >
                    <Picker.Item label="Todos" value="" />
                    {tiposRecursos.map((recurso) => (
                        <Picker.Item key={recurso} label={recurso} value={recurso} />
                    ))}
                    </Picker>
                </View>

                <Text style={{...styles.filterTitle, flexDirection: 'column', marginTop: 10 }}>Laboratorio</Text>
                <View style={{...styles.modifyContainer, paddingVertical: 15, flexDirection: 'column' }}>
                    <Picker
                    selectedValue={searchLaboratorio}
                    style={styles.picker}
                    dropdownIconColor="#000"
                    onValueChange={(itemValue) => setSearchLaboratorio(itemValue)}
                    >
                    <Picker.Item label="Todos" value="Todos" />
                    {laboratorios.map((lab) => (
                        <Picker.Item key={lab} label={lab} value={lab} />
                    ))}
                    </Picker>
                </View>


                <Text style={{...styles.filterTitle, marginTop: 10}}>Fecha</Text>
                <View style={{...styles.filterContainer, backgroundColor: 'transparent' }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={{...styles.horizontalContainer, backgroundColor: 'transparent'}}
                    >

                        <Picker
                        selectedValue={selectedFechaDia}
                        style={{...styles.picker, marginRight: 9, width: 70}}
                        onValueChange={(itemValue) => setSelectedFechaDia(itemValue)}
                        >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((h) => (
                                <Picker.Item key={h} label={`${h}`} value={h} />
                            ))}
                        </Picker>
                
                        <Picker
                        selectedValue={selectedFechaMes}
                        style={{...styles.picker, marginRight: 9, width: 135}}
                        onValueChange={(itemValue) => setSelectedFechaMes(itemValue)}
                        >
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
                        selectedValue={selectedFecha365Dias}
                        style={{...styles.picker, width: 85}}
                        onValueChange={(itemValue) => setSelectedFecha365Dias(itemValue)}
                        >
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
                
                <Button 
                    variant="solid" 
                    size="sm" 
                    action="primary" 
                    className="blue"
                    onPress={handleFiltrar}
                    style={{...styles.searchButton, marginTop: 7, backgroundColor: '#288bdbff', marginBottom: -20 }}
                >
                <ButtonText className="text-white" style={{ color: '#fff' }}>Filtrar</ButtonText>
                </Button>
            </View>

            <Text style={{...styles.filterTitle, marginTop: -18, marginRight: 0}}>Exportar a PDF</Text>
            <Button 
                variant="solid" 
                size="sm" 
                action="primary" 
                className="blue"
                onPress={handleExportar}
                style={{...styles.searchButton, marginTop: 15, backgroundColor: '#d62a2aff', marginBottom: 5 }}
            >
            <ButtonText className="text-white" style={{ color: '#fff' }}>Exportar</ButtonText>
            </Button>

        </Card>

      </ScrollView>

    </View>
    </ScrollView>
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
  horizontalScrollContent: {
    flexGrow: 1,
  },
  horizontalContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    paddingVertical: 10,
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
    width: '25%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    height: 37,
    justifyContent: 'center',
  },
  card: {
    width: 1000,
    padding: 15,
    backgroundColor: '#fff',
    minHeight: 50,
    alignItems: 'center',
  },
  tableContainer: {
    maxHeight: 1000, // espacio de elem mostrados sin scrollear
    width: '100%',
  },

  // 🔹 ESTILOS DE TABLA MEJORADOS
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10, // Mismo padding que las filas
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10, // Mismo padding que el header
    backgroundColor: '#ffffffff',
  },
  
  // 🔹 CELDAS DEL HEADER - MISMOS FLEX QUE LAS CELDAS NORMALES
  headerCellUser: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12, // Mismo padding vertical
    textAlign: 'left',
  },
  headerCellModule: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10, // Ajuste para alineación
  },
  headerCellDate: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
  },
  headerCellAction: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
  },
  
  // 🔹 CELDAS NORMALES
  tableCellUser: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12, // Mismo padding que header
    textAlign: 'left',
  },
  tableCellModule: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
  },
  tableCellDate: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
  },
  tableCellAction: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
  },
  
  verticalSeparator: {
    width: 1, // Reducido de 2 a 1 para mejor alineación
    backgroundColor: '#ccc',
    marginHorizontal: 5, // Espacio consistente
  },

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    backgroundColor: '#f0f0f0',
  },
    picker: {
    height: 40,
    width: 200,
    backgroundColor: '#fdfdfdff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    color: '#000',
    fontWeight: '600',
  },
    modifyButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
    modifyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: -2,
    gap: 10,
    backgroundColor: '#f0f0f0',
  },

});