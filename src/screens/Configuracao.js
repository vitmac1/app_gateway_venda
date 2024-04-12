import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CustomText } from '../components/Text';
import { ProfilePicture } from '../components/Perfil';

export default function Configuracao({ nome }) {
  
    return (
    <View style={styles.container}>
        <CustomText style={{ color: 'white', marginTop: 10, marginRight: 180}}>Configurações</CustomText>
        <CustomText style={{ color: 'white', marginTop: 35, marginRight: 290}}>Perfil</CustomText>
        <View style={styles.formulario}>
            <ProfilePicture/>
            <Text style={{color: 'white', marginLeft: 15, fontSize: 11}}>
                Nome: {"\n"}Vitor Machado{"\n\n"}
                E-mail{"\n"}vitmac.2021@alunos.utfpr.edu.br{"\n\n"}
                Telefone{"\n"}+55 46 99923-3021
            </Text>
            <View>
                <TouchableOpacity style={styles.buttonEditar}>
                    <Text style={styles.buttonCadastroText}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
        <CustomText style={{ color: 'white', marginTop: 35, marginRight: 240}}>Negócios</CustomText>
        <View style={styles.formulario}>
            <View>
                <TouchableOpacity style={styles.buttonCadastro}>
                    <Text style={styles.buttonCadastroText}>+ Novo Negócio</Text>
                </TouchableOpacity>
                <Text style={styles.textDefaultNegocio}>Não há registros{"\n\n"}Para começar a vendar{"\n"}você precisa registrar pelo menos um{"\n"}negócio</Text>
            </View>
        </View>
        <Text style={{marginBottom:150}}></Text>
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
        backgroundColor: 'black',
    },
    buttonCadastroText: {
        color: '#FFFFFF', // Cor do texto
        fontWeight: 'bold', // Negrito
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 5
    },
    buttonCadastro: {
        backgroundColor: '#0F5BCC',
        borderColor: '#0F5BCC',
        borderWidth: 1, // Largura da borda
        borderRadius: 5, // Borda arredondada
        width: 90,
        height: 25,
        marginLeft: 240 
    },
    formulario: {
        flexDirection: 'row', // Dispor os itens em linha
        alignItems: 'center', // Alinhar os itens verticalmente
        backgroundColor: 'black', // Fundo preto
        borderRadius: 5, // Borda arredondada
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'dotted',
        width: '90%',
        height: '18%',
        marginTop: 10,
    },
    textDefaultNegocio: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingLeft: 60,
        fontSize: 12
    },
    buttonEditar: {
        backgroundColor: '#0F5BCC',
        borderColor: '#0F5BCC',
        borderWidth: 1, // Largura da borda
        borderRadius: 5, // Borda arredondada
        width: 70,
        height: 25,
        marginLeft: -10,
        marginBottom: 90, 
    },
});

