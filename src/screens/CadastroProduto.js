import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { CustomText, TermoUsoText } from '../components/Text'
import { Logo } from '../components/Logo'

export default function CadastroProduto() {
    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Logo/>
        </View>

        <CustomText>Cadastro Produto</CustomText>

        <TextInput
            style={styles.input}
            placeholder='Nome do produto'
            placeholderTextColor="black"
        />

        <TextInput
            style={[
                styles.input,
                {height: 100, paddingBottom: 30}
            
            ]}
            placeholder='Descrição breve do produto'
            placeholderTextColor="black"
        />

        <TextInput
            style={styles.input}
            placeholder='Categoria do produto'
            placeholderTextColor="#cccccc"
        />

        <TouchableOpacity style={styles.buttonCadastro}>
            <Text style={styles.buttonCadastroText}>Cadastrar produto</Text>
        </TouchableOpacity>

        <Text style={{marginBottom:150}}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60, 
    backgroundColor: 'white',
  },
  form: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  buttonCadastroText: {
    color: 'black', // Cor do texto
    fontWeight: 'bold', // Negrito
    fontSize: 20,
  },
  selectedButton: {
    backgroundColor: 'white', // Cinza mais escuro
  },
  leftButton: {
    borderTopLeftRadius: 5, // Borda arredondada superior esquerda
    borderBottomLeftRadius: 5, // Borda arredondada inferior esquerda
  },
  rightButton: {
    borderTopRightRadius: 5, // Borda arredondada superior direita
    borderBottomRightRadius: 5, // Borda arredondada inferior direita
  },
  // Estilo para a margem horizontal entre os botões
  buttonSeparator: {
    width: 10, // Largura da margem
  },
  input: {
    flexDirection: 'row', // Botões na mesma linha
    backgroundColor: 'white', // Fundo cinza claro
    borderColor: '#cccccc', // Borda cinza mais escura
    borderWidth: 1, // Largura da borda
    borderRadius: 5, // Borda arredondada
    paddingVertical: 4, // Preenchimento interno padrão
    paddingHorizontal: 8,
    width: 350, // Largura do formulário
    height: 60,
    marginTop: 20,
    paddingLeft: 20,
    fontSize: 15,
    marginBottom: 20
  },
  buttonCadastro: {
    backgroundColor: '#0F5BCC',
    borderColor: '#0F5BCC',
    borderWidth: 1, // Largura da borda
    borderRadius: 5, // Borda arredondada
    paddingVertical: 15, // Preenchimento interno padrão
    width: 350,
    marginTop: 20
  },
  buttonCadastroText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center'
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
