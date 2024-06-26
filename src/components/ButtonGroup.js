import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export const ButtonGroup = () => {
    const [selectedButton, setSelectedButton] = useState('login');
    const navigation = useNavigation();

    const handlePress = (button) => {
        setSelectedButton(button);
        navigation.navigate(button);
    };

    return (
        <View style={styles.buttonGroup}>
            <TouchableOpacity
                style={[styles.button, selectedButton === 'login']}
                onPress={() => handlePress('login')}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.buttonSeparator}></View>

            <TouchableOpacity
                style={[styles.button, selectedButton === 'cadastro']}
                onPress={() => handlePress('cadastro')}
            >
                <Text style={styles.buttonText}>Nova Conta</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        flexDirection: 'row', // Botões na mesma linha
        backgroundColor: '#f2f2f2', // Fundo cinza claro
        borderColor: '#cccccc', // Borda cinza mais escura
        borderWidth: 1, // Largura da borda
        borderRadius: 5, // Borda arredondada
        paddingVertical: 4, // Preenchimento interno padrão
        paddingHorizontal: 8,
        width: 350, // Largura do formulário
    },
    button: {
        flex: 1, // Ocupar todo o espaço disponível
        alignItems: 'center', // Centralizar texto horizontalmente
        justifyContent: 'center', // Centralizar texto verticalmente
        paddingVertical: 14, // Aumentar o preenchimento verticalmente
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: 'white', // Cor de fundo branca
    },
    buttonText: {
        color: 'black', // Cor do texto
        fontWeight: '500', // Negrito
        fontSize: 20,
    },
    // Estilo para a margem horizontal entre os botões
    buttonSeparator: {
        width: 10, // Largura da margem
    },
});