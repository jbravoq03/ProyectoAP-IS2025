import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';

import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Picker } from '@react-native-picker/picker';


import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';

import { 
  getReporteUsoGlobal,
  getReporteConsumoMateriales,
  getReporteDesempeno,
  getTiposRecursos,
  getLaboratorios,
  get365DiasDisponibles
} from '@/services/moduloAdmin_service';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function reportesInstitucionalesAdmins() {

  const router = useRouter();

  const isWeb = typeof window !== 'undefined' && window.document;

  const handleReturn = () => {
    // Redirige al inicio de sesion
      router.replace('/administradores/dashboard');
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para los datos de los reportes
  const [usoGlobal, setUsoGlobal] = useState<any[]>([]);
  const [consumoMateriales, setConsumoMateriales] = useState<any[]>([]);
  const [desempeno, setDesempeno] = useState<any[]>([]);

  // Estados para los filtros
  const [searchRecurso, setSearchRecurso] = useState('Todos');
  const [searchLaboratorio, setSearchLaboratorio] = useState('Todos');
  const [selectedFechaDia, setSelectedFechaDia] = useState('');
  const [selectedFechaMes, setSelectedFechaMes] = useState('');
  const [selectedFecha365Dias, setSelectedFecha365Dias] = useState('');

  // Estados para opciones de filtros
  const [tiposRecursos, setTiposRecursos] = useState<string[]>([]);
  const [laboratorios, setLaboratorios] = useState<string[]>([]);
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

  // Cargar datos iniciales y opciones de filtros
  const cargarDatosIniciales = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar reportes y opciones de filtros en paralelo
      await Promise.all([
        cargarReportes(),
        cargarOpcionesFiltros()
      ]);
    } catch (err) {
      setError('Error de conexión al cargar datos');
      console.error('Error cargando datos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar opciones para los filtros desde el backend
  const cargarOpcionesFiltros = async () => {
    try {
      console.log("Cargando opciones de filtros...");
      
      const [tiposRes, laboratoriosRes, a365diasRes] = await Promise.all([
        getTiposRecursos(),
        getLaboratorios(),
        get365DiasDisponibles()
      ]);

      // Manejar tipos de recursos
      if (tiposRes.success && tiposRes.data) {
        setTiposRecursos(tiposRes.data);
        console.log(`Tipos de recursos cargados: ${tiposRes.data.length}`);
      } else {
        console.warn('No se encontraron tipos de recursos para filtrar');
      }

      // Manejar laboratorios
      if (laboratoriosRes.success && laboratoriosRes.data) {
        setLaboratorios(laboratoriosRes.data);
        console.log(`Laboratorios cargados: ${laboratoriosRes.data.length}`);
      } else {
        console.warn('No se encontraron laboratorios para filtrar');
      }

      // Manejar años disponibles (para mejorar el picker de años)
      if (a365diasRes.success && a365diasRes.data) {
        setA365DiasDisponibles(a365diasRes.data);
        console.log(`Años disponibles: ${a365diasRes.data.length}`);
      }

    } catch (err) {
      console.error('Error cargando opciones de filtros:', err);
    }
  };

  // Cargar reportes iniciales
  const cargarReportes = async (filtros: any = {}) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Cargando reportes con filtros:", filtros);
      
      const [usoGlobalRes, consumoRes, desempenoRes] = await Promise.all([
        getReporteUsoGlobal(filtros),
        getReporteConsumoMateriales(filtros),
        getReporteDesempeno(filtros)
      ]);

      console.log("Respuestas recibidas:", {
        usoGlobal: usoGlobalRes,
        consumo: consumoRes,
        desempeno: desempenoRes
      });

      if (usoGlobalRes.data && consumoRes.data && desempenoRes.data) {
        setUsoGlobal(usoGlobalRes.data);
        setConsumoMateriales(consumoRes.data);
        setDesempeno(desempenoRes.data);
      } else {
        setError('Error al cargar los reportes');
      }
    } catch (err) {
      setError('Error de conexión al cargar reportes');
      console.error('Error cargando reportes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatosIniciales(); // Cargar reportes sin filtros al inicio
  }, []);

  const handleFiltrar = async () => {
    const filtros: any = {};
    
    if (searchRecurso !== 'Todos') {
      filtros.tipoRecurso = searchRecurso;
    }
    
    if (searchLaboratorio !== 'Todos') {
      filtros.laboratorio = searchLaboratorio;
    }
    
    if (selectedFecha365Dias) {
      filtros.a365dias = selectedFecha365Dias;
    }
    
    if (selectedFechaMes) {
      filtros.mes = selectedFechaMes;
    }
    
    if (selectedFechaDia) {
      filtros.dia = selectedFechaDia;
    }
    
    await cargarReportes(filtros);
  };

  const handleLimpiarFiltros = async () => {
    setSearchRecurso('Todos');
    setSearchLaboratorio('Todos');
    setSelectedFechaDia('');
    setSelectedFechaMes('');
    setSelectedFecha365Dias('');
    await cargarReportes(); // Cargar sin filtros
  };

  const generarHTML = () => {
    const usoGlobalHTML = usoGlobal.map((item) => `
      <tr>
        <td>${item.servicio || 'N/A'}</td>
        <td>${item.cantidad || 0}</td>
      </tr>
    `).join('') || '<tr><td colspan="2">No hay datos</td></tr>';

    const consumoHTML = consumoMateriales.map((item) => `
      <tr>
        <td>${item.material || 'N/A'}</td>
        <td>${item.cantidad || 0}</td>
      </tr>
    `).join('') || '<tr><td colspan="2">No hay datos</td></tr>';

    const desempenoHTML = desempeno.map((item) => `
      <tr>
        <td>${item.laboratorio || 'N/A'}</td>
        <td>${item.tiempo_promedio || 'N/A'}</td>
      </tr>
    `).join('') || '<tr><td colspan="2">No hay datos</td></tr>';

    return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #333;
            font-size: 12px;
          }
          h1 {
            text-align: center;
            color: #1e90ff;
            font-size: 18px;
          }
          h2 {
            color: #333;
            font-size: 14px;
            margin-top: 25px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            page-break-inside: auto;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 6px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          footer {
            text-align: center;
            font-size: 10px;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <h1>Reporte Institucional</h1>

        <h2>Uso Global</h2>
        <table>
          <tr><th>Servicio</th><th>Cantidad</th></tr>
          ${usoGlobalHTML}
        </table>

        <h2>Consumo de Materiales</h2>
        <table>
          <tr><th>Material</th><th>Cantidad</th></tr>
          ${consumoHTML}
        </table>

        <h2>Desempeño</h2>
        <table>
          <tr><th>Laboratorio</th><th>Tiempo Promedio</th></tr>
          ${desempenoHTML}
        </table>

        <footer>
          Generado el ${new Date().toLocaleDateString()}
        </footer>
      </body>
    </html>
    `;
  };

  const generarPDF = async () => {
    try {
      const htmlContent = generarHTML(); // usa tu función dinámica

      if (isWeb) {
        // Crear un contenedor oculto para renderizar el HTML
        const container = document.createElement("div");
        container.innerHTML = htmlContent;
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.width = "800px"; // ancho controlado
        document.body.appendChild(container);

        // Capturar el HTML como imagen escalada
        const canvas = await html2canvas(container, {
          scale: 2, // más resolución
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        // Configurar PDF tamaño A4
        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Primera página
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Agregar páginas extra si el contenido es largo
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save("reporte.pdf");
        document.body.removeChild(container);
      } else {
        // 📱 Móvil
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        console.log("PDF generado:", uri);

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert("PDF generado", `Ubicación: ${uri}`);
        }
      }
    } catch (error) {
      console.error("Error generando PDF:", error);
      Alert.alert("Error", "No se pudo generar el PDF");
    }
  };

  const handleExportar = async () => {
    try {
      setLoading(true);
      await generarPDF();
    } catch (err) {
      console.error('Error inesperado en handleExportar:', err);
      Alert.alert('Error', 'Ocurrió un error inesperado al generar el PDF');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando reportes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button onPress={() => cargarReportes()} variant="solid" size="sm">
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
          <Text style={{...styles.title, paddingBottom: 10, paddingLeft: 70, paddingRight: 70 }}>Reportes Institucionales</Text>
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
            {usoGlobal.length > 0 ? (
              usoGlobal.map((item, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={styles.tableCellUser}>{item.servicio || 'N/A'}</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCellModule}>{item.cantidad || 0}</Text>
                </View>
              ))
            ) : (
              <View style={styles.tableRow}>
                <Text style={styles.noDataText}>No hay registro de datos</Text>
              </View>
            )}
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
            {consumoMateriales.length > 0 ? (
              consumoMateriales.map((item, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={styles.tableCellUser}>{item.material || 'N/A'}</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCellModule}>{item.cantidad || 0}</Text>
                </View>
              ))
            ) : (
              <View style={styles.tableRow}>
                <Text style={styles.noDataText}>No hay registro de datos</Text>
              </View>
            )}
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
            {desempeno.length > 0 ? (
              desempeno.map((item, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={styles.tableCellUser}>{item.laboratorio || 'N/A'}</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCellModule}>{item.tiempo_promedio || 'N/A'}</Text>
                </View>
              ))
            ) : (
              <View style={styles.tableRow}>
                <Text style={styles.noDataText}>No hay registro de datos</Text>
              </View>
            )}
          </ScrollView>
        </Card>
      </View>

        {/* 🔹 Filtros */}
        <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0', width: 400}}>
        <Text style={styles.filterTitle}>Filtros</Text>
            <View style={{...styles.filterContainer, width: 350, height: 550, backgroundColor: 'transparent', marginTop: -10, paddingTop: 0 }}>
            
                <Text style={{...styles.filterTitle, flexDirection: 'column', marginTop: -50 }}>Tipo de Recurso</Text>
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
                    style={{...styles.searchButton, marginTop: 7, backgroundColor: '#288bdbff', marginBottom: -20 }}
                >
                <ButtonText className="text-white" style={{ color: '#fff' }}>Filtrar</ButtonText>
                </Button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onPress={handleLimpiarFiltros}
                  style={{...styles.clearButton, marginTop: 40, backgroundColor: '#434b52ff', borderColor: '#787879ff'}}
                >
                  <ButtonText className="text-black" style={{ color: '#fff' }}>Limpiar</ButtonText>
                </Button>
            </View>

            <Text style={{...styles.filterTitle, marginTop: -62, marginRight: 0}}>Exportar a PDF</Text>
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
  clearButton: {
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