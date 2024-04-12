import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CustomText } from '../components/Text';
import { FormularioFilterProduto, FormularioPanelProduto } from '../components/Formulario';

export default function Produto() {
  return (
    <View style={styles.container}>
        <CustomText style={{ fontSize: 30, color: 'white', marginTop: 10}}>Produtos</CustomText>

        <FormularioFilterProduto/>
        <FormularioPanelProduto/>

        <TouchableOpacity style={styles.buttonCadastro}>
            <Text style={styles.buttonCadastroText}>Cadastrar novo produto</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    buttonCadastro: {
        backgroundColor: '#0F5BCC',
        borderColor: '#0F5BCC',
        borderWidth: 1, // Largura da borda
        borderRadius: 5, // Borda arredondada
        paddingVertical: 15, // Preenchimento interno padrão
        width: 350,
        marginBottom: 100
    },
    buttonCadastroText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 18,
        textAlign: 'center'
    },
    container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60, 
  },
});

