import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import logoImagem from '../../assets/barra.png';
import app from '../../firebase';
import { Alert } from "react-native";

export const FormularioVenda = ({ valorVendas }) => {
    return (
        <View style={styles.formulario}>
            <Text style={styles.titulo}>Vendas de hoje</Text>
            <Text style={styles.valor}>R$ {valorVendas}</Text>
        </View>
    );
};

export const FormularioPendente = ({ valorPendente, style }) => {
    
    const combinedStyles = {
        ...styles.formulario,
        ...style,
    };
    
    return (
        <View style={combinedStyles}>
            <Text style={styles.titulo}>Pendente</Text>
            <Text style={[styles.valor, { color: '#D9B842'}]}>R$ {valorPendente}</Text>
        </View>
    );
};

export const FormularioSaldo = ({ saldo, style }) => {
    
    const combinedStyles = {
        ...styles.formulario,
        ...style,
    };

    return (
        <View style={combinedStyles}>
            <Text style={styles.titulo}>Saldo disponível</Text>
            <Text style={[styles.valor, { color: '#2FA106'}]}>R$ {saldo}</Text>
        </View>
    );
};

export const FormularioReservado = ({ valorReservado }) => {
    return (
        <View style={[
            styles.formulario,
            { marginTop: 10}
        ]}>
            <Text style={styles.titulo}>Reservado</Text>
            <Text style={[styles.valor, { color: 'white'}]}>R$ {valorReservado}</Text>
        </View>
    );
};

export const SolicitacaoSaque = ({ saque }) => {
    return (
        <View>
            <Text style={{color: 'white', fontSize: 20, marginTop: 20, fontWeight: 'bold'}}>SOLICITAÇAO DE SAQUE</Text>
            <View style={[
                styles.formulario,
                { width: '95%', marginTop: 10, backgroundColor: '#313131'}
            ]}>
                <Text style={{color: 'white'}}>Para solicitar um saque, é necessário o valor mínimo de R$ 5,00 e verificar sua identidade</Text>
                <View style={[
                    styles.formulario,
                    { width: 325, height: 45, paddingTop: 2, paddingLeft: 15, marginTop: 0}
                ]}>
                    <Text style={[styles.titulo, {fontSize: 12 }]}>Valor</Text>
                    <Text style={[styles.valor, { color: 'white', fontSize: 18}]}>R$ {saque}</Text>
                </View>
            </View>
        </View>
    );
};

export const FormularioTotal = ({ total }) => {
    return (
        <View style={[
            styles.formulario,
            { marginTop: 10}
        ]}>
            <Text style={styles.titulo}>Total</Text>
            <Text style={[styles.valor, { color: '#4E6BFF'}]}>R$ {total}</Text>
        </View>
    );
};

export const FormularioRanking = ({ nivel, valorVendas }) => {
    return (
        <View style={styles.formulario}>
            <View>
                <View style={[
                        styles.bordaContainer,
                        { borderStyle: 'dotted', borderWidth: 1, borderRadius: 10, borderColor: 'white'}
                    ]}>
                  <Text style={[
                    styles.titulo,
                    { fontSize: 14, fontWeight: 'bold',  paddingLeft: 20, paddingTop: 4, paddingRight: 20 }
                    ]}>Nível {nivel}</Text>
                </View>
                <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold', position: 'absolute', top: 4, right: 15}}>R$ {valorVendas} em vendas hoje</Text>
                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', position: 'absolute', top: 35, right: 15}}>10k</Text>
                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', position: 'absolute', top: 35}}>0</Text>
                <Image style={styles.barra} source={logoImagem}/>
            </View>
        </View>
    );
};

export const FormularioConversaoPagamento = ({ vendasCartao, vendasPix, vendasBoleto }) => {
    return (
        <View style={styles.formulario}>
            <View>
                <Text style={{color: 'white', paddingTop: 6, paddingLeft: 6, fontWeight: "bold", fontSize: 19}}>Conversão de Pagamento</Text>
                <View style={styles.rectangle}></View>
                <Text style={styles.cartaoText}>{vendasCartao}%   Cartão</Text>
                <View style={[styles.rectangle, {position: 'absolute', left: 115, top: 28}]}></View>
                <Text style={styles.pixText}>{vendasPix}%   PIX</Text>
                <View style={[styles.rectangle, {position: 'absolute', right: 70, top: 28}]}></View>
                <Text style={styles.boletoText}>{vendasBoleto}%   Boleto</Text>
            </View>
        </View>
    );
};

