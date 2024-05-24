import React from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaskInput, { createNumberMask, Masks } from 'react-native-mask-input';

export const CustomText = (props) => {
    
    const combinedStyles = {
        ...styles.titleNovaConta,
        ...props.style,
    };
    
    return (
        <Text style={combinedStyles}>
            {props.children}
        </Text>
    )
};

export const TermoUsoText = (props) => {
    
    const combinedStyles = {
        ...styles.termoUsoText,
        ...props.style,
    };

    return (
        <Text style={combinedStyles}>
            {props.children}
        </Text>
    )
};

export const NomeProdutoText = ({ value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder='Nome do produto'
            placeholderTextColor="black"
            onChangeText={onChangeText}
            value={value}
        />
    );
};

export const QuantidadeProdutoText = ({ value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder='Quantidade Produto'
            placeholderTextColor="black"
            onChangeText={onChangeText}
            value={value}
        />
    );
};

export const PrecoVendaProdutoText = ({ value, onChangeText, precoInputRef, erroPrecoVenda }) => {
    return (
        <MaskInput
            type="currency"
            ref={precoInputRef}
            style={[styles.input, erroPrecoVenda && styles.inputError]}
            rightToLeft={true}
            mask={Masks.BRL_CURRENCY}
            placeholderTextColor="#cccccc"
            keyboardType='numeric'
            onChangeText={onChangeText}
            value={value}
        />
    );
};

export const DropdownTipoProduto = ({ selectedValue, onValueChange }) => {
    const placeholder = {
        label: 'Selecione o tipo do seu produto...',
        value: null,
    };

    const options = [
        { label: 'Físico', value: 'Físico' },
        { label: 'Digital', value: 'Digital' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecione o tipo do seu produto:</Text>
            <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value) => onValueChange(value)}
                value={selectedValue}
                style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                        top: 10,
                        right: 12
                    },
                }}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                    return <Icon name="arrow-drop-down" size={24} color="gray"/>;
                }}
            />
        </View>
    );
};


export const DropdownTipoFormaPagamento = ({ selectedValue, onValueChange }) => {
    const placeholder = {
        label: 'Selecione a forma de pagamento...',
        value: null,
    };

    const options = [
        { label: 'Cartão', value: 'Cartão' },
        { label: 'Dinheiro', value: 'Dinheiro' },
        { label: 'PIX', value: 'PIX' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecione a forma de pagamento:</Text>
            <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value) => onValueChange(value)}
                value={selectedValue}
                style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                        top: 10,
                        right: 12
                    },
                }}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                    return <Icon name="arrow-drop-down" size={24} color="gray"/>;
                }}
            />
        </View>
    );
};

export const DescricaoProdutoText = ({ value, onChangeText }) => {
    return (
        <TextInput
            style={[styles.input, { height: 100, paddingBottom: 30 }]}
            placeholder='Descrição breve do produto'
            placeholderTextColor="black"
            onChangeText={onChangeText}
            value={value}
        />
    );
};

export const BotaoCadastroProduto = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.buttonCadastro} onPress={onPress}>
            <Text style={styles.buttonCadastroText}>{text}</Text>
        </TouchableOpacity>
    );
};

export const ApelidoNegocioTextInput = ({ value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder='Apelido'
            placeholderTextColor="#cccccc"
            value={value}
            onChangeText={onChangeText}
        />
    );
};

export const CnpjTextInput = ({ value, onChangeText }) => {
    return (
        <MaskInput
            type="currency"
            style={styles.input}
            placeholder='XX. XXX. XXX/0001-ZZ'
            mask={Masks.BRL_CNPJ}
            placeholderTextColor="#cccccc"
            value={value}
            onChangeText={onChangeText}
        />
    );
};

export const NomeTextInput = ({ value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder='Nome e sobrenome'
            placeholderTextColor="#cccccc"
            value={value}
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: 350
    },
    buttonCadastroText: {
        color: 'black', 
        fontWeight: 'bold', 
        fontSize: 20,
        textAlign: 'center'
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
    titleNovaConta: {
      marginTop: 20,
      fontWeight: 'bold',
      fontSize: 25
    },
    termoUsoText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20
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
        fontSize: 15,
        marginBottom: 20
    },
    label: {
        paddingBottom: 5,
        fontSize: 16,
    },
    selectedValue: {
        marginTop: 10,
        fontSize: 16,
    },
    inputError: {
        borderColor: 'red',
    },
    icon: {
        fontSize: 20,
        color: '#999',
        position: 'absolute',
        right: 10,
        top: 15,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // Para garantir que o texto não sobreponha o ícone de seta
        backgroundColor: 'white',
        textAlign: 'center'
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#cccccc',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // Para garantir que o texto não sobreponha o ícone de seta
        backgroundColor: 'white',
        textAlign: 'center'
    },
});