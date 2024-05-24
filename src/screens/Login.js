import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { CustomText, TermoUsoText } from '../components/Text';
import { Logo } from '../components/Logo';
import { ButtonGroup } from '../components/ButtonGroup';
import { Flag } from '../components/Flag';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { MessageAlert } from '../components/Formulario';
import { useNavigation } from "@react-navigation/native";
import { getDatabase } from 'firebase/database';
import { app } from '../../firebase';
import { ref, get } from 'firebase/database';


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {

    try {
      
      const auth = getAuth(app);
      const db = getDatabase(app);
      
      await signInWithEmailAndPassword(auth, email, senha);

      const user = auth.currentUser;
      const uid = user.uid;

      console.log(uid);

      const snapshot = await get(ref(db, `users/${uid}`));

      const userData = snapshot.val();

      console.log(userData); 

      MessageAlert('Sucesso', 'Login realizado com sucesso');

      navigation.navigate('dashboard', { user: userData });

    } catch (error) {  

      console.log(error);
      MessageAlert('Erro', error.message);
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Logo/>
        </View>

        <ButtonGroup/>

        <CustomText style={{ paddingTop: 20, fontSize: 30}}>Acesse sua conta</CustomText>

        <TextInput
            style={[
                styles.input, 
                { backgroundColor: '#F1F1F1' }
            ]}
            placeholder='E-mail'
            placeholderTextColor="black"
            placeholderStyle={{ fontSize: 16, paddingLeft: 10, paddingBottom: 30 }}
            onChangeText={text => setEmail(text.toLowerCase())}
            value={email}
        />

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={[
                styles.input,
                { marginTop: 5 }
                ]}
                placeholder='Sua senha'
                placeholderTextColor="#cccccc"
                secureTextEntry={true}
                onChangeText={setSenha}
                value={senha}
            />
        </View>

        <TouchableOpacity style={styles.buttonCadastro} onPress={handleLogin}>
            <Text style={styles.buttonCadastroText}>Acessar minha conta</Text>
        </TouchableOpacity>

        <Flag text="Lembrar-me"/>

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
    height: 60,
    marginTop: 60,
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
});