export const FormularioFilterVenda = () => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={[
                styles.input,
                { marginTop: 5 }
                ]}
                placeholder='Buscar por CPF, transação ou nome...'
                placeholderTextColor="#cccccc"
                secureTextEntry={false}
            />
            <TouchableOpacity style={styles.buttonCadastro}>
                <Text style={styles.buttonCadastroText}>Filtrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export const FormularioFilterProduto = ({ onChangeText }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={[
                styles.input,
                { marginTop: 5, width: 250}
                ]}
                placeholder='Buscar por descrição. código...'
                placeholderTextColor="#cccccc"
                secureTextEntry={false}
                onChangeText={onChangeText}
            />
            <TouchableOpacity style={styles.buttonCadastro}>
                <Text style={styles.buttonCadastroText}>Filtrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export const FormularioPanelVenda = () => {
    return (
        <View style={[
            styles.formulario,
            { borderStyle: 'dotted', marginTop: 5, width: '92%', height: 75}
        ]}>
            <Text style={[styles.label, {color: 'white', paddingLeft: 0, paddingTop: 20, fontWeight: 'bold', fontSize: 15}]}>Período         Status         Pagamento         Valor</Text>
        </View>
    );
};

export const FormularioPanelProduto = ({ dsProduto, idVenda }) => {
    return (
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.form}>
            <View style={styles.produtoAtivo}>
                <Text style={styles.textAtivo}>Ativo</Text>
            </View>

                <View style={styles.formProduto}>
                    <Text style={styles.textProduto}>Produto {dsProduto}{"\n"} Venda: {idVenda}</Text>
                </View>
            </View>
            <View style={styles.form}>
            <View style={styles.produtoAtivo}>
                <Text style={styles.textAtivo}>Ativo</Text>
            </View>

                <View style={styles.formProduto}>
                    <Text style={styles.textProduto}>Produto {dsProduto}{"\n"} Venda: {idVenda}</Text>
                </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.form}>
            <View style={styles.produtoInativo}>
                <Text style={[styles.textAtivo, {color: 'black'}]}>Inativo</Text>
            </View>

                <View style={styles.formProduto}>
                    <Text style={styles.textProduto}>Produto {dsProduto}{"\n"} Venda: {idVenda}</Text>
                </View>
            </View>
            <View style={styles.form}>
            <View style={styles.produtoAtivo}>
                <Text style={styles.textAtivo}>Ativo</Text>
            </View>

                <View style={styles.formProduto}>
                    <Text style={styles.textProduto}>Produto {dsProduto}{"\n"} Venda: {idVenda}</Text>
                </View>
            </View>
          </View>
          {/* Adicione mais linhas de formulários aqui conforme necessário */}
        </View>
      );
};

export const MessageAlert = (titulo, message) => {
    Alert.alert(titulo, message, [
        { text: 'OK', }
    ]);
}

