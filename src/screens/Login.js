import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { CustomText, TermoUsoText } from '../components/Text'
import { ButtonGroup } from '../components/ButtonGroup'
import { Logo } from '../components/Logo'

export default function Login() {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Logo/>
        </View>

        <ButtonGroup/>

        <CustomText>Nova conta</CustomText>


        <TextInput
            style={styles.input}
            placeholder='Nome e sobrenome'
            placeholderTextColor="black"
        />

        <TextInput
            style={styles.input}
            placeholder='E-mail'
            placeholderTextColor="black"
        />

        <TextInput
            style={styles.input}
            placeholder='+ 55'
            placeholderTextColor="black"
        />

        <TextInput
            style={styles.input}
            placeholder='Senha'
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
        />

        <TextInput
            style={styles.input}
            placeholder='Repetir senha'
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
        />

        <TermoUsoText>
            Ao criar conta, você confirma que leu e{"\n"}concorda com os <Text style={styles.underline}>termos de uso</Text> da Shiftway.
        </TermoUsoText>

        <TouchableOpacity style={styles.buttonCadastro}>
            <Text style={styles.buttonCadastroText}>Criar conta grátis</Text>
        </TouchableOpacity>
        <Text style={{marginBottom:80}}></Text>
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
    fontSize: 20
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
