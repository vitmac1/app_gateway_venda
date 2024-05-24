import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { CustomText } from "../components/Text";
import {
  FormularioFilterProduto,
  MessageAlert,
} from "../components/Formulario";
import { useNavigation } from "@react-navigation/native";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";

export default function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProdutos, setFilteredProdutos] = useState([]);

  const db = getDatabase(app);
  const auth = getAuth(app);

  const navigation = useNavigation();

  const navegarCadastroProduto = (produto, isComprador) => {
    navigation.navigate("cadastro produto", { produto, isComprador });
  };

  const handleEditProduct = (produto) => {
    const user = auth && auth.currentUser ? auth.currentUser : null;

    console.log("USER " + user);

    if (user) {
      const userId = user.uid;

      console.log('igual produto comprador');
      console.log(produto.userId === userId);

      if (produto.userId === userId) {
        navegarCadastroProduto(produto);
      } else {

        const isComprador = true;

        navegarCadastroProduto(produto, isComprador);
      }
    }
  };

  useEffect(() => {
    const produtosRef = ref(db, "produtos");

    const unsubscribe = onValue(produtosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const produtosArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProdutos(produtosArray);
        setFilteredProdutos(produtosArray);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProdutos(produtos);
    } else {
      const term = searchTerm.toLowerCase();
      console.log(term);
      console.log(produtos);
      setFilteredProdutos(
        produtos.filter((produto) => {
          return (
            produto.nome.toLowerCase().includes(term) ||
            produto.nome.toLowerCase().includes(term) ||
            produto.categoria.toLowerCase().includes(term) ||
            produto.idProduto === parseInt(term, 10)
          );
        })
      );
    }
  }, [searchTerm, produtos]);

  return (
    <View style={styles.container}>
      <CustomText style={{ fontSize: 30, color: "black", marginTop: 10 }}>
        Produtos
      </CustomText>

      <FormularioFilterProduto onChangeText={setSearchTerm} />

      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {filteredProdutos.map((produto) => (
            <TouchableOpacity
              key={produto.id}
              onPress={() => handleEditProduct(produto)}
            >
              <View key={produto.id} style={styles.produtoContainer}>
                <Text style={styles.produtoText}>
                  Código {produto.idProduto}
                </Text>
                <Text style={styles.produtoText}>Produto {produto.nome}</Text>
                <Text style={styles.produtoText}>
                  Categoria: {produto.categoria}
                </Text>
                <Text style={styles.produtoText}>Preço: {produto.preco}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.buttonCadastro}
        onPress={navegarCadastroProduto}
      >
        <Text style={styles.buttonCadastroText}>Cadastrar novo produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  produtoContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  produtoCodigo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  produtoNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  produtoDescricao: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  produtoCategoria: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  produtoPreco: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  buttonCadastro: {
    backgroundColor: "#0F5BCC",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonCadastroText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
