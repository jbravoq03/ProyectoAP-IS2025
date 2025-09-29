import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { materiales, recursos, setMateriales } from '@/model/listStorage';
import { Material } from '@/model/materiales';
import { readMateriales, updateMaterial } from '@/services/moduloLab_service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function registroSalida() {
    const params = useLocalSearchParams<{ id: string }>();
    const id = params.id;

    const idRecMat = materiales.find((m) => String(m.idMat) === String(id))?.idRec
    
    const nombre = recursos.find((r) => String(r.idRec) === String(idRecMat))?.nombre
    const router = useRouter();
    const [cantidad, setCantidad] = useState('');


    const actualizarLista = async (materialMod: Material, cantidad: Number) => {

        const nuevaCantidad = Number(materialMod.cantidad)- Number(cantidad);
        materialMod.cantidad = String(nuevaCantidad)
        const resp = await updateMaterial(materialMod);
        console.log(resp);
        const resMats = await readMateriales();
        setMateriales(resMats.data);
    
    }

    const handleSalida = () => {
        const materialModificar = materiales.find((m) => String(m.idMat) === String(id))

        if (materialModificar){
            actualizarLista(materialModificar, Number(cantidad));
        }
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
                    <Heading className="text-typography-900 text-black">Registrar Salida de {nombre}</Heading>
                    <VStack space="xs">
                    <Text className="text-typography-500 text-black">Cantidad</Text>
                    <Input>
                        <InputField type="text" value={cantidad} className="text-black"  keyboardType="numeric" onChangeText={(text) => {
                                                                                                                setCantidad(text.replace(/[^0-9]/g, ''));
                                                                                                                }}/>
                    </Input>
                    </VStack>
                    
                    <Button className="ml-auto" variant='solid' action="secondary" disabled={cantidad === ''} onPress={handleSalida}>
                        <ButtonText>Registrar</ButtonText>
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