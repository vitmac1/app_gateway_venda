import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export const Flag = ({ text }) => {
    return (
        <View style={styles.flag}>
            <View style={styles.flagContent}>
                <View style={styles.flagCircle}></View>
                <Text style={styles.flagText}>{text}</Text>
            </View>
            <Text style={styles.forgotPassword}>Esqueci a senha</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    flag: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 40
    },
    flagCircle: {
        width: 20,
        height: 20,
        borderRadius: 5, // Borda redonda
        backgroundColor: 'white', // Cor de fundo da flag
        marginRight: 15, // Margem à direita do círculo
        borderColor: 'black', // Cor da borda da flag
        borderWidth: 1, // Largura da borda da flag
    },
    flagContent: {
        flexDirection: 'row',
        alignItems: 'center', // Alinha os itens verticalmente
      },
    flagText: {
        fontSize: 20,
        fontWeight: '300',
    },
    forgotPassword: {
        fontSize: 20,
        fontWeight: '300',
        marginLeft: 60
    },
});