import React, { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import { ApelidoNegocioTextInput, BotaoCadastroProduto, CnpjTextInput, CustomText, NomeTextInput } from '../components/Text'
import { app } from '../../firebase';
import { getDatabase, ref, set, push, runTransaction } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { MessageAlert } from '../components/Formulario';
import { useRoute } from '@react-navigation/native';

const BUSINESS_REGISTERED_SUCESSFULLY = 'Negócio registrado com sucesso'
const CANNOT_CREATE_BUSINESS_WITHOUT_ACCOUNT = 'Faça login para poder criar um negócio'

export default function Negocio() {
  const [apelido, setApelido] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nome, setNome] = useState('');  
  const [negocio, setNegocio] = useState(null);  
  
  const db = getDatabase(app);
  const auth = getAuth(app);

  const route = useRoute();

  useEffect(() => {
    if (route.params && route.params.produto) {
      const { negocio } = route.params,
      { 
        apelido,
        cnpj,
        nomeSobrenome
      } = negocio;

      setApelido(apelido);
      setCnpj(cnpj);
      setNome(nomeSobrenome);
    }
  }, [route.params]);

  const clearState = () => {
    setApelido('');
    setCnpj('');
    setNome('');
  }

  const handleEditarNegocio = async () => {
    try {
      const negocioRef = ref(db, `negocios/${negocio.id}`);
    
      console.log(apelido);
      console.log(cnpj);
      console.log(nome);
      console.log(negocio);

      const negocioAtualizado = {
        apelido: apelido,
        userId: negocio.userId,
        idNegocio: negocio.idNegocio,
        nomeSobrenome: nome,
        cnpj: cnpj
      }


      console.log('NEGOCIO ATUALIZADO ' + negocio);

      await update(negocioRef, negocioAtualizado);

      MessageAlert('Sucesso', 'Negócio atualizado com sucesso!');

      clearState();
    } catch (error) {
      console.log(error);
      MessageAlert('Erro', 'Erro ao atualizar o negócio');
    }
  } 

  const handleCadastroNegocio = async () => {

    try {

        const user = auth && auth.currentUser ? auth.currentUser : null;
        
        console.log(user);

        if (user) {

          const counterNegocioRef = ref(db, 'negocioCounter');

          let newNegocioId;

          await runTransaction(counterNegocioRef, (currentValue) => {
            if (currentValue === null) {
              return 1;
            }
            return currentValue + 1;
          }).then((transactionResult) => {
            if (transactionResult.committed) {
              newNegocioId = transactionResult.snapshot.val();
            } else {
              throw new Error('Transaction not commited');
            }
          });

          console.log('negocio' + newNegocioId);

          const negocioRef = ref(db, 'negocios');
          const newProdutoRef = push(negocioRef);

          await set(newProdutoRef, {
            idNegocio: newNegocioId,
            apelido: apelido,
            userId: user.uid,
            cnpj: cnpj,
            nomeSobrenome: nome
          });

          MessageAlert('Sucesso', BUSINESS_REGISTERED_SUCESSFULLY);

          clearState();
        } else {
          MessageAlert('Erro', CANNOT_CREATE_BUSINESS_WITHOUT_ACCOUNT);
        }
    } catch (error) {
      
      console.log(error);
      MessageAlert('Erro', error.message);
    }
  }

  return (
    <View style={styles.container}>

        <CustomText style={{marginBottom: 40}}>Criar negócio</CustomText>

        <ApelidoNegocioTextInput value={apelido} onChangeText={setApelido}></ApelidoNegocioTextInput>

        <CnpjTextInput value={cnpj} onChangeText={setCnpj}></CnpjTextInput>

        <NomeTextInput value={nome} onChangeText={setNome}></NomeTextInput>

        {negocio ? (
        <BotaoCadastroProduto onPress={handleEditarNegocio} text={"Atualizar negócio"} />
      ) : (
        <BotaoCadastroProduto text={'Salvar negócio'} onPress={handleCadastroNegocio}></BotaoCadastroProduto>
      )}

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
    paddingLeft: 20,
    fontSize: 15,
    marginBottom: 30
  },
  buttonCadastro: {
    backgroundColor: '#0F5BCC',
    borderColor: '#0F5BCC',
    borderWidth: 1, // Largura da borda
    borderRadius: 5, // Borda arredondada
    paddingVertical: 15, // Preenchimento interno padrão
    width: 350,
    marginTop: 40
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
