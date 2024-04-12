import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CustomText } from '../components/Text';
import { FormularioPendente, FormularioSaldo, FormularioReservado, FormularioTotal, SolicitacaoSaque } from '../components/Formulario';

export default function Financa() {
  return (
    <View style={styles.container}>

        <CustomText style={{ fontSize: 30, color: 'white', marginTop: -10}}>Finanças</CustomText>
        <Text style={{fontSize: 30, marginTop: 5, color: 'white', alignSelf: 'flex-start', paddingLeft: 20}}>RESUMO</Text>
        <FormularioSaldo style={{marginTop: 10}} saldo={'0,00'}/>
        <FormularioPendente style={{marginTop: 10}} valorPendente={'0,00'}/>
        <FormularioReservado  valorReservado={'0,00'}/>
        <FormularioTotal total={'0,00'}/>
        <SolicitacaoSaque saque={'2,00'}/>

        <TouchableOpacity style={styles.buttonCadastro}>
            <Text style={styles.buttonCadastroText}>Solicitar saque</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
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
  leftButton: {
    borderTopLeftRadius: 5, // Borda arredondada superior esquerda
    borderBottomLeftRadius: 5, // Borda arredondada inferior esquerda
  },
  rightButton: {
    borderTopRightRadius: 5, // Borda arredondada superior direita
    borderBottomRightRadius: 5, // Borda arredondada inferior direita
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
    height: 90,
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
    width: 250,
    marginTop: 30
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
  inputContainer: {
    alignItems: 'flex-start', // Alinhamento dos elementos à esquerda
    marginTop: 30,
    marginBottom: 20, // Espaçamento inferior entre os elementos
  },
  label: {
    fontSize: 18, // Tamanho do texto
    fontWeight: '300', // Peso da fonte
    paddingLeft: 8,
  },
});

