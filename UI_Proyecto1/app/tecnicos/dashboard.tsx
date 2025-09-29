import { View } from '@/components/Themed';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Laboratorio } from '@/model/laboratorios';
import { recursos, setRecursos, setResponsable, setSolicitudes, solicitudes, usuarios } from "@/model/listStorage";
import { getUser } from '@/model/login';
import { Recurso } from '@/model/recursos';
import { Solicitud } from '@/model/solicitudes';
import { readLaboratorio, readRecursos, readResponsable, updateRecurso } from '@/services/moduloLab_service';
import { readSolicitudes, updateSolicitud } from '@/services/moduloTecEnc_service';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet } from 'react-native';

export default function dashboardTecnicos() {

  const [laboratorio, setLaboratorio] = useState<Laboratorio | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const idUser = getUser();

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Solicitudes
      const resSolicitudes = await readSolicitudes();
      setSolicitudes(resSolicitudes.data);

      // Responsable y laboratorio del usuario actual
      const resResponsable = await readResponsable(String(idUser));
      setResponsable(resResponsable.data[0]);

      const resLaboratorio = await readLaboratorio(resResponsable.data[0].idLab);
      setLaboratorio(resLaboratorio.data[0]);

      
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };
  fetchData();
}, [refreshKey]);

  const router = useRouter();
  const handleLogout = () => {
    // Redirige al inicio de sesion
      router.replace('/');
  };
  const handleGestionInvent = () => {
    // Redirige a gestion de inventario
      router.replace('/tecnicos/gestion_inventarios');
  };
   const handleMantenimiento = () => {
    // Redirige a mantenimiento
      router.replace('/tecnicos/mantenimiento');
  };
  const handleRepos = () => {
    // Redirige a Reportes operativos
      router.replace('/tecnicos/repoOperativos');
  };

   const actualizarLista = async (recursoAct: Recurso, solicitud: Solicitud) => {

    const resp1 = await updateRecurso(recursoAct);
    const resp2 = await updateSolicitud(solicitud);
    console.log(resp1, resp2);
    const resRecursos = await readRecursos();
    setRecursos(resRecursos.data);
    const resSolicitudes = await readSolicitudes();
    setSolicitudes(resSolicitudes.data);
    
   }

  const handleAceptar = (id: Number) => {

      const solicitud = solicitudes.find(s => s.idSolic === id);

      if (solicitud) {
        const recursoAct = recursos.find(r => r.idRec === solicitud.idRec);
        if (recursoAct?.estado === "Disponible"){
          solicitud.estado = "Aprobada";
          solicitud.fechaResp = new Date();
          recursoAct.estado = "Ocupado";
          actualizarLista(recursoAct, solicitud);
          setRefreshKey(prev => prev + 1);
          
        }

        
      } else {
        console.warn("Solicitud no encontrada");
      }

  };
  const handleRechazar = (id: Number) => {

    const solicitud = solicitudes.find(s => s.idSolic === id);

    if (solicitud) {
      const recursoAct = recursos.find(r => r.idRec === solicitud.idRec);
      if (recursoAct?.estado === "Ocupado"){
        solicitud.estado = "Rechazada";
        solicitud.fechaResp = new Date();
        actualizarLista(recursoAct, solicitud);
        setRefreshKey(prev => prev + 1);
        
      }

      
    } else {
      console.warn("Solicitud no encontrada");
    }

  };

  return (
    
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
          <Button onPress={handleGestionInvent} variant="solid" className="bg-white" size="md" action="primary" >
            <ButtonText className="text-black">Gestión de Inventario</ButtonText>
          </Button>
          <Button onPress={handleMantenimiento} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Pantalla de Mantenimiento</ButtonText>
          </Button>
          <Button onPress={handleRepos} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Panel de Reportes Operativos</ButtonText>
          </Button>
          <Button onPress={handleLogout} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Cerrar Sesión</ButtonText>
          </Button>
        </ScrollView>
      </View>
      
      <View style={styles.line} />
      {/* Fin Menú principal*/}

      <Text style={styles.title}>Panel de Solicitudes</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {solicitudes && solicitudes.length > 0 ? ( 
          solicitudes.filter((item) => laboratorio && item.idLab === laboratorio.idLab).map((item) => (
          <Card
            key={String(item.idSolic)}
            className="p-5 rounded-lg bg-white border border-black"
            style={styles.card} 
          >
            <VStack className="mb-6">
              <Heading size="md" className="mb-4 text-black">
                {`Solicitud de ${recursos.find(r => r.idRec === item.idRec)?.nombre}`}
              </Heading>
              <Text size="sm" className="text-black">
                Nombre del solicitante: {usuarios.find(u => u.idUsr === item.idUsr)?.nombre || "..."}{"\n"}
                Recurso solicitado: {recursos.find(r => r.idRec === item.idRec)?.nombre || "..."}{"\n"}
                Fecha de Solicitud: {String(item.fechaSoli)}{"\n"}
                Fecha de Respuesta: {String(item.fechaResp || "Pendiente")}{"\n"}
                Estado: {String(item.estado)}
              </Text>
            </VStack>
            <Box className="flex-col sm:flex-row">
              <Button disabled={item.estado !== "Pendiente"} onPress={() => handleAceptar(item.idSolic)} className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                <ButtonText size="sm">Aceptar</ButtonText>
              </Button>
              <Button
                disabled={item.estado !== "Pendiente"}
                onPress={() => handleRechazar(item.idSolic)}
                variant="solid"
                action="secondary"
                className="px-4 py-2 border-outline-300 sm:flex-1"
              >
                <ButtonText size="sm" className="text-typography-600">
                  Rechazar
                </ButtonText>
              </Button>
            </Box>
          </Card>
        ))
      ) : (
        <Text className="text-center text-black mt-5">
          No hay Solicitudes...
        </Text>
      )}
      </ScrollView>


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
  line: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
  },
  horizontalContainer: {
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start', 
  gap: 8, 
  paddingVertical: 10,
  paddingBottom: 0,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

});