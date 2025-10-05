import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';

import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Picker } from '@react-native-picker/picker';


import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TextInput, Alert, Switch, ActivityIndicator } from 'react-native';

import { 
  getConfiguracionParametros, 
  guardarConfiguracionCompleta, 
  actualizarEtiqueta,
  readEtiquetas 
} from '@/services/moduloAdmin_service';

import { Etiqueta } from '@/model/etiqueta';
import { ParamGlob } from '@/model/paramGlob';

export default function configuracionParametrosAdmins() {
  
  const router = useRouter();

  const isWeb = typeof window !== 'undefined' && window.document;

  const handleReturn = () => {
    // Redirige al inicio de sesion
      router.replace('/administradores/dashboard');
  };

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [configuracionExistente, setConfiguracionExistente] = useState<ParamGlob | null>(null);

  // Estados para parámetros
  const [maxDuration, setMaxDuration] = useState('1');
  const [minAntelation, setMinAntelation] = useState('1');
  const [allowSimultaneous, setAllowSimultaneous] = useState(false);
  const [etiqueta, setEtiqueta] = useState('Disponible');
  const [etiquetaInput, setEtiquetaInput] = useState('');
  const [canalesEnvio, setCanalesEnvio] = useState('Directo');
  const [tiempoNotificacion, setTiempoNotificacion] = useState('0');
  const [esEtiquetaNueva, setEsEtiquetaNueva] = useState(false);

  // Cargar configuración al montar el componente
  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    try {
      setLoading(true);
      const config = await getConfiguracionParametros();
      console.log('Configuración recibida:', config);
      
      if (config.parametros && config.parametros.length > 0) {
        const param = config.parametros[0]; // Tomamos el primer registro
        setConfiguracionExistente(param);
        
        // Establecer valores desde la base de datos
        setMaxDuration(param.duracionMaxima?.toString() || '1');
        setMinAntelation(param.antelacion?.toString() || '1');
        setAllowSimultaneous(param.reservasSimultaneas || false);
        setCanalesEnvio(param.canalesEnvio || 'Directo');
        setTiempoNotificacion(param.tiempoNotificar?.toString() || '0');
        
        // Buscar la etiqueta correspondiente
        if (param.idEtiqueta && config.etiquetas.length > 0) {
          const etiquetaEncontrada: Etiqueta | undefined = config.etiquetas.find(
            (e: Etiqueta) => e.id === param.idEtiqueta
          );
          if (etiquetaEncontrada) {
            setEtiqueta(etiquetaEncontrada.tag);
            setEtiquetaInput(etiquetaEncontrada.tag);
          }
        }
      }
      
      setEtiquetas(config.etiquetas);
    } catch (error) {
      console.error('Error cargando configuración:', error);
      Alert.alert('Error', 'No se pudo cargar la configuración');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambio en el picker de etiquetas
  const handleEtiquetaChange = (itemValue: string): void => {
    setEtiqueta(itemValue);
    if (itemValue === 'Nueva') {
      setEsEtiquetaNueva(true);
      setEtiquetaInput('');
    } else {
      setEsEtiquetaNueva(false);
      setEtiquetaInput(itemValue);
      
      // Si selecciona una etiqueta existente, buscar su ID
      const etiquetaSeleccionada: Etiqueta | undefined = etiquetas.find(
        (e: Etiqueta) => e.tag === itemValue
      );
      if (etiquetaSeleccionada) {
        console.log('Etiqueta seleccionada:', etiquetaSeleccionada);
      }
    }
  };

  // Guardar etiqueta: crear si es 'Nueva', modificar si es otra
  const handleSaveEtiqueta = async () => {
    if (!etiquetaInput.trim()) {
      window.alert('Por favor, ingrese el nombre de la etiqueta.');
      Alert.alert('Aviso', 'Por favor, ingrese el nombre de la etiqueta.');
      return;
    }

    try {
      setSaving(true);
      
      if (esEtiquetaNueva) {
        // Crear nueva etiqueta
        await actualizarEtiqueta({
          idEtiqueta: 0,
          tag: etiquetaInput
        });
        window.alert('Etiqueta creada: ' + etiquetaInput);
        Alert.alert('Éxito', `Etiqueta creada: ${etiquetaInput}`);
        
        // Recargar etiquetas
        const nuevasEtiquetas = await readEtiquetas();
        setEtiquetas(nuevasEtiquetas.data || []);
        setEsEtiquetaNueva(false);
        setEtiqueta(etiquetaInput);
      } else {
        // Modificar etiqueta existente
        const etiquetaExistente = etiquetas.find(e => e.tag === etiqueta);
        if (etiquetaExistente) {
          await actualizarEtiqueta({
            idEtiqueta: etiquetaExistente.id,
            tag: etiquetaInput
          });
          window.alert('Etiqueta modificada: ' + etiquetaInput);
          Alert.alert('Éxito', `Etiqueta modificada: ${etiquetaInput}`);
          
          // Actualizar lista local
          setEtiquetas(prev => 
            prev.map(e => 
              e.id === etiquetaExistente.id 
                ? { ...e, tag: etiquetaInput }
                : e
            )
          );
          setEtiqueta(etiquetaInput);
        }
      }
    } catch (error) {
      console.error('Error guardando etiqueta:', error);
      Alert.alert('Error', 'No se pudo guardar la etiqueta');
    } finally {
      setSaving(false);
    }
  };

  const handleModify = async () => {
    // Validar canal de envío
    if (canalesEnvio === 'Correo') {
      if (!isWeb) {
        Alert.alert('No disponible', 'El canal de envío "Correo" no está disponible aún. Seleccione otro canal.');
      } else{
        window.alert('El canal de envío "Correo" no está disponible aún. Seleccione otro canal.');
      }
      return;
    }

    try {
      setSaving(true);
      
      // Encontrar la etiqueta seleccionada
      const etiquetaSeleccionada = etiquetas.find(e => e.tag === etiqueta);
      
      const configuracion = {
        parametros: {
          idParam: configuracionExistente?.idParam || null,
          duracionMaxima: maxDuration,
          antelacion: minAntelation,
          reservasSimultaneas: allowSimultaneous,
          idEtiqueta: etiquetaSeleccionada?.id,
          canalesEnvio: canalesEnvio,
          tiempoNotificar: tiempoNotificacion
        },
        etiqueta: {
          esNueva: esEtiquetaNueva,
          nombre: etiquetaInput
        }
      };

      await guardarConfiguracionCompleta(configuracion);
      
      Alert.alert('Éxito', 'Configuración guardada correctamente');
      console.log('Configuración guardada:', configuracion);
    } catch (error) {
      console.error('Error guardando configuración:', error);
      Alert.alert('Error', 'No se pudo guardar la configuración');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando configuración...</Text>
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
                onValueChange={(itemValue) => handleEtiquetaChange(itemValue)}
                >
                {etiquetas.map((etq: Etiqueta) => (
                  <Picker.Item key={etq.id} label={etq.tag} value={etq.tag} />
                ))}
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
                    value={etiquetaInput}
                    onChangeText={setEtiquetaInput}
                    editable={!saving}
                />
                <Button 
                variant="solid" 
                size="sm" 
                action="primary" 
                className="bg-white" 
                style={styles.searchButton}
                onPress={handleSaveEtiqueta}
                disabled={saving}
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
                    disabled={saving}
                >
                    <ButtonText className="text-white">Guardar Configuración</ButtonText>
                </Button>
            </View>

          </Card>
          </ScrollView>

        </View>

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