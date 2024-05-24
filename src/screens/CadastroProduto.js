import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  CustomText,
  DescricaoProdutoText,
  NomeProdutoText,
  PrecoVendaProdutoText,
  DropdownTipoProduto,
  BotaoCadastroProduto,
  DropdownTipoFormaPagamento,
  QuantidadeProdutoText,
} from "../components/Text";
import { Logo } from "../components/Logo";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  push,
  child,
  remove,
  update,
  runTransaction,
} from "firebase/database";
import { MessageAlert } from "../components/Formulario";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";

const PRODUCT_REGISTERED_SUCESSFULLY = "Produto cadastrado com sucesso";
const PRODUCT_UPDATED_SUCESSFULLY = "Produto cadastrado com sucesso";
const PRICE_MUST_BE_MANDATORY = "Preço de venda do produto é obrigatório";

export default function CadastroProduto() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricaoProduto, setDescricaoProduto] = useState("");
  const [categoriaProduto, setCategoriaProduto] = useState("");
  const [precoVendaProduto, setPrecoVendaProduto] = useState("");
  const [erroPrecoVenda, setErroPrecoVenda] = useState("");
  const [produto, setProduto] = useState(null);
  const [comprador, setComprador] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const precoInputRef = useRef(null);

  const db = getDatabase(app);
  const auth = getAuth(app);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.produto) {
      const { produto, isComprador } = route.params,
      { 
        descricao,
        categoria,
        nome,
        preco
      } = produto;

      console.log('isComprador');
      console.log(isComprador);



      if (isComprador) {
        setComprador(isComprador);
      }

      setProduto(produto);
      setNomeProduto(nome);
      setDescricaoProduto(descricao);
      setCategoriaProduto(categoria);
      setPrecoVendaProduto(preco);
    }
  }, [route.params]);

  const handleComprarProduto = async () => {
    try {
      const user = auth && auth.currentUser ? auth.currentUser : null;

      console.log('USUARIO LOGADO:' + user);

      if (user) {
        
        const counterVendaRef = ref(db, 'vendaCounter');
        
        let newVendaId;

        await runTransaction(counterVendaRef, (currentValue) => {
          if (currentValue === null) {
            return 1;
          }
          return currentValue + 1;
        }).then((transactionResult) => {
          if (transactionResult.committed) {
            newVendaId = transactionResult.snapshot.val();
          } else {
            throw new Error('Transaction not commited');
          }
        });

        console.log('venda' + newVendaId);

        if (newVendaId) {

          const vendaRef = push(ref(db, 'vendas'));

          const vendaData = {
            idVenda: newVendaId,
            userId: user.uid,
            idProduto: produto.idProduto,
            idVendedor: produto.userId,
            quantidade: quantidade,
            valorVenda: produto.preco,
            formaPagamento: formaPagamento,
            ativo: 1
          }

          await set(vendaRef, vendaData);

          console.log('Nova venda criada com ID:' + newVendaId);

          MessageAlert('Sucesso', 'Produto comprado com sucesso!');

          clearState();
        }
      }

    } catch (error) {
      console.log(error);
      MessageAlert('Erro', 'Erro ao comprar produto');
    }
  }

  const handleEditarProduto = async () => {
    try {

      console.log(produto.id);
      const produtoRef = ref(db, `produtos/${produto.id}`);

      console.log(nomeProduto);
      console.log(descricaoProduto);
      console.log(precoVendaProduto);
      console.log(categoriaProduto);

      const produtoAtualizado = {
        idProduto: produto.idProduto,
        id: produto.id,
        userId: produto.userId,
        nome: nomeProduto,
        descricao: descricaoProduto,
        preco: precoVendaProduto,
        categoriaProduto: categoriaProduto,
        fgAtivo: 1
      }


      console.log('PRODUTO ATUALIZADO ' + produto);

      await update(produtoRef, produtoAtualizado);

      MessageAlert('Sucesso', 'Produto atualizado com sucesso!');

      clearState();

      navigation.navigate('produto');
    } catch (error) {
      console.log(error);
      MessageAlert('Erro', 'Erro ao atualizar produto');
    }
  }

  const deleteAllProdutos = async () => {
    try {
      // Obter uma referência para a coleção
      const colecaoRef = ref(db, "produtos");

      // Obter uma snapshot dos registros da coleção
      const snapshot = await get(colecaoRef);
      console.log("snapshot" + colecaoRef);

      remove(colecaoRef);
      console.log(`Todos os registros da coleção produtos foram excluídos.`);
    } catch (error) {
      console.error("Erro ao excluir registros da coleção:", error.message);
      MessageAlert("Erro", error.message);
    }
  };

  const deleteProdutoByIdProduto = async () => {
    try {
      // Obter uma referência para a coleção
      const colecaoRef = ref(db, "produtos");

      // Obter uma snapshot dos registros da coleção
      const snapshot = await get(colecaoRef);
      console.log("snapshot" + colecaoRef);

      remove(colecaoRef);
      console.log(`Todos os registros da coleção produtos foram excluídos.`);
    } catch (error) {
      console.error("Erro ao excluir registros da coleção:", error.message);
      MessageAlert("Erro", error.message);
    }
  };

  const clearState = () => {
    setNomeProduto("");
    setDescricaoProduto("");
    setPrecoVendaProduto("");
    setCategoriaProduto("");
    setProduto(null);
    setFormaPagamento("");
    setQuantidade(0);
  };

  const timeutPrecoVendaProduto = () => {
    setTimeout(() => {
      setErroPrecoVenda(false);
    }, 3000);
  };

  const validateForm = () => {
    let valid = true;

    console.log(precoVendaProduto);

    if (precoVendaProduto == null || precoVendaProduto == "") {
      setErroPrecoVenda(true);

      MessageAlert("Erro", PRICE_MUST_BE_MANDATORY);

      setPrecoVendaProduto("");

      precoInputRef.current.focus();

      timeutPrecoVendaProduto();

      valid = false;
    }

    return valid;
  };

  const handleCadastrarProduto = async () => {
    try {
      const isFormValid = validateForm();

      if (isFormValid) {
        
        const user = auth && auth.currentUser ? auth.currentUser : null;

        console.log('USUARIO LOGADO:' + user);

        if (user) {
          
          const counterProdutoRef = ref(db, 'produtoCounter');
          
          let newProdutoId;

          await runTransaction(counterProdutoRef, (currentValue) => {
            if (currentValue === null) {
              return 1;
            }
            return currentValue + 1;
          }).then((transactionResult) => {
            if (transactionResult.committed) {
              newProdutoId = transactionResult.snapshot.val();
            } else {
              throw new Error('Transaction not commited');
            }
          });

          console.log('produto' + newProdutoId);

          if (newProdutoId) {

            const produtoRef = push(ref(db, 'produtos'));

            const produtoData = {
              idProduto: newProdutoId,
              userId: user.uid,
              nome: nomeProduto,
              descricao: descricaoProduto,
              categoria: categoriaProduto,
              preco: precoVendaProduto,
              ativo: 1
            }

            await set(produtoRef, produtoData);

            console.log('Novo produto criado com ID:' + newProdutoId);

            MessageAlert('Sucesso', PRODUCT_REGISTERED_SUCESSFULLY);

            clearState();
          }
        }
      } else {
        MessageAlert('Erro', 'E necessário estar logado para criar um produto');
      }
    } catch (error) {
      console.log(error);
      MessageAlert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>

      <CustomText>Cadastro Produto</CustomText>

      <NomeProdutoText
        value={nomeProduto}
        onChangeText={setNomeProduto}
      ></NomeProdutoText>

      <DescricaoProdutoText
        value={descricaoProduto}
        onChangeText={setDescricaoProduto}
      ></DescricaoProdutoText>

      <PrecoVendaProdutoText
        erroPrecoVenda={erroPrecoVenda}
        value={precoVendaProduto}
        onChangeText={setPrecoVendaProduto}
      ></PrecoVendaProdutoText>

      <DropdownTipoProduto
        selectedValue={categoriaProduto}
        onValueChange={setCategoriaProduto}
      ></DropdownTipoProduto>

    {comprador && (
              <>
      <DropdownTipoFormaPagamento
        selectedValue={formaPagamento}
        onValueChange={setFormaPagamento}
      ></DropdownTipoFormaPagamento>

      <QuantidadeProdutoText
        value={quantidade}
        onChangeText={setQuantidade}
      >
      </QuantidadeProdutoText>
      </>
    )} 

    {produto && !comprador ? (
  // Se existir produto e não existir comprador, exibe botão para atualizar produto
  <BotaoCadastroProduto onPress={handleEditarProduto} text={"Atualizar produto"} />
  ) : !produto && !comprador ? (
    // Se não existir produto e não existir comprador, exibe botão para cadastrar produto
    <BotaoCadastroProduto onPress={handleCadastrarProduto} text={"Cadastrar produto"} />
  ) : produto && comprador ? (
    // Se existir produto e existir comprador, exibe botão para comprar produto
    <BotaoCadastroProduto onPress={handleComprarProduto} text={"Comprar produto"} />
  ) : null}

      <Text style={{ marginBottom: 150 }}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
    backgroundColor: "white",
  },
  form: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  buttonCadastroText: {
    color: "black", // Cor do texto
    fontWeight: "bold", // Negrito
    fontSize: 20,
  },
  selectedButton: {
    backgroundColor: "white", // Cinza mais escuro
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
    flexDirection: "row", // Botões na mesma linha
    backgroundColor: "white", // Fundo cinza claro
    borderColor: "#cccccc", // Borda cinza mais escura
    borderWidth: 1, // Largura da borda
    borderRadius: 5, // Borda arredondada
    paddingVertical: 4, // Preenchimento interno padrão
    paddingHorizontal: 8,
    width: 350, // Largura do formulário
    height: 60,
    marginTop: 20,
    paddingLeft: 20,
    fontSize: 15,
    marginBottom: 20,
  },
  buttonCadastro: {
    backgroundColor: "#0F5BCC",
    borderColor: "#0F5BCC",
    borderWidth: 1, // Largura da borda
    borderRadius: 5, // Borda arredondada
    paddingVertical: 15, // Preenchimento interno padrão
    width: 350,
    marginTop: 20,
  },
  buttonCadastroText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 18,
    textAlign: "center",
  },
  underline: {
    textDecorationLine: "underline",
  },
});
