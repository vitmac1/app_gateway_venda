import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { CustomText } from "../components/Text";
import { ProfilePicture } from "../components/Perfil";
import { equalTo, getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Configuracao({ nome }) {
  const [user, setUser] = useState(null);
  const [negocio, setNegocio] = useState(null);
  const navigation = useNavigation();

  
  const handleEditarNegocio = () => {
    const user = auth && auth.currentUser ? auth.currentUser : null;
    
    const auth = getAuth(app);

    if (user) {
        const userId = user.uid;
        
        if (negocio.userId === userId) {
            navigation.navigate('negocio', { negocio: negocio });
        } else {
          MessageAlert("Erro", "Você não tem permissão para editar este produto");
        }
      }
  }

  useEffect(() => {
    const auth = getAuth(app);
    const db = getDatabase(app);

    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const fetchUser = async () => {
      if (userId) {
        const userRef = ref(db, "users/" + userId);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          setUser(userData); 
        });

        const negociosRef = ref(db, "negocios/");
        onValue(negociosRef, (snapshot) => {
          const negociosData = snapshot.val();
          
          console.log('negocio');
          console.log(negociosData);
          if (negociosData) {
            const userNegocios = Object.values(negociosData).filter((negocio) => {
                console.log(negocio.userId === userId)
                return negocio.userId === userId;
            });

            console.log(userNegocios);
            setNegocio(userNegocios);
          }
        });
        console.log('negocio atualizado');
        console.log(negocio);
      }
    };

    fetchUser();
  }, []); //

  return (
    <View style={styles.container}>
      <CustomText style={{ color: "white", marginTop: 10, marginRight: 180 }}>
        Configurações
      </CustomText>
      <CustomText style={{ color: "white", marginTop: 35, marginRight: 290 }}>
        Perfil
      </CustomText>
      <View style={styles.formulario}>
        <ProfilePicture />
        <Text style={{ color: "white", marginLeft: 15, fontSize: 11 }}>
          {"\n"}
          Nome: {"\n"} {user ? user.nome : ""} {"\n\n"}
          E-mail{"\n"} {user ? user.email : ""} {"\n\n"}
          Telefone:{"\n"}
          {user ? user.telefone : ""}
          {"\n"}
        </Text>
        <View>
          {/* <TouchableOpacity style={styles.buttonEditar} onPress={handleEditarNegocio}>
            <Text style={styles.buttonCadastroText}>Editar</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <CustomText style={{ color: "white", marginTop: 35, marginRight: 240 }}>
        Negócios
      </CustomText>
      {negocio && negocio.length > 0 ? (
        negocio.map((item, index) => (
          <View key={index} style={styles.formulario}>
            <Text style={styles.textDefaultNegocio}>
              Nome do Negócio: {item.apelido}
              {"\n"}
              CNPJ: {item.cnpj}
            </Text>
            {/* Adicione mais informações do negócio aqui conforme necessário */}
          </View>
        ))
      ) : (
        <Text style={{ color: "white" }}>Não há negócios</Text>
      )}
      <Text style={{ marginBottom: 150 }}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "black",
  },
  textDefaultNegocio: {
    color: "white",
  },
  buttonCadastroText: {
    color: "#FFFFFF", // Cor do texto
    fontWeight: "bold", // Negrito
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
  },
  buttonCadastro: {
    backgroundColor: "#0F5BCC",
    borderColor: "#0F5BCC",
    borderWidth: 1, // Largura da borda
    borderRadius: 5, // Borda arredondada
    width: 90,
    height: 25,
    marginLeft: 240,
  },
  formulario: {
    flexDirection: "row", // Dispor os itens em linha
    alignItems: "center", // Alinhar os itens verticalmente
    backgroundColor: "black", // Fundo preto
    borderRadius: 5, // Borda arredondada
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "dotted",
    width: "90%",
    height: "18%",
    marginTop: 10,
  },
  textDefaultNegocio: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 60,
    fontSize: 12,
  },
  buttonEditar: {
    backgroundColor: "#0F5BCC",
    borderColor: "#0F5BCC",
    borderWidth: 1, // Largura da borda
    borderRadius: 5, // Borda arredondada
    width: 70,
    height: 25,
    marginLeft: -10,
    marginBottom: 90,
  },
});
