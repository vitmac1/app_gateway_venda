import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { CustomText, TermoUsoText } from '../components/Text';
import { Logo } from '../components/Logo';
import { ButtonGroup } from '../components/ButtonGroup';
import { MessageAlert } from '../components/Formulario';
import { app } from '../../firebase';
import { getDatabase, ref, runTransaction, set, push } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';

const CREATE_USER_SUCESSFUL_MESSAGE = 'Usuário cadastrado com sucesso!';
const PASSWORD_DO_NOT_MATCH_MESSAGE = 'As senhas não coincidem';
const INVALID_EMAIL_MESSAGE = 'Email inválido';
const PASSWORD_SHOULD_BE_LEAST_SIX_CHARACTERS = 'Senha deve ter ao menos 6 caracteres'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);

  // Ref para o TextInput de email
  const emailInputRef = useRef(null);
  const senhaInputRef = useRef(null);

  const auth = getAuth(app);
  const db = getDatabase(app);
  
  const clearState = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setSenha('');
    setRepetirSenha('');
  }

  const validateForm = () => {

    let valid = true;

    if (senha !== repetirSenha) {
      
      MessageAlert('Erro', PASSWORD_DO_NOT_MATCH_MESSAGE);

      setSenha('');
      
      setRepetirSenha('');

      valid = false;
    }

    if (!EMAIL_REGEX.test(email)) {

      setErroEmail(true);
      
      MessageAlert('Erro', INVALID_EMAIL_MESSAGE);

      setEmail('');      

      emailInputRef.current.focus();
        
      setTimeout(() => {
        setErroEmail(false);        
      }, 2000);

      valid = false;
    }

    if (senha.length < 6) {
      
      setErroSenha(true);

      MessageAlert('Erro', PASSWORD_SHOULD_BE_LEAST_SIX_CHARACTERS);

      setSenha('');

      setRepetirSenha('');

      senhaInputRef.current.focus();

      setTimeout(() => {
        setErroSenha(false);        
      }, 2000);

      valid = false;
    }

    return valid;
  }

// Tentar achar uma forma de pegar usuários autenticados na database do firebase
// const deleteAllUsersAuth = async () => {
//   try {
//       // Lista todos os
//       let pageToken;
//       const userResult = await db.listUsers(1000, pageToken);

//       console.log('teste' + retorno);
      
//       // Itera sobre cada usuário e os exclui
//       userResult.users.forEach(async (user) => {
//         await deleteUser(auth, user.uid);
//         console.log(`Usuário ${user.uid} excluído com sucesso.`);
//       });
//     } catch (error) {
//       console.error('Erro ao listar ou excluir usuários:', error);
//     }
// };

// const handleDeleteAllUsersAuth = async () => {
//   deleteAllUsersAuth().then(() => {
//     console.log('Todas as contas de usuários foram excluídas com sucesso.');
//   }).catch(error => {
//     console.error('Erro ao excluir todas as contas de usuáros', error);
//   });
// }
 
  const registerUser = async (userData) => {
    
    try {

      const counterRef = ref(db, 'userCounter');

      let newUserId;

      await runTransaction(counterRef, (currentValue) => {
        
        if (currentValue === null) {
          return 1; // Inicializa o contador se não existir
        }
        return currentValue + 1;
      }).then((transactionResult) => {
        if (transactionResult.committed) {
          newUserId = transactionResult.snapshot.val();
        } else {
          throw new Error('Transaction not commited');
        }
      }); 

      console.log('usuario' + newUserId);

      if (newUserId != null)  {

        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        if (user) {
          const userRef = ref(db, `users/${user.uid}`);

          const userData = {
            idUsuario: newUserId,
            idUsuarioAuth: user.uid,
            nome: nome,
            email: email,
            telefone: telefone,
            senha: senha
          };
  
            await set(userRef, userData);
            console.log('Novo usuário criado com ID:' + newUserId);
  
            MessageAlert('Sucesso', CREATE_USER_SUCESSFUL_MESSAGE);
  
            clearState();
        }
      }
    } catch (error) {
      console.error(error);
      MessageAlert('Erro ao registrar usuário', error.message);
    }
  }

  const handleCadastro = async () => {
  
      const isFormValid = validateForm(); 

      if (isFormValid) { 

        registerUser();

      }
};

  return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Logo/>
        </View>

        <ButtonGroup/>

        <CustomText>Nova conta</CustomText>

        <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder='Nome e sobrenome'
            placeholderTextColor="black"
        />

        <TextInput
            style={[styles.input, erroEmail && styles.inputError]}
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
            placeholder='E-mail'
            placeholderTextColor="black"
        />

        <TextInput
            ref={emailInputRef}
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            placeholder='+ 55'
            placeholderTextColor="black"
        />

        <TextInput
            ref={senhaInputRef}
            style={[styles.input, erroSenha && styles.inputError]}
            value={senha}
            onChangeText={setSenha}
            placeholder='Senha'
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
            autoCapitalize="none" // Definir para 'none'
        />

        <TextInput
            style={styles.input}
            value={repetirSenha}
            onChangeText={setRepetirSenha}
            placeholder='Repetir senha'
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
            autoCapitalize="none" // Definir para 'none'
        />

        <TermoUsoText>
            Ao criar conta, você confirma que leu e{"\n"}concorda com os <Text style={styles.underline}>termos de uso</Text> da Shiftway.
        </TermoUsoText>

        <TouchableOpacity style={styles.buttonCadastro} onPress={handleCadastro}>
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
  inputError: {
    borderColor: 'red',
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
