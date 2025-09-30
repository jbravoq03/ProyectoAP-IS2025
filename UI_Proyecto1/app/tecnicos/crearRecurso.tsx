import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { BitAccion } from '@/model/bitacAcciones';
import { responsable, setRecursos } from '@/model/listStorage';
import { getUser } from '@/model/login';
import { Recurso } from '@/model/recursos';
import { createRecurso, readRecursos } from '@/services/moduloLab_service';
import { createBitAccion } from '@/services/moduloTecEnc_service';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function creacionRecurso() {

    const idUsuario = getUser();
    const router = useRouter();
    const idLab = responsable?.idLab;
    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState("");
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("");


    const actualizarTabla = async (recurso: Recurso) => {

      
        const nuevaEntradaRec: BitAccion = {
        idBitac: 0,
        idUsuario: Number(idUsuario),
        accion: "Creacion",
        fecha: new Date(),
        descripcion: `Recurso creado: ${recurso.nombre}`,
        };
        
        const resp = await createRecurso(recurso);
        const resp2 = await createBitAccion(nuevaEntradaRec);
        const resp3 = await readRecursos();
        setRecursos(resp3.data);
   
        
    }

    const handleCrear = () => {
        
        const nuevoRecurso: Recurso = {
        idRec: Date.now(), // o algún generador de ID
        idLab: Number(idLab),
        nombre,
        imagen,
        tipo,
        descripcion,
        estado,
        };
        console.log(nuevoRecurso);
        actualizarTabla(nuevoRecurso);

        router.replace('/tecnicos/gestion_inventarios');
    };
    const handleCancelar = () => {
        router.replace('/tecnicos/gestion_inventarios');
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerCard}>
                <FormControl className="p-4 border border-outline-200 rounded-lg w-full" style={styles.card}>
                <VStack className="gap-4">
                    <Heading className="text-typography-900 text-black">Crear Recurso</Heading>
                    <VStack space="xs">
                     <Text className="text-black">Nombre:</Text>
                        <Input>
                            <InputField
                            className="text-black"
                            placeholder="Nombre del recurso"
                            value={nombre}
                            onChangeText={setNombre}
                            />
                        </Input>

                        <Text className="text-black">Tipo:</Text>
                        <Input>
                            <InputField
                            className="text-black"
                            placeholder="Tipo de recurso"
                            value={tipo}
                            onChangeText={setTipo}
                            />
                        </Input>

                        <Text className="text-black">Descripción:</Text>
                        <Input>
                            <InputField
                            className="text-black"
                            placeholder="Descripción"
                            value={descripcion}
                            onChangeText={setDescripcion}
                            />
                        </Input>

                        <Text className="text-black">Estado:</Text>
                        <Input>
                            <InputField
                            className="text-black"
                            placeholder="Estado del recurso"
                            value={estado}
                            onChangeText={setEstado}
                            />
                        </Input>
                    </VStack>
                    
                    <Button className="ml-auto" variant='solid' action="secondary" onPress={handleCrear} disabled={
                                    !nombre || !tipo || !descripcion || !estado}>
                        <ButtonText>Crear</ButtonText>
                    </Button>
                    <Button className="ml-auto" variant="solid" action="secondary" onPress={handleCancelar}>
                        <ButtonText>Cancelar</ButtonText>
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
    containerCard: {
        flex: 1,
        width: '150%',
        alignItems: 'center', 
        backgroundColor: '#ffffffff',
        padding: 50,
    },
});