const styles = StyleSheet.create({
    produtoAtivo: {
        flex: 1,
        backgroundColor: 'green', // Cor de fundo do formulário de produto ativo
        margin: 5, // Margem interna dentro do formulário
        borderColor: '#33A816',
        borderRadius: 8,
        width: '40%',
        padding: 10, // Ajuste o padding conforme necessário
        maxHeight: 30, // Definindo uma altura máxima
        overflow: 'hidden', // Oculta o conteúdo que exceder a altura máxima
        justifyContent: 'center', // Alinha o conteúdo verticalmente ao centro
        alignItems: 'center', // Alinha o conteúdo horizontalmente ao centro
        marginBottom: 82
    },
    produtoInativo: {
        flex: 1,
        backgroundColor: 'gray', // Cor de fundo do formulário de produto ativo
        margin: 5, // Margem interna dentro do formulário
        borderColor: '#9E9E9E',
        borderRadius: 8,
        width: '40%',
        padding: 10, // Ajuste o padding conforme necessário
        maxHeight: 30, // Definindo uma altura máxima
        overflow: 'hidden', // Oculta o conteúdo que exceder a altura máxima
        justifyContent: 'center', // Alinha o conteúdo verticalmente ao centro
        alignItems: 'center', // Alinha o conteúdo horizontalmente ao centro
        marginBottom: 80
    },
    textAtivo: {
        fontSize: 10,
        color: '#8DFF70'
    },
    textProduto: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 7
    },
    formProduto: { 
        width: '100%', 
        height: '25%', 
        backgroundColor: 'white', 
        borderColor: 'white', 
        borderRadius: 4, 
        borderWidth: 1, 
        borderStyle: 'dotted'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start', // Alinha as linhas ao topo
        alignItems: 'stretch', // Estica os formulários horizontalmente
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Espaço uniforme entre os formulários
        marginBottom: 10, // Espaçamento entre as linhas de formulários
      },
      form: {
        width: '48%', // Cada formulário ocupa metade da largura do container
        height: 100, // Altura do formulário (ajuste conforme necessário)
        backgroundColor: 'black',
        borderColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'dotted',
        marginBottom: 10,
        height: 160
      },
    formulario: {
        backgroundColor: 'black', // Fundo preto
        borderRadius: 5, // Borda arredondada
        paddingTop: 10,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'white',
        width: '90%',
        height: 90,
        marginTop: 25
    },
    bordaContainer: {
        alignSelf: 'flex-start'
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white', // Cor do texto branco
        marginBottom: 5,
    },
    valor: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#4E6BFF', // Cor do texto branco
    },
    barra: {
        position: 'absolute',
        backgroundColor: 'blue',
        color: 'blue',
        height: 50,
        width: 50,
        top: 42,
        color: 'white',
        borderRadius: 2.5,
    },
    barra: {
        width: '96%',
        height: '25%',
        borderRadius: 5,
        position: 'absolute',
        top: 62
    },
    rectangle: {
        width: 45, // Largura do retângulo
        height: 35, // Altura do retângulo
        borderRadius: 30,
        backgroundColor: '#505050', // Cor do retângulo
        marginLeft: 10, // Espaçamento à esquerda
        marginTop: 5
    },
    cartaoText: {
        color: 'white',
        position: 'absolute',
        fontSize: 14,
        fontWeight: "bold",
        bottom: 8,
        left: 14
    },
    pixText: {
        color: 'white',
        position: 'absolute',
        fontSize: 14,
        fontWeight: "bold",
        bottom: 8,
        left: 129
    },
    boletoText: {
        color: 'white',
        position: 'absolute',
        fontSize: 14,
        fontWeight: "bold",
        bottom: 10,
        right: 15
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Alinhamento dos elementos à esquerda
        marginTop: 30,
        marginBottom: 20, // Espaçamento inferior entre os elementos
    },
    label: {
        fontSize: 18, // Tamanho do texto
        fontWeight: '300', // Peso da fonte
        paddingLeft: 8,
    },
    input: {
        flexDirection: 'row', // Botões na mesma linha
        backgroundColor: 'black', // Fundo cinza claro
        borderColor: '#cccccc', // Borda cinza mais escura
        borderWidth: 1, // Largura da borda
        borderRadius: 5, // Borda arredondada
        paddingVertical: 4, // Preenchimento interno padrão
        paddingHorizontal: 8,
        height: 60,
        marginTop: 60,
        marginRight: 10,
        paddingLeft: 10,
        fontStyle: "italic",
        fontSize: 12,
        color: 'white'
    },
    buttonCadastroText: {
        color: '#FFFFFF', // Cor do texto
        fontWeight: 'bold', // Negrito
        alignSelf: 'center',
        fontSize: 20,
    },
    buttonCadastro: {
        backgroundColor: '#0F5BCC',
        borderColor: '#0F5BCC',
        borderWidth: 1, // Largura da borda
        borderRadius: 5, // Borda arredondada
        paddingVertical: 17, // Preenchimento interno padrão
        paddingHorizontal: 30, // Adicione um preenchimento horizontal para expandir o botão
        marginTop: 4,
        marginRight: 60
    },
});