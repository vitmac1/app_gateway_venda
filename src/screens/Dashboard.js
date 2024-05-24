import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CustomText } from '../components/Text';
import { FormularioVenda, FormularioPendente, FormularioSaldo, FormularioRanking, FormularioConversaoPagamento } from '../components/Formulario';
import { useRoute } from '@react-navigation/native';
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from '../../firebase';
import { getAuth } from 'firebase/auth';

export default function Dashboard() {
  const [showWelcomeForm, setShowWelcomeForm] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [totalVendas, setTotalVendas] = useState(0);
  const route = useRoute();

  useEffect(() => {
    if (route.params && route.params.user) {
      const { nome } = route.params.user;
      setNomeUsuario(nome);
      setShowWelcomeForm(true);
	  console.log('vish');
	  console.log(nomeUsuario);
      const timeout = setTimeout(() => {
        setShowWelcomeForm(false);
      }, 3000);
      return () => clearTimeout(timeout);
    } 

	const db = getDatabase(app);
	const auth = getAuth(app);
    const vendasRef = ref(db, "vendas");

    onValue(vendasRef, (snapshot) => {
      const vendas = snapshot.val();
      let total = 0;
      if (vendas) {
		console.log('teste');
        const userId = auth.currentUser.uid;
		console.log(userId);
        Object.values(vendas).forEach((venda) => {
          // Filtrar as vendas pelo userId do usuário atual
          if (venda.userId === userId) {
            
			console.log(venda.valorVenda);
			total += venda.valorVenda;
          }
        });
      }
      setTotalVendas(total);
	});
  }, [route.params]);

  return (
    <View style={styles.container}>

        {showWelcomeForm && (
          <View style={styles.welcomeForm}>
            <Text style={styles.welcomeText}>Bem-vindo!</Text>
            <Text style={styles.userInfo}>{nomeUsuario}</Text>
          </View>
        )}

        <CustomText style={{ fontSize: 30, color: 'white', marginTop: 10}}>Dashboard</CustomText>

        <FormularioVenda valorVendas={totalVendas ? totalVendas.toFixed(2) : '0,00'}/>
        <FormularioPendente valorPendente={'0,00'}/>
        <FormularioSaldo saldo={totalVendas ? totalVendas.toFixed(2) : '0,00'}/>
        <FormularioRanking nivel={'1'} valorVendas={'0,00'}/>
        <FormularioConversaoPagamento vendasBoleto={'0'} vendasCartao={'0'} vendasPix={'0'}/>

        <Text style={{marginBottom:100}}></Text>
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
  welcomeForm: {
    backgroundColor: 'lightgray',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },
  userInfo: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});

