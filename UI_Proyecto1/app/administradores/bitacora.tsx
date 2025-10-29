import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Picker } from '@react-native-picker/picker';


import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TextInput } from 'react-native';

import { buscarBitacora, get365DiasDisponiblesBitacora, readBitacoraAcciones } from '@/services/moduloAdmin_service';

export default function bitacoraAdmins() {

  const router = useRouter();

  const handleReturn = () => {
    // Redirige al inicio de sesion
      router.replace('/administradores/dashboard');
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bitacoras, setBitacoras] = useState<any[]>([]);

  const [searchUsuario, setSearchUsuario] = useState('');
  const [searchModulo, setSearchModulo] = useState('Todos');
  const [searchAccion, setSearchAccion] = useState('Todas');

  const [selectedFechaDia, setSelectedFechaDia] = useState('');
  const [selectedFechaMes, setSelectedFechaMes] = useState('');
  const [selectedFecha365Dias, setSelectedFecha365Dias] = useState('');

  const [diasDisponibles, setDiasDisponibles] = useState<number[]>([]);
  const [a365DiasDisponibles, setA365DiasDisponibles] = useState<number[]>([]);

  // Función para obtener días disponibles según mes y año
  const getDiasEnMes = (mes: number, año: number) => {
    // Mes en JavaScript: 0=enero, 11=diciembre
    return new Date(año, mes, 0).getDate();
  };

  // Actualizar días disponibles cuando cambia mes o año
  useEffect(() => {
    if (selectedFechaMes && selectedFecha365Dias) {
      const mes = parseInt(selectedFechaMes);
      const año = parseInt(selectedFecha365Dias);
      const numDias = getDiasEnMes(mes, año);
      const dias = Array.from({ length: numDias }, (_, i) => i + 1);
      setDiasDisponibles(dias);
      
      // Si el día seleccionado es mayor que los días disponibles, resetear
      if (parseInt(selectedFechaDia) > numDias) {
        setSelectedFechaDia('');
      }
    } else {
      setDiasDisponibles([]);
    }
  }, [selectedFechaMes, selectedFecha365Dias]);

   // Cargar bitácoras (sin filtros)
  const cargarBitacoras = async () => {
    try {
      setLoading(true);
      setError(null);
      const respuesta = await readBitacoraAcciones();
      const a365diasRes = await get365DiasDisponiblesBitacora();
      
      if (respuesta.data) {
        setBitacoras(respuesta.data);
      } else {
        setError('Error al cargar las bitácoras');
      }

      // Manejar años disponibles (para mejorar el picker de años)
      if (a365diasRes.success && a365diasRes.data) {
        setA365DiasDisponibles(a365diasRes.data);
        console.log(`Años disponibles: ${a365diasRes.data.length}`);
      }
    } catch (err) {
      setError('Error de conexión al cargar bitácoras');
      console.error('Error cargando bitácoras:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBitacoras();
  }, []);

  // Aplicar filtros
  const handleFiltrar = async () => {
    try {
      setLoading(true);
      
      // Preparar filtros
      const filtros: any = {};

      if (searchUsuario.trim() !== '') {
        filtros.usuario = searchUsuario.trim();
      }
      
      if (searchAccion !== 'Todas') {
        filtros.accion = searchAccion;
      }
      
      if (searchModulo !== 'Todos') {
        filtros.modulo = searchModulo;
      }
      
      // 🔹 FILTROS DE FECHA AHORA SON INDIVIDUALES Y OPCIONALES
      if (selectedFecha365Dias) {
        filtros.a365dias = selectedFecha365Dias;
      }
      
      if (selectedFechaMes) {
        filtros.mes = selectedFechaMes;
      }
      
      if (selectedFechaDia) {
        filtros.dia = selectedFechaDia;
      }
      
      console.log('🔍 Aplicando filtros:', filtros);
      
      const respuesta = await buscarBitacora(filtros);
      
      if (respuesta.data) {
        setBitacoras(respuesta.data);
      } else {
        window.alert('No se pudieron aplicar los filtros');
        Alert.alert('Error', 'No se pudieron aplicar los filtros');
      }
    } catch (err) {
      Alert.alert('Error', 'Error al aplicar filtros');
      console.error('Error aplicando filtros:', err);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar filtros y mostrar todo
  const handleLimpiarFiltros = async () => {
    setSearchUsuario('');
    setSearchAccion('Todas');
    setSearchModulo('Todos');
    setSelectedFechaDia('');
    setSelectedFechaMes('');
    setSelectedFecha365Dias('');
    await cargarBitacoras(); // Vuelve a cargar todo sin filtros
  };

  /* Para los filtros */
  const usuariosUnicos = ['Todos', ...new Set(bitacoras.map(b => b.usuario))];
  const accionesUnicas = ['Todas', ...new Set(bitacoras.map(b => b.accion))];
  const modulosUnicos = ['Todos', ...new Set(bitacoras.map(b => b.modulo))];

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando bitácoras...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button onPress={cargarBitacoras} variant="solid" size="sm">
          <ButtonText>Reintentar</ButtonText>
        </Button>
      </View>
    );
  }

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

      {/* 🔹 Tabla */}
      <View style={{...styles.horizontalContainer, paddingTop: 0 }}>
          <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{...styles.horizontalContainer, paddingTop: 0 }}
          >
          {/* Tabla de usuarios */}
          <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0' }}>
          
            {/* Encabezado tabla */}
            <View style={{...styles.tableHeader, marginTop: 5}}>
              <Text style={styles.headerCellUser}>Usuario</Text>
              {/* Separador vertical */}
              <View style={[styles.verticalSeparator]} />
              <Text style={styles.headerCellModule}>Módulo</Text>
              {/* Separador vertical */}
              <View style={[styles.verticalSeparator]} />
              <Text style={styles.headerCellAction}>Acción</Text>
              {/* Separador vertical */}
              <View style={[styles.verticalSeparator]} />
              <Text style={styles.headerCellDate}>Fecha</Text>
              {/* Separador vertical */}
              <View style={[styles.verticalSeparator]} />
              <Text style={styles.headerCellDescripcion}>Descripción</Text>
            </View>

            {/* Contenido tabla */}
            <ScrollView style={styles.tableContainer}>
              {bitacoras.length > 0 ? (
                bitacoras.map((bitacora, i) => (
                  <View key={i} style={styles.tableRow}>
                      <Text style={styles.tableCellUser}>{bitacora.usuario}</Text>
                      <View style={styles.verticalSeparator} />
                      <Text style={styles.tableCellModule}>{bitacora.modulo}</Text>
                      <View style={styles.verticalSeparator} />
                      <Text style={styles.tableCellAction}>{bitacora.accion}</Text>
                      <View style={styles.verticalSeparator} />
                      <Text style={styles.tableCellDate}>{bitacora.fecha}</Text>
                      <View style={styles.verticalSeparator} />
                      <Text style={styles.tableCellDescripcion}>{bitacora.descripcion}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.tableRow}>
                  <Text style={styles.noDataText}>No hay registros en la bitácora</Text>
                </View>
              )}
            </ScrollView>

          </Card>
          </ScrollView>

        </View>

        {/* 🔹 Filtros */}
        <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0', width: 400 }}>
        <Text style={styles.filterTitle}>Filtros</Text>
            <View style={{...styles.filterContainer, width: 350, height: 550, backgroundColor: 'transparent', marginTop: -10 }}>
            
                <Text style={{...styles.filterTitle, flexDirection: 'column', marginTop: 25 }}>Usuario</Text>
                <View style={{...styles.modifyContainer, paddingVertical: 15, flexDirection: 'row', gap: 8, width: '97%', marginLeft: 10 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Buscar usuario por nombre"
                  placeholderTextColor="#777"
                  value={searchUsuario}
                  onChangeText={setSearchUsuario}
                />
              </View>

                <Text style={{...styles.filterTitle, flexDirection: 'column', marginTop: 10 }}>Módulo</Text>
                <View style={{...styles.modifyContainer, paddingVertical: 15, flexDirection: 'column' }}>
                    <Picker
                    selectedValue={searchModulo}
                    style={styles.picker}
                    dropdownIconColor="#000"
                    onValueChange={(itemValue) => setSearchModulo(itemValue)}
                    >
                    {modulosUnicos.map((m) => (
                        <Picker.Item key={m} label={m} value={m} />
                    ))}
                    </Picker>
                </View>

                <Text style={{...styles.filterTitle, flexDirection: 'column', marginTop: 10 }}>Acción</Text>
                <View style={{...styles.modifyContainer, paddingVertical: 15, flexDirection: 'column' }}>
                    <Picker
                    selectedValue={searchAccion}
                    style={styles.picker}
                    dropdownIconColor="#000"
                    onValueChange={(itemValue) => setSearchAccion(itemValue)}
                    >
                    {accionesUnicas.map((a) => (
                        <Picker.Item key={a} label={a} value={a} />
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
                        <Picker.Item label="Día" value="" />
                        {diasDisponibles.map((dia) => ( 
                          <Picker.Item key={dia} label={`${dia}`} value={dia.toString()} />
                        ))}
                        </Picker>
                
                        <Picker
                        selectedValue={selectedFechaMes}
                        style={{...styles.picker, marginRight: 9, width: 135}}
                        onValueChange={(itemValue) => setSelectedFechaMes(itemValue)}
                        >
                        <Picker.Item label="Mes" value="" />
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
                        <Picker.Item label="Año" value="" />
                        {a365DiasDisponibles.map((a) => (
                          <Picker.Item key={a} label={`${a}`} value={a.toString()} />
                        ))}
                        </Picker>
                    </ScrollView>
                </View>
                
                <Button 
                    variant="solid" 
                    size="sm" 
                    action="primary" 
                    className="blue"
                    onPress={handleFiltrar}
                    style={{...styles.searchButton, marginTop: 20, backgroundColor: '#288bdbff' }}
                >
                <ButtonText className="text-white" style={{ color: '#fff' }}>Filtrar</ButtonText>
                </Button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onPress={handleLimpiarFiltros}
                  style={{...styles.clearButton, marginTop: 20, backgroundColor: '#434b52ff', borderColor: '#787879ff' }}
                >
                  <ButtonText className="text-black" style={{ color: '#fff' }}>Limpiar</ButtonText>
                </Button>
            </View>
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
    height: 40,
    justifyContent: 'center',
  },
  clearButton: {
    height: 40,
    justifyContent: 'center',
  },
  card: {
    width: 1000,
    padding: 15,
    backgroundColor: '#fff',
    minHeight: 600,
    alignItems: 'center',
  },
  tableContainer: {
    maxHeight: 1000, // espacio de elem mostrados sin scrollear
    width: '100%',
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
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    color: '#000',
    fontWeight: '500',
    backgroundColor: '#fff',
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
  noDataText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 20,
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
    backgroundColor : '#ffff',
  },
  headerCellDate: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
  },
  headerCellAction: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
  },
  headerCellDescripcion: {
    flex: 2, // Reducido de 3 a 2
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
  },
  
  // 🔹 CELDAS NORMALES
  tableCellUser: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12, // Mismo padding que header
    textAlign: 'left',
    backgroundColor : '#ffff',
  },
  tableCellModule: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
  },
  tableCellDate: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
  },
  tableCellAction: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
  },
  tableCellDescripcion: {
    flex: 2, // Reducido de 3 a 2
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
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