import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function registroSalida() {
    const params = useLocalSearchParams<{ id: string }>();
    const id = params.id
    const router = useRouter();
    const [cantidad, setCantidad] = useState('');

    const handleSalida = () => {
        console.log(cantidad);
        router.replace('/tecnicos/gestion_inventarios');
    };
    const handleCancelar = () => {
        router.replace('/tecnicos/gestion_inventarios');
    };

    return (
        <View style={styles.container}>
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